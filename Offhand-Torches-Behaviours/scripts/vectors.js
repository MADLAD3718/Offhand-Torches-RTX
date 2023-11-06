/** @typedef {{x: Number, y: Number, z: Number}} Vector3 */

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