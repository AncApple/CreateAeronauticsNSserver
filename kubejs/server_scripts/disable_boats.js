// ボートのクラフトレシピを削除
ServerEvents.recipes(event => {
    event.remove({ output: '#minecraft:boats' })
    event.remove({ output: '#minecraft:chest_boats' })
})

// ボートアイテムの右クリック使用をキャンセル
const BLOCKED_BOAT_ITEMS = new Set([
    'minecraft:oak_boat', 'minecraft:spruce_boat', 'minecraft:birch_boat',
    'minecraft:jungle_boat', 'minecraft:acacia_boat', 'minecraft:dark_oak_boat',
    'minecraft:mangrove_boat', 'minecraft:cherry_boat', 'minecraft:bamboo_raft',
    'minecraft:oak_chest_boat', 'minecraft:spruce_chest_boat', 'minecraft:birch_chest_boat',
    'minecraft:jungle_chest_boat', 'minecraft:acacia_chest_boat', 'minecraft:dark_oak_chest_boat',
    'minecraft:mangrove_chest_boat', 'minecraft:cherry_chest_boat', 'minecraft:bamboo_chest_raft'
])

ItemEvents.rightClicked(event => {
    if (BLOCKED_BOAT_ITEMS.has(event.item.id)) {
        event.cancel()
    }
})
