import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const syntaxHighlight = (code, lang) => {
  if (!code) return '';
  // Escape HTML tags to prevent XSS and formatting bugs
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (lang === 'bash' || lang === 'sh') {
    // Highlight comments, commands, variables
    html = html
      .replace(/(#.*)/g, '<span class="text-slate-500 font-mono">$1</span>')
      .replace(/(\b(cd|npm|yarn|python|pytest|pip|git|npx|mkdir|rm|cp)\b)/g, '<span class="text-blue-400 font-bold">$1</span>')
      .replace(/(\$.*?)/g, '<span class="text-amber-400 font-semibold">$1</span>');
  } else if (lang === 'json') {
    // Highlight keys, string values, numbers, booleans
    html = html
      .replace(/(".*?"\s*:)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(:\s*".*?")/g, ': <span class="text-emerald-400">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="text-amber-400">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-blue-400">$1</span>');
  } else {
    // General code highlighting (JS, Python)
    const keywords = /\b(const|let|var|function|return|import|export|from|default|class|extends|if|else|for|while|try|catch|def|async|await|as|from|import|with|lambda)\b/g;
    const strings = /("(.*?)"|'(.*?)'|`(.*?)`)/g;
    const comments = /(\/\/.*|#.*)/g;
    const numbers = /\b(\d+)\b/g;
    const builtins = /\b(console|log|print|self|super|Math|Object|Array|React|useState|useEffect|useContext|useRef|useMemo|useCallback)\b/g;

    html = html
      .replace(keywords, '<span class="text-purple-400 font-bold">$1</span>')
      .replace(builtins, '<span class="text-blue-400">$1</span>')
      .replace(strings, '<span class="text-emerald-400">$1</span>')
      .replace(numbers, '<span class="text-amber-400">$1</span>')
      .replace(comments, '<span class="text-slate-500 italic">$1</span>');
  }
  return html;
};

export default function CodeBlock({ code, language = 'javascript', fileName, showLineNumbers = true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const highlightedHtml = syntaxHighlight(code.trim(), language);
  const lines = code.trim().split('\n');

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-800 bg-[#0F172A] shadow-lg text-slate-100 max-w-full">
      {/* Header Bar */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-slate-800 bg-[#0b0f19]">
        <div className="flex items-center gap-2">
          {language && (
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700">
              {language}
            </span>
          )}
          {fileName && <span className="text-xs font-mono text-slate-400">{fileName}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-500"
          aria-label="Copy code to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Display */}
      <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed flex">
        {showLineNumbers && (
          <div className="select-none text-slate-600 text-right pr-4 border-r border-slate-800/80 mr-4 select-none min-w-[2.5rem]">
            {lines.map((_, i) => (
              <div key={i} className="h-6 leading-6">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <pre className="flex-1 text-left min-w-0 select-text overflow-x-auto whitespace-pre">
          <code
            className="block h-full leading-6"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>
    </div>
  );
}
