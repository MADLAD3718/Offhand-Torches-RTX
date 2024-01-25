import { ItemStack, world, system, EntityInventoryComponent } from "@minecraft/server";

system.runInterval(replaceTorches);
function replaceTorches() {
    for (const player of world.getAllPlayers()) if (player.isValid()) {
        const container = player.getComponent(EntityInventoryComponent.componentId).container;
        for (let slot = 0; slot < container.size; ++slot) {
            const item = container.getItem(slot);
            if (item?.typeId == "minecraft:torch")
                container.setItem(slot, new ItemStack("ofht:torch", item.amount));
            if (item?.typeId == "minecraft:soul_torch")
                container.setItem(slot, new ItemStack("ofht:soul_torch", item.amount));
            if (item?.typeId == "minecraft:redstone_torch")
                container.setItem(slot, new ItemStack("ofht:redstone_torch", item.amount));
        }
    }
}