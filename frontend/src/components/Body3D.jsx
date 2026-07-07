import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Simple stylized humanoid body in real 3D via three-fiber. */
function Body({ layers = {}, spin = true }) {
  const g = useRef();
  useFrame((_, dt) => { if (g.current && spin) g.current.rotation.y += dt * 0.35; });
  const op = (k, d = 1) => (layers[k] !== undefined ? layers[k] : d);

  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#E9B892', transparent: true, opacity: op('skin', 1), roughness: 0.7 }), [layers.skin]);
  const muscleMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#B91C1C', transparent: true, opacity: op('muscle', 0), roughness: 0.55 }), [layers.muscle]);
  const boneMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#F1EBD8', transparent: true, opacity: op('bones', 0), roughness: 0.35 }), [layers.bones]);
  const organMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#DC2626', transparent: true, opacity: op('organs', 0), roughness: 0.5, emissive: '#7C1D1D', emissiveIntensity: 0.25 }), [layers.organs]);

  return (
    <group ref={g} position={[0, -0.2, 0]}>
      {/* Skin figure */}
      <group>
        <mesh position={[0, 1.7, 0]} material={skinMat}><sphereGeometry args={[0.28, 32, 32]} /></mesh>
        <mesh position={[0, 1.1, 0]} material={skinMat}><capsuleGeometry args={[0.42, 0.6, 8, 24]} /></mesh>
        <mesh position={[0, 0.35, 0]} material={skinMat}><capsuleGeometry args={[0.36, 0.4, 8, 24]} /></mesh>
        <mesh position={[-0.55, 1.05, 0]} rotation={[0, 0, 0.15]} material={skinMat}><capsuleGeometry args={[0.11, 0.7, 8, 16]} /></mesh>
        <mesh position={[0.55, 1.05, 0]} rotation={[0, 0, -0.15]} material={skinMat}><capsuleGeometry args={[0.11, 0.7, 8, 16]} /></mesh>
        <mesh position={[-0.2, -0.35, 0]} material={skinMat}><capsuleGeometry args={[0.14, 0.75, 8, 16]} /></mesh>
        <mesh position={[0.2, -0.35, 0]} material={skinMat}><capsuleGeometry args={[0.14, 0.75, 8, 16]} /></mesh>
      </group>
      {/* Muscle undercoat */}
      <group>
        <mesh position={[0, 1.1, 0]} material={muscleMat}><capsuleGeometry args={[0.38, 0.55, 8, 24]} /></mesh>
        <mesh position={[0, 0.35, 0]} material={muscleMat}><capsuleGeometry args={[0.32, 0.35, 8, 24]} /></mesh>
      </group>
      {/* Bones */}
      <group>
        <mesh position={[0, 1.7, 0]} material={boneMat}><sphereGeometry args={[0.23, 24, 24]} /></mesh>
        {[...Array(12)].map((_, i) => (
          <mesh key={i} position={[0, 1.35 - i * 0.09, 0]} material={boneMat}><cylinderGeometry args={[0.06, 0.06, 0.035, 8]} /></mesh>
        ))}
        {[...Array(8)].map((_, i) => (
          <mesh key={`r${i}`} position={[0, 1.35 - i * 0.08, 0.03]} rotation={[0, 0, 0]} material={boneMat}>
            <torusGeometry args={[0.28 + i * 0.005, 0.012, 8, 32, Math.PI]} />
          </mesh>
        ))}
        <mesh position={[0, -0.2, 0]} material={boneMat}><boxGeometry args={[0.42, 0.14, 0.24]} /></mesh>
      </group>
      {/* Organs */}
      <group>
        <mesh position={[-0.05, 1.15, 0.1]} material={organMat}><sphereGeometry args={[0.12, 20, 20]} /></mesh>
        <mesh position={[-0.18, 1.15, 0]} material={organMat}><sphereGeometry args={[0.15, 20, 20]} /></mesh>
        <mesh position={[0.18, 1.15, 0]} material={organMat}><sphereGeometry args={[0.15, 20, 20]} /></mesh>
        <mesh position={[-0.12, 0.85, 0.08]} material={organMat}><boxGeometry args={[0.22, 0.14, 0.16]} /></mesh>
      </group>
    </group>
  );
}

export default function Body3D({ layers, spin = true, className = '' }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 1.2, 5.5], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={0.8} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#93C5FD" />
        <Body layers={layers} spin={spin} />
      </Canvas>
    </div>
  );
}
