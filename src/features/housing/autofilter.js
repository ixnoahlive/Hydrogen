import config from "../../.dev/config";
import Metadata from "../../.dev/metadata";
import Utils from "../../.dev/util";

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  } // Stackoverflow <3

register('command', () => {
    let updated = FileLib.read(Metadata.name, 'usercontent/mutelog.json')
    try { updated = JSON.parse(updated) } catch(err) {
        return ChatLib.chat('&cYou have no autofilter cases to review!')
    }
    
    const list = new Book('&c&lPunishments')
    let num = 1

    updated.reverse()

    updated.forEach(punishment => {
        list.addPage(new Message(
            new TextComponent(`&c&lCase #${num}\n`),
            new TextComponent(`&0&l${punishment.name}\n`),
            new TextComponent(`&7${new Date(punishment.time).toLocaleString('en-gb')}\n\n`),

            new TextComponent(`&6[Hover for Message]\n\n`).setHover('show_text', '&e'+punishment.message),
            new TextComponent(`&0Flagged for: \n&7${punishment.flagged}\n`),
            new TextComponent(`&0Similarity: \n&7${punishment.similarity.toFixed(5)}\n\n`),

            new TextComponent('&2[APPEAL] ').setClick('run_command', `/hydrogen:appealfilter ${punishment.name}`),
            new TextComponent('&4[DISMISS] ').setClick('run_command', `/hydrogen:dismissfilter ${punishment.name}`),
        ))
        num++
    })

    list.display(0)
}).setName('autofilter')

register('chat', (x, y, rank, name, message, event) => {
    //if (name==Player.getName()) return;

    const mode = Utils.getMode()
    if (!mode.isLobby && mode.name=="HOUSING" && Utils.isCreative()) {
        message.split(' ').forEach(word => {
            config.featuresAuto_Filter_List.split(';;').forEach(filtered => {
                let sussyness = similarity(filtered, word.replace(/[\?\.\,]/g, ''))
                
                if (sussyness>=config.featuresAuto_FilterSensitivity) {
                    ChatLib.command(`housing mute ${name}`)
                    ChatLib.chat('&c[&fAutofilter&c] Muted player & logged punishment details')

                    let updated = JSON.parse(FileLib.read(Metadata.name, 'usercontent/mutelog.json'))
                    updated.push({
                        name: name,
                        message: message,
                        flagged: word,
                        similarity: sussyness,
                        time: Date.now()
                    })

                    FileLib.write(Metadata.name, 'usercontent/mutelog.json', JSON.stringify(updated, null, 4), true)
                    return
                }
            })
        })
    }
}).setCriteria(/^((?:Guild|Party|Co-op|From|To) ?(>)?? |(?:(?:\[:v:\] )?(?:\[[\w\s]+\] )??))??(\[\w{3,}\+{0,2}\] )??(\w{1,16})(?: \[\w{1,6}\])??: (.*)$/)

register('command', (username) => {
    let list = JSON.parse(FileLib.read(Metadata.name, 'usercontent/mutelog.json'))
    list.forEach((punishment) => {
        if (username==punishment.name) list.splice(list.indexOf(punishment), 1)
    })
    FileLib.write(Metadata.name, 'usercontent/mutelog.json', list)
}).setName('hydrogen:dismissfilter')

register('command', (username) => {
    ChatLib.command(`housing unmute ${username}`)

    let list = JSON.parse(FileLib.read(Metadata.name, 'usercontent/mutelog.json'))
    list.forEach((punishment) => {
        if (username==punishment.name) list.splice(list.indexOf(punishment), 1)
    })
    FileLib.write(Metadata.name, 'usercontent/mutelog.json', list)
}).setName('hydrogen:appealfilter')