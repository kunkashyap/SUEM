import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function AccordionItem({ title, children, isOpen, onClick }) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-4 text-left font-display font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] pb-4 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4">{children}</div>
      </div>
    </div>
  );
}

export function Accordion({ children, allowMultiple = false }) {
  const [openIndices, setOpenIndices] = useState([]);

  const handleToggle = (idx) => {
    if (allowMultiple) {
      if (openIndices.includes(idx)) {
        setOpenIndices(openIndices.filter((i) => i !== idx));
      } else {
        setOpenIndices([...openIndices, idx]);
      }
    } else {
      setOpenIndices(openIndices.includes(idx) ? [] : [idx]);
    }
  };

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-900 my-6">
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, {
          isOpen: openIndices.includes(idx),
          onClick: () => handleToggle(idx),
        });
      })}
    </div>
  );
}
