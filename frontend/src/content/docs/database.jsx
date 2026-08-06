import React from 'react';
import Callout from '@/components/docs/Callout';

export default function DatabaseSchema() {
  return (
    <div className="space-y-6">
      <h2 id="logical-data-model">Logical Data Model</h2>
      <p>
        MedSim utilizes a lightweight relational model for persistent storage of user credentials, procedure lists, clinical study guides, and user performance records.
      </p>

      <Callout type="info" title="Implementation Isolation">
        The database tables are represented inside <code>backend/data.py</code> as logical mock datasets and JSON schemas to maintain portable local execution. No direct database connection details or credentials are hardcoded.
      </Callout>

      <h2 id="user-model">Users Model</h2>
      <p>
        Stores authentication credentials and permissions. There are two roles: <code>student</code> and <code>faculty</code>.
      </p>
      <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-lg text-sm">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-950/20">
            <tr>
              <th className="px-4 py-2.5 text-left font-bold text-slate-900 dark:text-slate-100">Field</th>
              <th className="px-4 py-2.5 text-left font-bold text-slate-900 dark:text-slate-100">Type</th>
              <th className="px-4 py-2.5 text-left font-bold text-slate-900 dark:text-slate-100">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">id</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">string</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Unique identifier (UUID v4)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">email</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">string</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">User login account email (Unique)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">password_hash</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">string</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Secured bcrypt password signature</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">name</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">string</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Full name of the user</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">role</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">enum</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Access permission level: <code>student</code> or <code>faculty</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="simulations-model">Simulation Template Schema</h2>
      <p>
        Defines standard interactive procedural scenarios.
      </p>
      <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-lg text-sm">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-950/20">
            <tr>
              <th className="px-4 py-2.5 text-left font-bold text-slate-900 dark:text-slate-100">Field</th>
              <th className="px-4 py-2.5 text-left font-bold text-slate-900 dark:text-slate-100">Type</th>
              <th className="px-4 py-2.5 text-left font-bold text-slate-900 dark:text-slate-100">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">id</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">string</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Unique identifier for the simulation template</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">title</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">string</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Name of the surgical procedure (e.g. Appendectomy)</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">difficulty</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">enum</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Level categorization: <code>beginner</code>, <code>intermediate</code>, <code>advanced</code></td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">steps</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">array</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Structured array specifying milestone goals, descriptions, and coordinates</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="sessions-model">Session Records Schema</h2>
      <p>
        Tracks user surgical simulation performance logs.
      </p>
      <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-lg text-sm">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-950/20">
            <tr>
              <th className="px-4 py-2.5 text-left font-bold text-slate-900 dark:text-slate-100">Field</th>
              <th className="px-4 py-2.5 text-left font-bold text-slate-900 dark:text-slate-100">Type</th>
              <th className="px-4 py-2.5 text-left font-bold text-slate-900 dark:text-slate-100">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">id</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">string</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Unique identifier for the session run</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">user_id</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">string</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Foreign key linking the user table</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">sim_id</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">string</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Foreign key linking the simulation template table</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">score</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">integer</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Numerical performance score graded from 0 to 100</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">errors</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">array</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Detailed list of runtime surgical errors or precision alerts</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 font-mono text-xs font-semibold">completed_at</td>
              <td className="px-4 py-2.5 font-mono text-xs text-slate-500">timestamp</td>
              <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">Time indicating session completion</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
