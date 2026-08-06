import React from 'react';
import Callout from '@/components/docs/Callout';
import { ArchitectureCard } from '@/components/docs/Card';

export default function Architecture() {
  return (
    <div className="space-y-6">
      <h2 id="system-topology">System Topology</h2>
      <p>
        MedSim is architected around a distributed, decoupled structure, separating concerns between client-side interactive render loops, background analytical pipelines, and server-side state persistence.
      </p>

      {/* SVG Diagram */}
      <div className="my-6 p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-950/20 flex justify-center">
        <svg viewBox="0 0 800 240" className="w-full max-w-2xl text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Blocks */}
          <rect x="20" y="40" width="180" height="160" rx="8" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" />
          <rect x="310" y="40" width="180" height="160" rx="8" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" />
          <rect x="600" y="40" width="180" height="160" rx="8" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" />
          
          {/* Labels */}
          <text x="110" y="70" textAnchor="middle" className="font-display font-bold text-xs fill-slate-900 dark:fill-slate-100">FRONTEND (SPA)</text>
          <text x="110" y="100" textAnchor="middle" className="text-[10px] fill-slate-500">React & Tailwind CSS</text>
          <text x="110" y="125" textAnchor="middle" className="text-[10px] fill-slate-500">React Three Fiber</text>
          <text x="110" y="150" textAnchor="middle" className="text-[10px] fill-slate-500">Lucide Icons</text>
          
          <text x="400" y="70" textAnchor="middle" className="font-display font-bold text-xs fill-slate-900 dark:fill-slate-100">BACKEND API</text>
          <text x="400" y="100" textAnchor="middle" className="text-[10px] fill-slate-500">Python Web Server</text>
          <text x="400" y="125" textAnchor="middle" className="text-[10px] fill-slate-500">JWT Token Auth</text>
          <text x="400" y="150" textAnchor="middle" className="text-[10px] fill-slate-500">JSON Mock DB / Python lists</text>

          <text x="690" y="70" textAnchor="middle" className="font-display font-bold text-xs fill-slate-900 dark:fill-slate-100">INTEGRATIONS</text>
          <text x="690" y="100" textAnchor="middle" className="text-[10px] fill-slate-500">AI Tutor (GPT Models)</text>
          <text x="690" y="125" textAnchor="middle" className="text-[10px] fill-slate-500">DICOM Engine (TBD)</text>
          <text x="690" y="150" textAnchor="middle" className="text-[10px] fill-slate-500">Unity WebGL (Planned)</text>

          {/* Connector Arrows */}
          <path d="M200 100 L310 100" strokeWidth="2" className="stroke-blue-500" markerEnd="url(#arrow)" />
          <path d="M310 140 L200 140" strokeWidth="2" className="stroke-slate-400" strokeDasharray="4" />
          <path d="M490 120 L600 120" strokeWidth="2" className="stroke-emerald-500" />
          
          {/* Arrow Marker Definition */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500" />
            </marker>
          </defs>
        </svg>
      </div>

      <h2 id="frontend-layer">Frontend Layer</h2>
      <p>
        The client-side is a Single Page Application (SPA) powered by React 19 and React Router DOM v7. Key design traits include:
      </p>
      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <ArchitectureCard
          title="Component Architecture"
          subtitle="Modular Widgets"
          items={['Tailwind CSS styling utilizing index.css configuration', 'Reusable Shadcn/UI primitives inside src/components/ui', 'Lucide React icon pack integrations']}
        />
        <ArchitectureCard
          title="3D Render Core"
          subtitle="WebGL Graphics Pipeline"
          items={['Three.js base render bindings', 'React Three Fiber (R3F) Canvas management', 'Drei utility helpers for loaders and controls', 'Interactive Scalpel and Incision Collision managers']}
        />
      </div>

      <h2 id="backend-layer">Backend Layer</h2>
      <p>
        The server module is a Python service (`server.py`) handling JWT authenticated routing requests:
      </p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Security:</strong> Route request interceptors extract JWT headers, validating authorization rules on dashboard views.</li>
        <li><strong>Mock Database:</strong> Persistent data uses memory-backed python representations (`data.py`) listing clinical cases, active simulations, student records, and leaderboards.</li>
      </ul>

      <h2 id="ai-pipeline">AI Tutor Pipeline</h2>
      <p>
        MedSim features a client-integrated AI Tutor panel (powered by large language models):
      </p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Context Extraction:</strong> The tutor parses active simulation states (anatomical coordinates, chosen surgical tools, timer progress, error records).</li>
        <li><strong>Advisory Model:</strong> Provides dynamic suggestions regarding anatomical navigation, physiological stability, and diagnostic reasoning.</li>
      </ul>

      <h2 id="3d-reconstruction">3D Reconstruction & DICOM Processing</h2>
      <Callout type="note" title="Medical Imaging Concepts">
        <p className="mb-2">
          <strong>Hounsfield Units (HU):</strong> A quantitative scale for describing radiodensity in CT scans. Distilled water is defined as 0 HU, air as -1000 HU, and dense bone ranges from +400 HU to +3000 HU. MedSim's planned pipeline filters HU ranges to extract specific tissue layers.
        </p>
        <p>
          <strong>Marching Cubes:</strong> An algorithm for extracting a polygonal mesh of an isosurface from a three-dimensional scalar field (often CT/MRI slices). It processes volume voxel data to output smooth 3D render objects.
        </p>
      </Callout>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">DICOM Engine</span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1 py-0.5 rounded border border-amber-200 ml-auto">In Progress</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Parsing CT/MRI slices, extracting Hounsfield threshold levels client-side, and compiling standard medical graphics inputs.
          </p>
        </div>
        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Unity WebGL</span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded border border-blue-200 ml-auto">Planned</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Integrating advanced high-fidelity Unity game engine builds via embedded WebGL Canvas overlays for complex tactile surgical scenarios.
          </p>
        </div>
      </div>
    </div>
  );
}
