const Placeholders = {
    internal: {
        "#pot.max": "2592000",
        "#stat.": "%stat.player/$%",
        "#gstat.": "%stat.global/$%",
        "#stat.": "%stat.player/$%",
        "#unix":"%date.unix%",
        "#e":"&r"
    }
}

// ? What does this do?
// # This adds custom placeholders, like #e which when typed in chat is replaced with &r.
// # I'll explain all code in further comments.

register('messageSent', (message, event) => {
    if (!message.match(/#(\S+)/g)) return 
    // In order to not waste time doing a useless count on every message, I first check if anything is somewhat like a placeholder.
    
    let c = 0
    Object.keys(Placeholders.internal).forEach(place => {
        if (message.includes(place)) c++
    })
    if (c==0) return
    // This checks if any placeholders are in the message, and if there aren't it will return.
    // This is so that messages with a # don't cause an overflow error.

    let res = message

    message.split(' ').forEach(word => {
        Object.keys(Placeholders.internal).forEach(place => {
            if (word.startsWith(place)) {
                res = res.replace(word, Placeholders.internal[place].replace('$',word.split('.')[1])) 
            }
        })
    })
    // Replace the stuff

    cancel(event)
    ChatLib.say(res)
})

export default Placeholders