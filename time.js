/** @param {NS} ns */
export async function main(ns) {
  let tot = ns.args[0]
  let par = ns.args[1]
  let vel = ns.args[2]
  ns.disableLog("ALL")
  ns.tail()
  ns.moveTail(400, 0)
  ns.resizeTail(380, 80)
  while (true) {
    let t = tot - par
    if (t <= 0) break
    ns.clearLog()
    ns.print(Math.trunc(t))
    ns.print(toTime(t / vel))
    par = par + vel
    await ns.asleep(1000)
  }
}

function toTime(t) {
  let h, m, s
  if (t > 3600) {
    h = Math.trunc(t / 3600)
    m = Math.trunc((t % 3600) / 60)
    s = Math.trunc(t % 60)
    return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0")
  }
  if (t > 60) {
    h = 0
    m = Math.trunc(t / 60)
    s = Math.trunc(t % 60)
    return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0")
  }
}