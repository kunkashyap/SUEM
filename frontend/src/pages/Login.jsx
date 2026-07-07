import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}`);
      nav(u.role === 'faculty' ? '/faculty' : '/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Login failed');
    } finally { setBusy(false); }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-slate-900 text-white p-16 relative">
        <Link to="/" className="font-display text-2xl font-bold" data-testid="brand-link-login">MedSim</Link>
        <div className="absolute bottom-16 left-16 right-16">
          <h2 className="font-display text-4xl leading-tight mb-4">Welcome back to the OR.</h2>
          <p className="text-slate-400">Your progress, badges, and every recorded attempt are waiting.</p>
        </div>
      </div>
      <div className="p-8 lg:p-16 flex items-center justify-center">
        <form onSubmit={submit} className="w-full max-w-sm" data-testid="login-form">
          <h1 className="font-display text-3xl mb-2">Log in</h1>
          <p className="text-sm text-slate-500 mb-8">Enter your credentials to continue.</p>
          <label className="label-caps block mb-2">Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email"
            className="w-full border border-slate-200 focus:border-slate-900 outline-none rounded-md px-3 py-2.5 mb-4" />
          <label className="label-caps block mb-2">Password</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="login-password"
            className="w-full border border-slate-200 focus:border-slate-900 outline-none rounded-md px-3 py-2.5 mb-6" />
          <button disabled={busy} type="submit" data-testid="login-submit"
            className="w-full bg-slate-900 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition-colors disabled:opacity-50">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
          <p className="text-sm text-slate-500 mt-6">New here? <Link to="/register" className="underline underline-offset-4" data-testid="to-register">Create an account</Link></p>
        </form>
      </div>
    </div>
  );
}
