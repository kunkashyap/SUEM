import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { computeSkills } from './utils';

function TrendIcon({ trend }) {
  if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 dash-trend-up" aria-label="Improving" />;
  if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 dash-trend-down" aria-label="Needs practice" />;
  return <Minus className="w-3.5 h-3.5 dash-trend-neutral" aria-label="Stable" />;
}

export default function SkillProgress({ user, quizCount, recentAttempts }) {
  const skills = computeSkills(user, quizCount, recentAttempts);

  return (
    <section className="mb-8" aria-labelledby="skills-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="skills-heading" className="dash-section-title">Skill Progression</h2>
          <p className="dash-section-subtitle">Track competency across core surgical domains</p>
        </div>
      </div>
      <div className="dash-glass p-6" data-testid="skills-radar">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.skill}
            className="dash-skill-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <div className="dash-skill-header">
              <span className="dash-skill-name">{skill.skill}</span>
              <div className="flex items-center gap-2">
                <TrendIcon trend={skill.trend} />
                <span className="dash-skill-value">{Math.round(skill.value)}%</span>
              </div>
            </div>
            <div className="dash-progress-track h-2">
              <motion.div
                className={`dash-progress-fill h-full ${skill.value >= 75 ? 'dash-progress-fill-success' : skill.value >= 50 ? '' : 'dash-progress-fill-warning'}`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.value}%` }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                role="progressbar"
                aria-valuenow={Math.round(skill.value)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.skill} proficiency`}
              />
            </div>
            <div className="text-[10px] text-[var(--text-tertiary)]">
              Previous: {Math.round(skill.prev)}% · {skill.trend === 'up' ? 'Improving' : skill.trend === 'down' ? 'Needs focused practice' : 'Holding steady'}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
