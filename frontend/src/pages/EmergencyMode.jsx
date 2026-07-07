import React, { useEffect, useState, useRef } from 'react';
import Nav from '@/components/Nav';
import VitalsMonitor from '@/components/VitalsMonitor';
import { AlertTriangle, Zap, Activity, Pill, Wind } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';

const SCENARIOS = [
  { id: 's-anaphylaxis', name: 'Anaphylactic Shock', age: 34, sex: 'F', complaint: 'Facial swelling, wheeze, hypotension after IV cefazolin.', duration: 180, correct: ['epinephrine', 'oxygen'], distractors: ['normal-saline', 'aspirin'] },
  { id: 's-stemi', name: 'Anterior STEMI', age: 62, sex: 'M', complaint: 'Crushing chest pain, diaphoresis, ST elevation V2-V4.', duration: 180, correct: ['aspirin', 'oxygen', 'nitroglycerin'], distractors: ['epinephrine', 'furosemide'] },
  { id: 's-vfib', name: 'V-Fib Arrest', age: 55, sex: 'M', complaint: 'Sudden collapse, no pulse, VF on monitor.', duration: 150, correct: ['defibrillate', 'cpr', 'epinephrine'], distractors: ['aspirin', 'nitroglycerin'] },
];

const INTERVENTIONS = [
  { id: 'oxygen', label: 'High-flow O₂', icon: Wind },
  { id: 'epinephrine', label: 'Epinephrine IM', icon: Zap },
  { id: 'aspirin', label: 'Aspirin 325mg', icon: Pill },
  { id: 'nitroglycerin', label: 'Nitroglycerin SL', icon: Pill },
  { id: 'normal-saline', label: 'IV Normal Saline', icon: Activity },
  { id: 'furosemide', label: 'Furosemide IV', icon: Pill },
  { id: 'cpr', label: 'Start CPR', icon: Activity },
  { id: 'defibrillate', label: 'Defibrillate 200J', icon: Zap },
];

