import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import VitalsMonitor from '@/components/VitalsMonitor';
import { toast } from 'sonner';
import { CheckCircle2, AlertTriangle, ChevronRight, Scissors, X, LayoutDashboard } from 'lucide-react';

const INSTRUMENTS = [
  { id: 'scrub-brush', label: 'Scrub Brush' },
  { id: 'gloves', label: 'Sterile Gloves' },
  { id: 'drape', label: 'Drape' },
  { id: 'marker', label: 'Skin Marker' },
  { id: 'scalpel', label: 'Scalpel #10' },
  { id: 'cautery', label: 'Electrocautery' },
  { id: 'scissors', label: 'Metz Scissors' },
  { id: 'forceps', label: 'Forceps' },
  { id: 'clamp', label: 'Kelly Clamp' },
  { id: 'suture', label: 'Suture 2-0' },
  { id: 'needle-holder', label: 'Needle Holder' },
  { id: 'dressing', label: 'Dressing' },
];

export default function ProcedurePlayer() {
  const { id } = useParams();
  const nav = useNavigate();
  const [steps, setSteps] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [bloodLoss, setBloodLoss] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [alert, setAlert] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [feedback, setFeedback] = useState(null); // { severity, message }

  useEffect(() => { api.get('/procedures/appendectomy/steps').then((r) => setSteps(r.data)); }, []);
  const step = steps[current];

  useEffect(() => {
    window.__MEDSIM_TUTOR_CTX__ = step ? {
      screen: 'Surgical Mode · Appendectomy',
      step_index: step.index,
      step_title: step.title,
      instruction: step.instruction,
      required_instrument: step.instrument,
      selected_instrument: selectedInstrument,
      vitals: { bp: alert ? '82/54' : '120/78', hr: alert ? 116 : 76, spo2: alert ? 92 : 98, blood_loss_ml: bloodLoss },
      wrong_actions: wrongCount,
    } : null;
    return () => { window.__MEDSIM_TUTOR_CTX__ = null; };
  }, [step, selectedInstrument, alert, bloodLoss, wrongCount]);

  const doAction = (action) => {
    if (!step) return;
    // action == 'correct' or 'wrong-vessel'
    if (action === 'correct') {
      if (!selectedInstrument || selectedInstrument !== step.instrument) {
        setFeedback({ severity: 'moderate', message: `Wrong instrument. This step requires: ${step.instrument.replace('-', ' ')}.` });
        setWrongCount((c) => c + 1);
        toast.error('Wrong instrument selected');
        return;
      }
      setCompleted((s) => [...s, step.index]);
      setFeedback({ severity: 'ok', message: 'Correct. Advance to the next step.' });
      toast.success(`Step ${step.index} complete`);
      if (current + 1 < steps.length) {
        setTimeout(() => { setCurrent((c) => c + 1); setSelectedInstrument(null); setFeedback(null); }, 800);
      } else {
        setTimeout(() => setShowComplete(true), 600);
      }
    } else if (action === 'wrong-vessel') {
      setWrongCount((c) => c + 1);
      setBloodLoss((b) => b + 350);
      setAlert(true);
      setAlerts((a) => [...a, { type: 'critical', msg: 'Arterial hemorrhage — apply pressure or clamp immediately' }]);
      setFeedback({ severity: 'critical', message: 'CRITICAL: You cut a vessel. Blood pressure dropping. Use a clamp to control the bleeding.' });
      toast.error('Critical error — arterial bleeding');
    } else if (action === 'control-bleeding') {
      if (alert) {
        setAlert(false);
        setFeedback({ severity: 'ok', message: 'Bleeding controlled. Vitals stabilizing.' });
        toast.success('Hemorrhage controlled');
      }
    }
  };

  const finish = async () => {
    const total = steps.length || 1;
    const accuracy = Math.max(0, 100 - wrongCount * 8 - Math.min(30, Math.floor(bloodLoss / 50)));
    const grade = accuracy >= 90 ? 'A' : accuracy >= 80 ? 'B' : accuracy >= 70 ? 'C' : 'D';
    try {
      await api.post('/attempts', {
        simulation_id: id,
        accuracy,
        duration_sec: 0,
        blood_loss_ml: bloodLoss,
        wrong_actions: wrongCount,
        missed_steps: total - completed.length,
        grade,
        weak_areas: wrongCount > 0 ? ['Instrument selection', 'Hemostasis'] : [],
      });
      toast.success(`Recorded. Grade ${grade} · ${accuracy}%`);
    } catch { /* noop */ }
    nav('/dashboard');
  };

  const progress = useMemo(() => (steps.length ? Math.round((completed.length / steps.length) * 100) : 0), [completed, steps]);

  if (!step) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading OR…</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" data-testid="procedure-player">
      <div className="flex items-center justify-between px-6 h-14 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-4">
          <button onClick={() => nav('/simulations')} data-testid="exit-or" className="p-1.5 hover:bg-slate-800 rounded"><X className="w-4 h-4" /></button>
          <div>
            <div className="font-display font-semibold text-sm">Open Appendectomy</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">OR-3 · Case A-22 · Intermediate</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono text-slate-400">STEP {step.index}/{steps.length}</div>
          <div className="w-40 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[280px_1fr_360px] h-[calc(100vh-3.5rem)]">
        {/* Instruments */}
        <aside className="border-r border-slate-800 p-4 overflow-y-auto" data-testid="instruments-tray">
          <div className="label-caps text-slate-500 mb-3">Instrument tray</div>
          <div className="grid grid-cols-2 gap-2">
            {INSTRUMENTS.map((i) => (
              <button key={i.id} onClick={() => setSelectedInstrument(i.id)} data-testid={`instr-${i.id}`}
                className={`p-3 border rounded text-xs font-medium text-left transition-colors ${selectedInstrument === i.id ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-800 hover:border-slate-500 bg-slate-900'} ${step.instrument === i.id ? 'ring-1 ring-amber-400' : ''}`}>
                <Scissors className="w-3.5 h-3.5 mb-1.5 opacity-60" />
                {i.label}
                {step.instrument === i.id && <div className="text-[9px] text-amber-400 mt-1 uppercase tracking-widest">Needed</div>}
              </button>
            ))}
          </div>
        </aside>

        {/* Center: Field */}
        <main className="relative flex flex-col">
          <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
            {/* OR light rays */}
            <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,220,0.15) 0%, transparent 60%)' }} />
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-20 grid-backdrop" />
            {/* surgical field visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[460px] h-[460px]">
                {/* Surgical drape corners */}
                <div className="absolute inset-0 bg-blue-900/40 border-2 border-blue-800/30 rounded-lg" />
                {/* Sterile field ring */}
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-emerald-500/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[380px] h-[380px] rounded-full shadow-2xl" style={{ background: 'radial-gradient(circle, #B45454 0%, #7C1D1D 55%, #3F0D0D 85%, transparent 100%)' }}>
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      <ellipse cx="200" cy="200" rx="160" ry="140" fill="#B45454" opacity="0.9" />
                      {/* Fat/tissue layers */}
                      <ellipse cx="200" cy="200" rx="150" ry="132" fill="#FCD34D" opacity="0.15" />
                      <ellipse cx="200" cy="200" rx="130" ry="115" fill="#7F1D1D" opacity="0.6" />
                      {/* Incision */}
                      {step.index >= 5 && <path d="M155 185 L245 210" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />}
                      {step.index >= 6 && <path d="M158 187 L242 212" stroke="#DC2626" strokeWidth="1.5" opacity="0.8" />}
                      {/* Bowel/cecum */}
                      <path d="M120 200 Q200 190 280 200 Q280 225 200 215 Q120 225 120 200 Z" fill="#7F1D1D" />
                      <path d="M140 230 Q170 240 200 235 Q230 230 245 245 Q225 268 195 262 Q165 258 145 250 Z" fill="#991B1B" opacity="0.9" />
                      {/* Appendix — highlighted when we reach step 8+ */}
                      <g data-testid="appendix" style={{ filter: step.index >= 8 ? 'drop-shadow(0 0 6px #FBBF24)' : 'none' }}>
                        <path d="M180 220 L215 235 L228 275 L218 305 L192 302 L188 275 Z" fill="#DC2626" stroke="#450A0A" strokeWidth="1" />
                        <ellipse cx="205" cy="270" rx="8" ry="14" fill="#7F1D1D" opacity="0.7" />
                      </g>
                      {/* Mesoappendix with appendicular artery */}
                      <path d="M215 235 L260 220 L290 180" stroke="#B91C1C" strokeWidth="2" fill="none" />
                      <path d="M215 240 Q255 235 285 200" stroke="#DC2626" strokeWidth="3" fill="none" opacity="0.9" />
                      {/* Retracted skin edges */}
                      {step.index >= 6 && (
                        <>
                          <path d="M155 185 Q150 165 145 145" stroke="#F5D0A9" strokeWidth="8" fill="none" opacity="0.4" />
                          <path d="M245 210 Q250 190 255 170" stroke="#F5D0A9" strokeWidth="8" fill="none" opacity="0.4" />
                        </>
                      )}
                      {alert && [...Array(8)].map((_, i) => (
                        <circle key={i} cx={200 + i * 3} cy={250 + i * 6} r={2 + i * 0.3} fill="#DC2626" className="blood-drip" style={{ animationDelay: `${i * 0.12}s` }} />
                      ))}
                    </svg>
                    {/* Overlaid instrument marker */}
                    {selectedInstrument && (
                      <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] px-2 py-1 rounded font-mono uppercase tracking-widest border border-slate-700">
                        Holding: {INSTRUMENTS.find(i => i.id === selectedInstrument)?.label || selectedInstrument}
                      </div>
                    )}
                  </div>
                </div>
                {/* OR labels around the field */}
                <div className="absolute top-2 left-2 text-[9px] font-mono uppercase tracking-widest text-white/60">Sterile Field</div>
                <div className="absolute top-2 right-2 text-[9px] font-mono uppercase tracking-widest text-white/60">Zone A · RLQ</div>
                <div className="absolute bottom-2 left-2 text-[9px] font-mono uppercase tracking-widest text-white/60">Case A-22</div>
                <div className="absolute bottom-2 right-2 text-[9px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 vitals-flicker" /> Recording
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3" data-testid="action-buttons">
              <button onClick={() => doAction('correct')} data-testid="action-perform"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded font-medium text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Perform Step
              </button>
              {step.critical && (
                <button onClick={() => doAction('wrong-vessel')} data-testid="action-wrong"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded font-medium text-sm">
                  Simulate Mistake
                </button>
              )}
              {alert && (
                <button onClick={() => doAction('control-bleeding')} data-testid="action-control"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded font-medium text-sm animate-pulse">
                  Control Bleeding
                </button>
              )}
            </div>
          </div>

          {/* Step guidance strip */}
          <div className="border-t border-slate-800 p-4 bg-slate-900" data-testid="step-guidance">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 bg-blue-600 rounded-full flex items-center justify-center font-mono font-bold">{step.index}</div>
              <div className="flex-1">
                <div className="font-display text-lg font-semibold">{step.title}</div>
                <div className="text-sm text-slate-400 mt-1">{step.instruction}</div>
              </div>
              {feedback && (
                <div className={`text-xs px-3 py-2 rounded font-medium ${feedback.severity === 'ok' ? 'bg-emerald-500/20 text-emerald-300' : feedback.severity === 'critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {feedback.severity === 'critical' && <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />}
                  {feedback.message}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right: Vitals + score */}
        <aside className="border-l border-slate-800 p-4 overflow-y-auto space-y-4" data-testid="right-rail">
          <VitalsMonitor alert={alert} bloodLossMl={bloodLoss} />
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4" data-testid="score-panel">
            <div className="label-caps text-slate-500 mb-3">Performance</div>
            <div className="grid grid-cols-2 gap-3">
              <div><div className="text-[10px] uppercase text-slate-500">Wrong actions</div><div className="font-mono text-2xl font-bold">{wrongCount}</div></div>
              <div><div className="text-[10px] uppercase text-slate-500">Blood loss</div><div className="font-mono text-2xl font-bold">{bloodLoss} mL</div></div>
              <div><div className="text-[10px] uppercase text-slate-500">Completed</div><div className="font-mono text-2xl font-bold">{completed.length}/{steps.length}</div></div>
              <div><div className="text-[10px] uppercase text-slate-500">Progress</div><div className="font-mono text-2xl font-bold">{progress}%</div></div>
            </div>
          </div>
          {alerts.length > 0 && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-xs" data-testid="alert-panel">
              <div className="label-caps text-rose-300 mb-2">Alerts</div>
              {alerts.slice(-3).map((a, i) => <div key={i} className="text-rose-300">• {a.msg}</div>)}
            </div>
          )}
        </aside>
      </div>

      {showComplete && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6" data-testid="complete-modal">
          <div className="bg-white text-slate-900 rounded-lg p-8 max-w-md w-full">
            <div className="label-caps mb-2">Procedure complete</div>
            <h2 className="font-display text-3xl mb-4">Case A-22 closed.</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><div className="text-xs uppercase text-slate-500">Steps</div><div className="font-mono text-2xl font-bold">{completed.length}/{steps.length}</div></div>
              <div><div className="text-xs uppercase text-slate-500">Wrong actions</div><div className="font-mono text-2xl font-bold">{wrongCount}</div></div>
              <div><div className="text-xs uppercase text-slate-500">Blood loss</div><div className="font-mono text-2xl font-bold">{bloodLoss} mL</div></div>
              <div><div className="text-xs uppercase text-slate-500">Grade</div><div className="font-mono text-2xl font-bold text-emerald-600">A</div></div>
            </div>
            <button onClick={finish} data-testid="finish-btn"
              className="w-full bg-slate-900 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Save & view dashboard
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
