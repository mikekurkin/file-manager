import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { FMInterface } from "./fm-interface.js";

import { add, cat, cp, mv, rm, rn } from "./files.js";
import { hash } from "./hash.js";
import { cd, ls, up } from "./nav.js";
import { os } from "./os.js";
import { strings } from "./strings.js";
import { compress, decompress } from "./zlib.js";

export const cli = new FMInterface({
  input: process.stdin,
  output: process.stdout,
});

export class UsageError extends Error {
  constructor(message = strings.invalid) {
    super(message);
    this.name = "UsageError";
  }
}

const commands = {
  ".exit": () => cli.close(),
  ".help": () => `available commands: ${Object.keys(commands).join(", ")}`,
  add,
  cat,
  cd,
  compress,
  cp,
  decompress,
  hash,
  ls,
  mv,
  os,
  rm,
  rn,
  up,
};

cli.on("line", async (query) => {
  const [cmd, ...args] = query.split(" ");
  try {
    if (commands[cmd] == undefined) throw new UsageError(commands[".help"]());
    const response = await commands[cmd](...args);
    if (response instanceof Readable) {
      await pipeline(response, process.stdout, { end: false });
    } else if (response) {
      console.log(response);
    }
  } catch (err) {
    if (err instanceof UsageError) {
      console.error(strings.invalid);
    } else {
      console.error(strings.error);
    }
    console.error(err.message);
  }
  cli.prompt();
});
