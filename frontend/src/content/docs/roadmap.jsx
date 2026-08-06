import React from 'react';
import { Timeline, TimelineItem } from '@/components/docs/Timeline';
import Callout from '@/components/docs/Callout';

export default function Roadmap() {
  return (
    <div className="space-y-6">
      <h2 id="development-strategy">Development Strategy</h2>
      <p>
        The development of MedSim is organized in stages, progressing from proof-of-concept models to high-fidelity, institution-level curriculum tools.
      </p>

      <Callout type="info" title="Current Deployment">
        We are currently in <strong>Phase 2 (Core Application release)</strong>. Multi-layer dissection models and standard student dashboards are fully active.
      </Callout>

      <h2 id="timeline">Milestone Timeline</h2>
      <p>
        The roadmap is categorized by weeks. Completed deliverables represent verified codebase changes; spec milestones represent upcoming features.
      </p>

      <Timeline>
        <TimelineItem
          week="Weeks 1 - 2"
          title="Foundation & Graphics Render"
          status="implemented"
          description="Establish WebGL render loop, import basic anatomical GLB assets, and build custom layer visibility controllers."
          deliverables={['Three.js Canvas integration', 'Layer dissection panel', 'Anatomical model controls', 'Client JWT Authentication']}
        />
        <TimelineItem
          week="Weeks 3 - 4"
          title="Procedure Engine & Scenarios"
          status="implemented"
          description="Define procedural milestone templates, build incision trackers, tool selectors, and integrate the socratic AI tutor mock system."
          deliverables={['Collision detection (scalpel/target)', 'Procedural step checker', 'Student metrics tracker', 'Surgical dashboard']}
        />
        <TimelineItem
          week="Weeks 5 - 6"
          title="Documentation & Refinements"
          status="implemented"
          description="Build out responsive client-side documentation pages, code-splitting modules, and verify isolation bounds."
          deliverables={['Responsive documentation layout', 'Client-side indexing search', 'Breadcrumbs & scrollspy', 'Unified status labels']}
        />
        <TimelineItem
          week="Weeks 7 - 8"
          title="Advanced AI Tutoring & LLM Sync"
          status="in-progress"
          description="Activating live streaming endpoints for the Dr. Ada AI Tutor, using advanced Anthropic Claude model prompts and socratic reasoning scripts."
          deliverables={['Live streaming chat responses', 'Context payload parsing (vitals/coordinates)', 'History retrieval database sync']}
        />
        <TimelineItem
          week="Weeks 9 - 12"
          title="CT/DICOM Volume Rendering"
          status="planned"
          description="Build a pure WebGL volume rendering engine that processes standard slice imaging inputs directly in the browser via Marching Cubes."
          deliverables={['Isosurface thresholding (Hounsfield Units)', 'DICOM slice loader', 'Client-side mesh compilation']}
        />
        <TimelineItem
          week="Future"
          title="Unity WebGL & Multi-Student OR"
          status="future-vision"
          description="Collaborative virtual operating rooms allowing multiple surgeons to coordinate training actions inside an embedded Unity container."
          deliverables={['Multi-user synchronization via WebSockets', 'Tactile haptic feedback integration', 'Complex trauma simulation templates']}
        />
      </Timeline>
    </div>
  );
}
