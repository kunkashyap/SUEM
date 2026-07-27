import * as THREE from "three";

/**
 * Calculates auto-scale factor for a GLTF model so it reaches target length (e.g. 16cm relative to heart)
 * @param {THREE.Object3D} object - Scalpel 3D object
 * @param {number} targetLength - Target max dimension in world units (default: 0.16)
 * @returns {{ scale: number, boundingBox: THREE.Box3, originalSize: THREE.Vector3 }}
 */
export function calculateModelScale(object, targetLength = 0.16) {
    if (!object) {
        return { scale: 1, boundingBox: new THREE.Box3(), originalSize: new THREE.Vector3(1, 1, 1) };
    }

    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDimension = Math.max(size.x, size.y, size.z);
    
    // Fallback if model has 0 size
    if (maxDimension === 0) {
        return { scale: 1, boundingBox: box, originalSize: size };
    }

    const scale = targetLength / maxDimension;

    return {
        scale,
        boundingBox: box,
        originalSize: size
    };
}

/**
 * Inspects GLB scenes, computes bounding boxes using THREE.Box3, centers both models,
 * and automatically calculates scale multipliers so the scalpel length is anatomically proportional
 * (approx 1/3 to 1/2 of heart height).
 *
 * @param {THREE.Object3D} heartScene 
 * @param {THREE.Object3D} scalpelScene 
 * @param {number} targetRatio - Ratio of scalpel length relative to heart height (default: 0.40)
 * @param {number} targetHeartHeight - Desired height of heart in world space (default: 2.4)
 */
export function calculateNormalizedScales(heartScene, scalpelScene, targetRatio = 0.40, targetHeartHeight = 2.4) {
    const defaultRes = {
        heartScale: 0.32,
        heartCenterOffset: new THREE.Vector3(0, 0, 0),
        heartSize: new THREE.Vector3(1, 1, 1),
        scalpelScale: 0.042,
        scalpelCenterOffset: new THREE.Vector3(0, 0, 0),
        scalpelSize: new THREE.Vector3(1, 1, 1),
        bladeTipOffset: new THREE.Vector3(0, -0.5, 0)
    };

    if (!heartScene || !scalpelScene) return defaultRes;

    // Heart Bounding Box
    const heartBox = new THREE.Box3().setFromObject(heartScene);
    const heartSize = new THREE.Vector3();
    heartBox.getSize(heartSize);
    const heartCenter = new THREE.Vector3();
    heartBox.getCenter(heartCenter);

    // Heart scale so height in world space is targetHeartHeight
    const heartScale = targetHeartHeight / (heartSize.y || 1);
    const heartWorldHeight = heartSize.y * heartScale;
    const heartWorldWidth = heartSize.x * heartScale;
    const heartWorldDepth = heartSize.z * heartScale;

    // Scalpel Bounding Box
    const scalpelBox = new THREE.Box3().setFromObject(scalpelScene);
    const scalpelSize = new THREE.Vector3();
    scalpelBox.getSize(scalpelSize);
    const scalpelCenter = new THREE.Vector3();
    scalpelBox.getCenter(scalpelCenter);

    // Major dimension of scalpel (Y axis in GLB)
    const scalpelMajorLength = scalpelSize.y || Math.max(scalpelSize.x, scalpelSize.y, scalpelSize.z);

    // Scalpel target length = targetRatio (e.g. 40%) * heartWorldHeight
    const targetScalpelWorldLength = heartWorldHeight * targetRatio;
    const scalpelScale = targetScalpelWorldLength / (scalpelMajorLength || 1);
    const scalpelWorldLength = scalpelMajorLength * scalpelScale;

    // Dynamic Blade Tip Offset in centered local scalpel space (tip at min Y of scalpel box)
    const bladeTipOffset = new THREE.Vector3(0, scalpelBox.min.y - scalpelCenter.y, 0);

    // Diagnostic console logging as required by instructions
    console.log("=== 3D Model Scale Normalization ===");
    console.log("Heart Raw Bounds:", { min: heartBox.min, max: heartBox.max });
    console.log("Heart Raw Size (X,Y,Z):", heartSize);
    console.log("Heart Raw Center:", heartCenter);
    console.log("Heart World Scale:", heartScale);
    console.log(`Heart World Dimensions: ${heartWorldWidth.toFixed(3)} x ${heartWorldHeight.toFixed(3)} x ${heartWorldDepth.toFixed(3)}`);
    console.log("Scalpel Raw Bounds:", { min: scalpelBox.min, max: scalpelBox.max });
    console.log("Scalpel Raw Size (X,Y,Z):", scalpelSize);
    console.log("Scalpel Raw Center:", scalpelCenter);
    console.log("Scalpel World Scale:", scalpelScale);
    console.log(`Scalpel World Major Length: ${scalpelWorldLength.toFixed(3)}`);
    console.log(`Scalpel / Heart Height Ratio: ${(scalpelWorldLength / heartWorldHeight * 100).toFixed(1)}%`);

    return {
        heartScale,
        heartCenterOffset: heartCenter.clone().negate(),
        heartSize,
        scalpelScale,
        scalpelCenterOffset: scalpelCenter.clone().negate(),
        scalpelSize,
        bladeTipOffset
    };
}

/**
 * Interpolates vector position smoothly using lerp
 * @param {THREE.Vector3} current 
 * @param {THREE.Vector3} target 
 * @param {number} alpha 
 */
export function lerpVector(current, target, alpha = 0.2) {
    current.lerp(target, alpha);
}

/**
 * Interpolates quaternion rotation smoothly using slerp
 * @param {THREE.Quaternion} current 
 * @param {THREE.Quaternion} target 
 * @param {number} alpha 
 */
export function slerpQuaternion(current, target, alpha = 0.2) {
    current.slerp(target, alpha);
}

/**
 * Creates 3D incision tube geometry along recorded contact points
 * @param {THREE.Vector3[]} points 
 * @param {number} radius 
 * @returns {THREE.BufferGeometry | null}
 */
export function createIncisionTubeGeometry(points, radius = 0.004) {
    if (!points || points.length < 2) return null;

    try {
        const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
        const tubularSegments = Math.max(8, points.length * 4);
        return new THREE.TubeGeometry(curve, tubularSegments, radius, 8, false);
    } catch (err) {
        console.warn("Failed to generate incision geometry:", err);
        return null;
    }
}
