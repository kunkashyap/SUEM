import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { getDailyGoals } from './utils';

export default function DailyGoals({ data }) {
  const goals = getDailyGoals(data);
  const completedCount = goals.filter((g) => g.completed).length;

  return (
    <section className="mb-8" aria-labelledby="daily-goals-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="daily-goals-heading" className="dash-section-title">Daily Goals</h2>
          <p className="dash-section-subtitle">
            {completedCount}/{goals.length} completed today · Earn XP with each goal
          </p>
        </div>
      </div>
      <div className="dash-glass p-5 space-y-3">
        {goals.map((goal, i) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className={`dash-goal-item ${goal.completed ? 'completed' : ''}`}
          >
            <div className="dash-goal-check" aria-hidden="true">
              {goal.completed && <Check className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{goal.label}</div>
              <div className="text-xs text-[var(--text-tertiary)] mt-0.5">{goal.description}</div>
              {!goal.completed && goal.progress > 0 && (
                <div className="dash-progress-track mt-2 h-1.5">
                  <div className="dash-progress-fill" style={{ width: `${goal.progress}%` }} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs font-mono font-semibold text-amber-400 shrink-0">
              <Star className="w-3 h-3" aria-hidden="true" />
              +{goal.xp}
            </div>
            {goal.link && !goal.completed && (
              <Link to={goal.link} className="text-xs text-blue-400 hover:underline shrink-0">
                Go →
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
