import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUp, ChevronRight } from 'lucide-react';
import Nav from '@/components/Nav';
import SearchDocs from '@/components/docs/SearchDocs';
import { getSidebarList } from './docsRegistry';

export default function DocsLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const sidebarSections = getSidebarList();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  // Track scroll position for progress bar and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(prefersReducedMotion ? 0 : progress);
      }

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0B0F14] transition-colors duration-200">
      {/* MedSim global Nav header */}
      <Nav />

      {/* Top scroll progress indicator */}
      <div 
        className="fixed top-16 left-0 right-0 h-0.5 bg-blue-100 dark:bg-blue-950/20 z-40" 
        style={{ display: scrollProgress > 0 ? 'block' : 'none' }}
      >
        <div 
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main documentation container */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 flex relative">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-[280px] border-r border-slate-200 dark:border-slate-800 py-10 pr-6 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="mb-6">
            <SearchDocs />
          </div>
          <nav className="space-y-6">
            {sidebarSections.map((section) => (
              <div key={section.title}>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 px-3">
                  {section.title}
                </h5>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.slug}>
                      <NavLink
                        to={`/docs/${item.slug}`}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-blue-50/70 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900/50'
                          }`
                        }
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* MOBILE DRAWER SIDEBAR */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div 
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            {/* Sidebar drawer */}
            <aside className="relative w-80 max-w-[85vw] bg-white dark:bg-[#111827] h-full flex flex-col p-6 border-r border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">MedSim Docs</span>
                <button 
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-6">
                <SearchDocs />
              </div>
              <nav className="space-y-6 flex-1">
                {sidebarSections.map((section) => (
                  <div key={section.title}>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 px-3">
                      {section.title}
                    </h5>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.slug}>
                          <NavLink
                            to={`/docs/${item.slug}`}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive
                                  ? 'bg-blue-50/70 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
                              }`
                            }
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* CONTENT & TOC SECTION */}
        <main className="flex-1 min-w-0 py-8 lg:py-12 lg:pl-10">
          
          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <Menu className="w-5 h-5" />
              <span>Menu</span>
            </button>
            <span className="text-xs font-semibold text-slate-400">MedSim Docs</span>
          </div>

          <Outlet />
        </main>
      </div>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 backdrop-blur-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:scale-105 active:scale-95 shadow-lg transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
