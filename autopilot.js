/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  ns.tail();
  ns.resizeTail(300, 250);
  ns.moveTail(440, 0);
  ns.print("Start: ", mytime());

  const programs = ["", "BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
  let srvs = srvList(ns).filter((s) => !s.includes("zz-") && !s.includes("home"));
  let srvsPort = getsrvsPort(ns, srvs);

  let lstsrv = srvsPort[0];
  ns.print("\nHacking 0 ports servers ... ", lstsrv);
  lstsrv.forEach(s => {
    ns.run("nk.js", 1, s);
    ns.run("hk.js", 1, "n00dles", s);
    //  ns.nuke(s);
    ns.print(mytime(), "  ", s)
  })

  ns.print("\nWaiting for ", programs[1], "... ");
  while (!ns.fileExists(programs[1])) await ns.asleep(60000);

  lstsrv = srvsPort[1];
  ns.print("\nHacking 1 ports servers ... ", lstsrv);
  lstsrv.forEach(s => {
    ns.run("nk.js", 1, s);
    ns.run("hk.js", 1, "n00dles", s);
    //  ns.brutessh(s);
    //  ns.nuke(s);
    ns.print(mytime(), "  ", s)
  })

  ns.print("\nWaiting for ", programs[2], "... ");
  while (!ns.fileExists(programs[2])) await ns.asleep(60000);

  lstsrv = srvsPort[2];
  ns.print("\nHacking 2 ports servers ... ", lstsrv);
  lstsrv.forEach(s => {
    ns.run("nk.js", 1, s);
    ns.run("hk.js", 1, "n00dles", s);
    //  ns.brutessh(s);
    //  ns.ftpcrack(s);
    //  ns.nuke(s);
    ns.print(mytime(), "  ", s)
  })

  ns.print("\nWaiting for ", programs[3], "... ");
  while (!ns.fileExists(programs[3])) await ns.asleep(60000);

  lstsrv = srvsPort[3];
  ns.print("\nHacking 3 ports servers ... ", lstsrv);
  lstsrv.forEach(s => {
    ns.run("nk.js", 1, s);
    ns.run("hk.js", 1, "n00dles", s);
    //  ns.brutessh(s);
    //  ns.ftpcrack(s);
    //  ns.relaysmtp(s);
    //  ns.nuke(s);
    ns.print(mytime(), "  ", s)
  })

  ns.print("\nWaiting for ", programs[4], "... ");
  while (!ns.fileExists(programs[4])) await ns.asleep(60000);

  lstsrv = srvsPort[4];
  ns.print("\nHacking 4 ports servers ... ", lstsrv);
  lstsrv.forEach(s => {
    ns.run("nk.js", 1, s);
    ns.run("hk.js", 1, "n00dles", s);
    //  ns.brutessh(s);
    //  ns.ftpcrack(s);
    //  ns.relaysmtp(s);
    //  ns.httpworm(s);
    //  ns.nuke(s);
    ns.print(mytime(), "  ", s)
  })

  ns.print("\nWaiting for ", programs[5], "... ");
  while (!ns.fileExists(programs[5])) await ns.asleep(60000);

  lstsrv = srvsPort[5];
  ns.print("\nHacking 5 ports servers ... ", lstsrv);
  lstsrv.forEach(s => {
    ns.run("nk.js", 1, s);
    ns.run("hk.js", 1, "n00dles", s);
    //  ns.brutessh(s);
    //  ns.ftpcrack(s);
    //  ns.relaysmtp(s);
    //  ns.httpworm(s);
    //  ns.sqlinject(s);
    //  ns.nuke(s);
    ns.print(mytime(), "  ", s)
  })
}

//async function nukesrv(ns, port, programs = programs) {
//  ns.print("\nwaiting for ", programs[port]);
//  while (!ns.fileExists(programs[port])) await ns.asleep(60000);

//  let srvs = srvsPort[port];
//  ns.print("\nHacking ", port, " ports servers ... ", srvs);
//  srvs.forEach(s => {
//    ns.print(mytime(), "  ", s)
//  })
//}

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
