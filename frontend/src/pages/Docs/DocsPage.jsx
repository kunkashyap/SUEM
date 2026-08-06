import React, { Suspense, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, AlertCircle } from 'lucide-react';
import { docsRegistry, getFlatDocs } from './docsRegistry';
import StatusBadge from '@/components/docs/StatusBadge';

export default function DocsPage() {
  const { slug } = useParams();
  const [activeId, setActiveId] = useState('');
  const [toc, setToc] = useState([]);

  const doc = docsRegistry[slug];
  const PageComponent = doc?.component;

  // Next and Prev Page computation
  const flatDocs = getFlatDocs();
  const currentIndex = flatDocs.findIndex((d) => d.slug === slug);
  const prevDoc = currentIndex > 0 ? flatDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null;

  // Auto-generate TOC and Inject copyable headers
  useEffect(() => {
    if (!doc) return;
    // Generate headings for TOC
    const queryHeadings = document.querySelectorAll('article h2, article h3');
    const items = [];

    queryHeadings.forEach((h) => {
      // Ensure each heading has an ID
      if (!h.id) {
        h.id = h.textContent
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
      }

      items.push({
        id: h.id,
        text: h.childNodes[0]?.textContent || h.textContent, // Skip anchor element text if already injected
        level: h.tagName === 'H2' ? 2 : 3,
      });

      // Inject Link Copy Button on Hover (skip if already exists)
      if (h.querySelector('.heading-anchor')) return;

      h.classList.add('group', 'relative', 'flex', 'items-center', 'scroll-mt-20');

      const anchor = document.createElement('a');
      anchor.href = `#${h.id}`;
      anchor.className =
        'heading-anchor opacity-0 group-hover:opacity-100 ml-2 text-slate-400 hover:text-blue-600 transition-opacity focus:opacity-100 outline-none cursor-pointer';
      anchor.innerHTML = `
        <svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      `;

      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${h.id}`;
        navigator.clipboard.writeText(url);
        h.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${h.id}`);
      });

      h.appendChild(anchor);
    });

    setToc(items);

    // ScrollSpy observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    queryHeadings.forEach((h) => observer.observe(h));

    // Scroll to initial hash if present
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    return () => {
      queryHeadings.forEach((h) => observer.unobserve(h));
    };
  }, [slug, doc]);

  // Scoped 404 handler: if slug is not matched, render a 404 UI within the Docs shell
  if (!doc) {
    return (
      <div className="max-w-2xl py-12 px-4 text-center">
        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
          Page Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The documentation page "/docs/{slug}" does not exist or has been relocated.
        </p>
        <Link
          to="/docs/introduction"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-900 hover:bg-blue-600 transition-colors"
        >
          Back to Introduction
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start gap-8">
      {/* Article Content Area */}
      <article className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4 select-none">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/docs" className="hover:text-slate-900">Docs</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-400">{doc.section}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-600 font-bold">{doc.title}</span>
        </nav>

        {/* Page title and frontmatter specs */}
        <header className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
              {doc.title}
            </h1>
            <StatusBadge status={doc.status} />
          </div>
          <p className="text-md text-slate-600 dark:text-slate-400 mb-4 leading-relaxed font-medium">
            {doc.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 select-none">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{doc.readingTime}</span>
            </div>
            {doc.order && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Section {doc.order}</span>
              </div>
            )}
          </div>
        </header>

        {/* Core Markdown component parser */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500 font-medium">Loading Page Content…</div>}>
            <PageComponent />
          </Suspense>
        </div>

        {/* Prev / Next Pagination */}
        <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800 mt-12 pt-6 select-none">
          {prevDoc ? (
            <Link
              to={`/docs/${prevDoc.slug}`}
              className="group text-left border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover-lift hover:border-slate-900 dark:hover:border-slate-700 max-w-[45%]"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-500">
                Previous
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1 truncate">
                {prevDoc.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextDoc ? (
            <Link
              to={`/docs/${nextDoc.slug}`}
              className="group text-right border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover-lift hover:border-slate-900 dark:hover:border-slate-700 max-w-[45%]"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-500">
                Next
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1 truncate">
                {nextDoc.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

      {/* RIGHT SIDE TABLE OF CONTENTS (Sticky, Desktop-only) */}
      {toc.length > 0 && (
        <aside className="hidden xl:block w-64 py-12 shrink-0 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto pl-6 border-l border-slate-100 dark:border-slate-900">
          <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4 select-none">
            On this page
          </h5>
          <nav className="space-y-2">
            {toc.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', `#${heading.id}`);
                }}
                className={`block text-xs leading-relaxed transition-colors ${
                  heading.level === 3 ? 'pl-4' : ''
                } ${
                  activeId === heading.id
                    ? 'text-blue-600 dark:text-blue-400 font-bold border-l border-blue-500 pl-2 -ml-2'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}
