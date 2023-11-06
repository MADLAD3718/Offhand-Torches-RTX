/** @typedef {{x: Number, y: Number, z: Number}} Vector3 */

import { Direction } from "@minecraft/server";

/**
 * Enum for directions.
 * @enum {Vector3}
 */
export const Directions = {
    /** @type {Vector3} @readonly */
    Up: {x: 0, y: 1, z: 0},
    /** @type {Vector3} @readonly */
    Down: {x: 0, y: -1, z: 0},
    /** @type {Vector3} @readonly */
    North: {x: 0, y: 0, z: -1},
    /** @type {Vector3} @readonly */
    South: {x: 0, y: 0, z: 1},
    /** @type {Vector3} @readonly */
    East: {x: 1, y: 0, z: 0},
    /** @type {Vector3} @readonly */
    West: {x: -1, y: 0, z: 0}
}

/**
 * Returns a vector equivalent of the given face direction.
 * @param {Direction} dir 
 * @returns {Vector3}
 */
export function toVector(dir) {
    switch (dir) {
        case Direction.Up: return Directions.Up;
        case Direction.Down: return Directions.Down;
        case Direction.North: return Directions.North;
        case Direction.South: return Directions.South;
        case Direction.East: return Directions.East;
        case Direction.West: return Directions.West;
    }
}

/**
 * Returns a vector with all components equal to `x`.
 * @param {Number} x 
 * @returns {Vector3}
 */
export function toVec3(x) {
    return {
        x: x,
        y: x,
        z: x
    };
}

/**
 * Floors all the components of `v`.
 * @param {Vector3} v 
 * @returns {Vector3}
 */
export function floor(v) {
    return {
        x: Math.floor(v.x),
        y: Math.floor(v.y),
        z: Math.floor(v.z)
    };
}

/**
 * Returns the vector addition `u` + `v`.
 * @param {Vector3} u 
 * @param {Vector3} v 
 * @returns {Vector3}
 */
export function add(u, v) {
    return {
        x: u.x + v.x,
        y: u.y + v.y,
        z: u.z + v.z
    };
}

/**
 * Returns the vector subtraction `u` - `v`.
 * @param {Vector3} u 
 * @param {Vector3} v 
 * @returns {Vector3}
 */
export function sub(u, v) {
    return {
        x: u.x - v.x,
        y: u.y - v.y,
        z: u.z - v.z
    };
}

/**
 * Returns the component-wise multiplication of `u` and `v`.
 * @param {Vector3} u 
 * @param {Vector3 | Number} v 
 * @returns {Vector3}
 */
export function mul(u, v) {
    if (typeof v == "number") return {
        x: u.x * v,
        y: u.y * v,
        z: u.z * v
    }
    return {
        x: u.x * v.x,
        y: u.y * v.y,
        z: u.z * v.z
    }
}

/**
 * Returns the component-wise division of `u` and `v`.
 * @param {Vector3} u 
 * @param {Vector3 | Number} v 
 * @returns {Vector3}
 */
export function div(u, v) {
    if (typeof v == "number") return {
        x: u.x / v,
        y: u.y / v,
        z: u.z / v
    }
    return {
        x: u.x / v.x,
        y: u.y / v.y,
        z: u.z / v.z
    }
}