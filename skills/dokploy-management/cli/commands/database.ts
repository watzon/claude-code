import { parseArgs } from "@std/cli/parse-args";
import { DokployClient, type DatabaseCreateInput } from "../lib/client.ts";
import * as output from "../lib/output.ts";

type DbType = "postgres" | "mysql" | "mariadb" | "mongo" | "redis";

export const databaseCommands = {
  create: {
    description: "Create a new database",
    usage: "dokploy db create <type> --name <name> --environment <envId> [options]",
    run: dbCreate,
  },
  deploy: {
    description: "Deploy a database",
    usage: "dokploy db deploy <type> <databaseId>",
    run: dbDeploy,
  },
  start: {
    description: "Start a database",
    usage: "dokploy db start <type> <databaseId>",
    run: dbStart,
  },
  stop: {
    description: "Stop a database",
    usage: "dokploy db stop <type> <databaseId>",
    run: dbStop,
  },
  delete: {
    description: "Delete a database",
    usage: "dokploy db delete <type> <databaseId> [--force]",
    run: dbDelete,
  },
};

function parseDbType(arg: string): DbType {
  const types: DbType[] = ["postgres", "mysql", "mariadb", "mongo", "redis"];
  const normalized = arg.toLowerCase();
  if (types.includes(normalized as DbType)) {
    return normalized as DbType;
  }
  output.error(`Invalid database type: ${arg}`);
  output.info(`Valid types: ${types.join(", ")}`);
  Deno.exit(1);
}

async function dbCreate(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: [
      "name",
      "environment",
      "app-name",
      "description",
      "db-name",
      "db-user",
      "db-password",
      "image",
      "server",
    ],
    alias: {
      n: "name",
      e: "environment",
      d: "description",
      p: "db-password",
      u: "db-user",
      s: "server",
    },
  });

  const dbType = parseDbType(flags._[0] as string || "");

  if (!flags.name) {
    output.error("Database name required (--name)");
    Deno.exit(1);
  }
  if (!flags.environment) {
    output.error("Environment ID required (--environment)");
    Deno.exit(1);
  }

  const input: DatabaseCreateInput = {
    name: flags.name,
    environmentId: flags.environment,
    appName: flags["app-name"],
    description: flags.description,
    databaseName: flags["db-name"],
    databaseUser: flags["db-user"],
    databasePassword: flags["db-password"],
    dockerImage: flags.image,
    serverId: flags.server,
  };

  const client = await DokployClient.create();

  const createFn = {
    postgres: () => client.createPostgres(input),
    mysql: () => client.createMysql(input),
    mariadb: () => client.createMariadb(input),
    mongo: () => client.createMongo(input),
    redis: () => client.createRedis(input),
  }[dbType];

  const result = await createFn();

  if (!result.ok) {
    output.error(`Failed to create database: ${result.error?.message}`);
    Deno.exit(1);
  }

  const idKey = `${dbType}Id` as keyof typeof result.data;
  output.success(`${dbType} database created: ${result.data?.name}`);
  output.info(`ID: ${result.data?.[idKey]}`);
}

async function dbDeploy(args: string[]): Promise<void> {
  const dbType = parseDbType(args[0] || "");
  const databaseId = args[1];

  if (!databaseId) {
    output.error("Database ID required");
    Deno.exit(1);
  }

  const spin = output.spinner(`Deploying ${dbType} database...`);
  const client = await DokployClient.create();

  const deployFn = {
    postgres: () => client.deployPostgres(databaseId),
    mysql: () => client.deployMysql(databaseId),
    mariadb: () => client.deployMariadb(databaseId),
    mongo: () => client.deployMongo(databaseId),
    redis: () => client.deployRedis(databaseId),
  }[dbType];

  const result = await deployFn();

  if (!result.ok) {
    spin.stop();
    output.error(`Failed to deploy database: ${result.error?.message}`);
    Deno.exit(1);
  }

  spin.stop();
  output.success("Database deployed");
}

async function dbStart(args: string[]): Promise<void> {
  const dbType = parseDbType(args[0] || "");
  const databaseId = args[1];

  if (!databaseId) {
    output.error("Database ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();

  const startFn = {
    postgres: () => client.startPostgres(databaseId),
    mysql: () => client.startMysql(databaseId),
    mariadb: () => client.startMariadb(databaseId),
    mongo: () => client.startMongo(databaseId),
    redis: () => client.startRedis(databaseId),
  }[dbType];

  const result = await startFn();

  if (!result.ok) {
    output.error(`Failed to start database: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Database started");
}

async function dbStop(args: string[]): Promise<void> {
  const dbType = parseDbType(args[0] || "");
  const databaseId = args[1];

  if (!databaseId) {
    output.error("Database ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();

  const stopFn = {
    postgres: () => client.stopPostgres(databaseId),
    mysql: () => client.stopMysql(databaseId),
    mariadb: () => client.stopMariadb(databaseId),
    mongo: () => client.stopMongo(databaseId),
    redis: () => client.stopRedis(databaseId),
  }[dbType];

  const result = await stopFn();

  if (!result.ok) {
    output.error(`Failed to stop database: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Database stopped");
}

async function dbDelete(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    boolean: ["force"],
    alias: { f: "force", y: "force" },
  });

  const dbType = parseDbType(flags._[0] as string || "");
  const databaseId = flags._[1] as string;

  if (!databaseId) {
    output.error("Database ID required");
    Deno.exit(1);
  }

  if (!flags.force) {
    const confirm = prompt(`Delete ${dbType} database ${databaseId}? [y/N]`);
    if (confirm?.toLowerCase() !== "y") {
      output.info("Cancelled");
      return;
    }
  }

  const client = await DokployClient.create();

  const deleteFn = {
    postgres: () => client.deletePostgres(databaseId),
    mysql: () => client.deleteMysql(databaseId),
    mariadb: () => client.deleteMariadb(databaseId),
    mongo: () => client.deleteMongo(databaseId),
    redis: () => client.deleteRedis(databaseId),
  }[dbType];

  const result = await deleteFn();

  if (!result.ok) {
    output.error(`Failed to delete database: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Database deleted");
}
