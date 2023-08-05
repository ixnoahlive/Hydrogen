import Metadata from "../../.dev/metadata"
import Utils from "../../.dev/util"

const Symbols = JSON.parse(FileLib.read(Metadata.name, 'assets/symbols.json'))

const Components = []

Object.keys(Symbols).forEach(Category => {
  Components.push(`\n&e${Category}\n`)

  Object.keys(Symbols[Category]).forEach(Symbol => {
    Components.push(
      new TextComponent('&b'+Symbols[Category][Symbol]+' ')
        .setClick('run_command', `/hydrogen:placesymbol ${Symbols[Category][Symbol]}`)
        .setHover('show_text', `&ePaste &b${Symbols[Category][Symbol]} &esymbol`)
    )
  })
})
Components.push('\n')

const SymbolList = new Message(Components)

register('command', () => {
  ChatLib.chat(SymbolList)
}).setName('symbols').setAliases(['sym','uni','unicode'])

register('command', (...str) => {
  const pos = Utils.getCursorPosition()
  if (pos==-1) return -1
  Client.setCurrentChatMessage(Utils.insert(Client.getCurrentChatMessage(), str.join(' '), pos))
  Utils.setCursorPosition(pos+1)
}).setName('hydrogen:placesymbol')