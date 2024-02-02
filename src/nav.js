import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

import { UsageError } from "./cli.js";

export const up = (...args) => {
  if (args.length != 0) throw new UsageError("usage: up");

  const destination = resolve(process.cwd(), "..");
  process.chdir(destination);
};

export const cd = (...args) => {
  if (args.length != 1) throw new UsageError("usage: cd folder");
  const [pathString] = args;

  const destination = resolve(pathString);
  process.chdir(destination);
};

export const ls = async (...args) => {
  if (args.length > 1) throw new UsageError("usage: ls [folder]");
  const [pathString] = args;

  const workdirPath = resolve(pathString || ".");
  const dirents = await readdir(workdirPath, { withFileTypes: true });

  const sortedFiles = Object.entries(
    dirents
      .map((dirent) => {
        return {
          name: dirent.name,
          type: dirent.isDirectory() ? "dir" : "file",
        };
      })
      .sort((a, b) =>
        a.type != b.type
          ? a.type.localeCompare(b.type)
          : a.name.localeCompare(b.name)
      )
  );

  const lines = sortedFiles.map(([id, ent]) => {
    return [
      id.padStart(sortedFiles.length.toString().length),
      ent.type.padEnd(4),
      ent.name,
    ].join("  ");
  });

  return lines.join("\n");
};
