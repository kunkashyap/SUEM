import React from 'react';
import Callout from '@/components/docs/Callout';

export default function License() {
  return (
    <div className="space-y-6">
      <h2 id="mit-license">MIT License</h2>
      <p>
        MedSim core source code is distributed under the open-source MIT License.
      </p>

      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed">
{`Copyright (c) 2026 MedSim Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
      </div>

      <Callout type="note" title="Anatomical Models Assets Licensing">
        Anatomical GLTF assets, volumetric DICOM samples, and texture graphics uploaded to this project may be sourced from educational open archives (such as the NIH 3D Print Exchange) and are governed by their respective Creative Commons or institutional sharing policies.
      </Callout>
    </div>
  );
}
