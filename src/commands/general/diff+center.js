register('command', (...args) => {
    if (args.length<6 | parseInt(args.join(''))==NaN) return ChatLib.chat('&c/diff <x y z> <x y z>\n&cInvalid usage! Provide two XYZ coordinates!')
    args = args.map(function (x) { return parseInt(x, 10) });
    
    ChatLib.chat(`&aThere are &e${Math.hypot(args[0]-args[3], args[1]-args[4], args[2]-args[5]).toFixed(2)}&a blocks between &e${args[0]} ${args[1]} ${args[2]}&a and &e${args[3]} ${args[4]} ${args[5]}&a.`)
}).setName('diff')

register('command', (...args) => {
    if (args.length !== 6) return ChatLib.chat('&c/cent <x y z> <x y z>\n&cInvalid usage! Provide two XYZ coordinates!')

    let [x0, y0, z0, x1, y1, z1] = args.map(a => parseInt(a))

    const centerX = (x0 + x1) / 2
    const centerY = (y0 + y1) / 2
    const centerZ = (z0 + z1) / 2

    ChatLib.chat(new Message([
        `&aThe center of the two blocks is `,
        new TextComponent(`&e${centerX} ${centerY} ${centerZ}`).setHover('show_text','&7Copy coordinates').setClick('suggest_command', `${centerX} ${centerY} ${centerZ}`), 
        '&a.'
    ]))
}).setName('cent')