import React from 'react';
import Callout from '@/components/docs/Callout';
import CodeBlock from '@/components/docs/CodeBlock';
import { Tabs, Tab } from '@/components/docs/Tabs';

export default function GettingStarted() {
  const reqCode = `# Node Environment check
node -v  # Recommended >= 18
npm -v   # Recommended >= 9

# Python Environment check
python --version # Recommended >= 3.10
pip --version`;

  const installCode = `# Clone the repository
git clone https://github.com/kunkashyap/SUEM.git
cd SUEM

# Install Frontend dependencies
cd frontend
yarn install  # or npm install

# Install Backend dependencies
cd ../backend
pip install -r requirements.txt`;

  const runCode = `# Terminal 1: Launch Backend API
cd backend
python server.py

# Terminal 2: Launch Frontend App
cd frontend
yarn start    # or npm start`;

  const projectStruct = `SUEM/
├── backend/                  # Python API server
│   ├── server.py             # Main entry point & routing
│   ├── data.py               # Seed data, models, DB representations
│   └── requirements.txt      # Python package listings
├── frontend/                 # React SPA application
│   ├── public/               # Public assets & static index
│   ├── src/
│   │   ├── components/       # Custom React widgets (Nav, Body3D, UI)
│   │   ├── context/          # State managers (Auth, Theme)
│   │   ├── pages/            # Core views (Home, Explorer, Dashboards)
│   │   ├── lib/              # Client helpers (axios wrappers)
│   │   ├── index.js          # App mounting root
│   │   └── App.js            # Routing registry
│   └── craco.config.js       # CRA configurations override
└── vercel.json               # Cloud deployment configurations`;

  return (
    <div className="space-y-6">
      <h2 id="requirements">System Requirements</h2>
      <p>
        Ensure your local machine satisfies the following prerequisites before initiating the installation process:
      </p>
      <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-lg">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
          <thead className="bg-slate-50 dark:bg-slate-950/20">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-slate-900 dark:text-slate-100">Component</th>
              <th className="px-4 py-3 text-left font-bold text-slate-900 dark:text-slate-100">Required</th>
              <th className="px-4 py-3 text-left font-bold text-slate-900 dark:text-slate-100">Recommended</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <tr>
              <td className="px-4 py-3 font-semibold">Node.js</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">v18.0.0</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">v20.x.x (LTS)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Python</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">3.9.0</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">3.11.x</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Memory</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">8 GB RAM</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">16 GB RAM</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Browser</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">WebGL compatible</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Chrome, Safari (v16+)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CodeBlock code={reqCode} language="bash" fileName="Environment Verification" />

      <h2 id="installation">Installation Steps</h2>
      <p>
        MedSim utilizes a dual-tier stack. You will need to clone the repository and install both frontend Node modules and backend Python modules:
      </p>

      <CodeBlock code={installCode} language="bash" fileName="Installation commands" />

      <h2 id="running-locally">Running Locally</h2>
      <p>
        To run the complete platform locally, initiate the Python server and the React dev compiler simultaneously in separate console tabs:
      </p>

      <CodeBlock code={runCode} language="bash" fileName="Startup commands" />

      <Callout type="warning" title="API Port Collision">
        The Python server binds to <code>localhost:5000</code> by default. Ensure this port is not occupied by other background processes (like macOS AirPlay Receiver).
      </Callout>

      <h2 id="project-structure">Project Directory Structure</h2>
      <p>
        The repository is divided into two primary root-level modules:
      </p>

      <CodeBlock code={projectStruct} language="plaintext" fileName="Project Tree" showLineNumbers={false} />
    </div>
  );
}
