import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import api from '@/lib/api';
import { Clock, BarChart3 } from 'lucide-react';

export default function SimulationDetail() {
  const { id } = useParams();
  const [sim, setSim] = useState(null);
  useEffect(() => { api.get(`/simulations/${id}`).then((r) => setSim(r.data)); }, [id]);
  if (!sim) return <div className="min-h-screen bg-white"><Nav /><div className="p-12 text-slate-500">Loading…</div></div>;
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-4xl mx-auto px-6 py-12" data-testid="sim-detail">
        <Link to="/simulations" className="text-sm text-slate-500 hover:text-slate-900">← All simulations</Link>
        <div className="mt-4 label-caps mb-2">{sim.category} · {sim.difficulty}</div>
        <h1 className="font-display text-5xl mb-6">{sim.title}</h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">{sim.description}</p>
        <div className="flex gap-6 text-sm font-mono text-slate-500 mb-10">
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {sim.duration_min} min</span>
          <span className="flex items-center gap-1"><BarChart3 className="w-4 h-4" /> {sim.steps} steps</span>
        </div>
        <div className="border border-slate-200 rounded-lg p-8 text-center bg-slate-50">
          <div className="label-caps mb-3">Coming next</div>
          <h3 className="font-display text-2xl mb-3">This simulation is being expanded.</h3>
          <p className="text-slate-500 mb-6">The full interactive experience is live for the featured Appendectomy procedure. More simulations will unlock the same depth of interaction shortly.</p>
          <Link to="/procedure/sim-appendectomy" data-testid="try-appendectomy"
            className="inline-block bg-slate-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
            Try the featured Appendectomy →
          </Link>
        </div>
      </div>
    </div>
  );
}
