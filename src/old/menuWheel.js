import Utils from "../../.dev/util"
import Settings from "../../.dev/config"

const GuiUtils = Java.type('net.minecraftforge.fml.client.config.GuiUtils')
const RenderHelper = Java.type('net.minecraft.client.renderer.RenderHelper')

const bind = new KeyBind('Feature: Menu Wheel', Keyboard.KEY_NONE, 'Hydrogen - Housing')
const WheelGui = new Gui()

let Screen = { width: Renderer.screen.getWidth(), height: Renderer.screen.getHeight() }

bind.registerKeyPress(()=>{if ((Settings.featuresWheel_Checksum && Utils.isCreative() || !Settings.featuresWheel_Checksum) && Utils.getMode().name=="HOUSING" && Utils.getMode().isLobby==false ) WheelGui.open()})
//bind.registerKeyRelease(()=>{WheelGui.close()})

const renderList = {
    region:     [new Item('minecraft:grass'), -32, -32, ["§aRegions","§7Edit and create regions in","§7your house with different", "§7settings and actions."]],
    functions:  [new Item('minecraft:activator_rail'), 0, -32, ["§cFunctions","§7Edit and create functions that","§7can be called from other action", "§7holders."]],
    layout:     [new Item('minecraft:iron_axe'), 32, -32, ["§fInventory Layouts","§7Edit and create inventory","§7layouts."]],
    commands:   [new Item('minecraft:command_block'), 32, 0, ["§3Commands","§7Edit and create custom","§7commands to run actions in your","§7house."]],
    scoreboard: [new Item('minecraft:filled_map'), 32, 32, ["§eScoreboard Editor","§7Edit the scoreboard on the right","§7of the screen which is shown to","§7all players."]],
    skulls:     [Utils.getItemFromNBT('{id:"minecraft:skull",Damage:3,Count:1b,tag:{SkullOwner:{Id:"760be74e-6b9d-40d1-ba36-61bcb4ac64e3",hypixelPopulated:1b,Properties:{textures:[0:{Value:"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMzEzMzg0YTI5M2NmYmJhMzQ4OWI0ODNlYmMxZGU3NTg0Y2EyNzI2ZDdmNWMzYTYyMDUxMzQ3NDkyNWU4N2I5NyJ9fX0="}]}},display:{Lore:[0:"&7&7Browse Skull Packs you have",1:"&7unlocked.",2:"",3:"&eClick to browse!"],Name:"&aSkull Packs"},AttributeModifiers:[]}}'), -32, 32, ["§6Skull Packs","§7Browse Skull Packs you have","§7unlocked."]],
    menu:       [new Item('minecraft:nether_star'), 0, 32, ["§dHousing Menu","§7Open the Housing Menu to","§7access all the options and","§7items available."]],
    hydrogen:   [new Item('minecraft:diamond'), -32, 0, ["§bHydrogen","§7Edit your Hydrogen settings."]],

}

function locateMouse(mouseX, mouseY, id) {
    return ( mouseX > (Screen.width/2)-14+renderList[id][1] )===true && ( mouseX < (Screen.width/2)-14+renderList[id][1]+ 28 )===true && ( mouseY > (Screen.height/2)-14+renderList[id][2] ) === true && ( mouseY < (Screen.height/2)-14+renderList[id][2]+ 28 ) === true
}

let previousSelection = null
register('renderOverlay', (event) => {
    if (WheelGui.isOpen()) {
        const mouseX = Client.getMouseX()
        const mouseY = Client.getMouseY()

        Renderer.drawStringWithShadow('Select Menu', Screen.width/2-59/2, Screen.height/2-64)

        Object.keys(renderList).forEach((key) => {
            renderList[key][0].draw((Screen.width/2)-8+renderList[key][1], (Screen.height/2)-8+renderList[key][2], 1, 1)

            if (locateMouse(Client.getMouseX(), Client.getMouseY(), key)) {
                Renderer.drawRect(Renderer.color(0, 0, 0, 192), (Screen.width/2)-14+renderList[key][1], (Screen.height/2)-14+renderList[key][2], 28, 28)
                GuiUtils.drawHoveringText(renderList[key][3], mouseX, mouseY, Screen.width, Screen.height, 500, Renderer.getFontRenderer())

                if (!Settings.featuresWheel_Quiet && previousSelection!==key) {
                    previousSelection = key
                    World.playSound('note.hat', 0.25, 1.5)
                }
            } else {
                Renderer.drawRect(Renderer.color(0, 0, 0, 128), (Screen.width/2)-14+renderList[key][1], (Screen.height/2)-14+renderList[key][2], 28, 28)
            }
        })
        
    }
})

register('guiMouseClick', (mouseX, mouseY) => {
    if (WheelGui.isOpen()) {
        Client.currentGui.close()

        let option;
        switch (true) {
            case locateMouse(mouseX, mouseY, 'region'):
                ChatLib.command('region')
            break;
            case locateMouse(mouseX, mouseY, 'functions'):
                ChatLib.command('functions')
            break;
            case locateMouse(mouseX, mouseY, 'layout'):
                ChatLib.command('layout')
            break;
            case locateMouse(mouseX, mouseY, 'commands'):
                ChatLib.command('commands')
            break;
            case locateMouse(mouseX, mouseY, 'scoreboard'):
                ChatLib.command('scoreboard')
            break;
            case locateMouse(mouseX, mouseY, 'skulls'):
                ChatLib.command('skulls')
            break;
            case locateMouse(mouseX, mouseY, 'menu'):
                ChatLib.command('menu')
            break;
            case locateMouse(mouseX, mouseY, 'hydrogen'):
                ChatLib.command('hy', true)
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