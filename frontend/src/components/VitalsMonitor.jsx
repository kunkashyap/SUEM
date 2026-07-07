import React, { useEffect, useRef, useState } from 'react';

// OR-style vitals monitor - dark theme, monospace values, ECG waveform
export default function VitalsMonitor({ hr = 76, bp = '120/78', spo2 = 98, resp = 16, temp = 36.8, bloodLossMl = 0, urineMl = 15, alert = false }) {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick((v) => v + 1), 900); return () => clearInterval(t); }, []);
  const jitter = (base, amp) => base + Math.round((Math.sin(tick / 2) + Math.random() - 0.5) * amp);
  const hrLive = Math.max(30, hr + (alert ? 40 : 0) + (tick % 2 ? 1 : -1));
  const spo2Live = Math.max(60, spo2 - (alert ? 5 : 0));

  // Build ECG path
  const ecgPath = React.useMemo(() => {
    const beats = 8; const w = 600; const bw = w / beats; let d = 'M0 40';
    for (let i = 0; i < beats; i++) {
      const x = i * bw;
      d += ` L${x + bw * 0.15} 40 L${x + bw * 0.25} 38 L${x + bw * 0.28} 42 L${x + bw * 0.32} 10 L${x + bw * 0.36} 70 L${x + bw * 0.4} 40 L${x + bw * 0.55} 40 L${x + bw * 0.6} 34 L${x + bw * 0.66} 40 L${bw * (i + 1)} 40`;
    }
    return d;
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-white" data-testid="vitals-monitor">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${alert ? 'bg-rose-500' : 'bg-emerald-400'} vitals-flicker`} />
          <span className="text-[10px] uppercase tracking-widest text-slate-400">OR Monitor · Live</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">CH-01 · PAT-A22</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <VitalCell label="HR" unit="bpm" value={hrLive} color={alert ? 'text-rose-400' : 'text-emerald-400'} testid="v-hr" />
        <VitalCell label="BP" unit="mmHg" value={alert ? '82/54' : bp} color={alert ? 'text-rose-400' : 'text-white'} testid="v-bp" />
        <VitalCell label="SpO₂" unit="%" value={spo2Live} color={spo2Live < 92 ? 'text-rose-400' : 'text-sky-300'} testid="v-spo2" />
        <VitalCell label="RESP" unit="/min" value={resp} color="text-white" testid="v-resp" />
        <VitalCell label="TEMP" unit="°C" value={temp.toFixed(1)} color="text-white" testid="v-temp" />
        <VitalCell label="EBL" unit="mL" value={bloodLossMl} color={bloodLossMl > 500 ? 'text-rose-400' : 'text-amber-300'} testid="v-ebl" />
      </div>
      <div className="mt-3 border-t border-slate-800 pt-2">
        <div className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">ECG · Lead II</div>
        <svg viewBox="0 0 600 80" className="w-full h-16">
          <path d={ecgPath} className="ecg-line" stroke={alert ? '#F43F5E' : '#22C55E'} strokeDasharray="600" />
        </svg>
      </div>
      {alert && (
        <div className="mt-2 flex items-center gap-2 text-xs font-mono text-rose-400 vitals-flicker" data-testid="vitals-alert">
          <span>⚠</span><span>HEMODYNAMIC INSTABILITY — CONTROL BLEEDING</span>
        </div>
      )}
    </div>
  );
}

function VitalCell({ label, unit, value, color, testid }) {
  return (
    <div className="bg-slate-950/60 border border-slate-800 rounded p-2" data-testid={testid}>
      <div className="flex items-baseline justify-between">
        <span className="text-[9px] uppercase tracking-widest text-slate-500">{label}</span>
        <span className="text-[9px] font-mono text-slate-500">{unit}</span>
      </div>
      <div className={`font-mono text-2xl font-bold tracking-wider ${color}`}>{value}</div>
    </div>
  );
}
