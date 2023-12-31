/** @param {NS} ns */
export async function main(ns) {
  let st = ns.getHostname();
  let playerLvl = ns.getHackingLevel()
  let servers = serverList(ns).filter((f) => !f.includes("zz-") && f != "home");
  let hackable = []
  for (let s of servers) {
    if (!ns.getServer(s).backdoorInstalled && ns.hasRootAccess(s) && playerLvl >= ns.getServerRequiredHackingLevel(s)) hackable.push([ns.getServerRequiredHackingLevel(s), s])
  }
  hackable = hackable.sort((a, b) => a[0] - b[0])
  for (let f of hackable) {
    let [results, isFound] = findPath(ns, f[1], st, [], [], false);
    if (isFound) {
      //ns.tprint("home;connect ", results.join(';connect '), ";backdoor");
      execterm(ns, "home;connect " + results.join(';connect ') + ";backdoor");
      await ns.sleep(Math.ceil(ns.getHackTime(f[1]) / 4) + 1000)
    }
  }
}

const findPath = (ns, target, serverName, serverList, ignore, isFound) => {
  ignore.push(serverName);
  let scanResults = ns.scan(serverName);
  for (let server of scanResults) {
    if (ignore.includes(server)) {
      continue;
    }
    if (server === target) {
      serverList.push(server);
      return [serverList, true];
    }
    serverList.push(server);
    [serverList, isFound] = findPath(ns, target, server, serverList, ignore, isFound);
    if (isFound) {
      return [serverList, isFound];
    }
    serverList.pop();
  }
  return [serverList, false];
}

async function execterm(ns, cmd) {
  const terminalInput = document.getElementById("terminal-input");
  if (terminalInput === null) {
    ns.toast("Terminal: Not focus.", "info");
    ns.exit();
  }
  // Get a reference to the React event handler.
  const handler = Object.keys(terminalInput)[1];

  // Set the value to the command you want to run.
  terminalInput.value = cmd;

  // Perform an onChange event to set some internal values.
  terminalInput[handler].onChange({ target: terminalInput });

  // Simulate an enter press
  terminalInput[handler].onKeyDown({ key: 'Enter', preventDefault: () => null });
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
