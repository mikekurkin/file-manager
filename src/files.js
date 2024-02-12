import { rm as fsRm, open, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";

import { UsageError } from "./cli.js";

export const cat = async (...args) => {
  if (args.length != 1) throw new UsageError("usage: cat file");
  const [pathString] = args;

  const filePath = resolve(pathString);
  const fileStream = (await open(filePath)).createReadStream();
  return fileStream;
};

export const add = async (...args) => {
  if (args.length != 1) throw new UsageError("usage: add file");
  const [pathString] = args;

  const filePath = resolve(pathString);
  await writeFile(filePath, "", { flag: "w+" });
};

export const rn = async (...args) => {
  if (args.length != 2)
    throw new UsageError("usage: rn source_file target_file");
  const [srcPathString, dstPathString] = args;

  const srcPath = resolve(srcPathString);
  const dstPath = resolve(dstPathString);
  await rename(srcPath, dstPath);
};

export const cp = async (...args) => {
  if (args.length != 2)
    throw new UsageError("usage: cp source_file target_file");
  const [srcPathString, dstPathString] = args;

  const srcPath = resolve(srcPathString);
  const dstPath = resolve(dstPathString);

  const srcStream = (await open(srcPath, "r")).createReadStream();
  const dstStream = (await open(dstPath, "wx")).createWriteStream();

  await pipeline(srcStream, dstStream);
};

export const rm = async (...args) => {
  if (args.length != 1) throw new UsageError("usage: rm file");
  const [pathString] = args;

  const filePath = resolve(pathString);
  await fsRm(filePath);
};

export const mv = async (...args) => {
  if (args.length != 2)
    throw new UsageError("usage: mv source_file target_file");
  const [srcPathString, dstPathString] = args;

  await cp(srcPathString, dstPathString).then(rm(srcPathString));
};
