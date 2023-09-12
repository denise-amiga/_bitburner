/** @param {NS} ns */
export async function main(ns) {
  // args[0] = dst
  // args[1] = src/?home
  // args[2] = threads/?max (426->servers)

  const dst = ns.args[0];
  const src = ns.args.length > 1 ? ns.args[1] : "home";
  let threads = ns.args.length > 2 ? ns.args[2] : Math.trunc(ns.getServerMaxRam(src) / 2.4);

  ns.exec("hc.js", src, threads, dst);
}

export function autocomplete(data, args) {
  return [...data.servers]; // This script autocompletes the list of servers.
}
