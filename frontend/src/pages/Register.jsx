import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'student', institution: '' });
  const [busy, setBusy] = useState(false);
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const u = await register(form);
      toast.success(`Welcome, ${u.name}!`);
      nav(u.role === 'faculty' ? '/faculty' : '/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Registration failed');
    } finally { setBusy(false); }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-slate-900 text-white p-16 relative">
        <Link to="/" className="font-display text-2xl font-bold">MedSim</Link>
        <div className="absolute bottom-16 left-16 right-16">
          <h2 className="font-display text-4xl leading-tight mb-4">Practice without limits.</h2>
          <p className="text-slate-400">Free access to core simulations for students. Faculty tools unlocked with institutional email.</p>
        </div>
      </div>
      <div className="p-8 lg:p-16 flex items-center justify-center">
        <form onSubmit={submit} className="w-full max-w-sm" data-testid="register-form">
          <h1 className="font-display text-3xl mb-2">Create account</h1>
          <p className="text-sm text-slate-500 mb-8">Start with 500+ interactive procedures.</p>
          <label className="label-caps block mb-2">Full name</label>
          <input required value={form.name} onChange={upd('name')} data-testid="reg-name"
            className="w-full border border-slate-200 focus:border-slate-900 outline-none rounded-md px-3 py-2.5 mb-4" />
          <label className="label-caps block mb-2">Email</label>
          <input required type="email" value={form.email} onChange={upd('email')} data-testid="reg-email"
            className="w-full border border-slate-200 focus:border-slate-900 outline-none rounded-md px-3 py-2.5 mb-4" />
          <label className="label-caps block mb-2">Password</label>
          <input required type="password" minLength={6} value={form.password} onChange={upd('password')} data-testid="reg-password"
            className="w-full border border-slate-200 focus:border-slate-900 outline-none rounded-md px-3 py-2.5 mb-4" />
          <label className="label-caps block mb-2">I am a…</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {['student', 'faculty'].map((r) => (
              <button type="button" key={r} onClick={() => setForm({ ...form, role: r })} data-testid={`reg-role-${r}`}
                className={`py-2.5 border rounded-md text-sm font-medium capitalize transition-colors ${form.role === r ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 hover:border-slate-900'}`}>
                {r}
              </button>
            ))}
          </div>
          <label className="label-caps block mb-2">Institution (optional)</label>
          <input value={form.institution} onChange={upd('institution')} data-testid="reg-institution"
            className="w-full border border-slate-200 focus:border-slate-900 outline-none rounded-md px-3 py-2.5 mb-6" />
          <button type="submit" disabled={busy} data-testid="reg-submit"
            className="w-full bg-slate-900 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition-colors disabled:opacity-50">
            {busy ? 'Creating account…' : 'Create account'}
          </button>
          <p className="text-sm text-slate-500 mt-6">Already registered? <Link to="/login" className="underline underline-offset-4">Log in</Link></p>
        </form>
      </div>
    </div>
  );
}
