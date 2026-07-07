import React from 'react';
import Nav from '@/components/Nav';
import { useAuth } from '@/context/AuthContext';
import { Users, ClipboardList, TrendingUp, PlusCircle, Activity, Award, Eye, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const COHORT_STATS = [
  { procedure: 'Appendectomy', avg: 82, attempts: 214 },
  { procedure: 'CPR/BLS', avg: 89, attempts: 168 },
  { procedure: 'Suture', avg: 76, attempts: 302 },
  { procedure: 'IV Cannula', avg: 91, attempts: 245 },
  { procedure: 'Cranial N.', avg: 68, attempts: 92 },
  { procedure: 'Head CT', avg: 71, attempts: 84 },
];

const STUDENTS = [
  { name: 'Ananya S.', xp: 1420, avg: 88, streak: 12, weak: 'Hemostasis' },
  { name: 'Rohan V.', xp: 1180, avg: 82, streak: 7, weak: 'Suture tension' },
  { name: 'Nikhil R.', xp: 990, avg: 79, streak: 4, weak: 'Sterile field' },
  { name: 'Meera K.', xp: 850, avg: 74, streak: 2, weak: 'Instrument sequence' },
];

export default function FacultyDashboard() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />
      <div className="max-w-[1400px] mx-auto px-6 py-12" data-testid="faculty-dashboard">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="label-caps mb-2">Faculty console</div>
            <h1 className="font-display text-4xl">Cohort overview</h1>
            <p className="text-slate-500 mt-1">{user?.institution || 'Your institution'} · 3rd year MBBS · Batch 2026</p>
          </div>
          <button data-testid="create-assignment"
            className="bg-slate-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors inline-flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> New assignment
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {[
            [Users, 'Active students', '128', 'text-blue-600'],
            [ClipboardList, 'Assignments open', '6', 'text-amber-500'],
            [TrendingUp, 'Class avg accuracy', '82%', 'text-emerald-500'],
            [Activity, 'Sessions this week', '412', 'text-rose-500'],
          ].map(([Icon, l, v, c]) => (
            <div key={l} className="bg-white border border-slate-200 rounded-lg p-5">
              <Icon className={`w-5 h-5 mb-3 ${c}`} />
              <div className="font-mono text-3xl font-bold">{v}</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* Chart + Top performers */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Class performance by procedure</h2>
              <div className="text-xs text-slate-500 font-mono">Avg accuracy · this term</div>
            </div>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={COHORT_STATS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="procedure" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
                  <Tooltip contentStyle={{ border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 12 }} />
                  <Bar dataKey="avg" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h2 className="font-display text-xl font-semibold">Top performers</h2>
            </div>
            <div className="space-y-3">
              {STUDENTS.slice(0, 4).map((s, i) => (
                <div key={s.name} className="flex items-center gap-3 py-2 border-b last:border-b-0 border-slate-100">
                  <div className={`font-mono font-bold text-lg w-6 ${i === 0 ? 'text-amber-500' : 'text-slate-400'}`}>#{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{s.avg}% · {s.streak}d streak</div>
                  </div>
                  <div className="font-mono text-sm font-bold">{s.xp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Students table */}
        <div className="bg-white border border-slate-200 rounded-lg" data-testid="students-table">
          <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
            <h2 className="font-display text-xl font-semibold">Student roster</h2>
            <button className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> View all</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-slate-500 border-b border-slate-100">
                <th className="px-6 py-3 font-medium">Student</th>
                <th className="px-6 py-3 font-medium">XP</th>
                <th className="px-6 py-3 font-medium">Avg accuracy</th>
                <th className="px-6 py-3 font-medium">Streak</th>
                <th className="px-6 py-3 font-medium">Focus area</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS.map((s) => (
                <tr key={s.name} className="border-b last:border-b-0 border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{s.name}</td>
                  <td className="px-6 py-4 font-mono">{s.xp}</td>
                  <td className="px-6 py-4 font-mono">
                    <span className={`inline-flex items-center gap-2`}>
                      <span className={`w-2 h-2 rounded-full ${s.avg >= 85 ? 'bg-emerald-500' : s.avg >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                      {s.avg}%
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono">{s.streak}d</td>
                  <td className="px-6 py-4 text-slate-600">{s.weak}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-medium text-blue-600 hover:underline">Review →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming assignments */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="font-display text-xl font-semibold">Upcoming assignments</h2>
            </div>
            {[
              { title: 'Open Appendectomy — Exam Mode', due: 'Due Fri', count: '128 students' },
              { title: 'Head CT interpretation', due: 'Due Mon', count: '96 students' },
              { title: 'BLS + AED skill assessment', due: 'Due next Wed', count: '128 students' },
            ].map((a) => (
              <div key={a.title} className="flex items-center justify-between py-3 border-b last:border-b-0 border-slate-100">
                <div>
                  <div className="text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{a.count}</div>
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-600">{a.due}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white rounded-lg p-8 flex flex-col justify-center" data-testid="team-mode-cta">
            <div className="label-caps text-blue-400 mb-3">Live OR mode</div>
            <h2 className="font-display text-2xl font-semibold mb-3">Run a shared surgical room</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">Assign roles to students — surgeon, assistant, anesthetist, scrub nurse — and observe the whole team perform a procedure together.</p>
            <button className="bg-white text-slate-900 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors self-start">
              Start live session →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
