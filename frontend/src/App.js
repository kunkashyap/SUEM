import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AITutor from '@/components/AITutor';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Explore from '@/pages/Explore';
import SimulationLibrary from '@/pages/SimulationLibrary';
import SimulationDetail from '@/pages/SimulationDetail';
import FullBodyExplorer from '@/pages/FullBodyExplorer';
import ProcedurePlayer from '@/pages/ProcedurePlayer';
import QuizCenter from '@/pages/QuizCenter';
import ClinicalCases from '@/pages/ClinicalCases';
import StudentDashboard from '@/pages/StudentDashboard';
import FacultyDashboard from '@/pages/FacultyDashboard';
import Leaderboard from '@/pages/Leaderboard';
import Search from '@/pages/Search';
import EmergencyMode from '@/pages/EmergencyMode';
import TeamMode from '@/pages/TeamMode';
import '@/App.css';
import HeartViewer from './components/HeartViewer/HeartViewer';
import HeartSimulation from "@/pages/HeartSimulation";


function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/simulations" element={<SimulationLibrary />} />
          <Route path="/simulation/:id" element={<SimulationDetail />} />
          <Route path="/explorer" element={<FullBodyExplorer />} />
          <Route path="/procedure/:id" element={<Protected><ProcedurePlayer /></Protected>} />
          <Route path="/quizzes" element={<QuizCenter />} />
          <Route path="/cases" element={<ClinicalCases />} />
          <Route path="/dashboard" element={<Protected><StudentDashboard /></Protected>} />
          <Route path="/faculty" element={<Protected><FacultyDashboard /></Protected>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/emergency" element={<Protected><EmergencyMode /></Protected>} />
          <Route path="/team" element={<Protected><TeamMode /></Protected>} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/heart" element={<HeartSimulation />} />
        </Routes>
        <AITutor />
      </BrowserRouter>
    </AuthProvider>
    
      
  );
}
