import { createHash } from "node:crypto";
import { open } from "node:fs/promises";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";

export const hash = async (pathString) => {
  const filePath = resolve(pathString);
  const fileStream = (await open(filePath)).createReadStream();
  const hashTransform = createHash("sha256");
  await pipeline(fileStream, hashTransform);
  return hashTransform.digest("hex");
};
