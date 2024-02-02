import { EOL, arch, cpus, userInfo } from "node:os";

export const os = (arg) => {
  switch (arg) {
    case "--EOL":
      return EOL;
    case "--cpus":
      const cpusArray = cpus();
      const cpusDescription = Object.entries(cpusArray)
        .map(([id, cpu]) => `${id}: ${cpu.model}, ${cpu.speed / 1000} GHz`)
        .join("\n");
      return `${cpusArray.length} CPUs:\n${cpusDescription}`;
    case "--homedir":
      return userInfo().homedir;
    case "--username":
      return userInfo().username;
    case "--architecture":
      return arch();
    default:
      const argumentError = new TypeError("Invalid argument");
      argumentError.code = "ERR_INVALID_ARG_VALUE";
      throw argumentError;
  }
};
