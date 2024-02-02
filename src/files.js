import { open } from "node:fs/promises";
import { resolve } from "node:path";

export const cat = async (pathString) => {
  const filePath = resolve(pathString);
  const fileStream = (await open(filePath)).createReadStream();
  return fileStream;
};
