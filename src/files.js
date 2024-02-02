import { rm as fsRm, open, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pipeline } from "node:stream/promises";

export const cat = async (pathString) => {
  const filePath = resolve(pathString);
  const fileStream = (await open(filePath)).createReadStream();
  return fileStream;
};

export const add = async (pathString) => {
  const filePath = resolve(pathString);
  writeFile(filePath, "", { flag: "w+" });
};

export const rn = async (srcPathString, dstPathString) => {
  const srcPath = resolve(srcPathString);
  const dstPath = resolve(dstPathString);
  rename(srcPath, dstPath);
};

export const cp = async (srcPathString, dstPathString) => {
  const srcPath = resolve(srcPathString);
  const dstPath = resolve(dstPathString);

  const srcStream = (await open(srcPath, "r")).createReadStream();
  const dstStream = (await open(dstPath, "wx")).createWriteStream();

  pipeline(srcStream, dstStream);
};

export const rm = async (pathString) => {
  const filePath = resolve(pathString);
  fsRm(filePath);
};

export const mv = async (srcPathString, dstPathString) => {
  cp(srcPathString, dstPathString).then(rm(srcPathString));
};
