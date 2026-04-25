// ボートのクラフトレシピを削除
ServerEvents.recipes(event => {
    event.remove({ output: '#minecraft:boats' })
    event.remove({ output: '#minecraft:chest_boats' })
})

// ボートアイテムの右クリック使用をキャンセル
ItemEvents.rightClicked('#minecraft:boats', event => {
    event.cancel()
})

ItemEvents.rightClicked('#minecraft:chest_boats', event => {
    event.cancel()
})
