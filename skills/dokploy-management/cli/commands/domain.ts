import { parseArgs } from "@std/cli/parse-args";
import { DokployClient } from "../lib/client.ts";
import * as output from "../lib/output.ts";

export const domainCommands = {
  list: {
    description: "List domains for an application or compose",
    usage: "dokploy domain list --app <id> | --compose <id>",
    run: domainList,
  },
  get: {
    description: "Get domain details",
    usage: "dokploy domain get <domainId>",
    run: domainGet,
  },
  create: {
    description: "Create a new domain",
    usage: "dokploy domain create --host <host> --app <id> [options]",
    run: domainCreate,
  },
  delete: {
    description: "Delete a domain",
    usage: "dokploy domain delete <domainId> [--force]",
    run: domainDelete,
  },
  generate: {
    description: "Generate a traefik.me domain",
    usage: "dokploy domain generate --app-name <name> [--server <id>]",
    run: domainGenerate,
  },
};

async function domainList(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["app", "compose"],
    alias: { a: "app", c: "compose" },
  });

  if (!flags.app && !flags.compose) {
    output.error("Specify --app or --compose");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = flags.app
    ? await client.getDomainsByApplication(flags.app)
    : await client.getDomainsByCompose(flags.compose!);

  if (!result.ok) {
    output.error(`Failed to list domains: ${result.error?.message}`);
    Deno.exit(1);
  }

  if (!result.data?.length) {
    output.info("No domains found");
    return;
  }

  output.table(
    ["ID", "Host", "Path", "Port", "HTTPS", "Certificate"],
    result.data.map((d) => [
      d.domainId,
      d.host,
      d.path || "/",
      String(d.port || "auto"),
      d.https ? "yes" : "no",
      d.certificateType,
    ])
  );
}

async function domainGet(args: string[]): Promise<void> {
  const domainId = args[0];

  if (!domainId) {
    output.error("Domain ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.getDomain(domainId);

  if (!result.ok) {
    output.error(`Failed to get domain: ${result.error?.message}`);
    Deno.exit(1);
  }

  const domain = result.data!;
  output.heading(domain.host);
  output.keyValue([
    ["ID", domain.domainId],
    ["Host", domain.host],
    ["Path", domain.path || "/"],
    ["Port", String(domain.port || "auto")],
    ["HTTPS", domain.https ? "yes" : "no"],
    ["Certificate", domain.certificateType],
    ["Application ID", domain.applicationId],
    ["Compose ID", domain.composeId],
    ["Service Name", domain.serviceName],
    ["Created", new Date(domain.createdAt).toLocaleString()],
  ]);
}

async function domainCreate(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["host", "app", "compose", "service", "path", "port", "cert"],
    boolean: ["https"],
    alias: {
      h: "host",
      a: "app",
      c: "compose",
      s: "service",
      p: "port",
    },
  });

  if (!flags.host) {
    output.error("Host required (--host)");
    Deno.exit(1);
  }
  if (!flags.app && !flags.compose) {
    output.error("Specify --app or --compose");
    Deno.exit(1);
  }

  const certType = flags.cert as "letsencrypt" | "none" | "custom" | undefined;

  const client = await DokployClient.create();
  const result = await client.createDomain({
    host: flags.host,
    applicationId: flags.app,
    composeId: flags.compose,
    serviceName: flags.service,
    path: flags.path,
    port: flags.port ? parseInt(flags.port, 10) : undefined,
    https: flags.https,
    certificateType: certType || (flags.https ? "letsencrypt" : "none"),
  });

  if (!result.ok) {
    output.error(`Failed to create domain: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success(`Domain created: ${flags.host}`);
  output.info(`ID: ${result.data?.domainId}`);
}

async function domainDelete(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    boolean: ["force"],
    alias: { f: "force", y: "force" },
  });
  const domainId = flags._[0] as string;

  if (!domainId) {
    output.error("Domain ID required");
    Deno.exit(1);
  }

  if (!flags.force) {
    const confirm = prompt(`Delete domain ${domainId}? [y/N]`);
    if (confirm?.toLowerCase() !== "y") {
      output.info("Cancelled");
      return;
    }
  }

  const client = await DokployClient.create();
  const result = await client.deleteDomain(domainId);

  if (!result.ok) {
    output.error(`Failed to delete domain: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Domain deleted");
}

async function domainGenerate(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["app-name", "server"],
    alias: { n: "app-name", s: "server" },
  });

  if (!flags["app-name"]) {
    output.error("App name required (--app-name)");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.generateDomain(flags["app-name"], flags.server);

  if (!result.ok) {
    output.error(`Failed to generate domain: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success(`Generated domain: ${result.data?.domain}`);
}
