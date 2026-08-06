import React from 'react';
import Callout from '@/components/docs/Callout';
import CodeBlock from '@/components/docs/CodeBlock';

export default function Troubleshooting() {
  const npmError = `npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! Found: react@19.0.0`;

  const nodeEnvReset = `# Use Node 18 or 20
nvm use 20

# Clean packages and reinstall
rm -rf node_modules yarn.lock package-lock.json
yarn install`;

  return (
    <div className="space-y-6">
      <h2 id="common-errors">Common Setup Issues</h2>
      <p>
        Review these solutions if you run into environment configuration conflicts or runtime errors during development.
      </p>

      <h3 id="dependency-resolution">1. npm dependency conflicts (React 19)</h3>
      <p>
        MedSim uses React 19. Certain legacy third-party node packages might throw dependency resolution conflicts during standard <code>npm install</code>:
      </p>
      <CodeBlock code={npmError} language="plaintext" showLineNumbers={false} />
      <p>
        <strong>Solution:</strong> We recommend using <code>yarn</code> which handles the package-lock resolutions correctly. Alternatively, force npm to bypass the resolution tree:
      </p>
      <CodeBlock code="npm install --legacy-peer-deps" language="bash" showLineNumbers={false} />

      <h3 id="rendering-glitches">2. 3D Model Rendering Glitches / WebGL Crash</h3>
      <p>
        If the 3D body explorer renders as a blank screen or displays console warnings:
      </p>
      <ul className="list-disc pl-5 space-y-1.5">
        <li><strong>Verify WebGL support:</strong> Visit <a href="https://get.webgl.org/" target="_blank" rel="noreferrer">get.webgl.org</a> to confirm your browser enables hardware acceleration.</li>
        <li><strong>Graphics switching:</strong> On dual-GPU laptops (e.g., MacBook Pros, gaming laptops), verify that your browser is using the high-performance discrete GPU.</li>
      </ul>

      <h3 id="port-clash">3. Backend Port 5000 Collision</h3>
      <p>
        On macOS (Monterey and later), local port 5000 is occupied by the AirPlay Receiver service, causing the FastAPI server to crash on startup.
      </p>
      <p>
        <strong>Solution:</strong> Disable AirPlay Receiver:
      </p>
      <ol className="list-decimal pl-5 space-y-1.5">
        <li>Open macOS <strong>System Settings</strong>.</li>
        <li>Navigate to <strong>General &gt; Sharing</strong>.</li>
        <li>Toggle off <strong>AirPlay Receiver</strong>.</li>
        <li>Rerun <code>python server.py</code> in the backend directory.</li>
      </ol>

      <h3 id="missing-env">4. Missing Environment Variables (.env)</h3>
      <p>
        If the server fails to connect to MongoDB, verify that you have a <code>.env</code> file in the <code>backend/</code> folder with valid tokens:
      </p>
      <CodeBlock code="MONGO_URL=mongodb://localhost:27017/medsim
DB_NAME=medsim
JWT_SECRET=super_secret_jwt_sign_key" language="plaintext" fileName="backend/.env" showLineNumbers={false} />

      <Callout type="danger" title="Security Warning">
        Never commit your <code>.env</code> configurations or raw JWT keys to public Git repository branches. Add <code>.env</code> to your root <code>.gitignore</code> guidelines.
      </Callout>
    </div>
  );
}
