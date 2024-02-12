export const argv = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const match = arg.match(/^--(.*)=(.*)$/);
    return [match[1], match[2]];
  })
);
