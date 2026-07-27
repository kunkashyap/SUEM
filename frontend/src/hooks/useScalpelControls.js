import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const DEFAULT_SPAWN = new THREE.Vector3(-1.35, 0.2, 0.6);
const tempPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.5);
const tempRaycaster = new THREE.Raycaster();
const tempIntersection = new THREE.Vector3();
const tempUp = new THREE.Vector3(0, 1, 0);
const tempForward = new THREE.Vector3();
const tempMatrix = new THREE.Matrix4();
const defaultQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.3, 0.4, -0.6));

export function useScalpelControls(initialPosition = DEFAULT_SPAWN) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const currentPosition = useRef(initialPosition.clone());
    const targetPosition = useRef(initialPosition.clone());
    const lastPosition = useRef(initialPosition.clone());
    
    const currentQuaternion = useRef(defaultQuaternion.clone());
    const targetQuaternion = useRef(defaultQuaternion.clone());

    const headingVector = useRef(new THREE.Vector3(0, -1, 0));

    // Handle pointer start
    const handlePointerDown = useCallback((e) => {
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    // Handle pointer release
    const handlePointerUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Handle pointer enter
    const handlePointerOver = useCallback((e) => {
        e.stopPropagation();
        setIsHovered(true);
    }, []);

    // Handle pointer leave
    const handlePointerOut = useCallback(() => {
        if (!isDragging) {
            setIsHovered(false);
        }
    }, [isDragging]);

    // Update target position based on pointer move across interaction plane
    const handlePointerMove = useCallback((pointer, camera) => {
        if (!isDragging || !camera) return;

        tempRaycaster.setFromCamera(pointer, camera);
        
        // Raycast against Z depth plane facing camera
        tempPlane.constant = -currentPosition.current.z;
        if (tempRaycaster.ray.intersectPlane(tempPlane, tempIntersection)) {
            targetPosition.current.copy(tempIntersection);

            // Compute delta motion vector for smooth rotation along movement direction
            const movementDelta = new THREE.Vector3().subVectors(targetPosition.current, lastPosition.current);
            movementDelta.z = 0; // Keep rotation natural in XY plane

            if (movementDelta.lengthSq() > 0.00005) {
                headingVector.current.copy(movementDelta).normalize();

                // Orient scalpel along motion vector with downward tilt for natural blade cutting angle
                const angle = Math.atan2(movementDelta.y, movementDelta.x);
                const euler = new THREE.Euler(-0.3, 0.1, angle - Math.PI / 2);
                targetQuaternion.current.setFromEuler(euler);
            }

            lastPosition.current.copy(targetPosition.current);
        }
    }, [isDragging]);

    // Frame loop for smooth interpolation
    useFrame((state, delta) => {
        // Smooth lerp for position (no jittering/teleporting)
        const lerpFactor = Math.min(1, delta * 12);
        currentPosition.current.lerp(targetPosition.current, lerpFactor);

        // Smooth slerp for rotation (never snaps)
        const slerpFactor = Math.min(1, delta * 10);
        currentQuaternion.current.slerp(targetQuaternion.current, slerpFactor);
    });

    return {
        isHovered,
        isDragging,
        currentPosition,
        targetPosition,
        currentQuaternion,
        targetQuaternion,
        headingVector,
        handlePointerDown,
        handlePointerUp,
        handlePointerOver,
        handlePointerOut,
        handlePointerMove,
        setIsDragging
    };
}
