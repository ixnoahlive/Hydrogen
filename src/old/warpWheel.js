import Utils from "../../.dev/util"
import Settings from "../../.dev/config"

const GuiUtils = Java.type('net.minecraftforge.fml.client.config.GuiUtils')
const RenderHelper = Java.type('net.minecraft.client.renderer.RenderHelper')

const bind = new KeyBind('Warp Wheel', Keyboard.KEY_NONE, 'Hydrogen - SkyBlock')
const WheelGui = new Gui()

let Screen = { width: Renderer.screen.getWidth(), height: Renderer.screen.getHeight() }

bind.registerKeyPress(()=>{ if (Utils.getMode().name.includes("SKYBLOCK") && Utils.getMode().isLobby==false) WheelGui.open()})
//bind.registerKeyRelease(()=>{WheelGui.close()})

const renderList = {
    island:  [Utils.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"4a045f4f-9ac3-428b-8407-7a9f05b60b38",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzljODg4MWU0MjkxNWE5ZDI5YmI2MWExNmZiMjZkMDU5OTEzMjA0ZDI2NWRmNWI0MzliM2Q3OTJhY2Q1NiJ9fX0="}]},Name:"§4a045f4f-9ac3-428b-8407-7a9f05b60b38"},display:{Lore:[0:"§8/warp home",1:"",2:"§7Your very own chunk of SkyBlock.",3:"§7Nice housing for your minions.",4:"",5:"§eClick to warp!"],Name:"§bPrivate Island"}},Damage:3s}'), -32, -32, ["§bPrivate Island","§8/warp home","","§7Your very own chunk of SkyBlock.","§7Nice housing for your minions.",""]],
    hub:     [Utils.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"9c6504bf-4b4a-4f18-963e-5267a6027961",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0aW1lc3RhbXAiOjE1NTkyMTU0MTY5MDksInByb2ZpbGVJZCI6IjQxZDNhYmMyZDc0OTQwMGM5MDkwZDU0MzRkMDM4MzFiIiwicHJvZmlsZU5hbWUiOiJNZWdha2xvb24iLCJzaWduYXR1cmVSZXF1aXJlZCI6dHJ1ZSwidGV4dHVyZXMiOnsiU0tJTiI6eyJ1cmwiOiJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlL2Q3Y2M2Njg3NDIzZDA1NzBkNTU2YWM1M2UwNjc2Y2I1NjNiYmRkOTcxN2NkODI2OWJkZWJlZDZmNmQ0ZTdiZjgifX19"}]},Name:"§9c6504bf-4b4a-4f18-963e-5267a6027961"},display:{Lore:[0:"§8/warp hub",1:"",2:"§7Where everything happens and",3:"§7anything is possible.",4:"",5:"§8Right-Click to warp!",6:"§eLeft-Click to open!"],Name:"§bSkyBlock Hub"}},Damage:3s}'), 0, -32, ["§bSkyBlock Hub","§8/warp hub","","§7Your very own chunk of SkyBlock.","§7Nice housing for your minions.",""]],
    garden:  [Utils.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"f00c1917-226f-4789-8d02-80fca713ba9b",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjQ4ODBkMmMxZTdiODZlODc1MjJlMjA4ODI2NTZmNDViYWZkNDJmOTQ5MzJiMmM1ZTBkNmVjYWE0OTBjYjRjIn19fQ=="}]},Name:"§f00c1917-226f-4789-8d02-80fca713ba9b"},display:{Lore:[0:"§8/warp garden",1:"",2:"§7Spawn on your very own §aGarden§7.",3:"",4:"§eClick to warp!"],Name:"§aThe Garden"}},Damage:3s}'), 32, -32, ["§bGarden","§8/warp garden","","§7Spawn on your very own §aGarden§7.","§7Farm & unlock new plots of land!",""]],
    mines:   [Utils.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"f7474dc3-8075-4f96-b772-54131d999d8d",hypixelPopulated:1b,Properties:{textures:[0:{Value:"ewogICJ0aW1lc3RhbXAiIDogMTYwODMxNDY5NDY2OSwKICAicHJvZmlsZUlkIiA6ICI0MWQzYWJjMmQ3NDk0MDBjOTA5MGQ1NDM0ZDAzODMxYiIsCiAgInByb2ZpbGVOYW1lIiA6ICJNZWdha2xvb24iLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNmIyMGIyM2MxYWEyYmUwMjcwZjAxNmI0YzkwZDZlZTZiODMzMGExN2NmZWY4Nzg2OWQ2YWQ2MGIyZmZiZjNiNSIKICAgIH0KICB9Cn0="}]},Name:"§f7474dc3-8075-4f96-b772-54131d999d8d"},display:{Lore:[0:"§7§7Explore more of SkyBlock to",1:"§7find this location!"],Name:"§cUndiscovered Island"}},Damage:3s}'), 32, 0, ["§aDwarven Mines","§8/warp dwarves","","§7Dig for rare minerals & complete","§7tasks to level up your Heart of the Mountain!",""]],
    ch:      [Utils.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"70b0292e-2443-4c2e-b505-7236ddd3577a",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjFkYmUzMGIwMjdhY2JjZWI2MTI1NjNiZDg3N2NkN2ViYjcxOWVhNmVkMTM5OTAyN2RjZWU1OGJiOTA0OWQ0YSJ9fX0="}]},Name:"§70b0292e-2443-4c2e-b505-7236ddd3577a"},display:{Lore:[0:"§8/warp crystals",1:"",2:"§7A vast series of caves and random",3:"§7structures with tougher Stone and",4:"§7special gems!",5:"",6:"§7Main skill: §bMining",7:"§7Island tier: §eIV",8:"",9:"§8Right-Click to warp!",10:"§eLeft-Click to open!"],Name:"§aCrystal Hollows§7 - §bEntrance"}},Damage:3s}'), 32, 32, ["§aCrystal Hollows","§8/warp crystals","","§7A vast series of caves and random","§7structures with special gems & crystals!",""]],
    drag:    [Utils.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"f42bf540-e95b-4381-a3f3-2a7b879e6ef4",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYTFjZDZkMmQwM2YxMzVlN2M2YjVkNmNkYWUxYjNhNjg3NDNkYjRlYjc0OWZhZjczNDFlOWZiMzQ3YWEyODNiIn19fQ=="}]},Name:"§f42bf540-e95b-4381-a3f3-2a7b879e6ef4"},display:{Lore:[0:"§8/warp drag",1:"",2:"§7Spawn inside the Dragon\'s Nest,",3:"§7ready to grind Zealots.",4:"",5:"§eClick to warp!"],Name:"§aThe End§7 - §bDragon\'s Nest"}},Damage:3s}'), -32, 32, ["§aDragon's Nest","§8/warp drag","","§7Spawn inside the Dragon's Nest,","§7ready to grind Zealots.",""]],
    crimson: [Utils.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"8bfaf03f-f6f6-41bb-8159-a869a137f35b",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzM2ODdlMjVjNjMyYmNlOGFhNjFlMGQ2NGMyNGU2OTRjM2VlYTYyOWVhOTQ0ZjRjZjMwZGNmYjRmYmNlMDcxIn19fQ"}]},Name:"§8bfaf03f-f6f6-41bb-8159-a869a137f35b"},display:{Lore:[0:"§7§7Explore more of SkyBlock to",1:"§7find this location!"],Name:"§cUndiscovered Island"}},Damage:3s}'), 0, 32, ["§aCrimson Isle","§8/warp crimson","","§7Find new bosses, creatures & challenges.","§7Pick a faction, and fight for honour!",""]],
    dhub:    [Utils.getItemFromNBT('{id:"minecraft:skull",Count:1b,tag:{SkullOwner:{Id:"5b8a3f2e-4e9f-473f-97ff-b8e2181e5382",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0aW1lc3RhbXAiOjE1Nzg0MDk0MTMxNjksInByb2ZpbGVJZCI6IjQxZDNhYmMyZDc0OTQwMGM5MDkwZDU0MzRkMDM4MzFiIiwicHJvZmlsZU5hbWUiOiJNZWdha2xvb24iLCJzaWduYXR1cmVSZXF1aXJlZCI6dHJ1ZSwidGV4dHVyZXMiOnsiU0tJTiI6eyJ1cmwiOiJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlLzliNTY4OTViOTY1OTg5NmFkNjQ3ZjU4NTk5MjM4YWY1MzJkNDZkYjljMWIwMzg5YjhiYmViNzA5OTlkYWIzM2QiLCJtZXRhZGF0YSI6eyJtb2RlbCI6InNsaW0ifX19fQ=="}]},Name:"§5b8a3f2e-4e9f-473f-97ff-b8e2181e5382"},display:{Lore:[0:"§8/warp dungeon_hub",1:"",2:"§7Group up with friends and take on",3:"§7challenging Dungeons.",4:"",5:"§eClick to warp!"],Name:"§aDungeon Hub§7 - §bSpawn"}},Damage:3s}'), -32, 0, ["§aDungeon Hub","§8/warp dhub","","§7Group up with friends, and take on","§7challenging Dungeons!",""]],
}

function locateMouse(mouseX, mouseY, id) {
    return ( mouseX > (Screen.width/2)-14+renderList[id][1] )===true && ( mouseX < (Screen.width/2)-14+renderList[id][1]+ 28 )===true && ( mouseY > (Screen.height/2)-14+renderList[id][2] ) === true && ( mouseY < (Screen.height/2)-14+renderList[id][2]+ 28 ) === true
}

let previousSelection = null
register('renderOverlay', (event) => {
    if (WheelGui.isOpen()) {
        const mouseX = Client.getMouseX()
        const mouseY = Client.getMouseY()

        Object.keys(renderList).forEach((key) => {
            renderList[key][0].draw((Screen.width/2)-8+renderList[key][1], (Screen.height/2)-8+renderList[key][2], 1, 1)
            Renderer.drawStringWithShadow('Fast Travel', Screen.width/2-59/2, Screen.height/2-62)

            if (locateMouse(Client.getMouseX(), Client.getMouseY(), key)) {
                if (key==undefined) return
                Renderer.drawRect(Renderer.color(0, 0, 0, 192), (Screen.width/2)-14+renderList[key][1], (Screen.height/2)-14+renderList[key][2], 28, 28)
                GuiUtils.drawHoveringText(renderList[key][3] ? renderList[key][3] : "&cError: Data not found!", mouseX, mouseY, Screen.width, Screen.height, 500, Renderer.getFontRenderer())

                if (!Settings.featuresSBWheel_Quiet && previousSelection!==key) {
                    previousSelection = key
                    World.playSound('note.hat', 0.25, 1.5)
                }
            } else {
                Renderer.drawRect(Renderer.color(0, 0, 0, 128), (Screen.width/2)-14+renderList[key][1], (Screen.height/2)-14+renderList[key][2], 28, 28)
            }
        })
        RenderHelper.func_74518_a()
    }
})

register('guiMouseClick', (mouseX, mouseY) => {
    if (WheelGui.isOpen()) {
        Client.currentGui.close()

        let option;
        switch (true) {
            case locateMouse(mouseX, mouseY, 'island'):
                ChatLib.command('warp island')
            break;
            case locateMouse(mouseX, mouseY, 'hub'):
                ChatLib.command('warp hub')
            break;
            case locateMouse(mouseX, mouseY, 'dhub'):
                ChatLib.command('warp dhub')
            break;
            case locateMouse(mouseX, mouseY, 'mines'):
                ChatLib.command('warp mines')
            break;
            case locateMouse(mouseX, mouseY, 'ch'):
                ChatLib.command('warp ch')
            break;
            case locateMouse(mouseX, mouseY, 'drag'):
                ChatLib.command('warp drag')
            break;
            case locateMouse(mouseX, mouseY, 'crimson'):
                ChatLib.command('warp crimson')
            break;
            case locateMouse(mouseX, mouseY, 'garden'):
                ChatLib.command('warp garden')
            break;
            default:
                option = 'default'
            break;
        }
        if (option!=='default') World.playSound('random.click', 1, 1)
        previousSelection = null
    }
})

register('guiClosed', () => previousSelection = null)

register('step', () => {
    Screen = { width: Renderer.screen.getWidth(), height: Renderer.screen.getHeight() }
}).setDelay(5) // Update the screen width in case of going f11 or whatever