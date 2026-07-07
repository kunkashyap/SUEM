import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Send, X, MessageSquare } from 'lucide-react';
import api, { API } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

/**
 * Persistent AI tutor that reads context via window.__MEDSIM_TUTOR_CTX__
 * so any active simulation page can push scene state at any time.
 */
export default function AITutor() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: "Hi — I'm Dr. Ada, your AI surgical tutor. Ask me anything about anatomy, a procedure, or a step you're stuck on." }]);
  const [streaming, setStreaming] = useState(false);
  const boxRef = useRef(null);
  const sessionId = useRef(`s-${Date.now()}`).current;

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages, open]);

  if (!user) return null;

  const send = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput('');
    const context = window.__MEDSIM_TUTOR_CTX__ || null;
    setMessages((m) => [...m, { role: 'user', text }, { role: 'assistant', text: '' }]);
    setStreaming(true);
    try {
      const token = localStorage.getItem('medsim_token');
      const res = await fetch(`${API}/tutor/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ session_id: sessionId, message: text, context }),
      });
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split('\n\n');
        buf = parts.pop() || '';
        for (const p of parts) {
          const line = p.replace(/^data: /, '').trim();
          if (!line) continue;
          try {
            const j = JSON.parse(line);
            if (j.delta) {
              setMessages((m) => {
                const arr = [...m];
                arr[arr.length - 1] = { role: 'assistant', text: arr[arr.length - 1].text + j.delta };
                return arr;
              });
            }
            if (j.error) {
              setMessages((m) => {
                const arr = [...m];
                arr[arr.length - 1] = { role: 'assistant', text: 'Tutor error: ' + j.error };
                return arr;
              });
            }
          } catch { /* noop */ }
        }
      }
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: 'Connection error. Please retry.' }]);
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} data-testid="tutor-open-btn"
          className="fixed bottom-6 right-6 z-50 group bg-slate-900 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Ask Dr. Ada</span>
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[95vw] h-[560px] bg-white border border-slate-200 shadow-2xl rounded-lg flex flex-col" data-testid="tutor-panel">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-900 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-semibold text-sm leading-tight">Dr. Ada</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">AI Surgical Tutor</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} data-testid="tutor-close-btn" className="p-1 hover:bg-slate-700 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div ref={boxRef} className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="tutor-messages">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm ${m.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-[85%] px-3 py-2 rounded-lg ${m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200'}`}>
                  <span className="whitespace-pre-wrap">{m.text || (streaming && i === messages.length - 1 ? '…' : '')}</span>
                </div>
              </div>
            ))}
            {messages.length === 1 && !streaming && (
              <div className="pt-2">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Try asking</div>
                <div className="flex flex-wrap gap-1.5">
                  {['What is this structure?', 'Why is BP dropping?', "What's the next step?", 'Explain the anatomy'].map((q) => (
                    <button key={q} onClick={() => { setInput(q); setTimeout(send, 0); }} data-testid={`tutor-suggest-${q.slice(0,10)}`}
                      className="text-[11px] px-2.5 py-1 border border-slate-200 rounded-full hover:border-slate-900 hover:bg-slate-50">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-slate-200 flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()} data-testid="tutor-input"
              placeholder="Ask about a structure, next step, or 'why is BP dropping?'"
              className="flex-1 text-sm border border-slate-200 focus:border-slate-900 outline-none rounded-md px-3 py-2" />
            <button onClick={send} disabled={streaming} data-testid="tutor-send-btn"
              className="bg-blue-600 disabled:bg-slate-300 text-white p-2 rounded-md hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
