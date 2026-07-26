export const XP_LEVELS = [0, 100, 250, 500, 1000, 2000, 3500, 5000, 7500];

export function formatSimName(id) {
  if (!id) return 'Unknown procedure';
  return id.replace('sim-', '').replace(/-/g, ' ');
}

export function formatQuizName(id) {
  if (!id) return 'Quiz';
  return id.replace('quiz-', '').replace(/-/g, ' ');
}

export function getLevelInfo(xp) {
  let level = 1;
  for (let i = 1; i < XP_LEVELS.length; i++) {
    if (xp >= XP_LEVELS[i]) level = i + 1;
    else break;
  }
  const currentThreshold = XP_LEVELS[level - 1] ?? 0;
  const nextThreshold = XP_LEVELS[level] ?? currentThreshold + 1500;
  const span = nextThreshold - currentThreshold;
  const progress = span > 0 ? ((xp - currentThreshold) / span) * 100 : 100;
  return {
    level,
    currentThreshold,
    nextThreshold,
    progress: Math.min(100, Math.max(0, progress)),
    xpToNext: Math.max(0, nextThreshold - xp),
  };
}

export function getTodayXp(recentAttempts, recentQuizzes) {
  const today = new Date().toISOString().slice(0, 10);
  const attemptXp = recentAttempts
    .filter((a) => a.created_at?.slice(0, 10) === today)
    .reduce((s, a) => s + Math.max(10, Math.floor(a.accuracy / 2)), 0);
  const quizXp = recentQuizzes
    .filter((q) => q.created_at?.slice(0, 10) === today)
    .reduce((s, q) => s + Math.floor(q.score / 10) * 10, 0);
  return attemptXp + quizXp;
}

export function getAccuracyTrend(recentAttempts) {
  if (recentAttempts.length < 2) return { direction: 'neutral', delta: 0 };
  const half = Math.max(1, Math.floor(recentAttempts.length / 2));
  const recent = recentAttempts.slice(0, half);
  const older = recentAttempts.slice(half);
  const recentAvg = recent.reduce((s, a) => s + a.accuracy, 0) / recent.length;
  const olderAvg = older.reduce((s, a) => s + a.accuracy, 0) / older.length;
  const delta = Math.round(recentAvg - olderAvg);
  return {
    direction: delta > 2 ? 'up' : delta < -2 ? 'down' : 'neutral',
    delta,
  };
}

export function computeSkills(user, quizCount, recentAttempts) {
  const wrongTotal = recentAttempts.reduce((s, a) => s + (a.wrong_actions || 0), 0);
  const recentAvg = recentAttempts.length
    ? recentAttempts.slice(0, 5).reduce((s, a) => s + a.accuracy, 0) / Math.min(5, recentAttempts.length)
    : 0;

  const base = (offset, factor = 1) => Math.min(100, Math.max(15, offset + (user.xp / 4) * factor));

  return [
    { skill: 'Suturing', value: base(45), prev: base(40), trend: user.xp > 50 ? 'up' : 'neutral' },
    { skill: 'Instrument Handling', value: base(55), prev: base(50), trend: user.xp > 30 ? 'up' : 'neutral' },
    { skill: 'Decision Making', value: Math.min(100, Math.max(20, 50 + user.xp / 5 - wrongTotal * 2)), prev: Math.max(20, 45 - wrongTotal), trend: wrongTotal > 3 ? 'down' : 'up' },
    { skill: 'Anatomy Recall', value: Math.min(100, 40 + quizCount * 8), prev: Math.min(100, 35 + quizCount * 6), trend: quizCount > 0 ? 'up' : 'neutral' },
    { skill: 'Speed', value: base(50, 0.8), prev: base(45, 0.8), trend: recentAvg >= 75 ? 'up' : 'neutral' },
    { skill: 'Precision', value: Math.min(100, recentAvg || base(48)), prev: Math.max(20, (recentAvg || 40) - 5), trend: getAccuracyTrend(recentAttempts).direction },
    { skill: 'Tissue Handling', value: Math.max(25, 70 - wrongTotal * 4), prev: Math.max(20, 65 - wrongTotal * 4), trend: wrongTotal > 2 ? 'down' : 'up' },
    { skill: 'Surgical Planning', value: base(42, 0.9), prev: base(38, 0.9), trend: totalAttemptsTrend(recentAttempts) },
  ];
}

function totalAttemptsTrend(attempts) {
  if (attempts.length >= 5) return 'up';
  if (attempts.length >= 1) return 'neutral';
  return 'neutral';
}

export function getDailyGoals({ recent_attempts, recent_quizzes, user, avg_accuracy }) {
  const today = new Date().toISOString().slice(0, 10);
  const todayAttempts = recent_attempts.filter((a) => a.created_at?.slice(0, 10) === today);
  const todayQuizzes = recent_quizzes.filter((q) => q.created_at?.slice(0, 10) === today);
  const highAccuracyToday = todayAttempts.some((a) => a.accuracy >= 90);

  return [
    {
      id: 'simulation',
      label: 'Complete 1 simulation',
      description: 'Finish any procedure in the library',
      completed: todayAttempts.length >= 1,
      progress: todayAttempts.length >= 1 ? 100 : 0,
      xp: 50,
    },
    {
      id: 'quiz',
      label: 'Score 80%+ on a quiz',
      description: 'Test your anatomy recall',
      completed: todayQuizzes.some((q) => q.score >= 80),
      progress: todayQuizzes.length ? Math.min(100, todayQuizzes[0].score) : 0,
      xp: 30,
    },
    {
      id: 'streak',
      label: 'Maintain learning streak',
      description: `${user.streak || 0} consecutive active days`,
      completed: user.streak > 0,
      progress: user.streak > 0 ? 100 : 0,
      xp: 25,
    },
    {
      id: 'accuracy',
      label: 'Achieve 90%+ accuracy',
      description: 'Precision matters in the OR',
      completed: highAccuracyToday,
      progress: todayAttempts.length ? Math.min(100, Math.max(...todayAttempts.map((a) => a.accuracy))) : 0,
      xp: 40,
    },
    {
      id: 'explore',
      label: 'Review 1 anatomical structure',
      description: 'Use the 3D anatomy explorer',
      completed: false,
      progress: 0,
      xp: 35,
      link: '/explorer',
    },
  ];
}

