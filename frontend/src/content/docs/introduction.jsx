import React from 'react';
import Callout from '@/components/docs/Callout';
import { Card } from '@/components/docs/Card';
import { Stethoscope, Shield, Target, GraduationCap } from 'lucide-react';

export default function Introduction() {
  return (
    <div className="space-y-6">
      <h2 id="overview">Overview</h2>
      <p>
        <strong>MedSim</strong> is a web-based surgical simulation and training platform designed to bridge the gap between classroom theory and operating room execution. Built for medical students, surgical residents, and faculty advisors, MedSim combines interactive 3D anatomical models, step-by-step procedural guides, and intelligent AI tutoring to simulate high-fidelity clinical scenarios.
      </p>

      <Callout type="info" title="Platform Concept">
        MedSim enables users to practice surgical skills in a risk-free virtual environment. High-performance browser rendering leverages standard web technologies to make training accessible from any device.
      </Callout>

      <h2 id="vision">Vision</h2>
      <p>
        Our vision is to democratize surgical education through high-fidelity, web-native simulation. Traditional training methods depend on expensive mannequin labs or limited cadaveric access. MedSim transforms clinical learning by offering:
      </p>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <Card title="Accessibility" icon={Stethoscope} description="Practice complex procedures directly from your browser, anytime, without specialized hardware." />
        <Card title="Immediate Feedback" icon={Shield} description="Receive real-time performance evaluations and anatomical guidance from the AI Tutor." />
      </div>

      <h2 id="problem-statement">Problem Statement</h2>
      <p>
        Modern medical education faces structural constraints:
      </p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Reduced Hours:</strong> Tight residency regulations restrict hours inside active operating rooms.</li>
        <li><strong>High Training Costs:</strong> High-fidelity physical simulation labs are cost-prohibitive for many institutions.</li>
        <li><strong>Static Learning Material:</strong> Reading standard surgical textbooks lacks the dynamic feedback required for spatial reasoning and decision-making in active cases.</li>
      </ul>

      <h2 id="objectives">Objectives</h2>
      <p>
        To solve these problems, MedSim achieves several key development objectives:
      </p>
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-slate-50/50 dark:bg-slate-950/20 my-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">1</div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-slate-100">Realistic 3D Anatomy</h5>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Render responsive anatomical systems with multi-layer dissection support using WebGL.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">2</div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-slate-100">Step-by-Step Interactive Guides</h5>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Define surgical processes with milestones, incision systems, and instrument selection checks.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">3</div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-slate-100">Continuous Assessment</h5>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Track precision, timing, and errors, syncing logs with dashboard matrices for student and faculty review.</p>
          </div>
        </div>
      </div>

      <h2 id="target-audience">Target Audience</h2>
      <p>
        The platform targets three primary user groups:
      </p>
      <div className="grid sm:grid-cols-3 gap-4 my-6">
        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-center">
          <GraduationCap className="w-8 h-8 mx-auto text-blue-600 mb-2" />
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Medical Students</h4>
          <p className="text-xs text-slate-500 mt-1">Study spatial relationships, anatomy, and standard procedures.</p>
        </div>
        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-center">
          <Target className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Residents</h4>
          <p className="text-xs text-slate-500 mt-1">Refine surgical coordination steps and review complex procedures prior to surgery.</p>
        </div>
        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-center">
          <Stethoscope className="w-8 h-8 mx-auto text-purple-600 mb-2" />
          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Faculty Advisors</h4>
          <p className="text-xs text-slate-500 mt-1">Deploy custom curriculums, track student scores, and identify performance anomalies.</p>
        </div>
      </div>
    </div>
  );
}
