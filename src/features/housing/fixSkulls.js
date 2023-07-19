// ------------- FixSkulls ---------------- //
// Fix Skulls will make certain skulls more //
// appropriate in Housing, eg. visit rules  //

import Utils from "../../.dev/util";
import config from "../../.dev/config";

const MCNBTTagString = Java.type("net.minecraft.nbt.NBTTagString");
const MCNBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
const MCNBTTagList = Java.type("net.minecraft.nbt.NBTTagList");

const colorSkulls = {
    "0":['550b004a-4e02-4ab3-a18c-5be181f82325','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOTc0ZmU5Y2I4MDAyOWQ2NjM0NTI3N2FhNTYwZDQxZWYxMDMwOTYyYjdmMjlhYmYyMzk2MWQ5ZWJhODQyNTBhMyJ9fX0='],
    "1":['bf6d1c68-0cef-44e3-a223-d11056233db1','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvN2U3YWI3MTJjODdmNjdkNDhiOThmNzA2MzRkMWRjZmNkNTk4MGMzZDZmMGQ2MjJjZGMzMjMwOTEyMzYxYjU0ZSJ9fX0='],
    "2":['46e1cba8-2ad8-45de-b30a-e78de3c24b2c','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYTNlOWY0ZGJhZGRlMGY3MjdjNTgwM2Q3NWQ4YmIzNzhmYjlmY2I0YjYwZDMzYmVjMTkwOTJhM2EyZTdiMDdhOSJ9fX0='],
    "3":['d706df2f-fd53-4e62-84af-b863cb54d958','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOTc1YjdhYzlmMGM3MTIzMDNjZDNiNjU0ZTY0NmNlMWM0YmYyNDNhYjM0OGE2YTI1MzcwZjI2MDNlNzlhNjJhMCJ9fX0='],
    "4":['72f5ecd6-1d56-42d8-8dd9-415ce7b1c96c','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzY1ZjNiYWUwZDIwM2JhMTZmZTFkYzNkMTMwN2E4NmE2MzhiZTkyNDQ3MWYyM2U4MmFiZDlkNzhmOGEzZmNhIn19fQ=='],
    "5":['594aeb14-d7bb-4aeb-a043-930afc1c6e97','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNDY3ZjJiNTA2MzcwYzFlODRmOTBmYmYyOWM4MGUwY2I3ZTJhYzkzMjMwMzAxYjVkOGU0MmM2OGZkZGU4OWZlMCJ9fX0='],
    "6":['e683e22f-7e7c-47a7-9cec-ff0d5531a8fb','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNTE4OWYzNDdmNDI0NTBjZDJhMmU5YjhhNTM5ODgwN2QyOGM3ZjQyNTRiZDk5YThhNDk5Y2U1NDM1MzIwOTU1In19fQ=='],
    "7":['efc87c1e-deb4-4b4c-b147-bee3e81a26ae','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzMyOGRjZGUxNzNiZWZmOWYzZjQxYjkyMzIxM2ZjMWJiNzY3ODk2N2NjYjJlZGU3YTdjZjQwYjE4MzZiMWE3MyJ9fX0='],
    "8":['40f36c5e-b63b-4f0d-b2ec-3dcf30da3545','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvN2FmNmZhYjc2N2NhNGQ3ZGY2MjE3Yjg5NWI2NjdiY2FjYzUyNGQ0MDcwNjg2MTlmODE5YTA3MGYzZjYyOWNlMCJ9fX0='],
    "9":['4c7b455b-bbc8-4d82-b5a9-71594677a7c1','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvM2I1MTA2YjA2MGVhZjM5ODIxNzM0OWYzY2ZiNGYyYzdjNGZkOWEwYjAzMDdhMTdlYmE2YWY3ODg5YmUwZmJlNiJ9fX0='],
    "a":['a8966c8f-6ccf-4489-ad60-79474cff6473','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjk4NWEyOTk1N2Q0MGZhNTY0ZDVlMzFjYmQ5MDVlMzY5NGE2MTYzOTNjZTEzNzEwYmZjMzFiMWI4YjBhNTIyZCJ9fX0='],
    "b":['cfe82270-7a61-4f30-8301-ee23b9b66c90','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjllMTY5NzkzMDliNWE5YjY3M2Q2MGQxMzkwYmJhYjBkMDM4NWVhYzcyNTRkODI4YWRhMmEzNmE0NmY3M2E1OSJ9fX0='],
    "c":['88dee538-8880-498d-b5d9-0ce0c13a8c85','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjA2MmQ4ZDcyZjU4OTFjNzFmYWIzMGQ1MmUwNDgxNzk1YjNkMmQzZDJlZDJmOGI5YjUxN2Q3ZDI4MjFlMzVkNiJ9fX0='],
    "d":['9b9be12c-ef3a-4677-b08e-8bae4fffe6d3','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvN2E5ZWE2ZTM2ZjllNTc5ZjU4NmFkYjE5MzdiYjE0Mzc3YjBkNzQwMzRmZmNiMjU1NmEyYWNiNDM1NjcxNDQ4ZiJ9fX0='],
    "e":['4873e459-37bd-421a-a63e-6fccd9d19998','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjAwYmY0YmYxNGM4Njk5YzBmOTIwOWNhNzlmZTE4MjUzZTkwMWU5ZWMzODc2YTJiYTA5NWRhMDUyZjY5ZWJhNyJ9fX0='],
    "f":['191f1d89-d3f3-4d60-b3a2-40bc6714201f','eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOGUwZThhY2FiYWQyN2Q0NjE2ZmFlOWU0NzJjMGRlNjA4NTNkMjAzYzFjNmYzMTM2N2M5MzliNjE5ZjNlMzgzMSJ9fX0=']
}
register('renderOverlay', () => {
    if (!config.featuresSkullUI) return
    const inv = Player.getContainer();
    if (!inv) return

    if (inv.getName().includes('Permissions and Groups')) {
        const items = inv.getItems()

        items.forEach(item => {
            if (item!==null) {
                const previousStack = inv.getStackInSlot(items.indexOf(item))
                const itemName = previousStack.getName()

                if (item.getID()==397 && item.getRawNBT().includes('eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMTRjNDE0MWMxZWRmM2Y3ZTQxMjM2YmQ2NThjNWJjN2I1YWE3YWJmN2UyYTg1MmI2NDcyNTg4MThhY2Q3MGQ4In19fQ==')) {
                    Utils.skullInSlot(inv, items.indexOf(item), itemName, [`§7Edit the group ${itemName}'s`,'§7permissions, name, tag and more.','§0','§eClick to edit!'], colorSkulls[itemName[1]][0], colorSkulls[itemName[1]][1])
                }
            }
        })
    }

    if (inv.getName().includes('Visiting Rules')) {
        Utils.skullInSlot(inv, 12, '§aParty', ['§7Enables your party to visit.','§0','§6Alias: §7/visitingrule <rule>','§eClick to toggle!'], "c2628422-279e-295d-9a92-fd6f4357c45e", "eyJ0aW1lc3RhbXAiOjE0OTY0MzA5NTY4MjMsInByb2ZpbGVJZCI6IjkzYzdmMmUxMTg2MzQ5NzU4OGE2ZWI0YzUwYjRhZGZiIiwicHJvZmlsZU5hbWUiOiJUYWN0ZnVsIiwic2lnbmF0dXJlUmVxdWlyZWQiOnRydWUsInRleHR1cmVzIjp7IlNLSU4iOnsidXJsIjoiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS82Njc5NjNjYTFmZmRjMjRhMTBiMzk3ZmY4MTYxZDBkYTgyZDZhM2Y0Nzg4ZDVmNjdmMWE5ZjliZmJjMWViMSJ9fX0=")
        Utils.skullInSlot(inv, 13, '§aFriend', ['§7Enables your friends to visit.','§0','§6Alias: §7/visitingrule <rule>','§eClick to toggle!'], "abaa4aa0-d77f-2aef-8f3d-659a95a8e196", "eyJ0aW1lc3RhbXAiOjE0OTY0MzA4NjM5NjYsInByb2ZpbGVJZCI6IjkzYzdmMmUxMTg2MzQ5NzU4OGE2ZWI0YzUwYjRhZGZiIiwicHJvZmlsZU5hbWUiOiJUYWN0ZnVsIiwic2lnbmF0dXJlUmVxdWlyZWQiOnRydWUsInRleHR1cmVzIjp7IlNLSU4iOnsidXJsIjoiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9lMDYzZWVkYjIxODQzNTRiZDQzYTE5ZGVmZmJhNTFiNTNkZDZiNzIyMmY4Mzg4Y2FhMjM5Y2FiY2RjZTg0In19fQ==")
        Utils.skullInSlot(inv, 14, '§aGuild', ['§7Enables your guild to visit.','§0','§6Alias: §7/visitingrule <rule>','§eClick to toggle!'], "c5240535-bf56-2e38-b0f4-749b786825de", "eyJ0aW1lc3RhbXAiOjE0OTY0MzA5MjU0NDMsInByb2ZpbGVJZCI6IjkzYzdmMmUxMTg2MzQ5NzU4OGE2ZWI0YzUwYjRhZGZiIiwicHJvZmlsZU5hbWUiOiJUYWN0ZnVsIiwic2lnbmF0dXJlUmVxdWlyZWQiOnRydWUsInRleHR1cmVzIjp7IlNLSU4iOnsidXJsIjoiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9mZThiNTlmOGNjZTUxMDgwOTQyN2MzODQzY2Y1NzVmYWU4ZmU2YThiN2QxNTYwZGQ0Njk1OGQxNDg1NjM4MTUifX19")
        Utils.skullInSlot(inv, 15, '§aPrivate', ['§7Players must be invited.','§0','§6Alias: §7/visitingrule <rule>','§eClick to toggle!'], "bb097a29-c562-423d-8ac8-5a451c883724", "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMTI5MTRjZTIzNDhhMTVkNzVhYWVjYTc5MGYxNjgzZmViNGM1MjQ5YmM1ZjAyODNmZTYyZmRkZDQwMjQ1OGEwNCJ9fX0=")
        Utils.skullInSlot(inv, 11, '§aPublic', ['§7Enables anyone to visit.','§0','§6Alias: §7/visitingrule <rule>','§eClick to toggle!'], "e49c9995-c58b-5540-b385-3822ff2917bc", "e3RleHR1cmVzOntTS0lOOnt1cmw6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMmRiMDU4M2JjNmJjMWIwMmI4ZDhlYzUwOGRhZjllMjA1MTY4NGZjZDhhNzI5MmUwMjg3MDZjMWM4MzFmYTcwZiJ9fX0=")
    }

    
})