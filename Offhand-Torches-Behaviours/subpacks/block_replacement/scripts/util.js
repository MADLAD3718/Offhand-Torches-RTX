/** @typedef {{x: Number, y: Number, z: Number}} Vector3 */
/** @typedef {{from: Vector3, to: Vector3}} BlockVolume */

import { add, mul, sub, toVec3 } from "./vectors";
import { Direction } from "@minecraft/server";

/**
 * Creates a cube shaped block volume based on a center and span from center point.
 * @param {Vector3} center 
 * @param {Vector3} span 
 * @returns {BlockVolume}
 */
export function createVolumeFromCenter(center, span) {
    return {
        from: sub(center, span),
        to: add(center, span)
    }
}

/**
 * Returns a block volume containing all blocks in a given chunk.
 * @param {Vector3} chunk 
 * @returns {BlockVolume}
 */
export function chunkToBlockVolume(chunk) {
    const origin = mul(chunk, 16);
    return {
        from: origin,
        to: add(origin, toVec3(15))
    }
}

/**
 * Returns the corresponding block face to the given torch direction.
 * @param {String} dir 
 * @returns {Direction}
 */
export function torchDirectionToBlockFace(dir) {
    switch (dir) {
        case "top": return "up";
        case "north": return "south";
        case "south": return "north";
        case "east": return "west";
        case "west": return "east";
    }
}