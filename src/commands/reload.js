import Placeholders from "../features/housing/placeholders"
import Bookmarks from "../features/housing/bookmark"
import Metadata from '../.dev/metadata'
import Utils from "../.dev/util"

register('command', (...args) => {
    if (!args || args[0]!=='quiet') ChatLib.chat('&7Reloading Hydrogen...')

    Placeholders.main = JSON.parse(FileLib.read(Metadata.name,'assets/placeholders.json'))

    Bookmarks.players = JSON.parse(FileLib.read(Metadata.name, 'assets/bookmarks.json'))

    Bookmarks.items = []
    Bookmarks.nullPlayers = []
    
    if (Bookmarks.players.length > 21) Bookmarks.players.length = 21

    Bookmarks.nullPlayers = Bookmarks.players.reduce((list, elem, i) => {
        list.push(elem);
        if((i+1) % 7 === 0) {list.push(null);list.push(null)};
        return list;
    }, [])

    Bookmarks.nullPlayers.forEach(player => {
        if (player!==null) {
            Bookmarks.items.push(Utils.nbtToItem({ 
            id: "minecraft:skull", 
            Count:1, 
            tag:{
                SkullOwner:player.name, 
                display:{
                Name:`§a${player.name}`,
                Lore:[`§7View this player's houses.`,`§0`,`§eLeft Click to open!`,`§eRight Click to remove!`]
                }
            }
            }).setDamage(3)) 
        } else {
            Bookmarks.items.push(null)
        }
    })
    let nulad = Array(21-Bookmarks.items.length+9).fill(null)

    Bookmarks.chest.setItems([
        null, null, null, null, null, null, null, null, null,
        null, ...Bookmarks.items, ...nulad, new Item('minecraft:barrier').setName('&cClose')
    ]);


    if (!args || args[0]!=='quiet') setTimeout(()=>ChatLib.chat('&aReloaded!'), 100)
}).setName('hy-reload')
