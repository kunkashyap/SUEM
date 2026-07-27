import { useState, useRef, useCallback } from "react";
import * as THREE from "three";

const MIN_POINT_DISTANCE = 0.015; // Minimum distance between recorded cut vertices

export function useIncision() {
    const [incisions, setIncisions] = useState([]);
    const currentIncisionRef = useRef([]);

    const recordContactPoint = useCallback((contactPoint, isDragging) => {
        if (isDragging && contactPoint) {
            const currentPoints = currentIncisionRef.current;
            const newPoint = contactPoint.clone();

            if (currentPoints.length === 0) {
                currentIncisionRef.current = [newPoint];
            } else {
                const lastPoint = currentPoints[currentPoints.length - 1];
                if (lastPoint.distanceTo(newPoint) >= MIN_POINT_DISTANCE) {
                    currentIncisionRef.current = [...currentPoints, newPoint];
                    
                    // Force re-render to display live incision line being drawn
                    setIncisions((prev) => {
                        const existing = prev.filter(p => p !== currentPoints);
                        return [...existing, currentIncisionRef.current];
                    });
                }
            }
        } else {
            // Releasing drag or ending contact: commit active cut line
            if (currentIncisionRef.current.length >= 2) {
                currentIncisionRef.current = [];
            } else {
                // Remove incomplete single point cuts
                setIncisions((prev) => prev.filter(p => p !== currentIncisionRef.current));
                currentIncisionRef.current = [];
            }
        }
    }, []);

    const clearAllIncisions = useCallback(() => {
        currentIncisionRef.current = [];
        setIncisions([]);
    }, []);

    return {
        incisions,
        currentIncision: currentIncisionRef.current,
        recordContactPoint,
        clearAllIncisions
    };
}
