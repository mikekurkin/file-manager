import { FMInterface } from "./fm-interface.js";
import { strings } from "./strings.js";

export const cli = new FMInterface(process.stdin, process.stdout);

const commands = {
  ".exit": () => cli.close(),
  echo: (s) => `echo: ${s}`,
  help: () => `available commands: ${Object.keys(commands).join(", ")}`,
  error: () => {
    throw new Error();
  },
};

cli
  .on("line", (query) => {
    const [cmd, ...args] = query.split(" ");
    try {
      const response = commands[cmd]?.(...args) || strings.invalid;
      if (response) console.log(response);
    } catch (err) {
      console.error(strings.error);
      console.error(err.message);
    }
    cli.prompt();
  })
  .on("close", () => {
    console.log(strings.goodbye);
    process.exit(0);
  });
