import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Heart() {

    const { scene } = useGLTF("/Heart.glb");

    useEffect(() => {
   

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
        <primitive
            object={scene}
            scale={0.30}
        />
    );
}