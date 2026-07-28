import React, { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import HumanModelViewer from '@/components/HumanModelViewer';
import api from '@/lib/api';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RotateCw, Eye, ScanLine, X } from 'lucide-react';

const DEFAULT = { skin: 0.6, muscle: 0.9, bones: 0.9, organs: 0.85, arteries: 0.9, veins: 0.7, nerves: 0.6, fat: 0 };

export default function FullBodyExplorer() {
  const [layers, setLayers] = useState([]);
  const [ops, setOps] = useState(DEFAULT);
  const [enabled, setEnabled] = useState({ skin: true, muscle: true, bones: true, organs: true, arteries: true, veins: true, nerves: true });
  const [imgMode, setImgMode] = useState('none');
  const [spin, setSpin] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => { api.get('/anatomy/layers').then((r) => setLayers(r.data)); }, []);

  const displayOps = Object.fromEntries(Object.entries(ops).map(([k, v]) => [k, enabled[k] === false ? 0 : v]));

  useEffect(() => {
    window.__MEDSIM_TUTOR_CTX__ = { screen: 'Full Body Explorer', visible_layers: Object.keys(displayOps).filter((k) => displayOps[k] > 0), image_mode: imgMode, selected_structure: selected?.name };
    return () => { window.__MEDSIM_TUTOR_CTX__ = null; };
    // eslint-disable-next-line
  }, [ops, enabled, imgMode, selected]);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[340px_1fr_320px] gap-0 border border-slate-200 m-6">
        {/* Left: Layer control */}
        <aside className="border-r border-slate-200 bg-slate-50" data-testid="layer-panel">
          <div className="p-5 border-b border-slate-200">
            <div className="label-caps mb-1">Layer control</div>
            <h2 className="font-display text-xl font-semibold">Anatomy stack</h2>
          </div>
          <div>
            {layers.map((l) => (
              <div key={l.id} className="px-5 py-4 border-b border-slate-100 flex items-center gap-3" data-testid={`layer-${l.id}`}>
                <Checkbox checked={enabled[l.id] !== false} onCheckedChange={(v) => setEnabled((s) => ({ ...s, [l.id]: !!v }))} data-testid={`layer-cb-${l.id}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-3 h-3 rounded-sm border border-slate-300" style={{ background: l.color }} />
                    <span className="text-sm font-medium">{l.name}</span>
                    <span className="ml-auto text-[10px] font-mono text-slate-400">{Math.round((ops[l.id] ?? 0) * 100)}%</span>
                  </div>
                  <Slider value={[Math.round((ops[l.id] ?? 0) * 100)]} max={100} step={1}
                    onValueChange={(v) => setOps((s) => ({ ...s, [l.id]: v[0] / 100 }))}
                    data-testid={`layer-slider-${l.id}`} />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center: 3D viewport */}
        <main className="relative bg-gradient-to-b from-slate-100 to-white min-h-[80vh]">
          <div className="absolute top-4 left-4 z-10 flex gap-2" data-testid="viewport-toolbar">
            <button onClick={() => setSpin((v) => !v)} data-testid="tool-rotate"
              className={`h-9 px-3 border text-xs font-medium rounded flex items-center gap-2 ${spin ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 hover:border-slate-900'}`}>
              <RotateCw className="w-3.5 h-3.5" /> {spin ? 'Rotating' : 'Rotate'}
            </button>
            {['none', 'xray', 'mri', 'ct'].map((m) => (
              <button key={m} onClick={() => setImgMode(m)} data-testid={`img-${m}`}
                className={`h-9 px-3 border text-xs font-medium rounded flex items-center gap-1.5 uppercase ${imgMode === m ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 hover:border-slate-900'}`}>
                <ScanLine className="w-3.5 h-3.5" /> {m === 'none' ? 'Normal' : m}
              </button>
            ))}
          </div>
          <div className="absolute top-4 right-4 z-10 bg-white border border-slate-200 text-[10px] font-mono px-2 py-1 tracking-widest uppercase text-slate-500">
            View · Adult Male
          </div>

          <div className={`h-full flex items-center justify-center py-8 ${imgMode !== 'none' ? 'bg-slate-950' : ''}`}
            style={imgMode === 'xray' ? { filter: 'invert(1) hue-rotate(180deg) contrast(1.4)' } : imgMode === 'mri' ? { filter: 'grayscale(1) contrast(1.3) brightness(0.9)' } : imgMode === 'ct' ? { filter: 'grayscale(1) brightness(1.2) contrast(1.5)' } : {}}>
            <HumanModelViewer spin={spin} className="h-[70vh] w-full" />
          </div>
        </main>

        {/* Right: Structure info */}
        <aside className="border-l border-slate-200 bg-white" data-testid="structure-panel">
          <div className="p-5 border-b border-slate-200">
            <div className="label-caps mb-1">Structure browser</div>
            <h2 className="font-display text-xl font-semibold">Anatomical structures</h2>
          </div>
          <div className="p-5 max-h-[70vh] overflow-y-auto">
            {layers.map((l) => (
              enabled[l.id] !== false && l.structures.length > 0 && (
                <div key={l.id} className="mb-5">
                  <div className="label-caps mb-2">{l.name}</div>
                  <div className="space-y-1">
                    {l.structures.map((st) => (
                      <button key={st.id} onClick={() => setSelected({ ...st, layer: l.name })} data-testid={`struct-${st.id}`}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 rounded border border-transparent hover:border-slate-200 flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        {st.name}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
          {selected && (
            <div className="absolute bottom-6 right-6 w-72 bg-slate-900 text-white p-4 rounded-lg shadow-xl" data-testid="struct-detail">
              <div className="flex items-center justify-between mb-2">
                <div className="label-caps text-slate-400">{selected.layer}</div>
                <button onClick={() => setSelected(null)} className="p-1 hover:bg-slate-800 rounded"><X className="w-3.5 h-3.5" /></button>
              </div>
              <div className="font-display text-lg font-semibold mb-2">{selected.name}</div>
              <p className="text-xs text-slate-400 leading-relaxed">Ask Dr. Ada for the function, blood supply, or clinical relevance of this structure.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
