import React from 'react';
import Nav from '@/components/Nav';

export default function DashboardSkeleton() {
  return (
    <div className="dashboard-page">
      <Nav />
      <div className="dashboard-container" aria-busy="true" aria-label="Loading dashboard">
        <div className="dash-skeleton h-64 rounded-[20px] mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="dash-skeleton h-28 rounded-[14px]" />
          ))}
        </div>
        <div className="dash-skeleton h-24 rounded-[14px] mb-8" />
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="dash-skeleton h-80 rounded-[16px]" />
          <div className="dash-skeleton h-80 rounded-[16px]" />
        </div>
      </div>
    </div>
  );
}
