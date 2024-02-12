import { createHash } from "node:crypto";
import { open } from "node:fs/promises";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";

import { UsageError } from "./cli.js";

export const hash = async (...args) => {
  if (args.length != 1) throw new UsageError("usage: hash file");
  const [pathString] = args;

  const filePath = resolve(pathString);
  const fileStream = (await open(filePath)).createReadStream();
  const hashTransform = createHash("sha256");
  await pipeline(fileStream, hashTransform);
  return hashTransform.digest("hex");
};
