import config from "../../.dev/config"
import Utils from "../../.dev/util"

const JVBossStatus = Java.type('net.minecraft.entity.boss.BossStatus')

register('renderBossHealth', (overlayEvent) => {
    if (Utils.isOnHypixel() && config.featuresSb_MiscWither) {
        if (JVBossStatus.field_82827_c=="Wither§r") {
            JVBossStatus.field_82827_c = null
        }
    }
})