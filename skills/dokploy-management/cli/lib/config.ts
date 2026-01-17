/**
 * Configuration management for Dokploy CLI
 * Handles reading/writing config from ~/.config/dokploy/config.json
 */

import { join } from "@std/path";
import { ensureDir } from "@std/fs";

export interface DokployConfig {
  url?: string;
  token?: string;
  defaultProjectId?: string;
  defaultEnvironmentId?: string;
}

/**
 * Get the config directory path
 */
export function getConfigDir(): string {
  const home = Deno.env.get("HOME") || Deno.env.get("USERPROFILE") || ".";
  return join(home, ".config", "dokploy");
}

/**
 * Get the config file path
 */
export function getConfigPath(): string {
  return join(getConfigDir(), "config.json");
}

/**
 * Load configuration from file and environment
 * Priority: ENV vars > config file
 */
export async function loadConfig(): Promise<DokployConfig> {
  const config: DokployConfig = {};

  // Try to load from config file
  try {
    const configPath = getConfigPath();
    const content = await Deno.readTextFile(configPath);
    const fileConfig = JSON.parse(content) as DokployConfig;
    Object.assign(config, fileConfig);
  } catch {
    // Config file doesn't exist or is invalid, that's fine
  }

  // Override with environment variables (higher priority)
  const envUrl = Deno.env.get("DOKPLOY_URL");
  const envToken = Deno.env.get("DOKPLOY_TOKEN") || Deno.env.get("DOKPLOY_AUTH_TOKEN");
  const envProjectId = Deno.env.get("DOKPLOY_PROJECT_ID");
  const envEnvironmentId = Deno.env.get("DOKPLOY_ENVIRONMENT_ID");

  if (envUrl) config.url = envUrl;
  if (envToken) config.token = envToken;
  if (envProjectId) config.defaultProjectId = envProjectId;
  if (envEnvironmentId) config.defaultEnvironmentId = envEnvironmentId;

  return config;
}

/**
 * Save configuration to file
 */
export async function saveConfig(config: DokployConfig): Promise<void> {
  const configDir = getConfigDir();
  await ensureDir(configDir);

  const configPath = getConfigPath();
  await Deno.writeTextFile(configPath, JSON.stringify(config, null, 2));

  // Set restrictive permissions (owner read/write only)
  if (Deno.build.os !== "windows") {
    await Deno.chmod(configPath, 0o600);
  }
}

/**
 * Get a required config value, throwing if not set
 */
export function requireConfig(config: DokployConfig, key: keyof DokployConfig): string {
  const value = config[key];
  if (!value) {
    const envName = key === "url" ? "DOKPLOY_URL" : key === "token" ? "DOKPLOY_TOKEN" : `DOKPLOY_${key.toUpperCase()}`;
    throw new Error(
      `Missing required configuration: ${key}\n` +
      `Set it via:\n` +
      `  - Environment variable: ${envName}\n` +
      `  - Config file: dokploy config set ${key} <value>\n` +
      `  - Run: dokploy auth login`
    );
  }
  return value;
}
