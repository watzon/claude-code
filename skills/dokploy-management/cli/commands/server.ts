import { parseArgs } from "@std/cli/parse-args";
import { DokployClient } from "../lib/client.ts";
import * as output from "../lib/output.ts";

export const serverCommands = {
  list: {
    description: "List all servers",
    usage: "dokploy server list",
    run: serverList,
  },
  get: {
    description: "Get server details",
    usage: "dokploy server get <serverId>",
    run: serverGet,
  },
  create: {
    description: "Create a new server",
    usage: "dokploy server create --name <name> --ip <ip> --port <port> --user <user> --ssh-key <id> --type <deploy|build>",
    run: serverCreate,
  },
  delete: {
    description: "Delete a server",
    usage: "dokploy server delete <serverId> [--force]",
    run: serverDelete,
  },
  validate: {
    description: "Validate server connection",
    usage: "dokploy server validate <serverId>",
    run: serverValidate,
  },
};

async function serverList(_args: string[]): Promise<void> {
  const client = await DokployClient.create();
  const result = await client.listServers();

  if (!result.ok) {
    output.error(`Failed to list servers: ${result.error?.message}`);
    Deno.exit(1);
  }

  if (!result.data?.length) {
    output.info("No servers found");
    return;
  }

  output.table(
    ["ID", "Name", "IP", "Port", "Type", "Status"],
    result.data.map((s) => [
      s.serverId,
      s.name,
      s.ipAddress,
      String(s.port),
      s.serverType,
      s.serverStatus,
    ])
  );
}

async function serverGet(args: string[]): Promise<void> {
  const serverId = args[0];

  if (!serverId) {
    output.error("Server ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.getServer(serverId);

  if (!result.ok) {
    output.error(`Failed to get server: ${result.error?.message}`);
    Deno.exit(1);
  }

  const server = result.data!;
  output.heading(server.name);
  output.keyValue([
    ["ID", server.serverId],
    ["IP Address", server.ipAddress],
    ["Port", String(server.port)],
    ["Username", server.username],
    ["Type", server.serverType],
    ["Status", server.serverStatus],
    ["Created", new Date(server.createdAt).toLocaleString()],
  ]);
}

async function serverCreate(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["name", "ip", "port", "user", "ssh-key", "type", "description"],
    alias: {
      n: "name",
      i: "ip",
      p: "port",
      u: "user",
      k: "ssh-key",
      t: "type",
      d: "description",
    },
  });

  if (!flags.name) {
    output.error("Server name required (--name)");
    Deno.exit(1);
  }
  if (!flags.ip) {
    output.error("IP address required (--ip)");
    Deno.exit(1);
  }
  if (!flags.port) {
    output.error("SSH port required (--port)");
    Deno.exit(1);
  }
  if (!flags.user) {
    output.error("SSH username required (--user)");
    Deno.exit(1);
  }
  if (!flags["ssh-key"]) {
    output.error("SSH key ID required (--ssh-key)");
    Deno.exit(1);
  }
  if (!flags.type || !["deploy", "build"].includes(flags.type)) {
    output.error("Server type required (--type deploy|build)");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.createServer({
    name: flags.name,
    ipAddress: flags.ip,
    port: parseInt(flags.port, 10),
    username: flags.user,
    sshKeyId: flags["ssh-key"],
    serverType: flags.type as "deploy" | "build",
    description: flags.description,
  });

  if (!result.ok) {
    output.error(`Failed to create server: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success(`Server created: ${result.data?.name}`);
  output.info(`ID: ${result.data?.serverId}`);
}

async function serverDelete(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    boolean: ["force"],
    alias: { f: "force", y: "force" },
  });
  const serverId = flags._[0] as string;

  if (!serverId) {
    output.error("Server ID required");
    Deno.exit(1);
  }

  if (!flags.force) {
    const confirm = prompt(`Delete server ${serverId}? [y/N]`);
    if (confirm?.toLowerCase() !== "y") {
      output.info("Cancelled");
      return;
    }
  }

  const client = await DokployClient.create();
  const result = await client.deleteServer(serverId);

  if (!result.ok) {
    output.error(`Failed to delete server: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Server deleted");
}

async function serverValidate(args: string[]): Promise<void> {
  const serverId = args[0];

  if (!serverId) {
    output.error("Server ID required");
    Deno.exit(1);
  }

  const spin = output.spinner("Validating server connection...");
  const client = await DokployClient.create();
  const result = await client.validateServer(serverId);

  if (!result.ok) {
    spin.stop();
    output.error(`Failed to validate server: ${result.error?.message}`);
    Deno.exit(1);
  }

  spin.stop();
  if (result.data?.valid) {
    output.success("Server connection valid");
  } else {
    output.error("Server connection failed");
    Deno.exit(1);
  }
}
