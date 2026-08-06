import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, X, FileText } from 'lucide-react';
import { getFlatDocs } from '@/pages/Docs/docsRegistry';

// Quick index list of pages and terms for full coverage client-side search
const searchIndex = [
  { slug: 'introduction', title: 'Introduction', section: 'Getting Started', tags: 'overview vision objectives target audience problem statement surgical training' },
  { slug: 'getting-started', title: 'Getting Started', section: 'Getting Started', tags: 'installation system requirements running locally project structure yarn npm configuration setup' },
  { slug: 'architecture', title: 'System Architecture', section: 'Core Concepts', tags: 'frontend backend ai pipeline database unity dicom marching cubes hounsfield units volume rendering simulation' },
  { slug: 'database', title: 'Database Schema', section: 'Core Concepts', tags: 'users schemas entities roles sessions records logical model clinical history' },
  { slug: 'api', title: 'API Reference', section: 'References', tags: 'endpoints rest methods authentication post request response errors status codes' },
  { slug: 'troubleshooting', title: 'Troubleshooting', section: 'References', tags: 'errors installation fail local setup react node yarn lock backend debug connection reset' },
  { slug: 'roadmap', title: 'Roadmap & Timeline', section: 'Community & Info', tags: 'milestones weeks timeline deliverables future release schedule beta' },
  { slug: 'faq', title: 'FAQ', section: 'Community & Info', tags: 'questions open source deployment local Unity browser support offline license' },
  { slug: 'license', title: 'License', section: 'Community & Info', tags: 'mit apache licensing legal distribution permissions' },
  { slug: 'contact', title: 'Contact', section: 'Community & Info', tags: 'support support email developers channel contact team academic collaboration' },
];

export default function SearchDocs() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const modalRef = useRef(null);
  const nav = useNavigate();

  // Keyboard shortcut Listener: Ctrl+K or Cmd+K or Slash to open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === '/' && document.activeElement === document.body) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search execution
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const scored = searchIndex.map((doc) => {
      let score = 0;
      const titleLower = doc.title.toLowerCase();
      const sectionLower = doc.section.toLowerCase();
      const tagsLower = doc.tags.toLowerCase();

      terms.forEach((term) => {
        if (titleLower.includes(term)) score += 10;
        if (sectionLower.includes(term)) score += 3;
        if (tagsLower.includes(term)) score += 2;
      });

      return { ...doc, score };
    });

    const filtered = scored
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);

    setResults(filtered);
  }, [query]);

  // Click outside modal closer
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (slug) => {
    setIsOpen(false);
    setQuery('');
    nav(`/docs/${slug}`);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-500 hover:text-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400">Search documentation...</span>
        </div>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-slate-200 dark:border-slate-800 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Modal Dialog Backdrop */}
      {isOpen && (
        <div
          onClick={handleClickOutside}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-slate-950/40 backdrop-blur-sm transition-opacity"
        >
          {/* Modal Content container */}
          <div
            ref={modalRef}
            className="w-full max-w-xl mx-4 bg-white border border-slate-200 dark:bg-[#111827] dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[450px]"
          >
            {/* Search Input block */}
            <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, concepts, APIs..."
                className="flex-1 bg-transparent text-sm text-slate-950 dark:text-slate-100 outline-none placeholder:text-slate-400"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results listing */}
            <div className="flex-1 overflow-y-auto p-2">
              {results.length > 0 ? (
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                    Search Results ({results.length})
                  </div>
                  {results.map((res) => (
                    <button
                      key={res.slug}
                      onClick={() => handleSelect(res.slug)}
                      className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-950 dark:text-slate-100">
                            {res.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {res.section}
                          </div>
                        </div>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                        <CornerDownLeft className="w-4 h-4" />
                      </span>
                    </button>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="text-center py-12 text-sm text-slate-500">
                  No matching results for "<span className="font-semibold">{query}</span>"
                </div>
              ) : (
                <div className="text-center py-12 text-sm text-slate-500">
                  Type a query to search the documentation
                </div>
              )}
            </div>

            {/* Keyboard hint footer */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/20 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between font-mono">
              <span className="flex items-center gap-1">
                <kbd className="px-1 bg-white border rounded">Esc</kbd> to close
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 bg-white border rounded">↵</kbd> to select
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
