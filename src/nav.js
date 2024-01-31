import { resolve } from "node:path";

export const up = () => {
  const destination = resolve(process.cwd(), "..");
  process.chdir(destination);
};

export const cd = (pathString) => {
  const destination = resolve(pathString);
  process.chdir(destination);
};
