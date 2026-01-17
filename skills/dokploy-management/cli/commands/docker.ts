import { parseArgs } from "@std/cli/parse-args";
import { DokployClient } from "../lib/client.ts";
import * as output from "../lib/output.ts";

export const dockerCommands = {
  containers: {
    description: "List Docker containers",
    usage: "dokploy docker containers [--server <id>]",
    run: dockerContainers,
  },
  restart: {
    description: "Restart a Docker container",
    usage: "dokploy docker restart <containerId> [--server <id>]",
    run: dockerRestart,
  },
};

async function dockerContainers(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["server"],
    alias: { s: "server" },
  });

  const client = await DokployClient.create();
  const result = await client.listContainers(flags.server);

  if (!result.ok) {
    output.error(`Failed to list containers: ${result.error?.message}`);
    Deno.exit(1);
  }

  if (!result.data?.length) {
    output.info("No containers found");
    return;
  }

  output.table(
    ["ID", "Name", "Image", "State", "Status"],
    result.data.map((c) => [
      c.containerId.slice(0, 12),
      c.name,
      c.image,
      c.state,
      c.status,
    ])
  );
}

async function dockerRestart(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["server"],
    alias: { s: "server" },
  });
  const containerId = flags._[0] as string;

  if (!containerId) {
    output.error("Container ID required");
    Deno.exit(1);
  }

  const spin = output.spinner("Restarting container...");
  const client = await DokployClient.create();
  const result = await client.restartContainer(containerId, flags.server);

  if (!result.ok) {
    spin.stop();
    output.error(`Failed to restart container: ${result.error?.message}`);
    Deno.exit(1);
  }

  spin.stop();
  output.success("Container restarted");
}
