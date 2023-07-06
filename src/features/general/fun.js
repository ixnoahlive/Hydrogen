import config from "../../.dev/config";
import Utils from "../../.dev/util";

register('chat', (message, event) => {
    if (!config.genericExtra) return
    cancel(event)
    if (message.includes('trans')) {
        message = message.replace(/trans/gi, '&bt&dr&fa&dn&bs&r')
    }
    if (message.includes('queer')) {
        message = message.replace(/queer/gi, '&cq&eu&ae&be&dr&r')
    }
    if (message.includes('enby')) {
        message = message.replace(/enby/gi, '&ee&fn&5b&0y&r')
    }
    if (message.includes('lesbian')) {
        message = message.replace(/lesbian/gi, '&cle&6s&fb&di&5an&r')
    }
    if (message.includes('gay')) {
        message = message.replace(/gay/gi, '&ag&fa&by&r')
    }
    if (message.includes('bisexual')) {
        message = message.replace(/bisexual/gi, '&dbis&5ex&1ual&r')
    }
    if (message.includes('pan')) {
        message = message.replace(/pan/gi, '&dp&ea&bn&r')
    }

    ChatLib.chat(message)
}).setCriteria('&r${message}')