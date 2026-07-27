import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { getAIRecommendations } from './utils';

export default function AIRecommendations({ weakAreas, recentAttempts }) {
  const recommendations = getAIRecommendations(weakAreas, recentAttempts);

  return (
    <section className="mb-8" aria-labelledby="ai-rec-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="ai-rec-heading" className="dash-section-title flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" aria-hidden="true" />
            AI Recommendations
          </h2>
          <p className="dash-section-subtitle">Personalized learning paths based on your performance</p>
        </div>
      </div>
      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            className="dash-glass p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {rec.priority === 'high' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                    Priority
                  </span>
                )}
                <h3 className="font-medium text-sm">{rec.title}</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{rec.reason}</p>
            </div>
            <Link to={rec.action} className="dash-btn-secondary shrink-0 whitespace-nowrap">
              {rec.actionLabel}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
