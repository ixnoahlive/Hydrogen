const ViewMyStats = new KeyBind('§fView your stats', Keyboard.KEY_NONE, '§bHydrogen§r - Housing');
const ViewGlobalStats = new KeyBind('§fView global stats', Keyboard.KEY_NONE, '§bHydrogen§r - Housing');
const ClearMyStats = new KeyBind('§fClear your stats', Keyboard.KEY_NONE, '§bHydrogen§r - Housing');

const OpenMenu = new KeyBind('§f§fMenu', Keyboard.KEY_NONE, '§bHydrogen§r - Housing');
const OpenRegions = new KeyBind('§f§fRegions', Keyboard.KEY_NONE, '§bHydrogen§r - Housing');
const OpenFunctions = new KeyBind('§f§fFunctions', Keyboard.KEY_NONE, '§bHydrogen§r - Housing');
const OpenCommands = new KeyBind('§f§fCommands', Keyboard.KEY_NONE, '§bHydrogen§r - Housing');
const OpenScoreboard = new KeyBind('§f§fScoreboard', Keyboard.KEY_NONE, '§bHydrogen§r - Housing');

const ProDesel = new KeyBind('§f§f§7//desel', Keyboard.KEY_NONE, '§bHydrogen§r - Housing');
const ProWand = new KeyBind('§f§f§7//wand', Keyboard.KEY_NONE, '§bHydrogen§r - Housing'); // The goofy colour codes are used for sorting

const ixPanel = new KeyBind('Open Panel', Keyboard.KEY_NONE, '§bHydrogen§r - Housing'); // The goofy colour codes are used for sorting

// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / //

ViewMyStats.registerKeyPress(() => ChatLib.command(`viewstats ${Player.getName()}`));
ViewGlobalStats.registerKeyPress(() => ChatLib.command(`viewglobalstats`));
ClearMyStats.registerKeyPress(() => ChatLib.command(`clearstats`));

OpenMenu.registerKeyPress(() => ChatLib.command(`menu`));
OpenRegions.registerKeyPress(() => ChatLib.command(`regions`));
OpenFunctions.registerKeyPress(() => ChatLib.command(`function`));
OpenCommands.registerKeyPress(() => ChatLib.command(`commands`));
OpenScoreboard.registerKeyPress(() => ChatLib.command(`scoreboard`));

ProDesel.registerKeyPress(() => ChatLib.command(`/desel`));
ProWand.registerKeyPress(() => ChatLib.command(`/wand`));

ixPanel.registerKeyPress(() => ChatLib.command(`panel`, true));