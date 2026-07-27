import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';

export default function FocusAreas({ weakAreas }) {
  const maxCount = weakAreas.length ? Math.max(...weakAreas.map(([, n]) => n)) : 1;

  return (
    <section aria-labelledby="focus-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="focus-heading" className="dash-section-title flex items-center gap-2">
            <Award className="w-5 h-5 text-rose-400" aria-hidden="true" />
            Focus Areas
          </h2>
          <p className="dash-section-subtitle">Skills that need targeted practice</p>
        </div>
      </div>
      <div className="dash-glass p-6" data-testid="weak-areas">
        {weakAreas.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Complete simulations to identify areas for improvement.
            </p>
            <Link to="/simulations" className="dash-btn-secondary">
              Start Training <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {weakAreas.map(([area, count], i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{area}</span>
                  <span className="font-mono text-xs text-[var(--text-tertiary)]">{count}× flagged</span>
                </div>
                <div className="dash-progress-track h-2">
                  <motion.div
                    className="dash-progress-fill dash-progress-fill-danger h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (count / maxCount) * 100)}%` }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
