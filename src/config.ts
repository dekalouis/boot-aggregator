import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
}

function getConfigFilePath(): string {
  const homeDir = os.homedir();
  const fullPath = path.join(homeDir, ".gatorconfig.json");
  return fullPath;
}

export function readConfig(): Config {
  const filePath = getConfigFilePath();
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const rawConfig = JSON.parse(fileContents);
  const config = validateConfig(rawConfig);
  return config;
}

function writeConfig(cfg: Config): void {
  const rawConfig = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };
  const ready = JSON.stringify(rawConfig);
  const filePath = getConfigFilePath();
  fs.writeFileSync(filePath, ready, { encoding: "utf-8" });
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("db_url is required");
  }
  const config: Config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name ?? "",
  };
  return config;
}

export function setUser(username: string): void {
  // 1. get the current config
  const config = readConfig();
  // 2. update currentUserName
  config.currentUserName = username;
  // 3. write it back to disk
  writeConfig(config);
  // 4. return it?
}
