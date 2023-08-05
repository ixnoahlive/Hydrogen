// ------------------------------------------ //
// these are overrides for existing commands  //
// on Housing, all in one file to save space. //
// ------------------------------------------ //

register('command', (...args) => {
    switch (args[0]) {
        
        // Teleports the player to the center of the house
        case 'center':
            if (parseInt(args[1])) {
                ChatLib.command(`tp -2.5 ${parseInt(args[1])} 12.5`);
            } else {
                ChatLib.command('tp -2.5 ~ 12.5');
            };
        break;

        // Runs a native command to Hypixel if not a custom argument
        default:
            ChatLib.command(`housing ${args.join(' ')}`)
        break;
    };
}).setName('housing').setAliases(['h','house']);

const placeholders = [
    "&bHydrogen Placeholders:",
    "&r  &r&3#unix &7(alias)",
    "&r  &r&3#cookies &7(alias)",
    "&r  &r&3#guests &7(alias)",
    "&r  &r&3#name &7(alias)",
    "&r  &r&3#rg &7(alias)",
    "&r  &r&3#x &7(alias)",
    "&r  &r&3#y &7(alias)",
    "&r  &r&3#z &7(alias)",
    "&r  &r&3#pstat/&7<key> (alias)",
    "&r  &r&3#gstat/&7<key> (alias)",
    "&r  &r&3#rng/&7<inclusive origin>/<exclusive bound> &7(alias)",
    "&r  &r&3#helditem&3.&3name &7(\&bMy Cool Item&7)",
    "&r  &r&3#helditem&3.&3name&3.&3clean &7(My Cool Item)",
    "&r  &r&3#blue_wool &7(wool:11) (Works with all colour blocks!)",
]

register('chat', (...args) => {
    setTimeout(() => {
        placeholders.map((entry) => {return new TextComponent(entry)})
        ChatLib.chat(new Message(placeholders.join('\n')))
    }, 1);
}).setCriteria('&r  &r&6%&r&6stat.global/&r&7<key>&r&6%&r')

register('command', (...args) => {
    ChatLib.command(`theme ${args.join(' ')}`)
}).setName('theme').setAliases(['settheme']).setTabCompletions(['DEFAULT', 'SNOW', 'MESA', 'ENCHANTED_FOREST', 'DESERT', 'LOLLIPOP', 'NETHER', 'END', 'SCI_FI', 'JUNGLE', 'MUSHROOMS', 'FLOWERS', 'FRUIT_SALAD', 'SMILEYS', 'WARLORDS_BLUE', 'WARLORDS_RED', 'BLOCKING_DEAD', 'PAINTER_STUDIO', 'FJORD', 'JARDIN', 'GOLDMINE', 'CRYSTALS', 'TOWN_SQUARE', 'TENSHU', 'FUTURE_TECH', 'SPACE_DOCK', 'BASIC', 'AIR', 'VANILLA', 'HAUNTED_MANSION', 'GIFTS', 'FIREPLACE', 'NORTH_POLE', 'SANTAS_WORKSHOP', 'POOL_PARTY_BBQ', 'DAY_AT_THE_BEACH', 'STATION', 'NORTHERN_LIGHTS', 'LUNAR_NEW_YEAR_2020', 'EASTER_EGG_VILLAGE', 'GRAND_PLAINS', 'EGG_WORKSHOP', 'SPRING_VILLAGE', 'CATHEDRAL', 'LONELY_LIGHTHOUSE', 'SNOW_GLOBE', 'FARMLAND', 'VINEYARD', 'VENICE', 'OPERA', 'NEIGHBORHOOD', 'COURTYARD', 'CURSED_COVE', 'AQUATIC', 'PILLARS', 'SKYBLOCK_VILLAGE', 'BAYOU', 'FORTRESS', 'HAVEN', 'MODERN_SUBURB', 'PARTHENON', 'AMIRI_TEMPLE', 'GOTHIC_FACADE', 'PALACE', 'PARIS', 'TROPICAL_PARADISE', 'BURNWOOD', 'GLADIATOR_ARENA', 'THE_DOCKS', 'SUNNY_SHORE', 'DISCO', 'POOL_PARTY', 'AUDITORIUM', 'PREBUILT_DEFAULT_ISLAND', 'PREBUILT_FAR_EAST'])

/*
register('command', () => {
    ChatLib.command('placeholders');

    setTimeout(() => {
        ChatLib.chat('&bixMod Placeholders:');
        Object.keys(Placeholders.sample).forEach(Pl => {
            ChatLib.chat(`&0 &3 ${Pl} &7${Placeholders.sample[Pl].length>1 ? '('+Placeholders.sample[Pl]+')' : ''}`)
            console.log(`&0 &3 ${Pl} &7${Placeholders.sample[Pl].length>1 ? '('+Placeholders.sample[Pl]+')' : ''}`)
        });
    }, (1000));
}).setName('placeholders')
*/