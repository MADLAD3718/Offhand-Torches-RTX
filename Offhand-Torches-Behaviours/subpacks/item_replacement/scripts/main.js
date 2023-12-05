import { ItemStack, world, system, EntityInventoryComponent, Container } from "@minecraft/server";

system.runInterval(replaceTorches);
function replaceTorches() {
    for (const player of world.getAllPlayers()) {
        /** @type {Container} */
        const container = player.getComponent(EntityInventoryComponent.componentId).container;
        for (let slot = 0; slot < container.size; ++slot) {
            const item = container.getItem(slot);
            if (item?.typeId == "minecraft:torch")
                container.setItem(slot, new ItemStack("ofht:torch", item.amount));
        }
    }
}