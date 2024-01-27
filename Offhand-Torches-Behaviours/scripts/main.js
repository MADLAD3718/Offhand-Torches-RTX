import { ItemStack, world, system, EntityInventoryComponent, EntityRemoveBeforeEvent } from "@minecraft/server";

system.runInterval(replaceTorches);
function replaceTorches() {
    for (const player of world.getAllPlayers()) if (player.isValid()) {
        if (player.getDynamicProperty("replacing")) return;
        const container = player.getComponent(EntityInventoryComponent.componentId).container;
        for (let slot = 0; slot < container.size; ++slot) {
            const item = container.getItem(slot);
            switch (item?.typeId) {
                case "minecraft:torch":
                    container.setItem(slot, new ItemStack("ofht:torch", item.amount));
                    break;
                case "minecraft:soul_torch": 
                    container.setItem(slot, new ItemStack("ofht:soul_torch", item.amount));
                    break;
                case "minecraft:redstone_torch":
                    container.setItem(slot, new ItemStack("ofht:redstone_torch", item.amount));
                    break;
            }
        }
    }
}

world.beforeEvents.entityRemove.subscribe(onEntityRemove);

function withinPickupRadius(player, item) {
    const dx = Math.abs(player.x - item.x);
    const dy = Math.abs((player.y + 0.775) - item.y);
    const dz = Math.abs(player.z - item.z);
    return dx < 1.425 && dy < 1.525 && dz < 1.425;
}

/**
 * Handles item pickup custom behaviour.
 * @param {EntityRemoveBeforeEvent} event 
 */
function onEntityRemove(event) {
    if (event.removedEntity.typeId != "minecraft:item") return;
    const entity = event.removedEntity;
    const player = entity.dimension.getPlayers({closest: 1, location: entity.location})[0];
    if (!withinPickupRadius(player.location, entity.location)) return;
    player.setDynamicProperty("replacing", true);
    system.run(() => {
        let count = 0, soul_count = 0, redstone_count = 0;
        const container = player.getComponent(EntityInventoryComponent.componentId).container;
        for (let slot = 0; slot < container.size; ++slot) {
            const item = container.getItem(slot);
            switch (item?.typeId) {
                case "minecraft:torch":             count += item.amount;            break;
                case "minecraft:soul_torch":        soul_count += item.amount;       break;
                case "minecraft:redstone_torch":    redstone_count += item.amount;   break;
            }
        }
        player.dimension.runCommand("gamerule sendcommandfeedback false");
        player.runCommand("clear @s torch");
        player.runCommand("clear @s soul_torch");
        player.runCommand("clear @s redstone_torch");
        player.runCommand(`give @s ofht:torch ${count}`);
        player.runCommand(`give @s ofht:soul_torch ${soul_count}`);
        player.runCommand(`give @s ofht:redstone_torch ${redstone_count}`);
        player.dimension.runCommand("gamerule sendcommandfeedback true");
        player.setDynamicProperty("replacing");
    });
}