import { open } from "node:fs/promises";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";

const transformFile = async (transform, srcPathString, dstPathString) => {
  const srcPath = resolve(srcPathString);
  const dstPath = resolve(dstPathString);

  const srcStream = (await open(srcPath, "r")).createReadStream();
  const dstStream = (await open(dstPath, "wx")).createWriteStream();

  pipeline(srcStream, transform, dstStream);
};

export const compress = async (...args) =>
  transformFile(createBrotliCompress(), ...args);

export const decompress = async (...args) =>
  transformFile(createBrotliDecompress(), ...args);
