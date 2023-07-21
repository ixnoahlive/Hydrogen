import config from "../../.dev/config";
import Utils from '../../.dev/util'

// ------------------------ //
//         DISPLAYER        //
// ------------------------ //

let latest = {} // An unorganised, as seen in vanilla list of all stats
let latestSorted = {} // An organised list of all stats
let date = 0

register('chat', (key, value, event) => {
    if (!config.featuresData_StatExporter) return
    latest[key] = parseInt(value) // Convert to integer
    let Components = [] // Text components in 

    cancel(event) // Cancel the normal chat message

    let latestKeys = Object.keys(latest).sort() // Sorts the keys of latest to loop through them later, so we can have a nice organised list instead of arbitrary like in vanilla.
    
    latestKeys.forEach( (key) => {
        Components.push(`&r  &r&e${key.replace(new RegExp('/', 'g'), '&7/')}: &r&b${latest[key]}&r\n`) // Push a new textcomponent for later use. 
    })

    latestSorted = Object.keys(latest).sort().reduce(
        (obj, key) => { 
          obj[key] = latest[key]; 
          return obj;
        }, 
        {}
    ); // This code is good, because I stole it from stackoverflow. Sorts the latest object alphabetically.

    ChatLib.chat(
        new Message([
            ...Components, // All the components from earlier
            new TextComponent("&7[Copy JSON] ")
                .setClickAction('run_command')
                .setClickValue(`/ct copy ${JSON.stringify(latestSorted, null, 4)}`)
                .setHover('show_text', '&7Copy a JSON formatted object of these stats'),
            // new TextComponent("&7[Copy Nested] ")
            //     .setClickAction('run_command')
            //     .setClickValue(`/ct copy ${JSON.stringify(convertObject(latestSorted), null, 4)}`)
            //     .setHover('show_text', '&7Copy a JSON formatted object of these stats'),
        ]).setChatLineId(date) // Sets a line id since only one message can exist with a certain line id so if it's outdated it'll automatically update itself
    );

}).setCriteria('&r  &r&e${key}: &r&b${value}&r')

register('chat', () => {
    date = Math.floor(Date.now()/1000) // This feature will break in 2039. Too bad!
    latest = {}
    latestSorted = {}
}).setCriteria('&r&a${possible} Stats:&r')

// ------------------------ //
//         IMPORTING        //
// ------------------------ //

const Toolkit = Java.type('java.awt.Toolkit');
const DataFlavor = Java.type("java.awt.datatransfer.DataFlavor");

let allowCurrentOperation = false

register('command', (type, player, flags) => {
    // Base checks
    if (!Utils.getMode().name=="HOUSING" && !Utils.getMode().isLobby==false) return ChatLib.chat('&cYou must be in Housing to use this command!')
    if (!type || (type !== "global" && type !== "player") || (type=="player"&&player==undefined) ) return ChatLib.chat('&cUsage: /importstats <player/global> <name?> <flags?>')

    // Get clipboard
    const SystemClipboard = Toolkit.getDefaultToolkit().getSystemClipboard()

    // Check if clipboard is a string
    if (!SystemClipboard.isDataFlavorAvailable(DataFlavor.stringFlavor)) return ChatLib.chat('&cYour clipboard couldn\'t be read! Is there text?')

    // Fetch data & parse JSON
    const Clipboard = SystemClipboard.getData(DataFlavor.stringFlavor)
    let targetObject = {}
    try {
        targetObject = JSON.parse(Clipboard)
        if (typeof targetObject!=="object") throw new TypeError
    } catch (e) {
        return ChatLib.chat('&cYour clipboard\'s JSON is not in a supported format! Copy a supported JSON!')
    }

    // Import begins
    ChatLib.chat(new Message(['&7Importing... ',new TextComponent('&c[Terminate]').setHover('show_text','&cStops all imports. Does not revert progress.\n&eClick to terminate!').setClick('run_command','/hydrogen:stopimports')]))
    let timeout = 0

    // Flag checks
    if (flags.includes("-c") && type=="player") ChatLib.command(`clearstats ${player}`)

    // No cleartimeout so this is used instead.
    allowCurrentOperation = true

    Object.keys(targetObject).forEach(key => {
        const value = targetObject[key] // Simply for utility

        timeout += 1100 // Add 1100ms to timeout

        // Additional checksums
        if (parseInt(value)==NaN) return ChatLib.chat('&cYour clipboard\'s JSON contains non-number values!')

        if (typeof value!=="number" && typeof value!=="bigint") {
            return ChatLib.chat('&cYour clipboard\'s JSON contains non-number values!')
        }

        if (value % 1 > 0) {
            return ChatLib.chat('&cYour clipboard\'s JSON contains decimal numbers!')
        }

        CurrentOperation = setTimeout(() => {
            if (allowCurrentOperation == true) {
                ChatLib.command(`edit${type}stat ${type=="player" ? player+' ' : ' '}${key} set ${value}`)
            }
        }, timeout)
    })
}).setName('importstats')

register('command', () => {
    allowCurrentOperation = false
    ChatLib.chat('&cTerminated imports!')
}).setName('hydrogen:stopimports')