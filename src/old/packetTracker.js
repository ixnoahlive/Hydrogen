import Utils from '../../.dev/util'

console.log('Go!')

let packets = 0
let sec = 0

register('step', () => {
    if (Server.getIP()=='localhost') return

    sec++
    if (sec==8) {
        console.log(packets, sec)
        if (packets=0) {
            Utils.notify('minecraft:chest', '&bServer stopped sending packets!', 'Your internet may be offline!', 9000)
        }
        sec = 0;
        packets = 0
    }
}).setDelay(1)

register('packetReceived', () => {
    if (Server.getIP()=='localhost') return
    packets++
})