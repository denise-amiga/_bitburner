/** @param {NS} ns */
export async function main(ns) {
  ns.tail();
  ns.resizeTail(300, 250);
  ns.moveTail(740, 0);
  let level = ns.args.length > 0 ? ns.args[0] : ns.getHackingLevel();
  let force = ns.args.length > 1 ? true : false;
  ns.disableLog("ALL");
  let servers = serverList(ns).filter((f) => !f.includes("zz-") && f != "home" && f != "darkweb");
  let hackable = []
  for (let s of servers) {
    if (ns.getServerRequiredHackingLevel(s) <= level && ns.hasRootAccess(s)) hackable.push([ns.getServerRequiredHackingLevel(s), s])
  }
  hackable = hackable.sort((a, b) => a[0] - b[0])
  hackable.forEach(s => {
    ns.print(s[0].toString().padStart(4, " "), ns.hasRootAccess(s[1]) ? "#" : ">", " ", s[1]);
    if (force) ns.run("hk.js", 1, s[1], "home", 600);
  })
  ns.print(hackable.length, " servers")
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
