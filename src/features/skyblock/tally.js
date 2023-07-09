import config from "../../.dev/config";

function getTimeout() {
    const TimeoutInt = parseInt(config.featuresSb_TallyTimeout)
    return TimeoutInt==NaN ? 1 : TimeoutInt 
}

const Tallys = {
    blocks: 0
}

let blocksBroken = 0
let isBreaking = false
let lastBrokenBlock = 0
let startTime = 0

register('blockBreak', () => {
    if (!config.featuresSb_TallyBlocks) return
    if (!startTime) startTime = Date.now()
    isBreaking = true
    blocksBroken++
    lastBrokenBlock = Date.now()
})

register('step', () => {
    if (!config.featuresSb_TallyBlocks) return
    if (!isBreaking) return
    let secondsElapsed = (Date.now() - startTime) / 1000

    const OldBlocks = Tallys.blocks
    Tallys.blocks = (blocksBroken / secondsElapsed).toFixed(2)

    ChatLib.chat(new Message(new TextComponent(`\n&c&lTALLY &fBlocks broken: &c${Tallys.blocks}/s\n`).setHover('show_text','&7This will stop counting after 1s of inactivity.')).setChatLineId(90057))

    if (Date.now() - lastBrokenBlock > getTimeout()*1000) {
        ChatLib.clearChat(90057)
        ChatLib.chat(new Message([`\n&a&lTALLY&f You averaged &a${(blocksBroken / (secondsElapsed-getTimeout())).toFixed(2)} blocks/s&f!\n${secondsElapsed<4 ? '&7Note: You mined for only '+secondsElapsed.toFixed(2)+' seconds, data may be wrong!\n' : ''}`]).setChatLineId(90057))
        isBreaking = false
        blocksBroken = 0
        startTime = 0
        lastBrokenBlock = 0
    }
}).setFps(20)

register('command', (args) => {
    switch(args) {
        case 'block':
            config.featuresSb_TallyBlocks = !config.featuresSb_TallyBlocks
            config.featuresSb_TallyBlocks ? ChatLib.chat('&aEnabled Block Tallying!') : ChatLib.chat('&cDisabled Block Tallying!')

            config.save()
        break;
        default:
            ChatLib.chat('&cInvalid usage! Usage: /tally blocks')
    }
}).setName('tally')