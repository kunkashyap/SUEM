import React from 'react';
import StatusBadge from './StatusBadge';

export function TimelineItem({ week, title, status, description, deliverables = [] }) {
  return (
    <div className="relative pl-8 pb-8 border-l border-slate-200 last:border-transparent dark:border-slate-800">
      {/* Node Bullet */}
      <span className="absolute -left-1.5 top-1.5 flex h-3 h-3 w-3 items-center justify-center rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#0B0F14]" />

      <div className="flex flex-wrap items-center gap-3 mb-2">
        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{week}</span>
        <h4 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">{title}</h4>
        <StatusBadge status={status} />
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">{description}</p>

      {deliverables.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/80 rounded-md p-3">
          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Deliverables</h5>
          <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
            {deliverables.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="text-blue-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Timeline({ children }) {
  return <div className="mt-8 mb-6">{children}</div>;
}
