import Settings from '../../.dev/config'

register('chat', (trash, player, trash2, event) => {
    if ( !Settings.featuresAuto_Guild ) return

    ChatLib.command(`g accept ${player}`)

}).setChatCriteria('${trash}Click here &r&ato accept or type &r&b/guild accept ${player}&r&a!${trash2}')

register('chat', (player, fish, slogan, event) => {
    if ( !Settings.featuresAuto_FishGG ) return

    setTimeout( () => {
        ChatLib.say( Settings.featuresAuto_FishGG_message.trim() ? Settings.featuresAuto_FishGG_message : "nice catch!" )
    }, Math.floor( Math.random() * 1000 ) + 300 ); // prevent watchdog from being a little bitch

}).setCriteria("${player} caught a ${fish}! ${slogan}")

register('chat', (amnt, player, event) => {
    if (Settings.featuresAuto_Cookie) {
        if (Settings.featuresAuto_Cookie_message.trim().length==0) return ChatLib.chat('&cWarning: You have Auto Cookie Response enabled, but no message is set!')
        
        player = ChatLib.removeFormatting(player.split(' ')[player.split(' ').length-1].trim())
        console.log(player)

        let delayMs = 100
        Settings.featuresAuto_Cookie_message.split(';').forEach((message) => {
            setTimeout(() => {
                
                ChatLib.say(message
                    .replace(/\$cookie/, 'cookie'+(parseInt(amnt)==1 ? '' : 's'))
                    .replace(/\$player/g, player)
                    .replace(/\$amnt/, parseInt(amnt))
                )
            }, delayMs);
            delayMs += 250
        })
    }
}).setCriteria('You received ${amnt} cookies from ${player}!')

register('chat', (player, event) => {
    if (!Settings.featuresAuto_GuildWelcome) return 
    setTimeout(() => {
        ChatLib.say('/gc '+Settings.featuresAuto_GuildWelcome_message
            .replace(/\$player/g, player)
        )
    }, Math.floor( Math.random() * 1000 ) + 300);
}).setCriteria('Guild > ${player} joined.')

// > &r&eYou received &r&a5&r&e cookies from &r&b[MVP&r&f+&r&b] Wuxule&r&f&r&e!&r