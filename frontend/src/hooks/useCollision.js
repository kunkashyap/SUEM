import { useState, useRef, useCallback } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { raycastBladeToMesh } from "../utils/raycast";

const tempBladeDirection = new THREE.Vector3(0, 0, -1);

export function useCollision(heartRootRef, maxDistance = 0.35) {
    const [collisionState, setCollisionState] = useState({
        isColliding: false,
        contactPoint: null,
        contactNormal: null,
        contactMesh: null
    });

    const activePointRef = useRef(null);
    const activeNormalRef = useRef(null);

    const checkCollision = useCallback((bladePosition, headingVector) => {
        if (!heartRootRef?.current || !bladePosition) {
            if (collisionState.isColliding) {
                setCollisionState({
                    isColliding: false,
                    contactPoint: null,
                    contactNormal: null,
                    contactMesh: null
                });
            }
            return { isColliding: false, contactPoint: null, contactNormal: null };
        }

        // Direction facing down/towards organ surface
        const searchDirection = headingVector ? headingVector : tempBladeDirection;
        const result = raycastBladeToMesh(bladePosition, searchDirection, heartRootRef.current, maxDistance);

        if (result.hit && result.point) {
            activePointRef.current = result.point;
            activeNormalRef.current = result.normal;

            setCollisionState({
                isColliding: true,
                contactPoint: result.point,
                contactNormal: result.normal,
                contactMesh: result.mesh
            });

            return { isColliding: true, contactPoint: result.point, contactNormal: result.normal };
        } else {
            activePointRef.current = null;
            activeNormalRef.current = null;

            if (collisionState.isColliding) {
                setCollisionState({
                    isColliding: false,
                    contactPoint: null,
                    contactNormal: null,
                    contactMesh: null
                });
            }

            return { isColliding: false, contactPoint: null, contactNormal: null };
        }
    }, [heartRootRef, maxDistance, collisionState.isColliding]);

    return {
        collisionState,
        activePointRef,
        activeNormalRef,
        checkCollision
    };
}
