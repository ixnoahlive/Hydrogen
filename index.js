/** ### Hydrogen ###  /
 * Developed by ixNoah
/*  ################ */

// Meta
import './src/features/firstInstall'
import './src/commands/settings';
import './src/commands/reload';
import './src/.dev/metadata';

// Features
import './src/features/general/automation';
import './src/features/general/hideStuff';
import './src/features/general/fun';

import './src/features/housing/hotkeys';
import './src/features/housing/placeholders';
import './src/features/housing/proToolsHelper';
import './src/features/housing/menuWheel';
import './src/features/housing/fixSkulls'
import './src/features/housing/bookmark';

import './src/features/skyblock/warpWheel';
// import './src/features/skyblock/hideGlass';
// import './src/features/skyblock/witherFix';
import './src/features/skyblock/tally';

// Commands
import './src/commands/general/diff+center';
import './src/commands/general/seen';
import './src/commands/general/small';
import './src/commands/general/symbols'

import './src/commands/housing/overrides';
import './src/commands/housing/panel';
import './src/commands/housing/item'

import Metadata from './src/.dev/metadata';

register('guiClosed', () => {
    Client.settings.getSettings().func_74303_b();
})
// Dev command
register('command', () => {
    ChatLib.chat('&e&lDEV&f Packaging for release...')

    FileLib.delete(Metadata.name, '.ixm')
    FileLib.delete(Metadata.name, 'config.toml')
    FileLib.delete(Metadata.name, 'assets/placeholders.json')
    FileLib.delete(Metadata.name, 'assets/bookmark.json')
    
    ChatLib.chat('&e&lDEV&f &aPackaged!')
}).setCommandName('hydrogen:package')