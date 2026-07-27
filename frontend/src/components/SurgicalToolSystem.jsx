import React, { useRef, useCallback } from "react";
import Scalpel from "./Scalpel";
import DragController from "./DragController";
import CollisionManager from "./CollisionManager";
import IncisionManager from "./IncisionManager";
import { useScalpelControls } from "../hooks/useScalpelControls";
import { useCollision } from "../hooks/useCollision";
import { useIncision } from "../hooks/useIncision";

/**
 * Generic Surgical Tool System Orchestrator
 * Connects tool input controls, collision detection, and surface incision drawing.
 * Scalable for future instruments (Scalpel, Forceps, Scissors, Needle Holder, etc.)
 */
export default function SurgicalToolSystem({ heartRootRef, activeTool = "scalpel" }) {
    const controls = useScalpelControls();
    const { collisionState, checkCollision } = useCollision(heartRootRef);
    const { incisions, recordContactPoint } = useIncision();

    // Callback called on every frame by the active surgical tool with current blade tip world position
    const handleBladeUpdate = useCallback((bladeWorldPosition, headingVector) => {
        if (!controls.isDragging) {
            // When not dragging, clear active collision state and line drawing
            if (collisionState.isColliding) {
                checkCollision(null, null);
            }
            recordContactPoint(null, false);
            return;
        }

        // Perform raycast collision check against heart mesh
        const collisionResult = checkCollision(bladeWorldPosition, headingVector);

        // Record contact point for incision drawing when touching heart while dragging
        if (collisionResult.isColliding && collisionResult.contactPoint) {
            recordContactPoint(collisionResult.contactPoint, true);
        } else {
            recordContactPoint(null, false);
        }
    }, [controls.isDragging, checkCollision, recordContactPoint, collisionState.isColliding]);

    return (
        <group name="SurgicalToolSystem">
            {/* Global Drag and Cursor Controller */}
            <DragController
                isHovered={controls.isHovered}
                isDragging={controls.isDragging}
                onPointerMove={controls.handlePointerMove}
                onPointerUp={controls.handlePointerUp}
            />

            {/* Render Active Instrument */}
            {activeTool === "scalpel" && (
                <Scalpel
                    controls={controls}
                    onBladeUpdate={handleBladeUpdate}
                />
            )}

            {/* Temporary Contact Spot Darkening Visual Feedback */}
            <CollisionManager collisionState={collisionState} />

            {/* Surgical Incision Lines Layer */}
            <IncisionManager incisions={incisions} />
        </group>
    );
}
