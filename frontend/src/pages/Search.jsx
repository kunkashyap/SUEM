import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Nav from '@/components/Nav';
import api from '@/lib/api';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [res, setRes] = useState([]);
  useEffect(() => { if (q) api.get('/search', { params: { q } }).then((r) => setRes(r.data)); }, [q]);
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-3xl mx-auto px-6 py-12" data-testid="search-page">
        <div className="label-caps mb-2">Search</div>
        <h1 className="font-display text-4xl mb-8">Results for “{q}”</h1>
        {res.length === 0 && <div className="text-slate-500">No results found.</div>}
        <div className="space-y-2">
          {res.map((r, i) => {
            const to = r.type === 'simulation' ? (r.id === 'sim-appendectomy' ? `/procedure/${r.id}` : `/simulations`) : r.type === 'case' ? '/cases' : '/explorer';
            return (
              <Link key={i} to={to} data-testid={`search-result-${i}`} className="block border border-slate-200 rounded-lg p-4 hover:border-slate-900">
                <div className="label-caps mb-1">{r.type}{r.layer ? ` · ${r.layer}` : ''}{r.category ? ` · ${r.category}` : ''}</div>
                <div className="font-medium">{r.title}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
