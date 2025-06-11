import { EntityComponentTypes, ItemStack, world } from "@minecraft/server";

const REPLACEMENTS: Record<string, string> = {
    "minecraft:torch": "ofht:torch",
    "minecraft:redstone_torch": "ofht:redstone_torch",
    "minecraft:soul_torch": "ofht:soul_torch"
}

world.afterEvents.entitySpawn.subscribe(event => {
    const { entity } = event;
    if (!entity.isValid) return;

    const { dimension, location } = entity;
    if (!entity.matches({ type: "minecraft:item" })) return;

    const itemComponent = entity.getComponent(EntityComponentTypes.Item)!;
    if (!REPLACEMENTS[itemComponent.itemStack.typeId]) return;

    const newItemId = REPLACEMENTS[itemComponent.itemStack.typeId];
    const amount = itemComponent.itemStack.amount;
    entity.remove();
    dimension.spawnItem(new ItemStack(newItemId, amount), location);
});

world.afterEvents.playerSpawn.subscribe(event => {
    const { player, initialSpawn } = event;
    if (!initialSpawn) return;

    const container = player.getComponent(EntityComponentTypes.Inventory)!.container;
    for (let i = 0; i < container.size; ++i) {
        const slot = container.getSlot(i);
        if (!slot.hasItem()) continue;
        if (!REPLACEMENTS[slot.typeId]) continue;

        slot.setItem(new ItemStack(REPLACEMENTS[slot.typeId], slot.amount));
    }
});

world.afterEvents.playerInventoryItemChange.subscribe(event => {
    const { itemStack, slot, player } = event;
    if (!itemStack) return;
    if (!REPLACEMENTS[itemStack.typeId]) return;

    const container = player.getComponent(EntityComponentTypes.Inventory)!.container;
    const itemSlot = container.getSlot(slot);
    itemSlot.setItem(new ItemStack(REPLACEMENTS[itemStack.typeId], itemSlot.amount));
});
