import React, { useState } from 'react';
import Nav from '@/components/Nav';
import { Users, UserCheck, Copy, Video, Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const ROLES = [
  { id: 'surgeon', label: 'Primary Surgeon', color: 'bg-rose-500' },
  { id: 'assistant', label: 'Surgical Assistant', color: 'bg-amber-500' },
  { id: 'anesthetist', label: 'Anesthetist', color: 'bg-blue-500' },
  { id: 'scrub-nurse', label: 'Scrub Nurse', color: 'bg-emerald-500' },
];

export default function TeamMode() {
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [role, setRole] = useState(null);
  const [muted, setMuted] = useState(false);

  const create = () => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    setRoom({ code, procedure: 'Open Appendectomy', participants: [{ name: user?.name || 'You', role: null, self: true }] });
    toast.success(`Room ${code} created`);
  };

  const pickRole = (r) => {
    setRole(r);
    setRoom({ ...room, participants: room.participants.map(p => p.self ? { ...p, role: r } : p) });
    toast.success(`You are now the ${r.label}`);
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="max-w-[1000px] mx-auto px-6 py-12">
          <div className="label-caps mb-2">Live OR Team Mode</div>
          <h1 className="font-display text-5xl mb-4">Surgery is a team sport.</h1>
          <p className="text-slate-500 max-w-2xl mb-10">Run a shared OR session with your class. Assign roles, communicate over voice, and perform a procedure as the team you'll actually be in the real operating room.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={create} data-testid="team-create" className="text-left border border-slate-200 rounded-lg p-8 hover-lift hover:border-slate-900">
              <Users className="w-8 h-8 text-blue-600 mb-4" />
              <div className="font-display text-2xl font-semibold mb-2">Create a room</div>
              <div className="text-sm text-slate-500 mb-4">Instantly host a session for your cohort. Share the room code with up to 4 students.</div>
              <div className="text-sm font-medium text-blue-600">Start hosting →</div>
            </button>
            <div className="border border-slate-200 rounded-lg p-8 opacity-60">
              <UserCheck className="w-8 h-8 text-slate-400 mb-4" />
              <div className="font-display text-2xl font-semibold mb-2">Join with code</div>
              <div className="text-sm text-slate-500 mb-4">Enter a 6-character room code shared by your host.</div>
              <input placeholder="ROOM-CODE" data-testid="team-join-code" className="w-full border border-slate-200 rounded px-3 py-2 mb-3 font-mono uppercase" />
              <button className="text-sm font-medium text-slate-400">Coming this term</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Live OR · {room.procedure}</div>
            <div className="font-display font-semibold">Room {room.code}</div>
          </div>
          <button onClick={() => { navigator.clipboard.writeText(room.code); toast.success('Room code copied'); }} data-testid="copy-code"
            className="text-xs border border-slate-700 px-3 py-1.5 rounded hover:border-white flex items-center gap-1.5">
            <Copy className="w-3 h-3" /> Copy code
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMuted(m => !m)} data-testid="team-mute" className="p-2 border border-slate-700 rounded hover:border-white">
            {muted ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4 text-emerald-400" />}
          </button>
          <button className="p-2 border border-slate-700 rounded hover:border-white"><Video className="w-4 h-4" /></button>
          <button onClick={() => { setRoom(null); setRole(null); }} className="text-xs border border-slate-700 px-3 py-1.5 rounded">Leave</button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] h-[calc(100vh-64px)]">
        <div className="p-8 flex items-center justify-center">
          {!role ? (
            <div className="max-w-2xl w-full">
              <div className="label-caps mb-4 text-blue-400">Pick your role</div>
              <div className="grid grid-cols-2 gap-4" data-testid="role-picker">
                {ROLES.map((r) => (
                  <button key={r.id} onClick={() => pickRole(r)} data-testid={`role-${r.id}`}
                    className="text-left border border-slate-700 rounded-lg p-6 hover:border-white transition-colors">
                    <div className={`w-3 h-3 rounded-full ${r.color} mb-3`} />
                    <div className="font-display text-xl font-semibold">{r.label}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center max-w-md" data-testid="team-briefing">
              <div className={`w-16 h-16 mx-auto rounded-full ${role.color} mb-4 flex items-center justify-center font-display text-2xl font-bold`}>
                {role.label[0]}
              </div>
              <div className="label-caps text-slate-500 mb-2">Your role</div>
              <div className="font-display text-3xl font-semibold mb-4">{role.label}</div>
              <p className="text-slate-400 leading-relaxed mb-6">Waiting for other team members to select roles. Once the surgeon starts, your view will switch to your role-specific console.</p>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Waiting for team… (1 of 4)</div>
            </div>
          )}
        </div>
        <aside className="border-l border-slate-800 p-4">
          <div className="label-caps text-slate-500 mb-3">Participants</div>
          <div className="space-y-2" data-testid="participants">
            {room.participants.map((p, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-slate-800 rounded">
                <div className={`w-8 h-8 rounded-full ${p.role?.color || 'bg-slate-700'} flex items-center justify-center text-sm font-bold`}>{p.name[0]}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{p.name}{p.self && <span className="text-[10px] text-slate-500 ml-1">(you)</span>}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">{p.role?.label || 'Choosing role…'}</div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            ))}
            {[...Array(4 - room.participants.length)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-dashed border-slate-800 rounded opacity-50">
                <div className="w-8 h-8 rounded-full bg-slate-800" />
                <div className="text-xs text-slate-500">Waiting for participant…</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
