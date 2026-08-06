import React from 'react';
import StatusBadge from './StatusBadge';

export function Card({ children, title, description, href, icon: Icon, className = '' }) {
  const CardBody = (
    <div className={`p-6 border border-slate-200 rounded-lg hover-lift bg-white dark:bg-slate-900 dark:border-slate-800 ${className}`}>
      {Icon && (
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
          <Icon className="w-5 h-5" />
        </div>
      )}
      {title && <h4 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{title}</h4>}
      {description && <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{description}</p>}
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {CardBody}
      </a>
    );
  }

  return CardBody;
}

export function FeatureCard({ title, status, description, children }) {
  return (
    <Card className="flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start gap-4 mb-3">
          <h4 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h4>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{description}</p>
      </div>
      <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{children}</div>
    </Card>
  );
}

export function ApiCard({ method, path, title, description, params = [], children }) {
  const methodColors = {
    GET: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50',
    POST: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50',
    PUT: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50',
    DELETE: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50',
  };

  const methodColor = methodColors[method.toUpperCase()] || 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <div className="my-6 border border-slate-200 rounded-lg overflow-hidden bg-white dark:bg-slate-900 dark:border-slate-800">
      {/* Header bar */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-200 dark:bg-slate-950/40 dark:border-slate-800">
        <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono border ${methodColor}`}>
          {method.toUpperCase()}
        </span>
        <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">{path}</span>
        {title && <span className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-auto">{title}</span>}
      </div>

      <div className="p-5">
        {description && <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{description}</p>}

        {params.length > 0 && (
          <div className="mb-4">
            <h5 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-2">Request Parameters</h5>
            <div className="border border-slate-200 rounded-md divide-y divide-slate-200 dark:border-slate-800 dark:divide-slate-800 overflow-hidden">
              {params.map((p) => (
                <div key={p.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-2 bg-slate-50/50 dark:bg-slate-950/20">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-950 dark:text-slate-100">{p.name}</span>
                    <span className="text-slate-400 text-xs ml-1.5 font-mono">({p.type})</span>
                    {p.required && <span className="text-rose-500 text-xs ml-1.5 font-semibold">* required</span>}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 max-w-lg">{p.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export function ArchitectureCard({ title, subtitle, items = [], className = '' }) {
  return (
    <div className={`p-5 border border-slate-200 rounded-lg bg-slate-50 dark:bg-slate-900/60 dark:border-slate-800 hover-lift ${className}`}>
      <h4 className="font-display text-md font-bold text-slate-950 dark:text-slate-100">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{subtitle}</p>
      {items.length > 0 && (
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          {items.map((it, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
