import React, { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import api from '@/lib/api';
import { Link } from 'react-router-dom';
import DashboardSkeleton from '@/components/Dashboard/DashboardSkeleton';
import DashboardHero from '@/components/Dashboard/DashboardHero';
import StatMetrics from '@/components/Dashboard/StatMetrics';
import QuickActions from '@/components/Dashboard/QuickActions';
import RecommendedSimulations from '@/components/Dashboard/RecommendedSimulations';
import AIRecommendations from '@/components/Dashboard/AIRecommendations';
import DailyGoals from '@/components/Dashboard/DailyGoals';
import SkillProgress from '@/components/Dashboard/SkillProgress';
import ActivityTimeline from '@/components/Dashboard/ActivityTimeline';
import AchievementsPanel from '@/components/Dashboard/AchievementsPanel';
import LeaderboardPreview from '@/components/Dashboard/LeaderboardPreview';
import FocusAreas from '@/components/Dashboard/FocusAreas';
import LearningAnalytics from '@/components/Dashboard/LearningAnalytics';
import '@/components/Dashboard/dashboard.css';

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/dashboard/student')
      .then((r) => setData(r.data))
      .catch(() => setError('Unable to load dashboard. Please try again.'));
  }, []);

  if (error) {
    return (
      <div className="dashboard-page">
        <Nav />
        <div className="dashboard-container">
          <div className="dash-glass p-12 text-center">
            <p className="text-[var(--text-secondary)]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return <DashboardSkeleton />;

  const {
    user,
    total_attempts,
    avg_accuracy,
    quiz_count,
    weak_areas,
    recent_attempts,
    recent_quizzes,
  } = data;

  return (
    <div className="dashboard-page">
      <Nav />
      <main className="dashboard-container" data-testid="student-dashboard">
        <DashboardHero
          user={user}
          avgAccuracy={avg_accuracy}
          totalAttempts={total_attempts}
          recentAttempts={recent_attempts}
          recentQuizzes={recent_quizzes}
        />

        <StatMetrics
          user={user}
          totalAttempts={total_attempts}
          avgAccuracy={avg_accuracy}
          recentAttempts={recent_attempts}
          recentQuizzes={recent_quizzes}
          quizCount={quiz_count}
        />

        <QuickActions />

        <RecommendedSimulations
          recentAttempts={recent_attempts}
          weakAreas={weak_areas}
        />

        <AIRecommendations
          weakAreas={weak_areas}
          recentAttempts={recent_attempts}
        />

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <DailyGoals data={data} />
          <SkillProgress
            user={user}
            quizCount={quiz_count}
            recentAttempts={recent_attempts}
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            <ActivityTimeline
              recentAttempts={recent_attempts}
              recentQuizzes={recent_quizzes}
            />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <AchievementsPanel
              user={user}
              totalAttempts={total_attempts}
              avgAccuracy={avg_accuracy}
              quizCount={quiz_count}
            />
            <LeaderboardPreview currentUser={user} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <FocusAreas weakAreas={weak_areas} />
          <div className="dash-glass p-6">
            <div className="dash-section-header mb-4">
              <div>
                <h2 className="dash-section-title">Recent Quizzes</h2>
                <p className="dash-section-subtitle">Anatomy and knowledge assessments</p>
              </div>
            </div>
            {recent_quizzes.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-[var(--text-secondary)] mb-4">No quiz attempts yet.</p>
                <Link to="/quizzes" className="dash-btn-secondary">Take a Quiz →</Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recent_quizzes.slice(0, 6).map((q) => (
                  <div
                    key={q.id}
                    className="flex justify-between items-center text-sm py-2.5 px-3 rounded-lg bg-white/[0.03] border border-white/[0.04]"
                  >
                    <span className="truncate capitalize">
                      {q.quiz_id.replace('quiz-', '').replace(/-/g, ' ')}
                    </span>
                    <span className={`font-mono font-bold text-sm ${
                      q.score >= 80 ? 'text-emerald-400' : q.score >= 60 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {q.score}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <LearningAnalytics
          avgAccuracy={avg_accuracy}
          recentAttempts={recent_attempts}
          totalAttempts={total_attempts}
        />
      </main>
    </div>
  );
}
