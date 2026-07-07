import React from 'react';
import Nav from '@/components/Nav';
import { Link } from 'react-router-dom';

const SPECIALTIES = [
  { id: 'anatomy', name: 'Anatomy', desc: 'Systems, structures, and interactive dissection.' },
  { id: 'physiology', name: 'Physiology', desc: 'How the body works — from nephron to neuron.' },
  { id: 'surgery', name: 'Surgery', desc: 'Step-by-step operative procedures.' },
  { id: 'pathology', name: 'Pathology', desc: 'Disease processes at gross and histological levels.' },
  { id: 'radiology', name: 'Radiology', desc: 'Reading imaging like a radiologist.' },
  { id: 'emergency', name: 'Emergency Medicine', desc: 'Rapid triage under pressure.' },
  { id: 'obstetrics', name: 'Obstetrics', desc: 'Prenatal care through delivery.' },
  { id: 'orthopedics', name: 'Orthopedics', desc: 'Fractures, fixation, and rehabilitation.' },
  { id: 'neurosurgery', name: 'Neurosurgery', desc: 'Cranial and spinal procedures.' },
  { id: 'dentistry', name: 'Dentistry', desc: 'Oral procedures and dental anatomy.' },
  { id: 'nursing', name: 'Nursing', desc: 'Fundamental clinical skills and sterile technique.' },
  { id: 'veterinary', name: 'Veterinary (soon)', desc: 'Comparative anatomy across species.' },
];

export default function Explore() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="label-caps mb-2">Explore</div>
        <h1 className="font-display text-5xl mb-4">Every specialty. One platform.</h1>
        <p className="text-slate-500 max-w-2xl mb-12">Choose a discipline to browse interactive simulations, procedures, and case libraries.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200" data-testid="explore-grid">
          {SPECIALTIES.map((s) => (
            <Link key={s.id} to={`/simulations?category=${s.id}`} data-testid={`explore-${s.id}`}
              className="bg-white p-8 hover-lift">
              <div className="label-caps mb-2">Specialty</div>
              <div className="font-display text-2xl font-semibold mb-2">{s.name}</div>
              <div className="text-sm text-slate-500">{s.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
