/** @param {NS} ns */
export async function main(ns) {
  let hc = ns.args.length > 0 ? ns.args[0] : "n00dles";
  let ti = ns.args.length > 1 ? ns.args[1] : 1;
  while (ti >= 1) {
    while (ns.getServerMoneyAvailable("home") < 57000000) await ns.asleep(1000 * 60)
    var n = ns.purchaseServer("zz-0", 1024);
    ns.scp("hc.js", n, "home");
    ns.tprint(n);
    if (hc.length > 0) {
      ns.exec("hc.js", n, 426, hc);
    }
    ti--;
  }
}

export function autocomplete(data, args) {
  return [...data.servers]; // This script autocompletes the list of servers.
}
