import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Search, Menu } from 'lucide-react';

const links = [
  { to: '/explore', label: 'Explore' },
  { to: '/simulations', label: 'Simulations' },
  { to: '/explorer', label: '3D Explorer' },
  { to: '/emergency', label: 'Emergency' },
  { to: '/team', label: 'Team OR' },
  { to: '/cases', label: 'Cases' },
  { to: '/quizzes', label: 'Quizzes' },
];

export default function Nav() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [q, setQ] = React.useState('');
  const onSearch = (e) => {
    e.preventDefault();
    if (q.trim()) nav(`/search?q=${encodeURIComponent(q)}`);
  };
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200" data-testid="site-nav">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2" data-testid="brand-link">
          <div className="w-8 h-8 bg-slate-900 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 3v18M3 12h18" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-display text-lg font-bold tracking-tight">MedSim</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-slate-500">Surgical Training</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} data-testid={`nav-${l.to.slice(1)}`}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-md ml-auto items-center border border-slate-200 rounded-md px-3 h-9 bg-slate-50 focus-within:bg-white focus-within:border-slate-900">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input value={q} onChange={(e) => setQ(e.target.value)} data-testid="global-search-input"
            placeholder="Search anatomy, procedures, cases…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400" />
        </form>
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          {user ? (
            <>
              <Link to={user.role === 'faculty' ? '/faculty' : '/dashboard'} data-testid="nav-dashboard"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2">
                {user.name.split(' ')[0]}
              </Link>
              <button onClick={() => { logout(); nav('/'); }} data-testid="logout-btn"
                className="text-sm px-3 py-2 border border-slate-200 hover:border-slate-900 rounded-md">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" data-testid="login-link" className="text-sm font-medium px-3 py-2">Log in</Link>
              <Link to="/register" data-testid="register-link"
                className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Start Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
