import Settings from "../../.dev/config";

// Mystery Box
register('chat', (player, boxstars, boxtype, event) => {
    if (!Settings.featuresHide_Boxes) return
    cancel(event)
}).setCriteria('&b✦ &r${player} &r&7found a ${boxstars} &r&b${boxtype}&r&7!&r')
register('chat', (trash, event) => {
    if (!Settings.featuresHide_Boxes) return
    cancel(event)
}).setCriteria('&r&b✦ ${trash} &r&aMystery Box&r&7!&r')


// Lobby Join
register('chat', (player, event) => {
    if (!Settings.featuresHide_Joins) return
    cancel(event)
}).setCriteria('&r${player}&f &6joined the lobby!&r')
register('chat', (player, event) => {
    if (!Settings.featuresHide_Joins) return
    cancel(event)
}).setCriteria('&r &b>&c>&a>&r &r${player} &6joined the lobby!&r &a<&c<&b<&r')


// Fish
register('chat', (player, fish, slogan, event) => {
    if (!Settings.featuresHide_Fish) return
    cancel(event)
}).setCriteria("${player} caught a ${fish}! ${slogan}")

// Housing Joins
register('chat', (player, event) => {
    if (!Settings.featuresHide_HouseJoin) return
    cancel(event)
}).setCriteria("${player} entered the world.")

// Biome Stick
register('chat', (player, event) => {
    if (!Settings.featuresHide_HouseBiome) return
    cancel(event)
}).setCriteria("&r&eNote: Changing biomes can sometimes cause some entities to disappear or freeze, you may need to relog!&r")


// Chat Messages
register('chat', (x, y, rank, name, message, event) => {
    if (x.length>0) return
    if (name===Player.getName()) return // I used ===. Does this make you hard, Squagward?
    if (message.includes('/visit') && Settings.featuresHide_Visit) return cancel(event)
    if (message.includes('/g join') && Settings.featuresHide_AdGuild) return cancel(event)
    if (message.includes('/p join') && Settings.featuresHide_AdParty) return cancel(event)
    if (message.includes('/ah') && Settings.featuresHide_sbAuctions) return cancel(event)
}).setCriteria(/^((?:Guild|Party|Co-op|From|To) ?(>)?? |(?:(?:\[:v:\] )?(?:\[[\w\s]+\] )??))??(\[\w{3,}\+{0,2}\] )??(\w{1,16})(?: \[\w{1,6}\])??: (.*)$/)