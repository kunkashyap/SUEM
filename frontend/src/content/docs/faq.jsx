import React from 'react';
import { Accordion, AccordionItem } from '@/components/docs/Accordion';
import Callout from '@/components/docs/Callout';

export default function FAQ() {
  return (
    <div className="space-y-6">
      <h2 id="general-questions">Frequently Asked Questions</h2>
      <p>
        Review these solutions to common academic, technical, and operational questions about the MedSim surgical simulator.
      </p>

      <Accordion allowMultiple={true}>
        <AccordionItem title="Does MedSim require standard VR headsets or special hardware?">
          <p>
            No. MedSim is designed to run directly in modern, WebGL-compatible web browsers (Chrome, Safari, Firefox, Edge) on standard laptops, desktops, or tablets. Tactile inputs (mouse, trackpad, touchscreen) are fully supported. VR headsets are not required.
          </p>
        </AccordionItem>
        <AccordionItem title="Can MedSim be deployed completely offline or on a local intranet?">
          <p>
            Yes. The system is architected as an isolated static React frontend and a FastAPI backend. With a local build and seeded mock data configurations, MedSim can operate without internet access in clinical classrooms or university intranets. Only the AI Tutor features (which call cloud LLM services) require active internet routing.
          </p>
        </AccordionItem>
        <AccordionItem title="How does the AI Tutor monitor student performance?">
          <p>
            The student's client-side runtime registers every active mouse action, surgical tool selection, anatomical collision event, and vital sign threshold. When asking questions, this scene context is parsed as metadata along with the chat request, allowing the AI tutor to give highly contextual, patient-specific advice.
          </p>
        </AccordionItem>
        <AccordionItem title="Is the anatomical structure editable for custom procedure creation?">
          <p>
            Anatomy meshes are imported as standard GLTF/GLB models. The layers, visibility parameters, step targets, and collision constraints are defined inside JSON data objects. Advanced faculty users can modify these schema files to customize procedural flows or emphasize different anatomical anomalies.
          </p>
        </AccordionItem>
        <AccordionItem title="What licensing governs MedSim distributions?">
          <p>
            MedSim core codebase is distributed under the MIT open-source license. The accompanying anatomical models and assets may be subject to specific clinical licenses. Check the License page for full details.
          </p>
        </AccordionItem>
      </Accordion>

      <Callout type="note" title="Still have questions?">
        If you have an academic inquiry or need additional dev support, please refer to the Contact page to reach the project leads.
      </Callout>
    </div>
  );
}
