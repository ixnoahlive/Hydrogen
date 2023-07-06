import Settings from '../../.dev/config'
import Utils from '../../.dev/util'
import Metadata from '../../.dev/metadata'

const Default = FileLib.read(Metadata.name,'assets/placeholders_default.json')
const Main = JSON.parse(FileLib.read(Metadata.name, 'assets/placeholders.json'))

const Placeholders = { main: Main, default: Default }

register('messageSent', (message, event) => {
    if (!Settings.featuresPlaceholders) return

    let newMessage = message.replace(/#[\w:.'`\-/_&1234567890/]+/g,  match => {
        match = match.split('/')

        console.log(match)
        
        if (!Placeholders.main[match[0]]) return match.join('/')
        if (!Placeholders.main[match[0]].startsWith('js:')) return Placeholders.main[match[0]]
        
        return eval(Placeholders.main[match[0]].replace('js:','')).replace(/undefined/g, '').replace(/null/g, '')
    });

    if(message === newMessage) return;

    cancel(event);
    ChatLib.say(newMessage);
});

register('command', (...args) => {
    if (!args || args[0]!=='quiet') ChatLib.chat('&7Resetting placeholders to defaults...')
    FileLib.write(Metadata.name, 'assets/placeholders.json', Placeholders.default)
    
    ChatLib.command(`hy-reload ${args.join(' ')}`, true)

    if (!Settings.featuresPlaceholders && args[0]!=='quiet') ChatLib.chat('&c&lWARNING&7 You have Placeholders disabled!')
}).setName('restoreplaceholders')

export default Placeholders;