import React, { useMemo } from "react";
import * as THREE from "three";

export default function CollisionManager({ collisionState }) {
    const { isColliding, contactPoint, contactNormal } = collisionState;

    const highlightPosition = useMemo(() => {
        if (!contactPoint) return [0, 0, 0];
        // Slightly offset along normal to prevent z-fighting with heart mesh
        const offsetPoint = contactPoint.clone();
        if (contactNormal) {
            offsetPoint.addScaledVector(contactNormal, 0.003);
        }
        return [offsetPoint.x, offsetPoint.y, offsetPoint.z];
    }, [contactPoint, contactNormal]);

    if (!isColliding || !contactPoint) return null;

    return (
        <group position={highlightPosition}>
            {/* Darkened contact spot highlight */}
            <mesh>
                <sphereGeometry args={[0.018, 16, 16]} />
                <meshStandardMaterial
                    color="#200000"
                    emissive="#100000"
                    roughness={0.9}
                    metalness={0.1}
                    transparent
                    opacity={0.85}
                />
            </mesh>
        </group>
    );
}
