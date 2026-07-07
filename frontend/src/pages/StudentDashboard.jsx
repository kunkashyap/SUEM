import React, { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import api from '@/lib/api';
import { Link } from 'react-router-dom';
import { Trophy, Target, Flame, BookOpen, TrendingUp, Award } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get('/dashboard/student').then((r) => setData(r.data)); }, []);
  if (!data) return <div className="min-h-screen bg-white"><Nav /><div className="p-12 text-slate-500">Loading…</div></div>;
  const { user, total_attempts, avg_accuracy, quiz_count, weak_areas, recent_attempts, recent_quizzes } = data;

  // Skills radar (mock derived from attempts)
  const skills = [
    { skill: 'Sterile Technique', value: Math.min(100, 60 + user.xp / 3) },
    { skill: 'Instrument Handling', value: Math.min(100, 55 + user.xp / 3) },
    { skill: 'Hemostasis', value: Math.max(30, 75 - (recent_attempts.reduce((s,a)=>s+a.wrong_actions,0)*3)) },
    { skill: 'Anatomy Recall', value: Math.min(100, 40 + quiz_count * 6) },
    { skill: 'Decision Speed', value: Math.min(100, 50 + user.xp / 4) },
    { skill: 'Suturing', value: Math.min(100, 45 + user.xp / 4) },
  ];

  // Progress line - synthesize from recent attempts
  const progressData = [...recent_attempts].reverse().slice(-10).map((a, i) => ({
    idx: i + 1,
    accuracy: a.accuracy,
    grade: a.grade,
  }));
  if (progressData.length === 0) progressData.push({ idx: 1, accuracy: 0 });

  const accuracyPct = [{ name: 'accuracy', value: avg_accuracy, fill: avg_accuracy >= 80 ? '#10B981' : avg_accuracy >= 60 ? '#F59E0B' : '#E11D48' }];

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />
      <div className="max-w-[1400px] mx-auto px-6 py-12" data-testid="student-dashboard">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="label-caps mb-2">Your dashboard</div>
            <h1 className="font-display text-4xl">Welcome back, {user.name.split(' ')[0]}.</h1>
            <p className="text-slate-500 mt-2">Level up your surgical skills. Every attempt is a step forward.</p>
          </div>
          <Link to="/simulations" data-testid="dash-cta" className="bg-slate-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">Start next procedure →</Link>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={Trophy} label="XP earned" value={user.xp} accent="text-amber-500" />
          <StatCard icon={Flame} label="Streak" value={`${user.streak} days`} accent="text-orange-500" />
          <StatCard icon={Target} label="Avg accuracy" value={`${avg_accuracy}%`} accent="text-blue-600" />
          <StatCard icon={BookOpen} label="Total attempts" value={total_attempts} accent="text-slate-900" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Radial accuracy */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="label-caps">Average accuracy</div>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <div className="h-56">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={accuracyPct} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" background={{ fill: '#F1F5F9' }} cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="-mt-40 h-40 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="font-display text-5xl font-bold text-slate-900">{avg_accuracy}%</div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">of OSATS max</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress line */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="label-caps">Accuracy progression</div>
              <div className="text-xs text-slate-500 font-mono">Last {progressData.length} attempts</div>
            </div>
            <div className="h-56">
              <ResponsiveContainer>
                <LineChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="idx" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
                  <Tooltip contentStyle={{ border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 12 }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: '#2563EB' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Skills radar + attempts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6" data-testid="skills-radar">
            <div className="label-caps mb-2">Skill radar</div>
            <div className="h-64">
              <ResponsiveContainer>
                <RadarChart data={skills}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#475569' }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#94A3B8' }} />
                  <Radar dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6" data-testid="recent-attempts">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Recent attempts</h2>
              <span className="text-xs text-slate-500 font-mono">{recent_attempts.length} shown</span>
            </div>
            <div className="divide-y divide-slate-100">
              {recent_attempts.length === 0 && (
                <div className="text-sm text-slate-500 py-12 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                  No attempts yet — <Link to="/simulations" className="text-blue-600 underline">start a simulation</Link>.
                </div>
              )}
              {recent_attempts.map((a) => (
                <div key={a.id} className="py-3 flex items-center gap-4">
                  <div className={`font-mono font-bold text-2xl w-10 text-center ${a.accuracy >= 90 ? 'text-emerald-600' : a.accuracy >= 70 ? 'text-amber-600' : 'text-rose-600'}`}>{a.grade}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{a.simulation_id.replace('sim-', '').replace(/-/g, ' ')}</div>
                    <div className="text-xs text-slate-500 font-mono">{a.accuracy}% · {a.blood_loss_ml}mL EBL · {a.wrong_actions} errors</div>
                  </div>
                  <div className="text-xs text-slate-400">{a.created_at.slice(0, 10)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weak areas & recent quizzes */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6" data-testid="weak-areas">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-rose-500" />
              <h2 className="font-display text-xl font-semibold">Focus areas</h2>
            </div>
            {weak_areas.length === 0 ? (
              <div className="text-sm text-slate-500 py-6">Complete a few simulations to identify weak areas.</div>
            ) : weak_areas.map(([w, n]) => (
              <div key={w} className="mb-3">
                <div className="flex justify-between text-sm mb-1"><span>{w}</span><span className="font-mono text-xs text-slate-500">{n}×</span></div>
                <div className="h-2 bg-slate-100 rounded"><div className="h-full bg-rose-500 rounded" style={{ width: `${Math.min(100, n * 25)}%` }} /></div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="label-caps mb-4">Recent quizzes</div>
            {recent_quizzes.length === 0 ? <div className="text-sm text-slate-500 py-4">No quiz attempts yet. <Link to="/quizzes" className="text-blue-600 underline">Take one →</Link></div> : recent_quizzes.slice(0, 6).map((q) => (
              <div key={q.id} className="flex justify-between text-sm py-2 border-b last:border-b-0 border-slate-100">
                <span className="truncate capitalize">{q.quiz_id.replace('quiz-', '').replace(/-/g, ' ')}</span>
                <span className={`font-mono font-bold ${q.score >= 80 ? 'text-emerald-600' : q.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>{q.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent = 'text-slate-900' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 hover-lift" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <Icon className={`w-5 h-5 mb-3 ${accent}`} />
      <div className="font-mono text-3xl font-bold text-slate-900">{value}</div>
      <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">{label}</div>
    </div>
  );
}
