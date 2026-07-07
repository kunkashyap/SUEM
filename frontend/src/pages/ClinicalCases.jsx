import React, { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import api from '@/lib/api';

export default function ClinicalCases() {
  const [cases, setCases] = useState([]);
  const [active, setActive] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => { api.get('/cases').then((r) => setCases(r.data)); }, []);

  const stages = active ? [
    { label: 'Presenting complaint', body: <p className="text-slate-700 leading-relaxed">{active.presenting_complaint}</p> },
    { label: 'History', body: <ul className="space-y-1 text-slate-700">{active.history.map((h, i) => <li key={i}>• {h}</li>)}</ul> },
    { label: 'Physical exam', body: <ul className="space-y-1 text-slate-700">{active.exam.map((h, i) => <li key={i}>• {h}</li>)}</ul> },
    { label: 'Labs', body: <div className="grid grid-cols-2 gap-2 font-mono text-sm">{Object.entries(active.labs).map(([k, v]) => <div key={k} className="border border-slate-200 p-2"><div className="text-xs text-slate-500">{k}</div><div className="font-bold">{v}</div></div>)}</div> },
    { label: 'Imaging', body: <p className="text-slate-700 leading-relaxed">{active.imaging}</p> },
    { label: 'Diagnosis', body: <p className="font-display text-2xl font-bold text-blue-600">{active.diagnosis}</p> },
    { label: 'Treatment plan', body: <p className="text-slate-700 leading-relaxed">{active.plan}</p> },
  ] : [];

  if (active) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="max-w-4xl mx-auto px-6 py-12" data-testid="case-view">
          <button onClick={() => { setActive(null); setStep(0); }} className="text-sm text-slate-500 hover:text-slate-900 mb-4" data-testid="case-back">← Back</button>
          <div className="label-caps mb-2">Clinical case · {active.age}y {active.sex}</div>
          <h1 className="font-display text-4xl mb-8">{active.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {stages.map((s, i) => (
              <button key={s.label} onClick={() => setStep(i)} data-testid={`stage-${i}`}
                className={`px-3 py-1.5 border text-xs font-medium rounded-full ${step === i ? 'bg-slate-900 text-white border-slate-900' : i < step ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'border-slate-200 hover:border-slate-900'}`}>
                {i + 1}. {s.label}
              </button>
            ))}
          </div>

          <div className="border border-slate-200 rounded-lg p-8 min-h-[300px]" data-testid="stage-content">
            <div className="label-caps mb-4">{stages[step].label}</div>
            {stages[step].body}
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} data-testid="case-prev"
              className="border border-slate-200 px-4 py-2 rounded text-sm font-medium disabled:opacity-40 hover:border-slate-900">← Previous</button>
            <button onClick={() => setStep((s) => Math.min(stages.length - 1, s + 1))} disabled={step === stages.length - 1} data-testid="case-next"
              className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-40 hover:bg-blue-600 transition-colors">Next →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="label-caps mb-2">Clinical Reasoning</div>
        <h1 className="font-display text-5xl mb-10">Clinical cases</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <button key={c.id} onClick={() => setActive(c)} data-testid={`case-${c.id}`}
              className="text-left border border-slate-200 rounded-lg p-6 hover-lift hover:border-slate-900">
              <div className="label-caps mb-2">{c.age}y · {c.sex === 'M' ? 'Male' : 'Female'}</div>
              <div className="font-display text-xl font-semibold mb-2">{c.title}</div>
              <div className="text-sm text-slate-500 line-clamp-2">{c.presenting_complaint}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
