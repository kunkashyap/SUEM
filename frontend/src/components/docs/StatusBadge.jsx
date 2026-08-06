import React from 'react';

const styles = {
  implemented: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-50 dark:text-emerald-800 dark:border-emerald-200',
  'in-progress': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-50 dark:text-amber-800 dark:border-amber-200',
  planned: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-50 dark:text-blue-800 dark:border-blue-200',
  'future-vision': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-50 dark:text-purple-800 dark:border-purple-200',
};

const labels = {
  implemented: 'Shipped',
  'in-progress': 'In Progress',
  planned: 'Planned',
  'future-vision': 'Future Vision',
};

export default function StatusBadge({ status }) {
  const normalized = status?.toLowerCase() || 'planned';
  const style = styles[normalized] || styles.planned;
  const label = labels[normalized] || normalized;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
      {label}
    </span>
  );
}
