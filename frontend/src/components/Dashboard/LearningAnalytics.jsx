import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3 } from 'lucide-react';
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { getProgressChartData } from './utils';

export default function LearningAnalytics({ avgAccuracy, recentAttempts, totalAttempts }) {
  const progressData = getProgressChartData(recentAttempts);
  const accuracyPct = [{
    name: 'accuracy',
    value: avgAccuracy,
    fill: avgAccuracy >= 80 ? '#10B981' : avgAccuracy >= 60 ? '#F59E0B' : '#EF4444',
  }];

  const hasData = totalAttempts > 0;

  return (
    <section className="mb-8" aria-labelledby="analytics-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="analytics-heading" className="dash-section-title flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" aria-hidden="true" />
            Learning Analytics
          </h2>
          <p className="dash-section-subtitle">Detailed performance trends over time</p>
        </div>
      </div>

      {!hasData ? (
        <div className="dash-glass p-10 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-[var(--text-tertiary)] opacity-30" aria-hidden="true" />
          <h3 className="font-display text-lg font-semibold mb-2">Analytics unlock after your first simulation</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Complete a procedure to start tracking accuracy trends, performance patterns, and skill development over time.
          </p>
          <Link to="/simulations" className="dash-btn-primary">
            Begin Training
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            className="dash-glass p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="label-caps">Average Accuracy</div>
              <TrendingUp className="w-4 h-4 text-[var(--text-tertiary)]" aria-hidden="true" />
            </div>
            <div className="h-56 relative">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={accuracyPct} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" background={{ fill: 'rgba(255,255,255,0.06)' }} cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="font-display text-4xl font-bold">{avgAccuracy}%</div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mt-1">OSATS average</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="dash-glass p-6 lg:col-span-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="label-caps">Accuracy Progression</div>
              <div className="text-xs text-[var(--text-tertiary)] font-mono">Last {progressData.length} attempts</div>
            </div>
            <div className="h-56">
              <ResponsiveContainer>
                <LineChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="idx" stroke="#6B7280" fontSize={11} />
                  <YAxis stroke="#6B7280" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#3B82F6"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#3B82F6' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
