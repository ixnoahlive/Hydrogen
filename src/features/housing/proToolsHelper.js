import config from "../../.dev/config";
import Essence from '../../../../Essence'

const msg = new TextComponent('&7 is now off cooldown!')

const criteria = [
    '&r&aFilled the selected region with &r&e${block}&r&a.&r',
    '&r&aSet selected region with &r&e${block}&r&a.&r',
    '&r&aWireframed the selected region with &r&e${block}&r&a.&r',
    '&r&aWalled the selected region with &r&e${block}&r&a.&r',
    '&r&aCopied selected region to the clipboard.&r',
    '&r&aSuccessfully pasted region.&r',
    '&r&aCut selected region. Use the Paste Tool to paste it!&r',
    '&r&aReplaced the selected region with &r&e${block}&r&a.&r',
    '&r&cNothing to change!&r',

    '&r&aYour last operation has been undone.&r'
]
const criteriaKeys = ['Fill','Set','Wireframe','Wall','Copy','Paste','Cut','Replace','Pro Tools','Undo']
const criteriaCommands = ['fill','set','wireframe','wall','copy','paste','cut','replace','wand','undo']

function timeMessage(protoolName, protoolCommand) {
    if (!config.featuresPT_Cooldown) return
    setTimeout(() => {
        if (config.genericEssential) {
            Essence.sendNotification('Pro Tools', `${protoolName} is off cooldown!`, 1, () => Client.setCurrentChatMessage('/'+protoolCommand+' '), ()=>{})
        } else {
            ChatLib.chat(new Message([new TextComponent('&7'+protoolName),msg]).setChatLineId(90002))
        }
        World.playSound('note.hat', 0.5, 1)
    }, 4000);
}

criteria.forEach((match) => {
    register('chat', () => timeMessage(criteriaKeys[criteria.indexOf(match)], criteriaCommands[criteria.indexOf(match)])).setCriteria(match)
})
// ------------------ //
// Pro Tools Commands //
// ------------------ //
const colorList = {
    "white":"0",
    "orange":"1",
    "magenta":"2",
    "light_blue":"3",
    "yellow":"4",
    "lime":"5",
    "pink":"6",
    "gray":"7",
    "light_gray":"8",
    "cyan":"9",
    "purple":"10",
    "blue":"11",
    "brown":"12",
    "green":"13",
    "red":"14",
    "black":"15"
}

const blocks = ['wool','stained_glass','wool','stained_glass_pane']

register('command', (color, block) => {
    if (!color || !block) return 'Provide a valid color & block! Use command autocomplete for examples!'
    if (!colorList[color] || blocks[block]) return 'Provide a valid color & block! Use command autocomplete for examples!'
    ChatLib.command(`replace ${block} ${block}:${colorList[color]}`)
}).setName('paint').setAliases(['/paint']).setTabCompletions(['white','orange','magenta','light_blue','yellow','lime','pink','gray','light_gray','cyan','purple','blue','brown','green','red','black'])