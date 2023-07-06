# How to use Wheel JSONS
This is mostly just for people trying to add their custom wheels to Hydrogen or modifying existing ones.

Wheel JSONs are 8 entry objects that store the data for a Wheel.
These are parsed through a utils function.

## Keys
- position: A number 1-8, places in grid as follows:
    1 2 3
    8   4
    7 6 5
- item: A Minecraft Item ID, or a NBT string (marked with `nbt:` beforehand. Get an item's NBT using the /dumpnbt command.)
- lore: An array of strings with the item's desired lore.
- js: A string, the JS code to run when this item is clicked. (Example: `ChatLib.command('hub')` sends you to the hub.)
- color: red, orange, yellow, green, blue, purple, white