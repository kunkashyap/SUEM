# MedSim - 3D Medical Surgery Training Simulator

## Vision
"The PhET of Medical Education" — browser-based, 3D interactive surgical & anatomical simulation platform. Solves the real-world problem that medical colleges lack enough cadavers for practical training.

## Architecture
- Backend: FastAPI + MongoDB + JWT auth + Claude Sonnet 4-6 (via Emergent Universal LLM key)
- Frontend: React 19 + React Router + Tailwind + Shadcn UI + Recharts + custom SVG anatomy
- Deployment: Kubernetes, /api prefix routing, hot reload

## Implemented (2026-02)
### Backend
- JWT auth: register/login/me with student/faculty/admin roles
- Catalog: 14 simulations, 12 categories, 12-step appendectomy, 8 anatomy layers, 2 quizzes, 2 clinical cases
- Progress: attempts, dashboard aggregates, quiz submission with scoring, leaderboard
- AI Tutor: SSE streaming Claude Sonnet 4-6 via Emergent LLM key with scene-context grounding
- Global search across simulations, cases, anatomy

### Frontend
- Home: Rotating detailed anatomical hero, testimonials, methodology, categories, OR-monitor featured procedure, CTA
- Simulation Library with category & difficulty filters, tag chips, hover animations
- Full-Body 3D Explorer: 8 layers with checkbox + opacity slider, MRI/CT/X-ray imaging modes, rotate toggle, structure browser
- Surgical Mode (Appendectomy): cinematic OR field with sterile ring/drape, instrument tray (12 tools), OR-grade vitals monitor with ECG, mistake simulation → BP crash → bleeding, performance tracking
- Quiz Center with instant grading + explanations
- Clinical Cases with staged reveal (complaint→history→exam→labs→imaging→dx→plan)
- Student Dashboard: radial gauge, line chart, skill radar, recent attempts, weak areas
- Faculty Dashboard: cohort bar chart, student roster, top performers, upcoming assignments
- Persistent AI Tutor floating chat with quick-suggest chips, context-aware
- Leaderboard, Search, Explore, Login/Register with role select

## Test Credentials
- Student: student@medsim.io / Student123!
- Faculty: faculty@medsim.io / Faculty123!

## Backlog (P0/P1/P2)
- P0: Add more fully-simulated procedures (CPR, Suturing) with same depth as appendectomy
- P0: Real Three.js/WebGL 3D body (currently detailed layered SVG - very good but not true 3D)
- P1: Emergency Mode with timed patient crashing
- P1: Live OR Team mode (multi-user shared session)
- P1: Radiology reader (interactive CT/MRI navigator)
- P2: Tissue physics with soft-body deformation
- P2: VR headset support
- P2: Offline module packages
- P2: Voice AI tutor + speech recognition
- P2: Institutional SSO + LMS integration
