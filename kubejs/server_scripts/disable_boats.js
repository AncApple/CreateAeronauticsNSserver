// ボートのクラフトレシピを削除
ServerEvents.recipes(event => {
    event.remove({ output: '#minecraft:boats' })
    event.remove({ output: '#minecraft:chest_boats' })
})

// ボートアイテムの右クリック使用をキャンセル
ItemEvents.rightClicked(event => {
    if (event.item.hasTag('minecraft:boats') || event.item.hasTag('minecraft:chest_boats')) {
        event.cancel()
    }
})
