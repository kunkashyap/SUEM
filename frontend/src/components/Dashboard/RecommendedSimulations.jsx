import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Clock, BarChart2, ArrowRight } from 'lucide-react';
import { formatSimName } from './utils';

export default function RecommendedSimulations({ recentAttempts, weakAreas }) {
  const seen = new Set();
  const recommendations = [];

  if (recentAttempts.length > 0) {
    const lowest = [...recentAttempts].sort((a, b) => a.accuracy - b.accuracy)[0];
    if (!seen.has(lowest.simulation_id)) {
      seen.add(lowest.simulation_id);
      recommendations.push({
        id: lowest.simulation_id,
        name: formatSimName(lowest.simulation_id),
        reason: `Your lowest recent score (${lowest.accuracy}%). Retrying will strengthen muscle memory.`,
        difficulty: lowest.accuracy >= 80 ? 'Review' : 'Practice',
        time: '~25 min',
      });
    }
  }

  recentAttempts.slice(0, 3).forEach((a) => {
    if (!seen.has(a.simulation_id) && recommendations.length < 3) {
      seen.add(a.simulation_id);
      recommendations.push({
        id: a.simulation_id,
        name: formatSimName(a.simulation_id),
        reason: `Previously scored ${a.accuracy}%. Build consistency with repeated practice.`,
        difficulty: a.accuracy >= 80 ? 'Advanced' : 'Intermediate',
        time: '~20 min',
      });
    }
  });

  if (recommendations.length === 0) {
    recommendations.push({
      id: null,
      name: 'Explore the Simulation Library',
      reason: 'Browse procedures matched to your training level and specialty interests.',
      difficulty: 'All levels',
      time: 'Varies',
      link: '/simulations',
    });
  }

  return (
    <section className="mb-8" aria-labelledby="recommended-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="recommended-heading" className="dash-section-title">Recommended Simulations</h2>
          <p className="dash-section-subtitle">
            {weakAreas.length > 0
              ? 'Procedures selected to address your focus areas'
              : 'Curated procedures to advance your training'}
          </p>
        </div>
        <Link to="/simulations" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
          Browse all <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {recommendations.map((sim, i) => (
          <motion.div
            key={sim.id || 'explore'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
          >
            <Link
              to={sim.link || `/procedure/${sim.id}`}
              className="dash-glass dash-glass-interactive block p-5 h-full"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/12 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm capitalize leading-tight">{sim.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-0.5">
                      <BarChart2 className="w-3 h-3" aria-hidden="true" />
                      {sim.difficulty}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {sim.time}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{sim.reason}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
