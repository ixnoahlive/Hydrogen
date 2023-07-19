// ? --------------------------------- ? //
// ? Created by Debuggings, thank you! ? //
// ? --------------------------------- ? //
import Metadata from "../metadata";

const File = Java.type('java.io.File')
const ixmtoast = Image.fromFile(new File(`./config/ChatTriggers/modules/${Metadata.name}/assets/ixmod_toast.png`))

let Y = 0;
let alreadyAnim = false;
let renderitem = new Item("stone");
let line1 = "null";
let line2 = "null";

const playAnim = (duration) => {
    if(alreadyAnim) return;
    alreadyAnim = true;
    setTimeout(() => {
        for(i = 0; i < 32; i++) {
            Y += 1;
            Thread.sleep(5);
        }
        Thread.sleep(duration);
        for(i = 0; i < 32; i++) {
            Y -= 1;
            Thread.sleep(5);
        }
        alreadyAnim = false;
    }, 0);
};

/**
 * Generates and animates an achievement popup
 * @param {string} item The name of an item (example: minecraft:stone)
 * @param {string} text1 The top line of the toast
 * @param {string} text2 The bottom line of the toast
 * @param {number} duration The duration of the toast in milliseconds
 */
const createAchi = (item, text1, text2, duration = 3000) => {
    renderitem = new Item(item);
    line1 = text1;
    line2 = text2;
    playAnim(duration);
};

register('renderOverlay', () => {
    if(!alreadyAnim) return;
    ixmtoast.draw(Renderer.screen.getWidth() - 140, Y - 32, 160, 32);
    renderitem.draw(Renderer.screen.getWidth() - 132, Y - 24);
    Renderer.drawStringWithShadow(line1, Renderer.screen.getWidth() - 112, Y - 25);
    Renderer.drawStringWithShadow(line2, Renderer.screen.getWidth() - 112, Y - 15);
});

export { createAchi as default };