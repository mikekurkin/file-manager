import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { FMInterface } from "./fm-interface.js";

import { add, cat } from "./files.js";
import { cd, ls, up } from "./nav.js";
import { strings } from "./strings.js";

export const cli = new FMInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands = {
  ".exit": () => cli.close(),
  echo: (s) => `echo: ${s}`,
  help: () => `available commands: ${Object.keys(commands).join(", ")}`,
  error: () => {
    throw new Error();
  },
  cd,
  up,
  ls,
  cat,
  add,
};

cli
  .on("line", async (query) => {
    const [cmd, ...args] = query.split(" ");
    try {
      const response =
        commands[cmd] == undefined
          ? strings.invalid
          : await commands[cmd](...args);
      if (response instanceof Readable) {
        await pipeline(response, process.stdout, { end: false });
      } else if (response) {
        console.log(response);
      }
    } catch (err) {
      if (err.code == "ERR_INVALID_ARG_TYPE") {
        console.error(strings.invalid);
      } else {
        console.error(strings.error);
        console.error(err.message);
      }
    }
    cli.prompt();
  })
  .on("close", () => {
    console.log(strings.goodbye);
    process.exit(0);
  });
