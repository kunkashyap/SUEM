import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Inner component: loads /human.glb, auto-centers and auto-scales it,
 * enables vertex colors (COLOR_0) on all meshes, and optionally spins.
 */
function HumanModel({ spin = false }) {
  const groupRef = useRef();
  const { scene } = useGLTF('/human.glb');

  // Compute bounding box once → derive scale + centering offset
  const { scale, centerOffset } = useMemo(() => {
    if (!scene) return { scale: 1, centerOffset: [0, 0, 0] };
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Scale the model so its height fits ~3.5 Three.js units (fills the viewport)
    const targetHeight = 3.5;
    const s = targetHeight / (size.y || 1);

    return {
      scale: s,
      // Move scene root so the bounding-box centre lands at origin
      centerOffset: [-center.x, -center.y, -center.z],
    };
  }, [scene]);

  // Enable vertex colours on every mesh (the GLB embeds COLOR_0 attributes)
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const hasVertexColors = !!child.geometry.attributes.color;
        const applyToMat = (mat) => {
          if (!mat) return;
          if (hasVertexColors) mat.vertexColors = true;
          mat.side = THREE.DoubleSide;
          mat.needsUpdate = true;
        };
        if (Array.isArray(child.material)) {
          child.material.forEach(applyToMat);
        } else {
          applyToMat(child.material);
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Auto-rotate when spin prop is true (same speed as AnatomyFigure's CSS animation)
  useFrame((_, dt) => {
    if (groupRef.current && spin) {
      groupRef.current.rotation.y += dt * 0.26; // ≈ one full turn in ~24 s
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={scale}
        position={centerOffset}
      />
    </group>
  );
}

// Preload so the model is ready before the viewer mounts
useGLTF.preload('/human.glb');

/** Minimal placeholder rendered inside the canvas while the GLB is streaming */
function CanvasLoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.6, 1.8, 0.4]} />
      <meshStandardMaterial color="#CBD5E1" wireframe />
    </mesh>
  );
}

/**
 * Drop-in replacement for the SVG AnatomyFigure in FullBodyExplorer.
 * Accepts the same `spin` and `className` props.
 * OrbitControls give the user free orbit / zoom (no pan) — same UX as HeartViewer.
 */
export default function HumanModelViewer({ spin = false, className = '' }) {
  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting — bright enough to read anatomical detail */}
        <ambientLight intensity={1.8} />
        <directionalLight
          castShadow
          position={[5, 10, 6]}
          intensity={2.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 6, -4]} intensity={1.5} />
        <directionalLight position={[0, -4, 6]} intensity={0.8} />
        <directionalLight position={[0, 6, -10]} intensity={0.8} />

        <Suspense fallback={<CanvasLoadingFallback />}>
          <HumanModel spin={spin} />
        </Suspense>

        {/* Orbit controls — user can rotate, zoom; pan disabled to stay centred */}
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={2}
          maxDistance={12}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
}
