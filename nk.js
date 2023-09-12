/** @param {NS} ns */
export async function main(ns) {
  const s = ns.args[0];
  let tools = 0;
  if (ns.hasRootAccess(s)) return;
  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(s);
    tools++;
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(s);
    tools++;
  }
  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(s);
    tools++;
  }
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(s);
    tools++;
  }
  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(s);
    tools++;
  }
  if (tools >= ns.getServerNumPortsRequired(s)) ns.nuke(s);
}

export function autocomplete(data, args) {
  return [...data.servers]; // This script autocompletes the list of servers.
}
