/** @param {NS} ns */
export async function main(ns) {
  ns.tail();
  ns.resizeTail(300, 200);
  ns.moveTail(740, 0);
  let level = ns.args.length > 0 ? ns.args[0] : ns.getHackingLevel();
  let force = ns.args.length > 1 ? false : true;
  ns.disableLog("ALL");
  let servers = serverList(ns);
  for (let s of servers) {
    if (s.includes("zz") || s.includes("home")) continue
    if (ns.hasRootAccess(s) && force) continue
    if (level < ns.getServerRequiredHackingLevel(s)) continue
    ns.print(ns.getServerRequiredHackingLevel(s), ":", ns.getServerNumPortsRequired(s), " >> ", s);
  }
}

function serverList(ns, current = "home", visited = new Set()) {
  let vecinos = ns.scan(current)
  let next = vecinos.filter(c => !visited.has(c))
  next.forEach(n => {
    visited.add(n);
    return serverList(ns, n, visited)
  })
  return Array.from(visited.keys())
}
