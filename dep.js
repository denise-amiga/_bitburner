/** @param {NS} ns */
export async function main(ns) {
  let ser = serverList(ns);
  for (let s of ser) {
    ns.scp(["hc.js", "_hack.js", "_grow.js", "_weaken.js"], s, "home");
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
