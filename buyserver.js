/** @param {NS} ns */
export async function main(ns) {
  var n = ns.purchaseServer("zz-0", 1024);
  ns.scp("hc.js", n, "home");
  ns.tprint(n);
  if (ns.args.length > 0) {
    ns.exec("hc.js", n, 420, ns.args[0]);
  }
}

export function autocomplete(data, args) {
  return [...data.servers]; // This script autocompletes the list of servers.
}
