import Utils from "../../.dev/util";

const DataKey = new KeyBind('Pick Block (Data)', Keyboard.KEY_NONE, '§bHydrogen§r - Housing')
const C10PacketCreativeInventoryAction = Java.type(
    "net.minecraft.network.play.client.C10PacketCreativeInventoryAction"
);

function setHeldItem(item) {
    if (item==null) return -1
    Client.sendPacket(
    new C10PacketCreativeInventoryAction(
      Player.getHeldItemIndex()+36,
      item.getItemStack()
    )
  );
}

DataKey.registerKeyDown(() => {
    if (Utils.isCreative()) {
        const LookingAt = Player.lookingAt()
        if (LookingAt.lines!==undefined) return setHeldItem(new Item('sign'))
        if (LookingAt) {
            const Washed = LookingAt.type
            setHeldItem(new Item(Washed).setDamage(LookingAt.getMetadata()))
        }
    }
})