import React from 'react';
import Callout from '@/components/docs/Callout';
import { ApiCard } from '@/components/docs/Card';
import CodeBlock from '@/components/docs/CodeBlock';

export default function ApiReference() {
  const regReq = `{
  "email": "student@medsim.edu",
  "password": "securepassword123",
  "name": "Alex Mercer",
  "role": "student",
  "institution": "Johns Hopkins Medicine"
}`;

  const regRes = `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "u-472a-11ee",
    "email": "student@medsim.edu",
    "name": "Alex Mercer",
    "role": "student",
    "institution": "Johns Hopkins Medicine",
    "xp": 0,
    "streak": 0,
    "created_at": "2026-08-06T00:00:00Z"
  }
}`;

  const simListRes = `[
  {
    "id": "appendectomy",
    "title": "Laparoscopic Appendectomy",
    "category": "General Surgery",
    "difficulty": "Intermediate",
    "description": "Excision of the vermiform appendix for acute appendicitis."
  }
]`;

  const attemptReq = `{
  "simulation_id": "appendectomy",
  "accuracy": 92,
  "duration_sec": 480,
  "blood_loss_ml": 25,
  "wrong_actions": 1,
  "missed_steps": 0,
  "grade": "A"
}`;

  return (
    <div className="space-y-6">
      <h2 id="authentication">Authentication</h2>
      <p>
        The MedSim API protects endpoints using standard JSON Web Token (JWT) authorization header tokens. Requests made to secure routes must include the token using the bearer scheme:
      </p>
      <CodeBlock code="Authorization: Bearer <your-jwt-token>" language="http" showLineNumbers={false} />

      <h2 id="auth-endpoints">Authentication Endpoints</h2>

      <ApiCard
        method="POST"
        path="/api/auth/register"
        title="User Registration"
        description="Creates a new student or faculty account, automatically returning a valid authorization token."
        params={[
          { name: 'email', type: 'string', required: true, description: 'Unique user email address.' },
          { name: 'password', type: 'string', required: true, description: 'Plaintext password (hashed server-side).' },
          { name: 'name', type: 'string', required: true, description: 'Full username.' },
          { name: 'role', type: 'string', required: false, description: 'Permitted: student or faculty (default: student).' },
        ]}
      >
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Request Payload</h6>
            <CodeBlock code={regReq} language="json" showLineNumbers={false} />
          </div>
          <div>
            <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Response JSON (201 Created)</h6>
            <CodeBlock code={regRes} language="json" showLineNumbers={false} />
          </div>
        </div>
      </ApiCard>

      <ApiCard
        method="POST"
        path="/api/auth/login"
        title="User Login"
        description="Authenticates existing credentials, returning a JWT bearer token."
        params={[
          { name: 'email', type: 'string', required: true, description: 'User login email.' },
          { name: 'password', type: 'string', required: true, description: 'User account password.' },
        ]}
      />

      <h2 id="simulations-endpoints">Simulation & Procedure Endpoints</h2>

      <ApiCard
        method="GET"
        path="/api/simulations"
        title="List Simulations"
        description="Retrieves a list of all active surgical simulation templates seeded inside the database."
      >
        <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Response Array (200 OK)</h6>
        <CodeBlock code={simListRes} language="json" showLineNumbers={false} />
      </ApiCard>

      <ApiCard
        method="GET"
        path="/api/simulations/{sim_id}"
        title="Simulation Details"
        description="Fetch a specific simulation run with active coordinates, layers, and procedure steps."
      />

      <h2 id="performance-endpoints">Performance & Metrics Endpoints</h2>

      <ApiCard
        method="POST"
        path="/api/attempts"
        title="Log Simulation Attempt"
        description="Logs performance metrics of a completed surgical run (JWT Auth required)."
        params={[
          { name: 'simulation_id', type: 'string', required: true, description: 'Reference ID of the procedure.' },
          { name: 'accuracy', type: 'integer', required: true, description: 'Surgical accuracy (0-100).' },
          { name: 'duration_sec', type: 'integer', required: true, description: 'Duration of procedure in seconds.' },
          { name: 'blood_loss_ml', type: 'integer', required: false, description: 'Estimated blood loss during surgery.' },
        ]}
      >
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Request Body</h6>
            <CodeBlock code={attemptReq} language="json" showLineNumbers={false} />
          </div>
          <div>
            <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Response status</h6>
            <div className="p-3 border border-slate-200 dark:border-slate-800 rounded bg-slate-50 dark:bg-slate-950/20 text-xs font-mono">
              201 Created | Resource Saved
            </div>
          </div>
        </div>
      </ApiCard>

      <h2 id="developmental-endpoints">Upcoming / In-Progress Endpoints</h2>
      <Callout type="warning" title="Mocked / Planned Actions">
        The following endpoints are defined conceptually and will be mapped to active services in upcoming release iterations. Do not consume these endpoints in production workflows.
      </Callout>

      <ApiCard
        method="POST"
        path="/api/tutor/chat"
        title="AI Tutor Query"
        description="POST request payload to query the Dr. Ada AI Tutor panel (Contextual socratic prompt engine)."
        params={[
          { name: 'session_id', type: 'string', required: true, description: 'Active procedure player session identifier.' },
          { name: 'message', type: 'string', required: true, description: 'Student message prompt text.' },
          { name: 'context', type: 'object', required: false, description: 'Dynamic scene metrics (vitals, coordinates, selected tool).' },
        ]}
      />
    </div>
  );
}
