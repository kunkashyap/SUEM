import React, { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import api from '@/lib/api';
import { Trophy } from 'lucide-react';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  useEffect(() => { api.get('/leaderboard').then((r) => setRows(r.data)); }, []);
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="label-caps mb-2">Global rankings</div>
        <h1 className="font-display text-5xl mb-10">Leaderboard</h1>
        <div className="border border-slate-200 rounded-lg overflow-hidden" data-testid="leaderboard">
          {rows.length === 0 && <div className="p-8 text-center text-slate-500">No entries yet.</div>}
          {rows.map((u, i) => (
            <div key={i} className={`flex items-center gap-4 px-5 py-4 border-b last:border-b-0 border-slate-100 ${i === 0 ? 'bg-amber-50' : ''}`} data-testid={`lb-row-${i}`}>
              <div className="font-mono text-2xl font-bold w-10 text-slate-400">#{i + 1}</div>
              {i === 0 && <Trophy className="w-5 h-5 text-amber-500" />}
              <div className="flex-1">
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-slate-500">{u.institution || 'Independent'} · {u.role}</div>
              </div>
              <div className="font-mono text-lg font-bold">{u.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
