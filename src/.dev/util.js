// ------------- //
// Fancyfication //

const FancyFont = ['Ａ', 'Ｂ', 'Ｃ', 'Ｄ', 'Ｅ', 'Ｆ', 'Ｇ', 'Ｈ', 'Ｉ', 'Ｊ', 'Ｋ', 'Ｌ', 'Ｍ', 'Ｎ', 'Ｏ', 'Ｐ', 'Ｑ', 'Ｒ', 'Ｓ', 'Ｔ', 'Ｕ', 'Ｖ','Ｗ','Ｘ', 'Ｙ', 'Ｚ', 'ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ', 'ｆ', 'ｇ', 'ｈ', 'ｉ', 'ｊ', 'ｋ', 'ｌ', 'ｍ', 'ｎ', 'ｏ', 'ｐ', 'ｑ', 'ｒ', 'ｓ', 'ｔ', 'ｕ', 'ｖ', 'ｗ', 'ｘ', 'ｙ', 'ｚ']
const RegularFont = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

const replaceArray = (str, from, to) => {
    let obj = {}, regex;
    from.forEach(function(item, idx){obj[item] = to[idx];});
         
    regex = new RegExp('(' + from.join('|') + ')', 'g');
    return str.replace(regex, function(match){return obj[match]});
}

const fancify = (text) => {
    return this.replaceArray(text, RegularFont, FancyFont)
}

// ----- //
// Items //
const MCItemStack = Java.type("net.minecraft.item.ItemStack");

function getItemFromNBT(nbtStr) {
    const nbt = net.minecraft.nbt.JsonToNBT.func_180713_a(nbtStr);
    return new Item(MCItemStack.func_77949_a(nbt));
}

/**
 * Converts NBT Object into an Item
 * @param {object} nbtObject 
 */
const nbtToItem = (nbtObject) => {
    let str = JSON.stringify(nbtObject, 0, 4),
        arr = str.match(/".*?":/g);

    for (let i = 0; i < arr.length; i++)
        str = str.replace(arr[i], arr[i].replace(/"/g,''));

    return getItemFromNBT(str);
}

const nbtObjToStr = (nbtObject) => {
    let str = JSON.stringify(nbtObject, 0, 4),
        arr = str.match(/".*?":/g);

    for (let i = 0; i < arr.length; i++)
        str = str.replace(arr[i], arr[i].replace(/"/g,''));

    return str
}

const skullInSlot = (inv, slot, name, lore, uuid, texture) => {
    const item = inv.getStackInSlot(slot)
    const itemNBT = NBT.toObject(item.getNBT())

    itemNBT.Damage = 3
    itemNBT.tag = {"display":{"Lore":lore,"Name":name},"SkullOwner":{"Id":uuid, "Properties":{"textures":[{"Value":texture}]}}}

    inv.container.func_75141_a(slot, Utils.nbtToItem(itemNBT).getItemStack().func_151001_c(name));
}

// ---------- //
// Wacky shit //

//@author Squagward
const GuiChat = Java.type('net.minecraft.client.gui.GuiChat')
let inputField;

register("postGuiRender", () => {
    if (Client.isInChat() && (!inputField)) {
        inputField = GuiChat.class.getDeclaredField("field_146415_a");
        inputField.setAccessible(true);
    }
});

function getCursorPosition() {
    if (!Client.isInChat() || !inputField) return -1;
    return inputField.get(Client.currentGui.get()).func_146198_h();
}

function setCursorPosition(char) {
    if (!Client.isInChat()) return false;
    inputField.get(Client.currentGui.get()).func_146190_e(char);
    return true;
};


// ---------


const isCreative = () => {
    return Player.asPlayerMP().player.field_71075_bZ.field_75098_d
}

const isOnHypixel = () => {
    return Server.getMOTD().includes('Hypixel Network')
}

const getMode = () => {
    if (!isOnHypixel()) return { isLobby: false, name: "INVALID"}
    if (Scoreboard.getLines()==[]) return { isLobby: false, name: "SMP|LIMBO"}
    if (Scoreboard.getLines(true)[0].toString()==" 🔮") return {isLobby: true, name: ChatLib.removeFormatting(Scoreboard.getTitle().toString().replace(/§[a-z0-9]/gi, '')).replace(/[^a-zA-Z\d\s:_-]/gi, '')}
    return {isLobby: false, name: Scoreboard.getTitle().toString().replace(/§[a-z0-9]/gi, '').replace(/[^a-zA-Z\d\s:_-]/gi, '')}
}


// ------ //
// Wheels //

const Wheel = {
    positions: {
        1: [-32, -32],
        2: [0, -32],
        3: [32, -32],
        4: [32, 0],
        5: [32, 32],
        6: [0, 32],
        7: [-32, 32],
        8: [-32, 0],
    },
    colors: {
        'red': [138, 36, 36],
        'orange': [168, 109, 25], 
        'yellow': [138, 138, 36],
        'green': [36, 138, 68],
        'blue': [36, 68, 138], // default
        'purple': [89, 36, 138],
        'white': [191, 191, 191],
    },
    /**
     * Parses a Wheel Object from a JSON string 
     * @param {string} WheelJSON A JSON string of the wheel to parse 
     * @returns {object} ParsedWheel
     */
    parseJson: (WheelJSON) => {
        let ParsedWheel = JSON.parse(WheelJSON)
        
        Object.keys(ParsedWheel).forEach(key => {
            if (ParsedWheel[key].item.startsWith('nbt:')) {
                ParsedWheel[key].item = getItemFromNBT(ParsedWheel[key].item.replace('nbt:', ''))
            } else ParsedWheel[key].item = new Item(ParsedWheel[key].item)

            ParsedWheel[key]['offsetX'] = Wheel.positions[ParsedWheel[key].position][0]
            ParsedWheel[key]['offsetY'] = Wheel.positions[ParsedWheel[key].position][1]
        })

        return ParsedWheel
    } 
}

Object.keys(Wheel.colors).forEach(colorKey => {
    Wheel.colors[colorKey].forEach(colorPoint => {
        Wheel.colors[colorKey][Wheel.colors[colorKey].indexOf(colorPoint)] = colorPoint/255
    })
})

function insert(main_string, ins_string, pos) {
    if(typeof(pos) == "undefined") {
        pos = 0;
    }
    if(typeof(ins_string) == "undefined") {
        ins_string = '';
    }
        return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}

function formatId(uuid) {
    return insert(insert(insert(insert(uuid, '-', 8), '-', 13), '-', 18), '-', 23)
}

/**
 * Runs a bunch of shit with blah blah blah sup chat on stream
 * @param {number} ms Millisecond delay between each function
 * @param {array} functions Array of functions
 * @deprecated
 */
function runWithDelay(ms, functions) {
    let incrementalMs = 0
    functions.forEach(func => {
        setTimeout(() => {
            func()
        }, incrementalMs)
        incrementalMs+=ms
    })
}

const Utils = { fancify, nbtObjToStr, replaceArray, getItemFromNBT, isCreative, isOnHypixel, getMode, runWithDelay, nbtToItem, skullInSlot, getCursorPosition, setCursorPosition, formatId, insert, Wheel }
export default Utils