import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Nav from '@/components/Nav';
import api from '@/lib/api';
import { Clock, BarChart3 } from 'lucide-react';

const DIFF_COLORS = { Beginner: 'bg-emerald-100 text-emerald-800', Intermediate: 'bg-amber-100 text-amber-800', Advanced: 'bg-orange-100 text-orange-800', Expert: 'bg-rose-100 text-rose-800' };

export default function SimulationLibrary() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('category') || '';
  const diff = params.get('difficulty') || '';
  const [sims, setSims] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    api.get('/simulations', { params: { category: cat || undefined, difficulty: diff || undefined } }).then((r) => setSims(r.data));
    api.get('/categories').then((r) => setCats(r.data));
  }, [cat, diff]);

  const setFilter = (k, v) => {
    const p = new URLSearchParams(params);
    if (v) p.set(k, v); else p.delete(k);
    setParams(p);
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="label-caps mb-2">The Library</div>
            <h1 className="font-display text-5xl text-slate-900">Simulation catalog</h1>
            <p className="text-slate-500 mt-3 max-w-2xl">Every procedure, every specialty. Filter by system or difficulty. Click any card to enter the simulation.</p>
          </div>
          <div className="hidden md:block text-right">
            <div className="font-mono text-4xl font-bold text-slate-900">{sims.length}</div>
            <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">results</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4" data-testid="cat-filters">
          <button onClick={() => setFilter('category', '')} data-testid="filter-cat-all"
            className={`px-3 py-1.5 border rounded-full text-xs font-medium ${!cat ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 hover:border-slate-900'}`}>All</button>
          {cats.map((c) => (
            <button key={c.id} onClick={() => setFilter('category', c.id)} data-testid={`filter-cat-${c.id}`}
              className={`px-3 py-1.5 border rounded-full text-xs font-medium ${cat === c.id ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 hover:border-slate-900'}`}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-10" data-testid="diff-filters">
          {['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map((d) => (
            <button key={d || 'all'} onClick={() => setFilter('difficulty', d)} data-testid={`filter-diff-${d || 'all'}`}
              className={`px-3 py-1.5 border rounded text-xs font-medium ${diff === d ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 hover:border-slate-900'}`}>
              {d || 'Any level'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="sim-grid">
          {sims.map((s) => (
            <Link key={s.id} to={s.id === 'sim-appendectomy' ? `/procedure/${s.id}` : `/simulation/${s.id}`} data-testid={`sim-card-${s.id}`}
              className="bg-white border border-slate-200 rounded-lg p-6 hover-lift hover:border-slate-900 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-4 relative">
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${DIFF_COLORS[s.difficulty] || 'bg-slate-100 text-slate-700'}`}>{s.difficulty}</span>
                {s.featured && <span className="text-[10px] uppercase tracking-widest font-bold bg-blue-600 text-white px-2 py-0.5 rounded">Featured</span>}
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 leading-tight relative">{s.title}</h3>
              <p className="text-sm text-slate-500 mb-5 line-clamp-2 relative">{s.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4 relative">
                {(s.tags || []).slice(0, 3).map((t) => <span key={t} className="text-[10px] px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-full text-slate-600">{t}</span>)}
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 font-mono border-t border-slate-100 pt-3 relative">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {s.duration_min}m</span>
                <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {s.steps} steps</span>
                <span className="ml-auto capitalize">{s.category}</span>
              </div>
            </Link>
          ))}
          {sims.length === 0 && <div className="col-span-full text-center py-16 text-slate-500">No simulations match your filters.</div>}
        </div>
      </div>
    </div>
  );
}
