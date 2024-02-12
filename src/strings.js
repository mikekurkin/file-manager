import { argv } from "./argv.js";

export const strings = {
  greeting: argv.username
    ? `Welcome to the File Manager, ${argv.username}!`
    : "Welcome to the File Manager!",
  goodbye: argv.username
    ? `\rThank you for using File Manager, ${argv.username}, goodbye!`
    : "\rThank you for using File Manager, goodbye!",
  invalid: "Invalid input",
  error: "Operation failed",
  prompt: "> ",
  get workdir() {
    return `You are currently in ${process.cwd()}`;
  },
};
