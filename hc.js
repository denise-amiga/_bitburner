/** @param {NS} ns */
export async function main(ns) {
  var target = ns.args[0];
  // Defines how much money a server should have before we hack it
  // In this case, it is set to 75% of the server's max money
  var moneyThresh = ns.getServerMaxMoney(ns.args[0]) * 0.5;

  // Defines the maximum security level the target server can
  // have. If the target's security level is higher than this,
  // we'll weaken it before doing anything else
  var securityThresh = ns.getServerMinSecurityLevel(ns.args[0]) + 5;

  // Infinite loop that continously hacks/grows/weakens the target server
  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      // If the server's security level is above our threshold, weaken it
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
      // If the server's money is less than our threshold, grow it
      await ns.grow(target);
    } else {
      // Otherwise, hack it
      await ns.hack(target);
    }
  }
}

export function autocomplete(data, args) {
  return [...data.servers]; // This script autocompletes the list of servers.
}
