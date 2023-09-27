/** @param {NS} ns */
export async function main(ns) {
  // args[0] = dst
  // args[1] = src/?home
  // args[2] = threads/?max (426->servers)

  //let reserved = ns.getHostname() == "home" ? 5 : 0
  let dst = ns.args[0];
  let src = ns.args.length > 1 ? ns.args[1] : "home";
  let threads = ns.args.length > 2 ? ns.args[2] : Math.trunc((ns.getServerMaxRam(src) - ns.getServerUsedRam(src)) / 2.4);

  if (threads > 0) ns.exec("hc.js", src, threads, dst);
}

export function autocomplete(data, args) {
  return [...data.servers]; // This script autocompletes the list of servers.
}
