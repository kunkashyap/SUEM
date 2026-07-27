import React, { useMemo } from "react";
import * as THREE from "three";
import { createIncisionTubeGeometry } from "../utils/geometry";

function SingleIncisionMesh({ points }) {
    const geometry = useMemo(() => {
        return createIncisionTubeGeometry(points, 0.0035);
    }, [points]);

    if (!geometry) return null;

    return (
        <mesh geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial
                color="#3b0202"
                roughness={0.25}
                metalness={0.1}
                emissive="#000000"
            />
        </mesh>
    );
}

export default function IncisionManager({ incisions }) {
    if (!incisions || incisions.length === 0) return null;

    return (
        <group name="IncisionLayer">
            {incisions.map((pathPoints, index) => (
                <SingleIncisionMesh key={`incision-${index}-${pathPoints.length}`} points={pathPoints} />
            ))}
        </group>
    );
}
