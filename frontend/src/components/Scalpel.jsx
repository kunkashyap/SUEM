import React, { useEffect, useRef, useMemo, Component } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { calculateModelScale, calculateNormalizedScales } from "../utils/geometry";

class ScalpelErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Scalpel load error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Html position={[1.3, 0.1, 0.5]} center>
                    <div style={{
                        background: "rgba(30, 0, 0, 0.85)",
                        color: "#ff6b6b",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 107, 107, 0.4)",
                        fontSize: "14px",
                        fontWeight: "600",
                        pointerEvents: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
                    }}>
                        Unable to load surgical tool.
                    </div>
                </Html>
            );
        }
        return this.props.children;
    }
}

function ScalpelModel({
    controls,
    onBladeUpdate
}) {
    const { scene, animations } = useGLTF("/Scalpel.glb");
    const heartGLTF = useGLTF("/Heart.glb");
    const groupRef = useRef();
    const { actions } = useAnimations(animations, groupRef);

    // Calculate dynamic scale normalization relative to Heart GLB bounding box
    const { scalpelScale, scalpelCenterOffset, bladeTipOffset } = useMemo(() => {
        return calculateNormalizedScales(heartGLTF.scene, scene, 0.40, 2.4);
    }, [heartGLTF.scene, scene]);

    const bladeTipOffsetRef = useRef(bladeTipOffset);
    useEffect(() => {
        bladeTipOffsetRef.current = bladeTipOffset;
    }, [bladeTipOffset]);

    // Enable shadows on all child meshes
    useEffect(() => {
        if (!scene) return;
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material.envMapIntensity = 2.5;
                }
            }
        });
    }, [scene]);

    // Play idle animation if present in GLB
    useEffect(() => {
        if (actions && Object.keys(actions).length > 0) {
            const firstActionName = Object.keys(actions)[0];
            actions[firstActionName]?.play();
        }
    }, [actions]);

    // Frame loop to interpolate 3D transform and pass blade tip world position to collision engine
    useFrame(() => {
        if (!groupRef.current) return;

        // Position & Quaternion smoothly updated by controls
        groupRef.current.position.copy(controls.currentPosition.current);
        groupRef.current.quaternion.copy(controls.currentQuaternion.current);

        // Compute blade tip world position
        const bladeWorldPos = groupRef.current.localToWorld(bladeTipOffsetRef.current.clone());
        if (onBladeUpdate) {
            onBladeUpdate(bladeWorldPos, controls.headingVector.current);
        }
    });

    const centerPos = useMemo(() => [
        scalpelCenterOffset.x,
        scalpelCenterOffset.y,
        scalpelCenterOffset.z
    ], [scalpelCenterOffset]);

    return (
        <group
            ref={groupRef}
            scale={[scalpelScale, scalpelScale, scalpelScale]}
            onPointerDown={controls.handlePointerDown}
            onPointerOver={controls.handlePointerOver}
            onPointerOut={controls.handlePointerOut}
        >
            <primitive object={scene} position={centerPos} />
        </group>
    );
}

// Preload GLTF model
useGLTF.preload("/Scalpel.glb");

export default function Scalpel(props) {
    return (
        <ScalpelErrorBoundary>
            <ScalpelModel {...props} />
        </ScalpelErrorBoundary>
    );
}
