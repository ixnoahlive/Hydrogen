import Settings from '../../.dev/config'
import Metadata from '../../.dev/metadata'

const Main = JSON.parse(FileLib.read(Metadata.name, 'assets/placeholders.json'))

const Placeholders = { main: Main }

register('messageSent', (message, event) => {
    if (!Settings.featuresPlaceholders) return

    let newMessage = message.replace(/#[\w:.'`\-/_&1234567890/]+/g,  match => {
        match = match.split('/')
        
        if (!Placeholders.main[match[0]]) return match.join('/')
        if (!Placeholders.main[match[0]].startsWith('js:')) return Placeholders.main[match[0]]
        
        return eval(Placeholders.main[match[0]].replace('js:','')).replace(/undefined/g, '').replace(/null/g, '')
    });

    if(message === newMessage) return;

    cancel(event);
    ChatLib.say(newMessage);
});