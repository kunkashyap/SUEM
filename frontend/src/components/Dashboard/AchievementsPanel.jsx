import React from 'react';
import { motion } from 'framer-motion';
import { Award, Scissors, Target, BookOpen, Flame, Star, Lock } from 'lucide-react';
import { getAchievements } from './utils';

const iconMap = {
  'first-cut': Scissors,
  'steady-hands': Target,
  scholar: BookOpen,
  dedicated: Star,
  veteran: Award,
  'streak-3': Flame,
  master: Award,
  perfect: Target,
};

export default function AchievementsPanel({ user, totalAttempts, avgAccuracy, quizCount }) {
  const achievements = getAchievements(user, totalAttempts, avgAccuracy, quizCount);
  const unlocked = achievements.filter((a) => a.unlocked).length;
  const nextLocked = achievements.find((a) => !a.unlocked && !a.upcoming);

  return (
    <section aria-labelledby="achievements-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="achievements-heading" className="dash-section-title">Achievements & Milestones</h2>
          <p className="dash-section-subtitle">
            {unlocked}/{achievements.length} unlocked
            {nextLocked && ` · Next: ${nextLocked.title}`}
          </p>
        </div>
      </div>
      <div className="dash-glass p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievements.map((ach, i) => {
            const Icon = iconMap[ach.id] || Award;
            return (
              <motion.div
                key={ach.id}
                className={`dash-achievement ${ach.unlocked ? 'unlocked' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                title={ach.desc}
              >
                <div className="dash-achievement-icon">
                  {ach.unlocked ? (
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Lock className="w-4 h-4 opacity-50" aria-hidden="true" />
                  )}
                </div>
                <div className="text-xs font-semibold leading-tight">{ach.title}</div>
                <div className="text-[10px] text-[var(--text-tertiary)] leading-tight">{ach.desc}</div>
                {ach.xp > 0 && ach.unlocked && (
                  <span className="text-[10px] font-mono text-amber-400">+{ach.xp} XP</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
