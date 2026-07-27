import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

export default function Heart() {
    const { scene } = useGLTF("/Heart.glb");

    const { scale, centerOffset } = useMemo(() => {
        if (!scene) return { scale: 0.32, centerOffset: [0, 0, 0] };
        const box = new THREE.Box3().setFromObject(scene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Normalize heart to 2.4 units vertical height in world space
        const targetHeight = 2.4;
        const heartScale = targetHeight / (size.y || 1);

        return {
            scale: heartScale,
            centerOffset: [-center.x, -center.y, -center.z]
        };
    }, [scene]);

    useEffect(() => {
        if (!scene) return;
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.side = THREE.DoubleSide;
                child.material.envMapIntensity = 3;
            }
        });
    }, [scene]);

    return (
        <group position={[0, 0, 0]}>
            <primitive
                object={scene}
                scale={scale}
                position={centerOffset}
            />
        </group>
    );
}

useGLTF.preload("/Heart.glb");