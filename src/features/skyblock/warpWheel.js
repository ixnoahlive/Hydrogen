import Metadata from "../../.dev/metadata"
import Settings from "../../.dev/config"
import Utils from '../../.dev/util'

const GuiUtils = Java.type('net.minecraftforge.fml.client.config.GuiUtils')
const RenderHelper = Java.type('net.minecraft.client.renderer.RenderHelper')
const WheelData = Utils.Wheel.parseJson( FileLib.read(Metadata.name, 'assets/wheelSkyblock.json') ) 

const bind = new KeyBind('Warp Wheel', Keyboard.KEY_NONE, '§bHydrogen§r - SkyBlock')
const WheelGui = new Gui()

bind.registerKeyPress(()=>{if (Utils.getMode().name.includes("SKYBLOCK") && Utils.getMode().isLobby==false ) WheelGui.open()})

let Screen = { width: Renderer.screen.getWidth(), height: Renderer.screen.getHeight() }

const wheelName = "Warp Wheel"
let wheelNameWidth = Screen.width/2-Renderer.getStringWidth(wheelName)/2

function formula(screen, offset, width) {
    return screen/2-width/2+offset
}

register('step', () => {
    const NewScreen = { width: Renderer.screen.getWidth(), height: Renderer.screen.getHeight() }
    if ( NewScreen!==Screen ) {
        Screen = NewScreen
        wheelNameWidth = Screen.width/2-Renderer.getStringWidth(wheelName)/2
    }
}).setDelay(2)

register('renderOverlay', () => {
    if (WheelGui.isOpen()) {    
        const mouseX = Client.getMouseX()
        const mouseY = Client.getMouseY()

        Renderer.drawStringWithShadow(wheelName, wheelNameWidth, Screen.height/2-64)

        Object.keys(WheelData).forEach(key => {
            //consider actually caching formula like const xCoord or something
            const formulaCoordX = formula(Screen.width, WheelData[key].offsetX, 16)
            const formulaCoordY = formula(Screen.height, WheelData[key].offsetY, 16)

            WheelData[key].item.draw(formulaCoordX, formulaCoordY, 1, 1)

            Tessellator.pushMatrix();
            if (
              (mouseX > formulaCoordX - 6 && mouseX < formulaCoordX + 22) &&
              (mouseY > formulaCoordY - 6 && mouseY < formulaCoordY  + 22)
            ) {
                GuiUtils.drawHoveringText(WheelData[key].lore, mouseX, mouseY, Screen.width, Screen.height, 500, Renderer.getFontRenderer()) 
                const awfullylong = Utils.Wheel.colors[WheelData[key].color ? WheelData[key].color : 'green']

                Renderer.colorize(awfullylong[0], awfullylong[1], awfullylong[2], 212/255)
            } else {
                Renderer.colorize(16/255, 16/255, 16/255, 212/255)
            }

            Renderer.drawRect(
              Renderer.WHITE,
              formulaCoordX - 6,
              formulaCoordY - 6,
              28,
              28
            )
        
            Tessellator.popMatrix();
            RenderHelper.func_74518_a();
        })
        
    }
})

register('guiMouseClick', (mouseX, mouseY) => {
    if (WheelGui.isOpen()) {
        Object.keys(WheelData).forEach(key => {
            const formulaCoordX = formula(Screen.width, WheelData[key].offsetX, 16)
            const formulaCoordY = formula(Screen.height, WheelData[key].offsetY, 16)

            if (
              (mouseX > formulaCoordX - 6 && mouseX < formulaCoordX + 22) &&
              (mouseY > formulaCoordY - 6 && mouseY < formulaCoordY  + 22)
            ) {
                World.playSound('random.click', 1, 1)
                eval(WheelData[key].js)
            }

            WheelGui.close()

        })
    }
})