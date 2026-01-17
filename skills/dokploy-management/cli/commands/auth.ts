import { parseArgs } from "@std/cli/parse-args";
import { DokployClient } from "../lib/client.ts";
import { loadConfig, saveConfig } from "../lib/config.ts";
import * as output from "../lib/output.ts";

export const authCommands = {
  login: {
    description: "Authenticate with a Dokploy instance",
    usage: "dokploy auth login --url <url> --token <token>",
    run: authLogin,
  },
  logout: {
    description: "Remove saved credentials",
    usage: "dokploy auth logout",
    run: authLogout,
  },
  status: {
    description: "Show current authentication status",
    usage: "dokploy auth status",
    run: authStatus,
  },
  "set-default": {
    description: "Set default project/environment",
    usage: "dokploy auth set-default --project <id> [--environment <id>]",
    run: authSetDefault,
  },
};

async function authLogin(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["url", "token"],
    alias: { u: "url", t: "token" },
  });

  let url = flags.url;
  let token = flags.token;

  if (!url) {
    url = prompt("Dokploy URL:")?.trim();
    if (!url) {
      output.error("URL is required");
      Deno.exit(1);
    }
  }

  if (!token) {
    token = prompt("API Token:")?.trim();
    if (!token) {
      output.error("Token is required");
      Deno.exit(1);
    }
  }

  url = url.replace(/\/$/, "");

  const spin = output.spinner("Verifying credentials...");

  try {
    const client = await DokployClient.createWithConfig({ url, token });
    const result = await client.verifyAuth();

    if (!result.ok) {
      spin.stop();
      output.error(`Authentication failed: ${result.error?.message || "Invalid credentials"}`);
      Deno.exit(1);
    }

    await saveConfig({ url, token });
    spin.stop();
    output.success(`Authenticated successfully as ${result.data?.email || "user"}`);
    output.info(`Config saved to ~/.config/dokploy/config.json`);
  } catch (err) {
    spin.stop();
    output.error(`Failed to authenticate: ${err instanceof Error ? err.message : String(err)}`);
    Deno.exit(1);
  }
}

async function authLogout(_args: string[]): Promise<void> {
  try {
    const config = await loadConfig();
    if (!config.url && !config.token) {
      output.info("Not currently logged in");
      return;
    }

    await saveConfig({});
    output.success("Logged out successfully");
  } catch {
    output.success("Logged out successfully");
  }
}

async function authStatus(_args: string[]): Promise<void> {
  const config = await loadConfig();

  if (!config.url || !config.token) {
    output.warn("Not authenticated");
    output.info("Run: dokploy auth login");
    return;
  }

  const spin = output.spinner("Checking connection...");

  try {
    const client = await DokployClient.create();
    const result = await client.verifyAuth();

    if (!result.ok) {
      spin.stop();
      output.error("Authentication invalid or expired");
      output.info("Run: dokploy auth login");
      return;
    }

    const versionResult = await client.getVersion();

    spin.stop();
    output.success("Authenticated");
    output.keyValue([
      ["URL", config.url],
      ["Email", result.data?.email],
      ["User ID", result.data?.userId],
      ["Dokploy Version", versionResult.data?.version],
      ["Default Project", config.defaultProjectId || "(not set)"],
      ["Default Environment", config.defaultEnvironmentId || "(not set)"],
    ]);
  } catch (err) {
    spin.stop();
    output.error(`Connection failed: ${err instanceof Error ? err.message : String(err)}`);
  }
}

async function authSetDefault(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["project", "environment"],
    alias: { p: "project", e: "environment" },
  });

  if (!flags.project && !flags.environment) {
    output.error("Specify --project and/or --environment");
    Deno.exit(1);
  }

  const config = await loadConfig();

  if (flags.project) {
    config.defaultProjectId = flags.project;
  }
  if (flags.environment) {
    config.defaultEnvironmentId = flags.environment;
  }

  await saveConfig(config);
  output.success("Defaults updated");

  if (flags.project) {
    output.info(`Default project: ${flags.project}`);
  }
  if (flags.environment) {
    output.info(`Default environment: ${flags.environment}`);
  }
}
