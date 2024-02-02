import { open } from "node:fs/promises";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";

import { UsageError } from "./cli.js";

const transformFile = async (transform, srcPathString, dstPathString) => {
  const srcPath = resolve(srcPathString);
  const dstPath = resolve(dstPathString);

  const srcStream = (await open(srcPath, "r")).createReadStream();
  const dstStream = (await open(dstPath, "wx")).createWriteStream();

  pipeline(srcStream, transform, dstStream);
};

export const compress = async (...args) => {
  if (args.length != 2)
    throw new UsageError("usage: compress source_file target_file");
  transformFile(createBrotliCompress(), ...args);
};

export const decompress = async (...args) => {
  if (args.length != 2)
    throw new UsageError("usage: decompress source_file target_file");
  transformFile(createBrotliDecompress(), ...args);
};
