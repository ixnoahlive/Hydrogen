import Metadata from '../.dev/metadata'

const msg = [
    '&b&lHydrogen',
    '&7Thank you for testing my mod!',
    '&7Expect bugs & issues. Report them below!'
]

const msg2 = [
    '&b&lHydrogen',
    '&eMod version was updated to &6v'+Metadata.version,
    'changelog'
]

if (!FileLib.exists('./config/ChatTriggers/modules/Coffee') && !FileLib.exists('./config/ChatTriggers/modules/ChestMenu') && !FileLib.exists('./config/ChatTriggers/modules/Vigilance') && !FileLib.exists('./config/ChatTriggers/modules/axios')) ChatLib.chat('&cMissing dependencies! Check if you installed Coffee, ChestMenu, Vigilance & Axios!')

if (!FileLib.exists(Metadata.name, '.ixm')) {

    setTimeout(() => {
        ChatLib.chat('\n&r&9&m-----------------------------------------------------&r')
        msg.forEach(a => ChatLib.chat(ChatLib.getCenteredText(a)))
        ChatLib.chat('&r&9&m-----------------------------------------------------&r')
        ChatLib.chat(new Message(
            new TextComponent('&9&n[Discord]').setClick('open_url','https://discord.gg/9JMpaJAUfj').setHover('show_text','&9The official development Discord!'),
            new TextComponent('&7 '),
            new TextComponent('&b[Open Menu]\n').setClick('run_command','/hy').setHover('show_text','&bRuns /hy to open the menu')
        ))
        ChatLib.command('hy-reload quiet', true)
    }, 1000)
    FileLib.write(`./config/ChatTriggers/modules/${Metadata.name}/.ixm`, Metadata.version)
    FileLib.write(Metadata.name, 'assets/bookmarks.json', '[{"name":"ixNoah","uuid":"58583751-5da7-46fa-834b-1e82c75295fb"}]', true)


} else if (Metadata.version=='0.0.x' ||  Metadata.version!==FileLib.read('Hydrogen', '.ixm')) {

    ChatLib.chat('\n&r&9&m-----------------------------------------------------&r')
        msg2.forEach(a => {
            if (a=="changelog") return ChatLib.chat(
                    new TextComponent('&6                                 [Changelog]')
                        .setHover('show_text', FileLib.read(Metadata.name, 'src/.dev/changelog.txt')
                            .replace(/\r/g,'').replace(/\*/g, '&7-&f'))
                )
            ChatLib.chat(ChatLib.getCenteredText(a))
        })
        ChatLib.chat('&r&9&m-----------------------------------------------------&r')
        ChatLib.chat(new Message(
        new TextComponent('&9&n[Discord]').setClick('open_url','https://discord.gg/9JMpaJAUfj').setHover('show_text','&9The official development Discord!'),
        new TextComponent('&7 '),
        new TextComponent('&b[Open Menu]\n').setClick('run_command','/hy').setHover('show_text','&bRuns /hy to open the menu')
    ))
    FileLib.write(`./config/ChatTriggers/modules/${Metadata.name}/.ixm`, Metadata.version)
}