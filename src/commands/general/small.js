import Utils from "../../.dev/util"
// small generic commands
// register('command', () => {
//     ChatLib.chat('&aDumped your held item\'s NBT to console. Type /ct console js to access.')
//     const item = Player.getHeldItem()
//     console.log(item ? item.getRawNBT() : '{id:"air"}')
// }).setName('dumpHeldNBT')

// register('command', (intUp) => {
//     if (parseInt(intUp)==NaN) return ChatLib.chat('&cEnter a valid number!')
//     Utils.runWithDelay(250, [
//     console.log(`tp ~ ~${intUp-1} ~`),
//     console.log(`pos1`),
//     console.log(`pos2`),
//     console.log(`set glass`),
//     console.log(`tp ~ ~1 ~`),
//     ])
// }).setName('up')