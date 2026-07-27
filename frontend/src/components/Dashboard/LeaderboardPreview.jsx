import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import AnimatedCounter from './AnimatedCounter';

export default function LeaderboardPreview({ currentUser }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get('/leaderboard').then((r) => setRows(r.data)).catch(() => setRows([]));
  }, []);

  const userRank = rows.findIndex((u) => u.name === currentUser?.name) + 1;
  const topFive = rows.slice(0, 5);

  return (
    <section aria-labelledby="leaderboard-heading">
      <div className="dash-section-header">
        <div>
          <h2 id="leaderboard-heading" className="dash-section-title">Leaderboard</h2>
          <p className="dash-section-subtitle">
            {userRank > 0 ? `You're ranked #${userRank} globally` : 'Compete with peers worldwide'}
          </p>
        </div>
        <Link to="/leaderboard" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
      <div className="dash-glass overflow-hidden">
        {topFive.length === 0 ? (
          <div className="p-8 text-center text-sm text-[var(--text-secondary)]">
            No rankings yet. Complete simulations to appear on the board.
          </div>
        ) : (
          topFive.map((u, i) => (
            <motion.div
              key={`${u.name}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className={`flex items-center gap-4 px-5 py-3.5 border-b border-[var(--border-subtle)] last:border-b-0 ${
                u.name === currentUser?.name ? 'bg-blue-500/8' : ''
              } ${i === 0 ? 'bg-amber-500/5' : ''}`}
              data-testid={`lb-row-${i}`}
            >
              <div className={`font-mono text-lg font-bold w-8 ${i === 0 ? 'text-amber-400' : 'text-[var(--text-tertiary)]'}`}>
                #{i + 1}
              </div>
              {i === 0 && <Trophy className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{u.name}</div>
                <div className="text-[10px] text-[var(--text-tertiary)]">{u.institution || 'Independent'}</div>
              </div>
              <div className="font-mono text-sm font-bold">
                <AnimatedCounter value={u.xp} /> XP
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
