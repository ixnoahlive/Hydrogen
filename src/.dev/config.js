import { @Vigilant, @TextProperty, @ButtonProperty, @SwitchProperty } from 'Vigilance';
import Metadata from '../.dev/metadata'

const Desktop = Java.type('java.awt.Desktop');
const File = Java.type('java.io.File');
const URI = Java.type('java.net.URI')

const placeholdersJson = new File(`./config/ChatTriggers/modules/${Metadata.name}/assets/placeholders.json`);
const DiscordInvite = new URI('discord://-/invite/9JMpaJAUfj')

const textsGeneral = {
    "/hy":"Opens the settings for the mod",
    "/hy-reload":"Reload various aspects of the mod",
    "/symbols":"Insert fancy symbols into your message",
    "/seen <player>":"Check a player's status (may be outdated)",
}
const textsHousing = {
    "/it":"Edit your currently held item (CREATIVE only)",
    "/panel":"Opens a panel with House management options",
    "/diff <x y z> <x y z>":"Find the space between two points",
    "/cent <x y z> <x y z>":"Find the center between two points",
    "/restoreplaceholders":"Resets your placeholders to default",
}
const textsSkyblock = {
    "/tally <name>":"Manage tallies without going into /hy"
}

const padText = (text, padChar, maxLength) => {
    const remaining = maxLength - Renderer.getStringWidth(text.replace(/&[a-z0-9]/gi, ''))
    if (remaining <= 0) return text
    text+='&0'
    const charsToAdd = Math.floor(remaining / Renderer.getStringWidth(padChar))
    for (let i = 0; i < charsToAdd; i++) text += padChar
    return text
}

const descGeneral = Object.entries(textsGeneral).reduce((a, [key, value]) => a + padText(`\n&b${key.replace(/\</g, "&3<")}&7 - ${value}`, ` &0`, 320), "")
const descHousing = Object.entries(textsHousing).reduce((a, [key, value]) => a + padText(`\n&b${key.replace(/\</g, "&3<")}&7 - ${value}`, ` &0`, 320), "")
const descSkyblock = Object.entries(textsSkyblock).reduce((a, [key, value]) => a + padText(`\n&b${key.replace(/\</g, "&3<")}&7 - ${value}`, ` &0`, 320), "")

