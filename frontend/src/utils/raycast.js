import * as THREE from "three";

// Reusable instances to prevent garbage collection overhead during high-frequency raycasting
const raycasterInstance = new THREE.Raycaster();
const tempDirection = new THREE.Vector3();
const meshCache = [];

/**
 * Collects all mesh children from a 3D object or scene group
 * @param {THREE.Object3D} root 
 * @returns {THREE.Mesh[]}
 */
export function getMeshesFromObject(root) {
    meshCache.length = 0;
    if (!root) return meshCache;

    root.traverse((child) => {
        if (child.isMesh && child.visible) {
            meshCache.push(child);
        }
    });

    return meshCache;
}

/**
 * Performs raycast collision test between blade tip and heart meshes
 * @param {THREE.Vector3} originPoint - Blade tip world position
 * @param {THREE.Vector3} headingVector - Scalpel forward vector or downward direction
 * @param {THREE.Object3D} heartRoot - Heart object/group
 * @param {number} maxDistance - Maximum collision distance threshold
 * @returns {{ hit: boolean, point: THREE.Vector3 | null, normal: THREE.Vector3 | null, distance: number, mesh: THREE.Mesh | null }}
 */
export function raycastBladeToMesh(originPoint, headingVector, heartRoot, maxDistance = 0.25) {
    if (!originPoint || !heartRoot) {
        return { hit: false, point: null, normal: null, distance: Infinity, mesh: null };
    }

    const targetMeshes = getMeshesFromObject(heartRoot);
    if (targetMeshes.length === 0) {
        return { hit: false, point: null, normal: null, distance: Infinity, mesh: null };
    }

    // Direction pointing from blade tip towards model center or negative Z/normal direction
    tempDirection.copy(headingVector).normalize();

    raycasterInstance.set(originPoint, tempDirection);
    raycasterInstance.far = maxDistance;

    const intersects = raycasterInstance.intersectObjects(targetMeshes, false);

    if (intersects.length > 0) {
        const firstHit = intersects[0];
        return {
            hit: true,
            point: firstHit.point.clone(),
            normal: firstHit.face ? firstHit.face.normal.clone().transformDirection(firstHit.object.matrixWorld) : new THREE.Vector3(0, 0, 1),
            distance: firstHit.distance,
            mesh: firstHit.object
        };
    }

    return { hit: false, point: null, normal: null, distance: Infinity, mesh: null };
}
