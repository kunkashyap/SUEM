import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play, RotateCcw, Scan, ClipboardCheck, Siren, Bot, Trophy, BookOpen,
} from 'lucide-react';

const actions = [
  { to: '/simulations', label: 'Start Simulation', icon: Play, color: 'bg-blue-500/15 text-blue-400' },
  { to: '/simulations', label: 'Resume Learning', icon: RotateCcw, color: 'bg-indigo-500/15 text-indigo-400' },
  { to: '/explorer', label: 'Anatomy Explorer', icon: Scan, color: 'bg-cyan-500/15 text-cyan-400' },
  { to: '/quizzes', label: 'Practice Quizzes', icon: ClipboardCheck, color: 'bg-emerald-500/15 text-emerald-400' },
  { to: '/emergency', label: 'Emergency Scenarios', icon: Siren, color: 'bg-rose-500/15 text-rose-400' },
  { to: '/cases', label: 'Clinical Cases', icon: BookOpen, color: 'bg-violet-500/15 text-violet-400' },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy, color: 'bg-amber-500/15 text-amber-400' },
];

export default function QuickActions() {
  return (
    <section className="mb-8" aria-labelledby="quick-actions-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="quick-actions-heading" className="dash-section-title">Quick Actions</h2>
          <p className="dash-section-subtitle">Jump into training — every session builds surgical competence</p>
        </div>
      </div>
      <div className="dash-quick-actions">
        {actions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Link
              to={action.to}
              className="dash-glass dash-action-card dash-glass-interactive"
              aria-label={action.label}
            >
              <div className={`dash-action-icon ${action.color}`}>
                <action.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="dash-action-label">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
