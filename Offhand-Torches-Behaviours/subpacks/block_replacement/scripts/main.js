import { ItemStack, world, ItemUseOnBeforeEvent, system, EntityInventoryComponent, Container } from "@minecraft/server";
import { add, toVector } from "./vectors";
import { filterChunks } from "./chunk_filter";

export const CHUNK_SIZE = 8;
filterChunks();

system.runInterval(replaceTorches);
function replaceTorches() {
    for (const player of world.getAllPlayers()) {
        if (!player) continue;
        /** @type {Container} */
        const container = player.getComponent(EntityInventoryComponent.componentId).container;
        for (let slot = 0; slot < container.size; ++slot) {
            const item = container.getItem(slot);
            if (item?.typeId == "minecraft:torch")
                container.setItem(slot, new ItemStack("ofht:torch", item.amount));
        }
    }
}

world.beforeEvents.itemUseOn.subscribe(filterTorchPlacement);
/** @param {ItemUseOnBeforeEvent} event  */
function filterTorchPlacement(event) {
    const {block, blockFace} = event;
    if (event.itemStack.typeId != "ofht:torch") return;
    const place_block = block.dimension.getBlock(add(block.location, toVector(blockFace)));
    event.cancel = place_block.isLiquid;
}