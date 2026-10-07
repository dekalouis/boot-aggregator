import { readConfig, setUser } from "./config";

function main() {
  setUser("deka");
  const config = readConfig();
  console.log(config);
}

main();
