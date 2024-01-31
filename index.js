import { homedir } from "node:os";
import { cli } from "./src/cli.js";

process.chdir(homedir());
cli.prompt();
