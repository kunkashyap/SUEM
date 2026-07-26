import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Target, BookOpen, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { getLevelInfo, getTodayXp, getAccuracyTrend } from './utils';

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35 },
  }),
};

function TrendBadge({ direction, delta }) {
  if (direction === 'up') {
    return (
      <span className="dash-trend-up flex items-center gap-0.5 text-xs font-medium">
        <TrendingUp className="w-3 h-3" aria-hidden="true" />
        +{Math.abs(delta)}%
      </span>
    );
  }
  if (direction === 'down') {
    return (
      <span className="dash-trend-down flex items-center gap-0.5 text-xs font-medium">
        <TrendingDown className="w-3 h-3" aria-hidden="true" />
        {delta}%
      </span>
    );
  }
  return (
    <span className="dash-trend-neutral flex items-center gap-0.5 text-xs font-medium">
      <Minus className="w-3 h-3" aria-hidden="true" />
      Stable
    </span>
  );
}

export default function StatMetrics({ user, totalAttempts, avgAccuracy, recentAttempts, recentQuizzes, quizCount }) {
  const levelInfo = getLevelInfo(user.xp);
  const todayXp = getTodayXp(recentAttempts, recentQuizzes);
  const accuracyTrend = getAccuracyTrend(recentAttempts);
  const recentCount = recentAttempts.filter((a) => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(a.created_at) >= weekAgo;
  }).length;

  const stats = [
    {
      icon: Trophy,
      label: 'Experience Points',
      value: user.xp,
      detail: `+${todayXp} today · Level ${levelInfo.level}`,
      accent: 'text-amber-400',
      testId: 'stat-xp-earned',
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${avgAccuracy}%`,
      detail: 'OSATS average score',
      accent: 'text-blue-400',
      trend: accuracyTrend,
      testId: 'stat-avg-accuracy',
    },
    {
      icon: BookOpen,
      label: 'Simulations',
      value: totalAttempts,
      detail: `${recentCount} this week · ${quizCount} quizzes`,
      accent: 'text-slate-300',
      testId: 'stat-total-attempts',
    },
    {
      icon: Flame,
      label: 'Learning Streak',
      value: `${user.streak || 0} days`,
      detail: user.streak > 0 ? 'Active streak maintained' : 'Practice today to start',
      accent: 'text-orange-400',
      testId: 'stat-streak',
    },
  ];

  return (
    <section aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">Performance statistics</h2>
      <div className="dash-stat-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="dash-glass dash-stat-card dash-glass-interactive"
            data-testid={stat.testId}
          >
            <div className="flex items-start justify-between mb-3">
              <stat.icon className={`w-5 h-5 ${stat.accent}`} aria-hidden="true" />
              {stat.trend && <TrendBadge {...stat.trend} />}
            </div>
            <div className="dash-stat-value">
              {typeof stat.value === 'number' ? (
                <AnimatedCounter value={stat.value} />
              ) : (
                stat.value
              )}
            </div>
            <div className="dash-stat-label">{stat.label}</div>
            <div className="dash-stat-detail">{stat.detail}</div>
            {stat.label === 'Experience Points' && (
              <div className="mt-3">
                <div className="dash-progress-track">
                  <div className="dash-progress-fill" style={{ width: `${levelInfo.progress}%` }} />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
