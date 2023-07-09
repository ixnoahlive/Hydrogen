// ------------- FixSkulls ---------------- //
// Fix Skulls will make certain skulls more //
// appropriate in Housing, eg. visit rules  //

import Utils from "../../.dev/util";
import config from "../../.dev/config";

const whitelist = ["Craft Item","Reforge Item","Runic Pedestal",""]
const pane = new Item(160).setDamage(8).getItemStack()

register('renderOverlay', () => {
    if (!config.featuresSb_HideGlass) return
    const inv = Player.getContainer();
    if (!inv) return
    
    if (Utils.getMode().name.startsWith('SKYBLOCK')) {
        const items = inv.getItems()

        if (whitelist.includes(ChatLib.removeFormatting(inv.getName()))) inv.container.func_75141_a(items.indexOf(item), pane);

        items.forEach(item => {
            if (item!==null) {
                const previousStack = inv.getStackInSlot(items.indexOf(item))

                if (item.getRawNBT()=='{id:"minecraft:stained_glass_pane",Count:1b,tag:{display:{Name:" "}},Damage:15s}') {
                    inv.container.func_75141_a(items.indexOf(item), null);
                }
            }
        })
    }
})