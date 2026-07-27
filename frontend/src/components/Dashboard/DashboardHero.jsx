import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Flame, Trophy, Clock } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { getLevelInfo, getTodayXp, getMotivationalMessage, getLastSession } from './utils';

function ECGWave() {
  return (
    <div className="dash-hero-ecg" aria-hidden="true">
      <svg viewBox="0 0 600 48" preserveAspectRatio="none">
        <path
          className="ecg-line"
          d="M0,24 L40,24 L50,24 L55,8 L60,40 L65,24 L120,24 L130,24 L135,12 L140,36 L145,24 L200,24 L210,24 L215,10 L220,38 L225,24 L280,24 L290,24 L295,14 L300,34 L305,24 L360,24 L370,24 L375,6 L380,42 L385,24 L440,24 L450,24 L455,16 L460,32 L465,24 L520,24 L530,24 L535,10 L540,38 L545,24 L600,24"
          strokeDasharray="600"
        />
      </svg>
    </div>
  );
}

export default function DashboardHero({ user, avgAccuracy, totalAttempts, recentAttempts, recentQuizzes }) {
  const levelInfo = getLevelInfo(user.xp);
  const todayXp = getTodayXp(recentAttempts, recentQuizzes);
  const lastSession = getLastSession(recentAttempts);
  const message = getMotivationalMessage(user.streak, totalAttempts, avgAccuracy);
  const firstName = user.name.split(' ')[0];

  return (
    <motion.section
      className="dash-hero"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-labelledby="dashboard-hero-title"
    >
      <ECGWave />
      <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="label-caps">Surgical Training Hub</span>
            <span className="dash-level-badge">
              <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
              Level {levelInfo.level}
            </span>
          </div>

          <h1 id="dashboard-hero-title" className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight mb-3">
            Welcome back, {firstName}
          </h1>
          <p className="text-[var(--text-secondary)] text-base max-w-xl mb-6 leading-relaxed">
            {message}
          </p>

          <div className="flex flex-wrap gap-6 mb-6">
            <div>
              <div className="font-mono text-2xl font-bold">
                <AnimatedCounter value={user.xp} /> <span className="text-sm font-normal text-[var(--text-tertiary)]">XP</span>
              </div>
              <div className="text-xs text-[var(--text-tertiary)] mt-1">
                +{todayXp} today · {levelInfo.xpToNext} to Level {levelInfo.level + 1}
              </div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" aria-hidden="true" />
                <AnimatedCounter value={user.streak || 0} />
                <span className="text-sm font-normal text-[var(--text-tertiary)]">day streak</span>
              </div>
              <div className="text-xs text-[var(--text-tertiary)] mt-1">Keep practicing daily</div>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[var(--text-tertiary)]">Level progress</span>
              <span className="font-mono text-[var(--text-secondary)]">{Math.round(levelInfo.progress)}%</span>
            </div>
            <div className="dash-progress-track h-2">
              <div className="dash-progress-fill h-full" style={{ width: `${levelInfo.progress}%` }} role="progressbar" aria-valuenow={Math.round(levelInfo.progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Level progress" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[340px]">
          {lastSession ? (
            <div className="dash-continue-card">
              <div className="label-caps mb-2 text-blue-400">Continue Learning</div>
              <h2 className="font-display text-xl font-semibold capitalize mb-2">{lastSession.name}</h2>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)] mb-4">
                <span className="capitalize">{lastSession.difficulty}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  ~{lastSession.remainingMin} min review
                </span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--text-tertiary)]">Last score</span>
                  <span className="font-mono font-semibold">{lastSession.completion}% · Grade {lastSession.grade}</span>
                </div>
                <div className="dash-progress-track h-2">
                  <div
                    className={`h-full rounded-full ${lastSession.completion >= 80 ? 'dash-progress-fill-success' : lastSession.completion >= 60 ? 'dash-progress-fill-warning' : 'dash-progress-fill-danger'} dash-progress-fill`}
                    style={{ width: `${lastSession.completion}%` }}
                  />
                </div>
              </div>
              <Link
                to={`/procedure/${lastSession.simulationId}`}
                data-testid="dash-cta"
                className="dash-btn-primary w-full justify-center"
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                Resume Practice
              </Link>
            </div>
          ) : (
            <div className="dash-continue-card text-center">
              <div className="label-caps mb-3 text-blue-400">Get Started</div>
              <h2 className="font-display text-xl font-semibold mb-2">Your first procedure awaits</h2>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                Begin with a guided simulation to establish your baseline and unlock personalized training paths.
              </p>
              <Link to="/simulations" data-testid="dash-cta" className="dash-btn-primary w-full justify-center">
                <Play className="w-4 h-4" aria-hidden="true" />
                Start First Simulation
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
