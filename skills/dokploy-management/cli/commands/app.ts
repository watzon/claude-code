import { parseArgs } from "@std/cli/parse-args";
import { DokployClient } from "../lib/client.ts";
import * as output from "../lib/output.ts";

export const appCommands = {
  get: {
    description: "Get application details",
    usage: "dokploy app get <applicationId>",
    run: appGet,
  },
  create: {
    description: "Create a new application",
    usage: "dokploy app create --name <name> --environment <envId> [options]",
    run: appCreate,
  },
  deploy: {
    description: "Deploy an application",
    usage: "dokploy app deploy <applicationId> [--title <title>]",
    run: appDeploy,
  },
  redeploy: {
    description: "Redeploy an application (rebuild + deploy)",
    usage: "dokploy app redeploy <applicationId>",
    run: appRedeploy,
  },
  start: {
    description: "Start an application",
    usage: "dokploy app start <applicationId>",
    run: appStart,
  },
  stop: {
    description: "Stop an application",
    usage: "dokploy app stop <applicationId>",
    run: appStop,
  },
  delete: {
    description: "Delete an application",
    usage: "dokploy app delete <applicationId> [--force]",
    run: appDelete,
  },
  env: {
    description: "Get or set environment variables",
    usage: "dokploy app env <applicationId> [--set KEY=VALUE...] [--file <path>]",
    run: appEnv,
  },
};

async function appGet(args: string[]): Promise<void> {
  const flags = parseArgs(args, { string: ["_"] });
  const applicationId = flags._[0] as string;

  if (!applicationId) {
    output.error("Application ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.getApplication(applicationId);

  if (!result.ok) {
    output.error(`Failed to get application: ${result.error?.message}`);
    Deno.exit(1);
  }

  const app = result.data!;
  output.heading(app.name);
  output.keyValue([
    ["ID", app.applicationId],
    ["App Name", app.appName],
    ["Status", app.applicationStatus],
    ["Source", app.sourceType],
    ["Build Type", app.buildType],
    ["Repository", app.repository],
    ["Branch", app.branch],
    ["Docker Image", app.dockerImage],
    ["Environment ID", app.environmentId],
    ["Created", new Date(app.createdAt).toLocaleString()],
  ]);

  const domainsResult = await client.getDomainsByApplication(applicationId);
  if (domainsResult.ok && domainsResult.data?.length) {
    console.log("\nDomains:");
    output.list(
      domainsResult.data.map(
        (d) => `${d.https ? "https" : "http"}://${d.host}${d.path || ""}`
      )
    );
  }
}

async function appCreate(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["name", "environment", "app-name", "description", "server"],
    alias: {
      n: "name",
      e: "environment",
      d: "description",
      s: "server",
    },
  });

  if (!flags.name) {
    output.error("Application name required (--name)");
    Deno.exit(1);
  }
  if (!flags.environment) {
    output.error("Environment ID required (--environment)");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.createApplication({
    name: flags.name,
    environmentId: flags.environment,
    appName: flags["app-name"],
    description: flags.description,
    serverId: flags.server,
  });

  if (!result.ok) {
    output.error(`Failed to create application: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success(`Application created: ${result.data?.name}`);
  output.info(`ID: ${result.data?.applicationId}`);
}

async function appDeploy(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["title", "description"],
    alias: { t: "title", d: "description" },
  });
  const applicationId = flags._[0] as string;

  if (!applicationId) {
    output.error("Application ID required");
    Deno.exit(1);
  }

  const spin = output.spinner("Triggering deployment...");
  const client = await DokployClient.create();
  const result = await client.deployApplication(applicationId, {
    title: flags.title,
    description: flags.description,
  });

  if (!result.ok) {
    spin.stop();
    output.error(`Failed to deploy: ${result.error?.message}`);
    Deno.exit(1);
  }

  spin.stop();
  output.success("Deployment triggered");
}

async function appRedeploy(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["title", "description"],
  });
  const applicationId = flags._[0] as string;

  if (!applicationId) {
    output.error("Application ID required");
    Deno.exit(1);
  }

  const spin = output.spinner("Triggering redeploy...");
  const client = await DokployClient.create();
  const result = await client.redeployApplication(applicationId, {
    title: flags.title,
    description: flags.description,
  });

  if (!result.ok) {
    spin.stop();
    output.error(`Failed to redeploy: ${result.error?.message}`);
    Deno.exit(1);
  }

  spin.stop();
  output.success("Redeploy triggered");
}

async function appStart(args: string[]): Promise<void> {
  const applicationId = args[0];

  if (!applicationId) {
    output.error("Application ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.startApplication(applicationId);

  if (!result.ok) {
    output.error(`Failed to start application: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Application started");
}

async function appStop(args: string[]): Promise<void> {
  const applicationId = args[0];

  if (!applicationId) {
    output.error("Application ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.stopApplication(applicationId);

  if (!result.ok) {
    output.error(`Failed to stop application: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Application stopped");
}

async function appDelete(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    boolean: ["force"],
    alias: { f: "force", y: "force" },
  });
  const applicationId = flags._[0] as string;

  if (!applicationId) {
    output.error("Application ID required");
    Deno.exit(1);
  }

  if (!flags.force) {
    const confirm = prompt(`Delete application ${applicationId}? [y/N]`);
    if (confirm?.toLowerCase() !== "y") {
      output.info("Cancelled");
      return;
    }
  }

  const client = await DokployClient.create();
  const result = await client.deleteApplication(applicationId);

  if (!result.ok) {
    output.error(`Failed to delete application: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Application deleted");
}

async function appEnv(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["file", "set"],
    boolean: ["create-file"],
    collect: ["set"],
    alias: { f: "file", s: "set" },
  });
  const applicationId = flags._[0] as string;

  if (!applicationId) {
    output.error("Application ID required");
    Deno.exit(1);
  }

  const client = await DokployClient.create();

  const setValues = flags.set as string[] | undefined;
  if (setValues?.length || flags.file) {
    let env = "";

    if (flags.file) {
      try {
        env = await Deno.readTextFile(flags.file);
      } catch {
        output.error(`Failed to read file: ${flags.file}`);
        Deno.exit(1);
      }
    }

    if (setValues?.length) {
      const newVars = setValues.join("\n");
      env = env ? `${env}\n${newVars}` : newVars;
    }

    const result = await client.saveApplicationEnvironment(applicationId, env, {
      createEnvFile: flags["create-file"],
    });

    if (!result.ok) {
      output.error(`Failed to set environment: ${result.error?.message}`);
      Deno.exit(1);
    }

    output.success("Environment variables updated");
    return;
  }

  const result = await client.getApplication(applicationId);

  if (!result.ok) {
    output.error(`Failed to get application: ${result.error?.message}`);
    Deno.exit(1);
  }

  if (result.data?.env) {
    console.log(result.data.env);
  } else {
    output.info("No environment variables set");
  }
}
