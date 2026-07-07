import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import AnatomyFigure from '@/components/AnatomyFigure';
import Body3D from '@/components/Body3D';
import { ArrowRight, ShieldCheck, Activity, Scissors, Brain, HeartPulse, Microscope, Scan, Siren, Baby, Bone, Stethoscope, PawPrint, Sparkles, Play, CheckCircle2, GraduationCap, Quote } from 'lucide-react';

const ICONS = { anatomy: Activity, physiology: HeartPulse, surgery: Scissors, pathology: Microscope, radiology: Scan, emergency: Siren, obstetrics: Baby, orthopedics: Bone, neurosurgery: Brain, dentistry: Sparkles, nursing: Stethoscope, veterinary: PawPrint };

const CATS = [
  ['anatomy', 'Anatomy', '42'], ['physiology', 'Physiology', '28'], ['surgery', 'Surgery', '36'], ['pathology', 'Pathology', '24'],
  ['radiology', 'Radiology', '18'], ['emergency', 'Emergency', '22'], ['obstetrics', 'Obstetrics', '14'], ['orthopedics', 'Orthopedics', '20'],
  ['neurosurgery', 'Neurosurgery', '12'], ['dentistry', 'Dentistry', '10'], ['nursing', 'Nursing', '30'], ['veterinary', 'Veterinary (soon)', '8'],
];

