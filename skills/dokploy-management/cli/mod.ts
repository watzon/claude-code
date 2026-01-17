#!/usr/bin/env -S deno run --allow-net --allow-read --allow-write --allow-env

import { parseArgs } from "@std/cli/parse-args";
import { bold, cyan, dim } from "@std/fmt/colors";
import { authCommands } from "./commands/auth.ts";
import { projectCommands } from "./commands/project.ts";
import { appCommands } from "./commands/app.ts";
import { composeCommands } from "./commands/compose.ts";
import { domainCommands } from "./commands/domain.ts";
import { databaseCommands } from "./commands/database.ts";
import { serverCommands } from "./commands/server.ts";
import { dockerCommands } from "./commands/docker.ts";
import * as output from "./lib/output.ts";

const VERSION = "0.1.0";

interface CommandDef {
  description: string;
  usage: string;
  run: (args: string[]) => Promise<void>;
}

type CommandGroup = Record<string, CommandDef>;

const commands: Record<string, CommandGroup> = {
  auth: authCommands,
  project: projectCommands,
  app: appCommands,
  compose: composeCommands,
  domain: domainCommands,
  db: databaseCommands,
  server: serverCommands,
  docker: dockerCommands,
};

function printHelp(): void {
  console.log(`
${bold("dokploy")} - CLI for Dokploy PaaS

${bold("USAGE")}
  dokploy <command> <subcommand> [options]

${bold("COMMANDS")}
  ${cyan("auth")}      Authentication management
  ${cyan("project")}   Project operations
  ${cyan("app")}       Application management
  ${cyan("compose")}   Docker Compose stack management
  ${cyan("domain")}    Domain configuration
  ${cyan("db")}        Database management (postgres, mysql, mariadb, mongo, redis)
  ${cyan("server")}    Remote server management
  ${cyan("docker")}    Docker container operations

${bold("GLOBAL OPTIONS")}
  --help, -h     Show help
  --version, -v  Show version
  --json         Output as JSON

${bold("EXAMPLES")}
  dokploy auth login --url https://panel.example.com --token xxx
  dokploy project list
  dokploy app deploy abc123
  dokploy compose create --name mystack --environment env123 --file docker-compose.yml
  dokploy domain create --host app.example.com --app abc123 --https
  dokploy db create postgres --name mydb --environment env123

${bold("ENVIRONMENT VARIABLES")}
  DOKPLOY_URL            Dokploy instance URL
  DOKPLOY_TOKEN          API token (or DOKPLOY_AUTH_TOKEN)
  DOKPLOY_PROJECT_ID     Default project ID
  DOKPLOY_ENVIRONMENT_ID Default environment ID

${dim("Run 'dokploy <command> --help' for command-specific help")}
`);
}

function printCommandHelp(group: string, commands: CommandGroup): void {
  console.log(`
${bold(`dokploy ${group}`)} - ${getGroupDescription(group)}

${bold("SUBCOMMANDS")}`);

  for (const [name, cmd] of Object.entries(commands)) {
    console.log(`  ${cyan(name.padEnd(12))} ${cmd.description}`);
  }

  console.log(`
${bold("USAGE EXAMPLES")}`);

  for (const [_name, cmd] of Object.entries(commands)) {
    console.log(`  ${dim(cmd.usage)}`);
  }
}

function getGroupDescription(group: string): string {
  const descriptions: Record<string, string> = {
    auth: "Authentication management",
    project: "Project operations",
    app: "Application management",
    compose: "Docker Compose stack management",
    domain: "Domain configuration",
    db: "Database management",
    server: "Remote server management",
    docker: "Docker container operations",
  };
  return descriptions[group] || "";
}

async function main(): Promise<void> {
  const hasJsonFlag = Deno.args.includes("--json");
  if (hasJsonFlag) {
    output.setOutputFormat("json");
  }

  const args = parseArgs(Deno.args.filter(a => a !== "--json"), {
    boolean: ["help", "version"],
    alias: { h: "help", v: "version" },
    stopEarly: true,
  });

  if (args.version) {
    console.log(`dokploy ${VERSION}`);
    return;
  }

  const [group, subcommand, ...rest] = args._;

  if (!group || args.help) {
    printHelp();
    return;
  }

  const commandGroup = commands[group as string];
  if (!commandGroup) {
    output.error(`Unknown command: ${group}`);
    output.info("Run 'dokploy --help' for available commands");
    Deno.exit(1);
  }

  const helpRequested = args.help || subcommand === "--help" || subcommand === "-h";

  if (!subcommand || helpRequested) {
    printCommandHelp(group as string, commandGroup);
    return;
  }

  const command = commandGroup[subcommand as string];
  if (!command) {
    output.error(`Unknown subcommand: ${group} ${subcommand}`);
    printCommandHelp(group as string, commandGroup);
    Deno.exit(1);
  }

  try {
    await command.run(rest.map(String));
  } catch (err) {
    if (err instanceof Error) {
      output.error(err.message);
    } else {
      output.error(String(err));
    }
    Deno.exit(1);
  }
}

main();