export default function EmergencyMode() {
  const [scenario, setScenario] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [given, setGiven] = useState([]);
  const [vitals, setVitals] = useState({ hr: 130, bp: '78/50', spo2: 86, resp: 30 });
  const [ended, setEnded] = useState(null);
  const timerRef = useRef();

  useEffect(() => {
    if (!scenario || ended) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setEnded({ status: 'timeout', score: 0 }); return 0; }
        return t - 1;
      });
      // Deteriorate each tick if wrong things happening
      setVitals((v) => {
        const wrongGiven = given.filter(g => scenario.distractors.includes(g)).length;
        const correctGiven = given.filter(g => scenario.correct.includes(g)).length;
        const delta = wrongGiven * 2 - correctGiven * 3;
        return {
          hr: Math.max(30, Math.min(190, v.hr + delta + (Math.random() > 0.5 ? 1 : -1))),
          bp: `${Math.max(50, 78 - delta * 3)}/${Math.max(30, 50 - delta * 2)}`,
          spo2: Math.max(60, Math.min(99, v.spo2 - delta)),
          resp: Math.max(8, Math.min(40, v.resp + delta)),
        };
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [scenario, ended, given]);

  useEffect(() => {
    if (!scenario || ended) return;
    // Check completion — all correct given
    const allGiven = scenario.correct.every(c => given.includes(c));
    if (allGiven) {
      const wrongs = given.filter(g => scenario.distractors.includes(g)).length;
      const score = Math.max(0, 100 - wrongs * 20 - Math.floor((scenario.duration - timeLeft) / 6));
      setEnded({ status: 'saved', score });
      api.post('/attempts', { simulation_id: scenario.id, accuracy: score, duration_sec: scenario.duration - timeLeft, blood_loss_ml: 0, wrong_actions: wrongs, missed_steps: 0, grade: score >= 80 ? 'A' : score >= 60 ? 'B' : 'C', weak_areas: wrongs > 0 ? ['Emergency triage'] : [] }).catch(() => {});
    }
  }, [given, scenario, timeLeft, ended]);

  const start = (s) => { setScenario(s); setTimeLeft(s.duration); setGiven([]); setEnded(null); setVitals({ hr: 130, bp: '78/50', spo2: 86, resp: 30 }); };
  const give = (id) => {
    if (given.includes(id) || ended) return;
    setGiven((g) => [...g, id]);
    if (scenario.correct.includes(id)) toast.success(`${id.replace('-', ' ')} — correct intervention`);
    else if (scenario.distractors.includes(id)) toast.error(`${id.replace('-', ' ')} — wrong. Patient deteriorating.`);
  };

  if (!scenario) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="label-caps mb-2 text-rose-600">Emergency Mode</div>
          <h1 className="font-display text-5xl mb-4">Patient is crashing. Every second counts.</h1>
          <p className="text-slate-500 max-w-2xl mb-10">Timed scenarios where the patient actively deteriorates. Give the correct interventions in the correct order — or fail the case.</p>
          <div className="grid md:grid-cols-3 gap-6" data-testid="emergency-scenarios">
            {SCENARIOS.map((s) => (
              <button key={s.id} onClick={() => start(s)} data-testid={`emg-${s.id}`}
                className="text-left border border-slate-200 rounded-lg p-6 hover-lift hover:border-rose-500">
                <AlertTriangle className="w-6 h-6 text-rose-500 mb-3" />
                <div className="label-caps mb-2">{s.age}y {s.sex} · {s.duration}s window</div>
                <div className="font-display text-xl font-semibold mb-2">{s.name}</div>
                <div className="text-sm text-slate-500">{s.complaint}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const critical = vitals.spo2 < 88 || vitals.hr > 160 || vitals.hr < 40;
  const shuffled = [...scenario.correct, ...scenario.distractors].sort();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-rose-900/40 bg-rose-950/30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-500 vitals-flicker" />
          <div>
            <div className="font-display font-semibold">{scenario.name}</div>
            <div className="text-[10px] uppercase tracking-widest text-rose-300 font-mono">{scenario.age}y {scenario.sex} · {scenario.complaint}</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className={`font-mono font-bold text-3xl ${timeLeft < 30 ? 'text-rose-500 vitals-flicker' : timeLeft < 60 ? 'text-amber-400' : 'text-white'}`}>{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">time remaining</div>
          </div>
          <button onClick={() => { setScenario(null); setEnded(null); clearInterval(timerRef.current); }} data-testid="emg-exit" className="border border-slate-700 px-3 py-1.5 rounded text-xs">Exit</button>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_400px] h-[calc(100vh-64px)]">
        <div className="p-6 overflow-y-auto">
          <div className="label-caps text-slate-500 mb-4">Available interventions</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3" data-testid="interventions">
            {INTERVENTIONS.filter(i => shuffled.includes(i.id)).map((i) => (
              <button key={i.id} onClick={() => give(i.id)} disabled={given.includes(i.id) || !!ended} data-testid={`intv-${i.id}`}
                className={`p-4 border rounded text-left transition-colors ${given.includes(i.id) ? (scenario.correct.includes(i.id) ? 'bg-emerald-900/40 border-emerald-500/50' : 'bg-rose-900/40 border-rose-500/50') : 'border-slate-700 hover:border-blue-500'} disabled:opacity-70`}>
                <i.icon className="w-5 h-5 mb-2 opacity-70" />
                <div className="text-sm font-medium">{i.label}</div>
                {given.includes(i.id) && <div className="text-[10px] uppercase tracking-widest mt-1">{scenario.correct.includes(i.id) ? 'effective' : 'wrong'}</div>}
              </button>
            ))}
          </div>
          {ended && (
            <div className={`mt-8 p-6 rounded-lg border ${ended.status === 'saved' ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-rose-900/30 border-rose-500/50'}`} data-testid="emg-result">
              <div className="label-caps mb-2">{ended.status === 'saved' ? 'Patient stabilized' : 'Time expired'}</div>
              <div className="font-display text-4xl font-bold">{ended.score}%</div>
              <div className="text-sm text-slate-400 mt-2">Interventions given: {given.length} · Correct: {given.filter(g => scenario.correct.includes(g)).length}</div>
              <button onClick={() => { setScenario(null); setEnded(null); }} className="mt-4 bg-white text-slate-900 px-4 py-2 rounded text-sm font-medium">Choose another scenario</button>
            </div>
          )}
        </div>
        <div className="border-l border-slate-800 p-4">
          <VitalsMonitor hr={vitals.hr} bp={vitals.bp} spo2={vitals.spo2} resp={vitals.resp} temp={36.8} bloodLossMl={0} alert={critical} />
        </div>
      </div>
    </div>
  );
}