const STEPS = [
  { n: '01', title: 'Choose a procedure', desc: 'Browse 500+ interactive simulations across 15 organ systems. Filter by difficulty from novice to exam-mode.' },
  { n: '02', title: 'Enter the OR', desc: 'You get the same UI a surgeon sees — sterile field, drag-and-use instruments, and an OR-grade vitals monitor.' },
  { n: '03', title: 'Learn from consequence', desc: 'Cut the wrong vessel? BP crashes. Dr. Ada explains why — grounded in the exact structure on your screen.' },
  { n: '04', title: 'Get graded objectively', desc: 'OSATS-aligned scoring, weak-area detection, and a personalized study plan your faculty can review.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="grid-backdrop absolute inset-0 opacity-70" />
        <div className="relative max-w-[1400px] mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700">The PhET of Medical Education</span>
            </div>
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl leading-[1.02] tracking-tight text-slate-900 mb-6">
              Learn surgery<br/>
              <span className="text-slate-400">without</span> risk.<br/>
              Practice <em className="not-italic underline decoration-blue-600 decoration-4 underline-offset-4">unlimited</em> times.
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mb-8 leading-relaxed">
              A browser-based 3D surgical & anatomical simulator for medical students. Full-body explorer, step-by-step procedures, real-time vitals, and an AI tutor that grounds every answer in the scene in front of you.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/register" data-testid="hero-cta-primary"
                className="group bg-slate-900 text-white px-6 py-3.5 rounded-md font-medium text-sm inline-flex items-center gap-2 hover:bg-blue-600 transition-colors">
                Start Learning
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/simulations" data-testid="hero-cta-secondary"
                className="border border-slate-900 text-slate-900 px-6 py-3.5 rounded-md font-medium text-sm hover:bg-slate-900 hover:text-white transition-colors">
                Explore Procedures
              </Link>
              <Link to="/procedure/sim-appendectomy" data-testid="hero-cta-tertiary"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 px-3 py-2">
                <Play className="w-3.5 h-3.5" /> Watch a live procedure
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl">
              {[['500+', 'Procedures'], ['15', 'Organ Systems'], ['1,000+', 'Structures'], ['24/7', 'AI Tutor']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold text-slate-900">{n}</div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative anat-wrap">
            <div className="absolute -inset-4 border border-slate-200 pointer-events-none" />
            <div className="absolute top-2 right-2 bg-slate-900 text-white px-2 py-1 text-[9px] uppercase tracking-widest font-mono z-10">Live · 3D</div>
            <div className="absolute top-2 left-2 flex gap-1 z-10">
              <div className="bg-white border border-slate-200 px-2 py-1 text-[9px] uppercase tracking-widest font-mono">7 layers</div>
              <div className="bg-white border border-slate-200 px-2 py-1 text-[9px] uppercase tracking-widest font-mono">Adult ♂</div>
            </div>
            <div className="relative bg-gradient-to-b from-slate-50 to-white h-[580px] flex items-center justify-center">
              <Body3D layers={{ skin: 0.35, muscle: 0.55, bones: 0.85, organs: 0.9 }} spin className="w-full h-full" />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-slate-900 text-white p-3 rounded-lg font-mono text-xs shadow-xl" data-testid="hero-vitals-mini">
              <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-emerald-400 rounded-full vitals-flicker" /><span className="text-[9px] tracking-widest uppercase">Live · OR</span></div>
              <div>HR <span className="text-emerald-400">76</span></div>
              <div>BP <span>120/78</span></div>
              <div>SpO₂ <span className="text-sky-300">98%</span></div>
              <svg viewBox="0 0 100 20" className="w-24 h-6 mt-1">
                <path d="M0 10 L20 10 L23 4 L26 16 L29 10 L60 10 L65 6 L70 10 L100 10" stroke="#22C55E" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="absolute -bottom-3 -left-3 bg-white border border-slate-200 p-3 rounded-lg shadow-xl text-xs max-w-[200px]" data-testid="hero-tutor-mini">
              <div className="flex items-center gap-2 mb-1"><Sparkles className="w-3 h-3 text-blue-600" /><span className="font-mono text-[9px] uppercase tracking-widest">Dr. Ada · AI</span></div>
              <div className="text-slate-600 text-[11px] leading-snug">The <b>appendicular artery</b> lies in the mesoappendix. Clamp it before dividing.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="stripe-divider" />

      {/* How it works */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16">
          <div>
            <div className="label-caps mb-2">01 · Methodology</div>
            <h2 className="font-display text-4xl lg:text-5xl text-slate-900 leading-tight mb-6">Not a video.<br/>A live patient.</h2>
            <p className="text-slate-600 leading-relaxed mb-6">Every action has a physiological consequence. Every mistake is caught, explained, and graded. Every student leaves with a defensible transcript of their skills — not a certificate of watching.</p>
            <Link to="/register" className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 border-b border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">
              Start free — no card required <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-white p-8 hover-lift">
                <div className="font-mono text-4xl font-bold text-slate-200 mb-3">{s.n}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="label-caps mb-2">02 · The Library</div>
              <h2 className="font-display text-4xl lg:text-5xl text-slate-900">Every specialty. One platform.</h2>
            </div>
            <Link to="/simulations" className="text-sm font-medium underline underline-offset-4 hover:text-blue-600" data-testid="see-all-cats">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {CATS.map(([id, name, count]) => {
              const Icon = ICONS[id] || Activity;
              return (
                <Link key={id} to={`/simulations?category=${id}`} data-testid={`cat-${id}`}
                  className="bg-white p-6 hover-lift group flex flex-col justify-between h-40">
                  <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-slate-900 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-display text-lg font-semibold text-slate-900">{name}</div>
                    <div className="text-xs text-slate-500 mt-1">{count} simulations</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured procedure - dark strip */}
      <section className="surgical-dark py-20">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div>
            <div className="label-caps text-blue-400 mb-3">03 · Featured procedure</div>
            <h2 className="font-display text-4xl lg:text-5xl mb-4 leading-tight text-white">Open Appendectomy.<br/>12 steps. Real consequences.</h2>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">Scrub in, drape the patient, incise at McBurney's point, ligate the mesoappendix. Miss the appendicular artery and BP drops in real time. This is what makes faculty take us seriously.</p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {[['12', 'Steps'], ['25 min', 'Duration'], ['Intermediate', 'Difficulty'], ['OSATS', 'Rubric']].map(([v, l]) => (
                <div key={l} className="border-l-2 border-blue-500 pl-3">
                  <div className="font-mono text-lg font-bold text-white">{v}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">{l}</div>
                </div>
              ))}
            </div>
            <Link to="/procedure/sim-appendectomy" data-testid="featured-appendectomy"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-md text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">
              Enter OR
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 vitals-flicker" />
                <span className="text-[10px] uppercase tracking-widest text-slate-400">OR-3 · Live vitals</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Case A-22</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[['HR', '76', 'bpm', 'text-emerald-400'], ['BP', '120/78', 'mmHg', 'text-white'], ['SpO₂', '98', '%', 'text-sky-300'], ['RESP', '16', '/min', 'text-white'], ['TEMP', '36.8', '°C', 'text-white'], ['EBL', '80', 'mL', 'text-amber-300']].map(([l, v, u, c]) => (
                <div key={l} className="bg-slate-950/60 border border-slate-800 rounded p-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-slate-500">{l}</span>
                    <span className="text-[9px] font-mono text-slate-500">{u}</span>
                  </div>
                  <div className={`font-mono text-2xl font-bold ${c}`}>{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-slate-800 pt-3">
              <svg viewBox="0 0 600 60" className="w-full h-12">
                <path d="M0 30 L80 30 L92 30 L98 22 L104 40 L110 8 L116 50 L122 30 L200 30 L212 26 L218 34 L224 30 L340 30 L352 22 L358 40 L364 8 L370 50 L376 30 L500 30 L512 26 L518 34 L524 30 L600 30" stroke="#22C55E" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / trust */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="label-caps mb-2">04 · Trusted by educators</div>
          <h2 className="font-display text-4xl lg:text-5xl text-slate-900">Built with faculty. Loved by students.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Dr. Priya Menon, MBBS MS', role: 'Professor of Surgery, AIIMS', text: 'Finally a simulator our students actually reach for. The consequence engine forces genuine clinical thinking — not memorization.' },
            { name: 'Rahul K., 3rd year MBBS', role: 'GMC Chennai', text: "I've done the appendectomy 14 times. Every time Dr. Ada catches a different mistake I would've made in the OR." },
            { name: 'Dr. Amelia Chen, MD', role: 'Director of Medical Education', text: 'The OSATS-aligned scoring means we can defend our assessments to accreditation. This has replaced our observed logs.' },
          ].map((t) => (
            <div key={t.name} className="bg-white border border-slate-200 rounded-lg p-8 hover-lift">
              <Quote className="w-6 h-6 text-blue-600 mb-4" />
              <p className="text-slate-700 leading-relaxed mb-6">"{t.text}"</p>
              <div className="pt-6 border-t border-slate-100">
                <div className="font-display font-semibold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-500 mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
          <div className="label-caps text-blue-400 mb-3">Ready to scrub in?</div>
          <h2 className="font-display text-4xl lg:text-6xl mb-6 leading-tight max-w-3xl mx-auto">Your college may not have enough cadavers.<br/><span className="text-slate-500">You have unlimited patients.</span></h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link to="/register" data-testid="footer-cta"
              className="bg-white text-slate-900 px-6 py-3.5 rounded-md font-medium text-sm hover:bg-blue-500 hover:text-white transition-colors inline-flex items-center gap-2">
              Create free account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/explorer" className="border border-slate-700 text-slate-300 px-6 py-3.5 rounded-md font-medium text-sm hover:border-white hover:text-white transition-colors">
              Explore the body first
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-xs text-slate-500">
            {['Works on any laptop', 'No install required', 'OSATS-aligned scoring', 'Faculty tools included', 'Free for students'].map((f) => (
              <div key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {f}</div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>MedSim · Built for medical schools that don't have enough cadavers.</span>
          </div>
          <div>© 2026 · All simulations are educational and not for clinical use.</div>
        </div>
      </footer>
    </div>
  );
}
