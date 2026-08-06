import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertOctagon, FileText } from 'lucide-react';

const configs = {
  info: {
    icon: Info,
    bg: 'bg-blue-50/70 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/50',
    text: 'text-blue-900 dark:text-blue-200',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50',
    text: 'text-emerald-900 dark:text-emerald-200',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50/70 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50',
    text: 'text-amber-900 dark:text-amber-200',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  danger: {
    icon: AlertOctagon,
    bg: 'bg-rose-50/70 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50',
    text: 'text-rose-900 dark:text-rose-200',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
  note: {
    icon: FileText,
    bg: 'bg-slate-50/70 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800',
    text: 'text-slate-800 dark:text-slate-200',
    iconColor: 'text-slate-500 dark:text-slate-400',
  },
};

export default function Callout({ type = 'note', children, title }) {
  const config = configs[type] || configs.note;
  const Icon = config.icon;

  return (
    <div className={`my-6 flex gap-4 p-4 border rounded-lg hover-lift ${config.bg} ${config.text}`}>
      <div className="flex-shrink-0">
        <Icon className={`w-5 h-5 ${config.iconColor}`} />
      </div>
      <div className="flex-1 text-sm leading-relaxed">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="prose-sm dark:prose-invert">{children}</div>
      </div>
    </div>
  );
}
