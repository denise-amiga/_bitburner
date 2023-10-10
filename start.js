/** @param {NS} ns */
export async function main(ns) {
  const files = ["_grow.js", "_weaken.js", "_hack.js", "e.js", "dep.js", "buyserver.js", "tree.js", "nk.js", "hc.js", "hk.js", "autopilot.js", "autobuyserver.js", "i.js", "bd.js", "test1.js", "downloadall.js"];
  const url = "https://raw.githubusercontent.com/denise-amiga/_bitburner/main/";
  for (let f of files) await ns.wget(url + f, f);
  ns.run("dep.js", 1);
}
