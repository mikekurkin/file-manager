import { Interface } from "node:readline/promises";
import { strings } from "./strings.js";

export class FMInterface extends Interface {
  constructor(...args) {
    super(...args);
    this.setPrompt(strings.prompt);
    console.log(strings.greeting);
  }
  prompt(...args) {
    console.log(strings.workdir);
    super.prompt(...args);
  }
  close(...args) {
    super.close(...args);
    console.log(strings.goodbye);
    process.exit(0);
  }
}
