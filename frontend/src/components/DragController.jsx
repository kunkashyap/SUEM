import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export default function DragController({
    isHovered,
    isDragging,
    onPointerMove,
    onPointerUp
}) {
    const { camera, pointer, controls, gl } = useThree();

    // Disable OrbitControls during dragging & re-enable on release
    useEffect(() => {
        if (controls) {
            controls.enabled = !isDragging;
        }
        return () => {
            if (controls) controls.enabled = true;
        };
    }, [isDragging, controls]);

    // Update document cursor style
    useEffect(() => {
        const domElement = gl.domElement;
        if (isDragging) {
            domElement.style.cursor = "grabbing";
            document.body.style.cursor = "grabbing";
        } else if (isHovered) {
            domElement.style.cursor = "grab";
            document.body.style.cursor = "grab";
        } else {
            domElement.style.cursor = "default";
            document.body.style.cursor = "default";
        }

        return () => {
            domElement.style.cursor = "default";
            document.body.style.cursor = "default";
        };
    }, [isHovered, isDragging, gl]);

    // Global pointer move and up handlers while dragging
    useEffect(() => {
        if (!isDragging) return;

        const handleWindowPointerMove = () => {
            if (onPointerMove) {
                onPointerMove(pointer, camera);
            }
        };

        const handleWindowPointerUp = () => {
            if (onPointerUp) {
                onPointerUp();
            }
        };

        window.addEventListener("pointermove", handleWindowPointerMove);
        window.addEventListener("pointerup", handleWindowPointerUp);

        return () => {
            window.removeEventListener("pointermove", handleWindowPointerMove);
            window.removeEventListener("pointerup", handleWindowPointerUp);
        };
    }, [isDragging, pointer, camera, onPointerMove, onPointerUp]);

    return null;
}