@Vigilant(Metadata.name, Metadata.name, {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General','Housing','SkyBlock','Hide Spam','Automation'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }})
class Settings {
    
    // ------- //
    // General //
    
    // mod
    @ButtonProperty({
        name:"Reload Hydrogen",
        description: "Reloads certain features in the mod",
        category: "General",
        subcategory: "Mod",
        placeholder: "Reload"
    })
    genericReload() {
        ChatLib.command('hy-reload', true)
        Client.currentGui.close()
    }
    @ButtonProperty({
        name:"&bDiscord Server",
        description: "Questions, bugs and feedback for Hydrogen!",
        category: "General",
        subcategory: "Mod",
        placeholder: "Join"
    })
    genericJoinDiscord() {
        Desktop.getDesktop().browse(DiscordInvite);
    }
    @SwitchProperty({
        name: "Essential Notifications",
        description: "When enabled, replaces certain alerts in the mod to use an Essential Mod notification instead.",
        category: "General",
        subcategory: "Mod",
    })
    genericEssential = true

    // real shit
    @SwitchProperty({
        name:"Hydrogen Extra",
        description: "Enable to use &6unstable&r features, and basically any left over shit & slop I decided to throw into the mod for no reason at all",
        category: "General",
        subcategory: "Real Shit",
    })
    genericExtra = false

    

    // --------- //
    // Hide Spam //

    // lobby
    @SwitchProperty({
        name:"Hide Mystery Boxes",
        description: "Hides Mystery Box messages from other people in lobbies",
        category: "Hide Spam",
        subcategory: "Lobby",
    })
    featuresHide_Boxes = false
    @SwitchProperty({
        name:"Hide Join Messages",
        description: "Hides MVP+ & MVP++ join messages in lobbies",
        category: "Hide Spam",
        subcategory: "Lobby",
    })
    featuresHide_Joins = false
    @SwitchProperty({
        name:"Hide Fish",
        description: "Hides rare fish messages in lobbies",
        category: "Hide Spam",
        subcategory: "Lobby",
    })
    featuresHide_Fish = false

    // advertising
    @SwitchProperty({
        name:"Hide /visit",
        description: "Hides all player sent messages containing /visit",
        category: "Hide Spam",
        subcategory: "Advertising",
    })
    featuresHide_Visit = false
    @SwitchProperty({
        name:"Hide /p join",
        description: "Hides all player sent messages containing /p join and /p me",
        category: "Hide Spam",
        subcategory: "Advertising",
    })
    featuresHide_AdParty = false
    @SwitchProperty({
        name:"Hide /g join",
        description: "Hides all player sent messages containing /g join",
        category: "Hide Spam",
        subcategory: "Advertising",
    })
    featuresHide_AdGuild = false

    // player housing
    @SwitchProperty({
        name:"Hide Join Messages",
        description: "Hides all house join messages in Housing",
        category: "Hide Spam",
        subcategory: "Player Housing",
    })
    featuresHide_HouseJoin = false
    @SwitchProperty({
        name:"Hide Biome Stick",
        description: "Hides the biome stick warning in Housing",
        category: "Hide Spam",
        subcategory: "Player Housing",
    })
    featuresHide_HouseBiome = false

    // skyblock
    @SwitchProperty({
        name:"Hide /ah",
        description: "Hides all player sent messages containing /ah",
        category: "Hide Spam",
        subcategory: "SkyBlock",
    })
    featuresHide_sbAuctions = false


    // ---------- //
    // Automation //

    // guilds
    @SwitchProperty({
        name:"Auto Guild",
        description: "Automatically accepts guild join requests",
        category: "Automation",
        subcategory: "Guilds",
    })
    featuresAuto_Guild = false

    @SwitchProperty({
        name:"Auto Guild Welcome",
        description: "Automatically welcomes guild members going online",
        category: "Automation",
        subcategory: "Guilds",
    })
    featuresAuto_GuildWelcome = false

    @TextProperty({
        name:"Auto Guild Welcome Message",
        description: "The custom message to send when a guild member goes online",
        category: "Automation",
        subcategory: "Guilds",
        placeholder: "welcome, $player!"
    })
    featuresAuto_GuildWelcome_message = "welcome, $player!"

    // lobby fishing
    @SwitchProperty({
        name:"Auto Fish GG",
        description: "Send a custom message when someone catches a rare fish in the lobby",
        category: "Automation",
        subcategory: "Lobby Fishing",
    })
    featuresAuto_FishGG = false
    @TextProperty({
        name:"Auto Fish GG Message",
        description: "Send a custom message when someone catches a rare fish in the lobby",
        category: "Automation",
        subcategory: "Lobby Fishing",
        placeholder: "nice catch!"
    })
    featuresAuto_FishGG_message = "nice catch!"

    // recieved cookie
    @SwitchProperty({
        name:"Auto Cookie Response",
        description: "Respond to players giving you a cookie in Housing",
        category: "Automation",
        subcategory: "Recieved Cookie",
    })
    featuresAuto_Cookie = false
    @TextProperty({
        name:"Auto Cookie Response Message",
        description: "Send a custom message when someone gives your house cookies. Split with semicolon, commands supported at own risk. Use $player for the player, $amnt for the amount",
        category: "Automation",
        subcategory: "Recieved Cookie",
        placeholder: "thank you for the cookies! <3"
    })
    featuresAuto_Cookie_message = "thank you for the cookies! <3"


    // ------- //
    // Housing //

    // placeholders
    @SwitchProperty({
        name: "Placeholders",
        description: "Enables Placeholders to be used when sending chat messages or commands",
        category: "Housing",
        subcategory: "Placeholders"
    })
    featuresPlaceholders = true

    @SwitchProperty({
        name: "Lock Placeholders",
        description: "Blocks all attempts to update placeholders when new updates are installed",
        category: "Housing",
        subcategory: "Placeholders"
    })
    featuresPlaceholderLock = false

    @ButtonProperty({
        name: "Edit Placeholders",
        description: "Open your placeholders.json file. To apply changes, type &f/hy-reload&r. If you want to restore it to default, type &f/restoreplaceholders&r",
        category: "Housing",
        subcategory: "Placeholders",
        placeholder: "Open File", //ironic
    })
    featuresPlaceholders_openFile() {
        if (FileLib.exists(`./config/ChatTriggers/${Metadata.name}/assets/placeholders.json`)) {
            Desktop.getDesktop().open(placeholdersJson);
        } else {
            ChatLib.chat('&cYou have no placeholders file! Generate one using /restoreplaceholders!')
            Client.currentGui.close()
        }   
    }

    // pro tools
    @SwitchProperty({
        name: "Cooldown Notifier",
        description: "Sends a chat message when the cooldown for your pro tools expire. This message disappears when a new one appears",
        category: "Housing",
        subcategory: "Pro Tools",
    })
    featuresPT_Cooldown = true

    // interface
    @SwitchProperty({
        name: "Better UI",
        description: "Improves certain menus in small ways with custom skulls",
        category: "Housing",
        subcategory: "Interface",
    })
    featuresSkullUI = true

    // menu wheel
    @SwitchProperty({
        name: "Creative Check",
        description: "Only allows you to access the wheel in creative mode, to prevent using it on accident",
        category: "Housing",
        subcategory: "Menu Wheel",
    })
    featuresWheel_Checksum = true

    // -------- //
    // SKYBLOCK //

    // @SwitchProperty({
    //     name: "No Glass Pane",
    //     description: "Hides the gray stained glass pane being used for blank areas in GUIs\n&cUnstable: May break in some GUIs. Report bugs in the Discord!",
    //     category: "SkyBlock",
    //     subcategory: "Interface"
    // })
    // featuresSb_HideGlass = false

    @SwitchProperty({
        name: "Block Tally",
        description: "Tallies your average blocks per second in chat",
        category: "SkyBlock",
        subcategory: "Tallying"
    })
    featuresSb_TallyBlocks = false

    @TextProperty({
        name:"Timeout",
        description: "The time with no actions in seconds that it takes for the tally to finish",
        category: "SkyBlock",
        subcategory: "Tallying",
        placeholder: "1"
    })
    featuresSb_TallyTimeout = "1"

    // @SwitchProperty({
    //     name: "Wither Fix",
    //     description: "Hides random wither boss bars appearing in the HUD",
    //     category: "SkyBlock",
    //     subcategory: "§rMiscellaneous"
    // })
    // featuresSb_MiscWither = true

    constructor() {
        this.initialize(this);

        this.setCategoryDescription("General", `&b&lHydrogen \n&fMade by ixNoah\n${descGeneral}`)
            this.setSubcategoryDescription('General', 'Mod', 'Options related to the core of the mod')

        this.setCategoryDescription("Automation", `&b&lHydrogen \n&fMade by ixNoah\n\nAutomate certain actions (Use cautiously)`)
            this.setSubcategoryDescription('Automation', 'Guilds', 'Automatic actions related to Guilds')
            this.setSubcategoryDescription('Automation', 'Lobby Fishing', 'Automatic actions related to Lobby Fishing')

        this.setCategoryDescription("Hide Spam", `&b&lHydrogen \n&fMade by ixNoah\n\nOnly applies to messages sent in public chat!`)
            this.setSubcategoryDescription('Hide Spam','Lobby', `Lobby related messages`)
            this.setSubcategoryDescription('Hide Spam','Advertising', `Advertising messages`)
            this.setSubcategoryDescription('Hide Spam','Player Housing', `Housing related messages`)
            this.setSubcategoryDescription('Hide Spam','SkyBlock', `SkyBlock related messages`)

        this.setCategoryDescription("Housing", `&b&lHydrogen \n&fMade by ixNoah\n${descHousing}`)
            this.setSubcategoryDescription('Housing','Menu Wheel', `A grid to quickly access menus, set hotkey in Controls`)
            this.setSubcategoryDescription('Housing','Placeholders', `Quick chat shortcuts to optimise your workflow`)
            this.setSubcategoryDescription('Housing','Pro Tools', `Features to upgrade Housing Pro Tools`)

        this.setCategoryDescription("SkyBlock", `&b&lHydrogen \n&fMade by ixNoah\n${descSkyblock}`)
            this.setSubcategoryDescription('SkyBlock','Warp Wheel', `A grid to quickly access warps, set hotkey in Controls`)
            this.setSubcategoryDescription('SkyBlock','Tallying', `Count & log actions in chat to see how fast you're going`)
            this.setSubcategoryDescription('SkyBlock','§rMiscellaneous', `Small things that don't fit into any categories`)
        
    }
}

export default new Settings();