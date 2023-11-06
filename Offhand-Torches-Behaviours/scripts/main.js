import { Block, ItemStack, world, PlayerBreakBlockAfterEvent, PlayerInteractWithBlockAfterEvent } from "@minecraft/server";
import { add, toVec3 } from "./vectors";

world.afterEvents.playerBreakBlock.subscribe(alterBlock);
world.afterEvents.playerInteractWithBlock.subscribe(event => {
    if (event.block.typeId.endsWith("trapdoor") && !event.player.isSneaking) alterBlock(event);
});
/** @param {PlayerBreakBlockAfterEvent | PlayerInteractWithBlockAfterEvent} event  */
function alterBlock(event) {
    const {block} = event;
    const block_n = block.north();
    const block_s = block.south();
    const block_e = block.east();
    const block_w = block.west();

    if (block_n.typeId == "ofht:torch_block" && block_n.permutation.getState("minecraft:block_face") == "north")
        popTorch(block_n);
    if (block_s.typeId == "ofht:torch_block" && block_s.permutation.getState("minecraft:block_face") == "south")
        popTorch(block_s);
    if (block_e.typeId == "ofht:torch_block" && block_e.permutation.getState("minecraft:block_face") == "east")
        popTorch(block_e);
    if (block_w.typeId == "ofht:torch_block" && block_w.permutation.getState("minecraft:block_face") == "west")
        popTorch(block_w);
}

/** @param {Block} block */
function popTorch(block) {
    const center = add(block.location, toVec3(0.5));
    world.playSound("dig.wood", center);
    block.setType("minecraft:air");
    block.dimension.spawnItem(new ItemStack("ofht:torch"), center);
}