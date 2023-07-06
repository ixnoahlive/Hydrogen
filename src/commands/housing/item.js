import Utils from "../../.dev/util";

const C10PacketCreativeInventoryAction = Java.type(
  "net.minecraft.network.play.client.C10PacketCreativeInventoryAction"
);

function setHeldItem(item) {
    if (item==null) return -1
    Client.sendPacket(
    new C10PacketCreativeInventoryAction(
      Player.getHeldItemIndex()+36,
      item.getItemStack()
    )
  );
}

//const COLOR_REGEX = new RegExp("(?<!\\)\&(?=[0-9a-fl-o])", "gi")

const Help = new Message([
    new TextComponent('&6Usage: (Clickable)\n'),
    new TextComponent('&e /it name <name>\n').setClick('suggest_command', '/it name '),
    new TextComponent('&e /it id <id>\n').setClick('suggest_command', '/it id '),
    new TextComponent('&e /it addlore <lore>\n').setClick('suggest_command', '/it addlore '),
    new TextComponent('&e /it setline <line> <lore>\n').setClick('suggest_command', '/it addlore '),
    new TextComponent('&e /it setlore <line1>;;<line2...<\n').setClick('suggest_command', '/it addlore '),
    new TextComponent('&e /it removelore <line>\n').setClick('suggest_command', '/it removeline '),
    new TextComponent('&e /it clearlore\n').setClick('suggest_command', '/it clearlore'),
    new TextComponent('&e /it unbreakable').setClick('suggest_command', '/it unbreakable'),
]).setChatLineId(90017)

register('command', (...args) => {
    if (!Utils.isCreative() && args) return ChatLib.command("&cYou must be in CREATIVE to use this command!")
    
    const HeldItem = Player.getHeldItem()
    if (!HeldItem && args) return ChatLib.chat('&cYou need to be holding an item to use this command!')
    if (!args) return ChatLib.chat(Help)

    const NBTObject = NBT.toObject(HeldItem.getNBT())
    
    
    switch(args[0]) {
        case 'id':
            if (!args[1]) return ChatLib.chat("&cUsage: /it id <id>")

            try { new Item(args[1]) } 
            catch( err ) { return ChatLib.chat('&cThis isn\'t a valid item ID!') }

            NBTObject['id'] = args[1]
        break;

        case 'name':
            if (!args[1]) return ChatLib.chat("&cUsage: /it name <name>")

            args.shift()
            args = ChatLib.addColor(args.join(' '))

            if (!NBTObject.tag) NBTObject.tag = {display:{Name:args}}
            if (!NBTObject.tag.display) NBTObject.tag.display = {Name:args}
           
            if (NBTObject.tag.display) NBTObject.tag.display.Name = args
        break;

        case 'addlore':
            if (!args[1]) return ChatLib.chat("&cUsage: /it addlore <lore>")
            
            // Add necessary tags
            if (!NBTObject.tag) NBTObject.tag = {display:{Lore:[]}}
            if (!NBTObject.tag.display) NBTObject.tag.display = {Lore:[]}
            if (!NBTObject.tag.display.Lore) NBTObject.tag.display.Lore = []

            args.shift()

            //args = args.join(' ').replace(/(?<!\\)&(?=[0-9a-fl-p])/g, '§').split(' ')
            //CT does not support negative lookbehinds.

            args = ChatLib.addColor(args.join(' '))
            NBTObject.tag.display.Lore.push('§7'+args)
        break;

        case 'removelore':
            if (!args[1]) return ChatLib.chat("&cUsage: /it removelore <line>")
            
            if (!NBTObject.tag || 
                !NBTObject.tag.display || 
                !NBTObject.tag.display.Lore || 
                NBTObject.tag.display.Lore == [] 
            ) return ChatLib.chat('&cThis item has no lore!')
            
            if (parseInt(args[1]==NaN)) return ChatLib.chat("&cEnter a valid number!")
            if (parseInt(args[1])>NBTObject.tag.display.Lore.length || parseInt(args[1])<1) return ChatLib.chat(`&cThis line doesn't exist!`)

            NBTObject.tag.display.Lore.splice(parseInt(args[1])-1, 1)
        break;

        case 'clearlore':
            if (!NBTObject.tag) NBTObject.tag = {display:{Lore:[]}}
            if (!NBTObject.tag.display) NBTObject.tag.display = {Lore:[]}
            NBTObject.tag.display.Lore = []
        break;

        case 'unbreakable':
            if (!NBTObject.tag) NBTObject.tag = {}
            if (NBTObject.tag.Unbreakable) {
                NBTObject.tag.Unbreakable = 0
            } else {
                NBTObject.tag.Unbreakable = 1
            }
        break;

        case 'setlore':
            if (!args[1]) return ChatLib.chat("&cUsage: /it setlore <line1>;;<line2...")
            
            // Add necessary tags
            if (!NBTObject.tag) NBTObject.tag = {display:{Lore:[]}}
            if (!NBTObject.tag.display) NBTObject.tag.display = {Lore:[]}
            if (!NBTObject.tag.display.Lore) NBTObject.tag.display.Lore = []

            args.shift()

            args = ChatLib.addColor(args.join(' '))
            args = args.split(';;')
            NBTObject.tag.display.Lore.push(args)
        break;

        default: 
        return ChatLib.chat(Help)
    }

    setHeldItem(Utils.nbtToItem(NBTObject))

    ChatLib.chat(new Message(`&aEdited &e${NBTObject.id}&a!`).setChatLineId(90023))
}).setName('it')