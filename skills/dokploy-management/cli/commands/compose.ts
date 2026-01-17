import { parseArgs } from "@std/cli/parse-args";
import { DokployClient } from "../lib/client.ts";
import * as output from "../lib/output.ts";

export const composeCommands = {
  get: {
    description: "Get compose stack details",
    usage: "dokploy compose get <composeId>",
    run: composeGet,
  },
  create: {
    description: "Create a new compose stack",
    usage: "dokploy compose create --name <name> --environment <envId> [options]",
    run: composeCreate,
  },
  deploy: {
    description: "Deploy a compose stack",
    usage: "dokploy compose deploy <composeId>",
    run: composeDeploy,
  },
  start: {
    description: "Start a compose stack",
    usage: "dokploy compose start <composeId>",
    run: composeStart,
  },
  stop: {
    description: "Stop a compose stack",
    usage: "dokploy compose stop <composeId>",
    run: composeStop,
  },
  delete: {
    description: "Delete a compose stack",
    usage: "dokploy compose delete <composeId> [--force]",
    run: composeDelete,
  },
  file: {
    description: "Get or set compose file content",
    usage: "dokploy compose file <composeId> [--set <path>]",
    run: composeFile,
  },
};

async function composeGet(args: string[]): Promise<void> {
  const flags = parseArgs(args, { string: ["_"] });
  const composeId = flags._[0] as string;

  if (!composeId) {
    output.error("Compose ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.getCompose(composeId);

  if (!result.ok) {
    output.error(`Failed to get compose: ${result.error?.message}`);
    Deno.exit(1);
  }

  const compose = result.data!;
  output.heading(compose.name);
  output.keyValue([
    ["ID", compose.composeId],
    ["App Name", compose.appName],
    ["Status", compose.composeStatus],
    ["Type", compose.composeType],
    ["Source", compose.sourceType],
    ["Environment ID", compose.environmentId],
    ["Created", new Date(compose.createdAt).toLocaleString()],
  ]);

  const domainsResult = await client.getDomainsByCompose(composeId);
  if (domainsResult.ok && domainsResult.data?.length) {
    console.log("\nDomains:");
    output.list(
      domainsResult.data.map(
        (d) => `${d.https ? "https" : "http"}://${d.host}${d.path || ""} → ${d.serviceName || "default"}`
      )
    );
  }
}

async function composeCreate(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["name", "environment", "app-name", "description", "file", "type", "server"],
    alias: {
      n: "name",
      e: "environment",
      d: "description",
      f: "file",
      t: "type",
      s: "server",
    },
  });

  if (!flags.name) {
    output.error("Compose name required (--name)");
    Deno.exit(1);
  }
  if (!flags.environment) {
    output.error("Environment ID required (--environment)");
    Deno.exit(1);
  }

  let composeFile: string | undefined;
  if (flags.file) {
    try {
      composeFile = await Deno.readTextFile(flags.file);
    } catch {
      output.error(`Failed to read file: ${flags.file}`);
      Deno.exit(1);
    }
  }

  const composeType = flags.type === "stack" ? "stack" : "docker-compose";

  const client = await DokployClient.create();
  const result = await client.createCompose({
    name: flags.name,
    environmentId: flags.environment,
    appName: flags["app-name"],
    description: flags.description,
    composeFile,
    composeType,
    serverId: flags.server,
  });

  if (!result.ok) {
    output.error(`Failed to create compose: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success(`Compose stack created: ${result.data?.name}`);
  output.info(`ID: ${result.data?.composeId}`);
}

async function composeDeploy(args: string[]): Promise<void> {
  const composeId = args[0];

  if (!composeId) {
    output.error("Compose ID required");
    Deno.exit(1);
  }

  const spin = output.spinner("Deploying compose stack...");
  const client = await DokployClient.create();
  const result = await client.deployCompose(composeId);

  if (!result.ok) {
    spin.stop();
    output.error(`Failed to deploy: ${result.error?.message}`);
    Deno.exit(1);
  }

  spin.stop();
  output.success("Compose deployment triggered");
}

async function composeStart(args: string[]): Promise<void> {
  const composeId = args[0];

  if (!composeId) {
    output.error("Compose ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.startCompose(composeId);

  if (!result.ok) {
    output.error(`Failed to start compose: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Compose stack started");
}

async function composeStop(args: string[]): Promise<void> {
  const composeId = args[0];

  if (!composeId) {
    output.error("Compose ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.stopCompose(composeId);

  if (!result.ok) {
    output.error(`Failed to stop compose: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Compose stack stopped");
}

async function composeDelete(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    boolean: ["force"],
    alias: { f: "force", y: "force" },
  });
  const composeId = flags._[0] as string;

  if (!composeId) {
    output.error("Compose ID required");
    Deno.exit(1);
  }

  if (!flags.force) {
    const confirm = prompt(`Delete compose stack ${composeId}? [y/N]`);
    if (confirm?.toLowerCase() !== "y") {
      output.info("Cancelled");
      return;
    }
  }

  const client = await DokployClient.create();
  const result = await client.deleteCompose(composeId);

  if (!result.ok) {
    output.error(`Failed to delete compose: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Compose stack deleted");
}

async function composeFile(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["set"],
    alias: { s: "set" },
  });
  const composeId = flags._[0] as string;

  if (!composeId) {
    output.error("Compose ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();

  if (flags.set) {
    let composeFile: string;
    try {
      composeFile = await Deno.readTextFile(flags.set);
    } catch {
      output.error(`Failed to read file: ${flags.set}`);
      Deno.exit(1);
    }

    const result = await client.updateCompose(composeId, { composeFile });

    if (!result.ok) {
      output.error(`Failed to update compose file: ${result.error?.message}`);
      Deno.exit(1);
    }

    output.success("Compose file updated");
    return;
  }

  const result = await client.getCompose(composeId);

  if (!result.ok) {
    output.error(`Failed to get compose: ${result.error?.message}`);
    Deno.exit(1);
  }

  if (result.data?.composeFile) {
    console.log(result.data.composeFile);
  } else {
    output.info("No compose file content");
  }
}
