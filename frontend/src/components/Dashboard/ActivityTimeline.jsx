import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ClipboardCheck, ArrowRight } from 'lucide-react';
import { buildActivityTimeline } from './utils';

function formatTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function dotClass(type, score) {
  if (type === 'quiz') {
    if (score >= 80) return 'dash-timeline-dot dash-timeline-dot-success';
    if (score >= 60) return 'dash-timeline-dot dash-timeline-dot-warning';
  }
  if (score >= 90) return 'dash-timeline-dot dash-timeline-dot-success';
  if (score >= 70) return 'dash-timeline-dot dash-timeline-dot-warning';
  return 'dash-timeline-dot';
}

export default function ActivityTimeline({ recentAttempts, recentQuizzes }) {
  const items = buildActivityTimeline(recentAttempts, recentQuizzes);

  return (
    <section aria-labelledby="activity-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="activity-heading" className="dash-section-title">Recent Activity</h2>
          <p className="dash-section-subtitle">Your learning journey at a glance</p>
        </div>
      </div>
      <div className="dash-glass p-6" data-testid="recent-attempts">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <Play className="w-10 h-10 mx-auto mb-3 text-[var(--text-tertiary)] opacity-40" aria-hidden="true" />
            <p className="text-sm text-[var(--text-secondary)] mb-4">No activity yet. Start your surgical training journey.</p>
            <Link to="/simulations" className="dash-btn-primary">
              Start a Simulation
            </Link>
          </div>
        ) : (
          <div className="dash-timeline">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                className="dash-timeline-item"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <div className={dotClass(item.type, item.score)} aria-hidden="true" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {item.type === 'simulation' ? (
                        <Play className="w-3.5 h-3.5 text-blue-400 shrink-0" aria-hidden="true" />
                      ) : (
                        <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                      )}
                      <span className="text-sm font-medium capitalize truncate">{item.title}</span>
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)]">{item.meta}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] text-[var(--text-tertiary)] font-mono">{formatTime(item.timestamp)}</span>
                    <Link to={item.link} className="text-blue-400 hover:text-blue-300 transition-colors" aria-label={`Return to ${item.title}`}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
