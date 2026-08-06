import React from 'react';
import { Mail, Github, Users } from 'lucide-react';
import { Card } from '@/components/docs/Card';

export default function Contact() {
  return (
    <div className="space-y-6">
      <h2 id="get-in-touch">Contact Support & Collaborations</h2>
      <p>
        For inquiries regarding MedSim clinical curriculum deployment, developer onboarding, or research collaborations, reach out through the primary channels below.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 my-6">
        <Card title="Support Email" icon={Mail} description="Reach our engineering support desk for setup or hosting issues.">
          <a href="mailto:support@medsim.edu" className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono block mt-1 hover:underline">
            support@medsim.edu
          </a>
        </Card>
        <Card title="Repository" icon={Github} description="Submit issues, bug reports, and pull requests directly to the core development branch.">
          <a href="https://github.com/kunkashyap/SUEM" target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono block mt-1 hover:underline">
            github.com/kunkashyap/SUEM
          </a>
        </Card>
        <Card title="Academic Outreach" icon={Users} description="For medical school residency advisors requesting custom student roster setups.">
          <a href="mailto:curriculum@medsim.edu" className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono block mt-1 hover:underline">
            curriculum@medsim.edu
          </a>
        </Card>
      </div>

      <h2 id="contributing">Contributing Guidelines</h2>
      <p>
        We welcome community contributions. To propose edits:
      </p>
      <ol className="list-decimal pl-5 space-y-1.5 text-sm">
        <li>Fork the core branch and create a localized branch named <code>feature/your-change-name</code>.</li>
        <li>Ensure all local lint rules and styling variables check out (<code>npm run lint</code> / <code>yarn build</code>).</li>
        <li>Submit a clean Pull Request describing the modifications and detailing testing logs.</li>
      </ol>
    </div>
  );
}