export function getAchievements(user, totalAttempts, avgAccuracy, quizCount) {
  return [
    { id: 'first-cut', title: 'First Incision', desc: 'Complete your first simulation', unlocked: totalAttempts >= 1, xp: 25 },
    { id: 'steady-hands', title: 'Steady Hands', desc: 'Reach 80% average accuracy', unlocked: avgAccuracy >= 80, xp: 100 },
    { id: 'scholar', title: 'Anatomy Scholar', desc: 'Complete 5 quizzes', unlocked: quizCount >= 5, xp: 75 },
    { id: 'dedicated', title: 'Dedicated Trainee', desc: 'Earn 500 XP', unlocked: user.xp >= 500, xp: 0 },
    { id: 'veteran', title: 'OR Veteran', desc: 'Complete 10 simulations', unlocked: totalAttempts >= 10, xp: 150 },
    { id: 'streak-3', title: 'Consistent Learner', desc: 'Maintain a 3-day streak', unlocked: user.streak >= 3, xp: 50 },
    { id: 'master', title: 'Surgical Master', desc: 'Reach Level 5', unlocked: getLevelInfo(user.xp).level >= 5, xp: 200 },
    { id: 'perfect', title: 'Flawless Technique', desc: 'Score 95%+ on a simulation', unlocked: false, xp: 100, upcoming: true },
  ];
}

export function getAIRecommendations(weakAreas, recentAttempts) {
  if (weakAreas.length === 0 && recentAttempts.length === 0) {
    return [{
      title: 'Begin with core procedures',
      reason: 'Start with a foundational simulation to establish your baseline and unlock personalized learning paths.',
      action: '/simulations',
      actionLabel: 'Browse simulations',
      priority: 'medium',
    }];
  }
  if (weakAreas.length === 0) {
    return [{
      title: 'Advance to complex procedures',
      reason: 'Your fundamentals are solid. Challenge yourself with advanced simulations to deepen surgical planning skills.',
      action: '/simulations',
      actionLabel: 'View advanced cases',
      priority: 'medium',
    }];
  }
  return weakAreas.slice(0, 3).map(([area, count]) => ({
    title: `Strengthen: ${area}`,
    reason: `Flagged in ${count} recent attempt${count > 1 ? 's' : ''}. Focused practice here will improve your overall OSATS performance.`,
    action: '/simulations',
    actionLabel: 'Practice now',
    priority: count >= 3 ? 'high' : 'medium',
  }));
}

export function buildActivityTimeline(recentAttempts, recentQuizzes) {
  const items = [];
  recentAttempts.forEach((a) => {
    items.push({
      type: 'simulation',
      id: `attempt-${a.id}`,
      title: formatSimName(a.simulation_id),
      timestamp: a.created_at,
      meta: `${a.accuracy}% accuracy · Grade ${a.grade} · ${a.wrong_actions} errors`,
      link: `/procedure/${a.simulation_id}`,
      score: a.accuracy,
    });
  });
  recentQuizzes.forEach((q) => {
    items.push({
      type: 'quiz',
      id: `quiz-${q.id}`,
      title: formatQuizName(q.quiz_id),
      timestamp: q.created_at,
      meta: `Score ${q.score}%`,
      link: '/quizzes',
      score: q.score,
    });
  });
  return items
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10);
}

export function getLastSession(recentAttempts) {
  if (!recentAttempts.length) return null;
  const latest = recentAttempts[0];
  const completion = latest.accuracy;
  const remainingMin = Math.max(5, Math.round((100 - completion) / 10) * 3);
  return {
    simulationId: latest.simulation_id,
    name: formatSimName(latest.simulation_id),
    completion,
    remainingMin,
    grade: latest.grade,
    lastPlayed: latest.created_at,
    difficulty: completion >= 80 ? 'Advanced review' : completion >= 60 ? 'Intermediate' : 'Foundational',
  };
}

export function getMotivationalMessage(streak, totalAttempts, avgAccuracy) {
  if (totalAttempts === 0) return 'Every expert surgeon started with their first incision. Begin today.';
  if (streak >= 7) return 'Your consistency is building real surgical muscle memory. Keep the momentum.';
  if (avgAccuracy >= 85) return 'Excellent precision. Push toward mastery with advanced procedures.';
  if (totalAttempts >= 5) return 'You\'re building a strong foundation. Focus on your weak areas today.';
  return 'Consistent practice transforms knowledge into skill. One simulation at a time.';
}

export function getProgressChartData(recentAttempts) {
  const data = [...recentAttempts].reverse().slice(-10).map((a, i) => ({
    idx: i + 1,
    accuracy: a.accuracy,
    grade: a.grade,
  }));
  if (data.length === 0) data.push({ idx: 1, accuracy: 0, grade: '—' });
  return data;
}
