/** @param {NS} ns */
export async function main(ns) {
  let files = ns.ls("home", ".js")
  for (let f of files) {
    execterm("download " + f)
    await ns.sleep(500)
  }
}

async function execterm(cmd) {
  const terminalInput = document.getElementById("terminal-input");

  // Get a reference to the React event handler.
  const handler = Object.keys(terminalInput)[1];

  // Set the value to the command you want to run.
  terminalInput.value = cmd;

  // Perform an onChange event to set some internal values.
  terminalInput[handler].onChange({ target: terminalInput });

  // Simulate an enter press
  terminalInput[handler].onKeyDown({ key: 'Enter', preventDefault: () => null });
}
