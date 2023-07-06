const commands = {
    "&fOpen Menu:": [
        ['&7[Functions] ', '/functions', '&7/functions'],
        ['&7[Commands] ', '/commands', '&7/commands'],
        ['&7[Regions] ', '/regions', '&7/regions'],
        ['&7[Menu] ', '/menu', '&7/menu']
    ],
    '&fOpen Other: ': [
        ['&7[Logs] ', '/h log', '&7View house logs'],
        ['&7[Players] ', '/h players', '&7View player listing'],
        ['&7[Mailbox] ', '/h mailbox', '&7View mailbox'],
        ['&7[Hypixel Settings] ', '/settings', '&7View Hypixel settings']
    ],
    '&fPlayers: ': [
        ['&7[Kick All] ', '/h kickall', '&7Kick all players in your house'],
        ['&7[Kick Guests] ', '/h kickguests', '&7Kick all guests in your house'],
        ['&c[Clear Mutes] ', '/h clearmutes', '&cUnmute all muted players'],
        ['&c[Clear Bans] ', '/h clearbans', '&cUnban all banned players']
    ],
    '&fParkour Messages: ': [
        ['&7[ALL] ', '/parkour announce ALL', '&7All completions are posted'],
        ['&7[RECORD] ', '/parkour announce RECORD', '&7Only the best completions are posted'],
        ['&7[OFF] ', '/parkour announce OFF', '&7No completions are posted']
    ],
    '&fVisiting Rules: ': [
        ['&a[PUBLIC] ', '/visitingrule public', '&aAnyone can visit'],
        ['&c[PRIVATE] ', '/visitingrule private', '&cOnly you can visit'],
        ['&e[PARTY] ', '/visitingrule party', '&eParty members can visit'],
        ['&d[FRIENDS] ', '/visitingrule friends', '&dFriends can visit'],
        ['&2[GUILD] ', '/visitingrule guild', '&2Guild members can visit']
    ]
}

const categoryCount = Object.keys(commands).length
const breakComponent = new TextComponent('&9&m-----------------------------------------------------&r').setClick('run_command', '/ixm-clearpanels').setHover('show_text','&9Click to close panel')
const components = [breakComponent]
Object.entries(commands).forEach(([v, k], i) => {
    // Category
    components.push(k)

    // The commands
    commands[v].forEach(([display, command, hoverText]) => {
        components.push(new TextComponent(display).setClick("run_command", command).setHover("show_text", hoverText))
    })

    if (i !== categoryCount-1) return
    components.push("\n")
})
components.push(breakComponent)

register('command', () => {
    ChatLib.chat(new Message(components).setChatLineId(90001))
}).setName('panel')
    
register('command', () => {
    ChatLib.clearChat(90001)
}).setName('ixm-clearpanels')