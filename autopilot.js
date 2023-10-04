/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  ns.tail();
  ns.resizeTail(300, 250);
  ns.moveTail(440, 0);
  ns.print("Start: ", mytime());
  ns.run("dep.js", 1);

  const programs = ["", "BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
  let srvs = srvList(ns).filter((s) => !s.includes("zz-") && s != "home");
  let srvsPort = getsrvsPort(ns, srvs);

  root(ns, 0, srvsPort)

  while (!ns.fileExists(programs[1])) await ns.asleep(2000);

  root(ns, 1, srvsPort)

  while (!ns.fileExists(programs[2])) await ns.asleep(2000);

  root(ns, 2, srvsPort)

  while (!ns.fileExists(programs[3])) await ns.asleep(2000);

  root(ns, 3, srvsPort)

  while (!ns.fileExists(programs[4])) await ns.asleep(2000);

  root(ns, 4, srvsPort)

  while (!ns.fileExists(programs[5])) await ns.asleep(2000);

  root(ns, 5, srvsPort)

}

async function root(ns, lvl, sP) {
  const programs = ["", "BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
  let lstsrv = sP[lvl];

  ns.print("\nHacking " + lvl + " ports servers ... ", lstsrv);
  lstsrv.forEach(s => {
    ns.run("nk.js", 1, s);
    ns.run("hk.js", 1, "n00dles", s);
    ns.print(mytime(), "  ", s)
  })

  if (lvl < 5) ns.print("\nWaiting for ", programs[lvl + 1], "... ");

}

function getsrvsPort(ns, srvs) {
  let sp = {};
  for (let s of srvs) {
    let p = ns.getServerNumPortsRequired(s);
    p in sp ? sp[p].push(s) : sp[p] = [s];
  }
  return sp;
}

function mytime(time = new Date()) {
  return time.getHours().toString().padStart(2, 0) + ":" + time.getMinutes().toString().padStart(2, 0) + ":" + time.getSeconds().toString().padStart(2, 0);
}

function srvList(ns, current = "home", visited = new Set()) {
  let vecinos = ns.scan(current)
  let next = vecinos.filter(c => !visited.has(c))
  next.forEach(n => {
    visited.add(n);
    return srvList(ns, n, visited)
  })
  return Array.from(visited.keys())
}