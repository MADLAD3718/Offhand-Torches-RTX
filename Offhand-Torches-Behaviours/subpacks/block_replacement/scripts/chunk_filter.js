import { BlockPermutation, BlockVolumeUtils, system, world } from "@minecraft/server";
import { chunkToBlockVolume, createVolumeFromCenter, torchDirectionToBlockFace } from "./util";
import { div, floor, mul } from "./vectors";
import { CHUNK_SIZE } from "./main";

const overworld = world.getDimension("overworld");

const checked = new Set;
/**
 * Filters the chunks surrounding every player for vanilla torches.
 */
export async function filterChunks() {
    for (const player of world.getAllPlayers()) {
        if (player?.dimension.id != "minecraft:overworld") continue;
        const center_chunk = floor(div(player.location, CHUNK_SIZE));
        const chunk_span = mul({x: 3, y: 1, z: 3}, 16 / CHUNK_SIZE);
        const chunk_volume = createVolumeFromCenter(center_chunk, chunk_span);
        for (const chunk of BlockVolumeUtils.getBlockLocationIterator(chunk_volume)) {
            const {x,y,z} = chunk;
            if (checked.has([x,y,z].join(" ")) || chunk.y < -4 || chunk.y > 19) continue;
            await filterChunk(chunk);
        }
    }
    system.run(filterChunks);
}

/**
 * Replaces all vanilla torches with custom ones from within a given chunk.
 * @param {Vector3} chunk 
 * @returns {Promise}
 */
function filterChunk(chunk) {
    return new Promise(resolve => {
        const volume = chunkToBlockVolume(chunk);
        for (const location of BlockVolumeUtils.getBlockLocationIterator(volume)) {
            const block = overworld.getBlock(location);
            if (!block) return resolve();
            if (block.typeId != "minecraft:torch") continue;
            const direction = block.permutation.getState("torch_facing_direction");
            const permutation = BlockPermutation.resolve("ofht:torch_block", {
                "minecraft:block_face": torchDirectionToBlockFace(direction)
            });
            block.setPermutation(permutation);
        }
        const {x,y,z} = chunk;
        resolve(checked.add([x,y,z].join(" ")));
    });
}