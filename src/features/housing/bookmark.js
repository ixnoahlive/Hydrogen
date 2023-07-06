import { ChestMenu } from "../../../../ChestMenu";
import Metadata from "../../.dev/metadata";
import Utils from "../../.dev/util";
import axios from 'axios';

const Mouse = Java.type("org.lwjgl.input.Mouse");

let Bookmarks = {
    chest: new ChestMenu("Bookmarks", 5),
    items: [], 
    players: JSON.parse(FileLib.read(Metadata.name, 'assets/bookmarks.json')),
    nullPlayers: []
}

if (Bookmarks.players.length > 21) Bookmarks.players.length = 1

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



if (Bookmarks.players.length>21) ChatLib.chat('&cI don\'t wanna know how but somehow you bookmarked more than 21 players. Go remove some, I haven\'t added pages yet. Go flex in the media channel, or whatever.')

register("command", (...args) => {
    if (Bookmarks.players.length==0 && !args) return ChatLib.chat('&cYou have no bookmarks :(\n&cAdd one using /bookmark <player>')

    if (!args) {
        Bookmarks.chest.open();
    } else if (args[0]) {
        axios.get(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`).then(res => {
            let load = { name: res.data.name, uuid: Utils.formatId(res.data.id) }

            ChatLib.chat(`&aAdded ${load.name} to your bookmarks!`)
            World.playSound('note.pling', 1, 2)

            Bookmarks.players.push(load)
            FileLib.write(Metadata.name, 'assets/bookmarks.json', JSON.stringify(Bookmarks.players))

            ChatLib.command('hy-reload quiet', true)
        })
    } else {
        ChatLib.chat('&cInvalid player name!')
    }
}).setName("bookmarks").setAliases(['bookmark','bm']);

Bookmarks.chest.onClick((stack, slotNumber) => {
    if (Bookmarks.players[slotNumber-10]==undefined) {return Client.currentGui.close()}
  
    if (!Mouse.isButtonDown(1)) {
    
        Client.currentGui.close()
        ChatLib.command(`visit ${Bookmarks.players[slotNumber-10].uuid}`) 
        World.playSound('random.click', 1, 1)

    } else if (Mouse.isButtonDown(1)) {
        ChatLib.chat(`&cRemoved your bookmark for ${Bookmarks.players[slotNumber-10].name}!`)

        Bookmarks.players.splice(Bookmarks.players.indexOf(Bookmarks.players[slotNumber-10]), 1)
        FileLib.write(Metadata.name, 'assets/bookmarks.json', JSON.stringify(Bookmarks.players))

        setTimeout(() => {ChatLib.command('hy-reload quiet', true)}, 200)
  }

  
});

export default Bookmarks