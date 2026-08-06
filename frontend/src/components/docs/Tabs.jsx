import React, { useState } from 'react';

export function Tab({ label, children }) {
  return <div className="py-4">{children}</div>;
}

export function Tabs({ children }) {
  const tabs = React.Children.toArray(children).filter(React.isValidElement);
  const [activeIndex, setActiveIndex] = useState(0);

  if (tabs.length === 0) return null;

  return (
    <div className="my-6 border border-slate-200 rounded-lg overflow-hidden bg-white dark:bg-slate-900 dark:border-slate-800">
      {/* Tab bar header */}
      <div className="flex border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/20 px-2">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`px-4 py-3 text-xs font-semibold tracking-wide border-b-2 transition-all ${
              activeIndex === idx
                ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div className="px-5">
        {tabs[activeIndex]}
      </div>
    </div>
  );
}
