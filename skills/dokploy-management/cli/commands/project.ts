import { parseArgs } from "@std/cli/parse-args";
import { DokployClient } from "../lib/client.ts";
import * as output from "../lib/output.ts";

export const projectCommands = {
  list: {
    description: "List all projects",
    usage: "dokploy project list",
    run: projectList,
  },
  get: {
    description: "Get project details",
    usage: "dokploy project get <projectId>",
    run: projectGet,
  },
  create: {
    description: "Create a new project",
    usage: "dokploy project create --name <name> [--description <desc>]",
    run: projectCreate,
  },
  delete: {
    description: "Delete a project",
    usage: "dokploy project delete <projectId> [--force]",
    run: projectDelete,
  },
};

async function projectList(_args: string[]): Promise<void> {
  const client = await DokployClient.create();
  const result = await client.listProjects();

  if (!result.ok) {
    output.error(`Failed to list projects: ${result.error?.message}`);
    Deno.exit(1);
  }

  if (!result.data?.length) {
    output.info("No projects found");
    return;
  }

  output.table(
    ["ID", "Name", "Description", "Created"],
    result.data.map((p) => [
      p.projectId,
      p.name,
      p.description || "",
      new Date(p.createdAt).toLocaleDateString(),
    ])
  );
}

async function projectGet(args: string[]): Promise<void> {
  const flags = parseArgs(args, { string: ["_"] });
  const projectId = flags._[0] as string;

  if (!projectId) {
    output.error("Project ID required");
    output.info("Usage: dokploy project get <projectId>");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.getProject(projectId);

  if (!result.ok) {
    output.error(`Failed to get project: ${result.error?.message}`);
    Deno.exit(1);
  }

  const project = result.data!;

  output.heading(project.name);
  output.keyValue([
    ["ID", project.projectId],
    ["Description", project.description],
    ["Created", new Date(project.createdAt).toLocaleString()],
    ["Environments", String(project.environments?.length || 0)],
  ]);

  if (project.environments?.length) {
    console.log("\nEnvironments:");
    for (const env of project.environments) {
      console.log(`\n  ${env.name} (${env.environmentId})`);
      const apps = env.applications?.length || 0;
      const compose = env.compose?.length || 0;
      const dbs =
        (env.postgres?.length || 0) +
        (env.mysql?.length || 0) +
        (env.mariadb?.length || 0) +
        (env.mongo?.length || 0) +
        (env.redis?.length || 0);
      output.list(
        [`${apps} applications`, `${compose} compose stacks`, `${dbs} databases`],
        "  "
      );
    }
  }
}

async function projectCreate(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    string: ["name", "description"],
    alias: { n: "name", d: "description" },
  });

  if (!flags.name) {
    output.error("Project name required");
    output.info("Usage: dokploy project create --name <name>");
    Deno.exit(1);
  }

  const client = await DokployClient.create();
  const result = await client.createProject({
    name: flags.name,
    description: flags.description,
  });

  if (!result.ok) {
    output.error(`Failed to create project: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success(`Project created: ${result.data?.name}`);
  output.info(`ID: ${result.data?.projectId}`);
}

async function projectDelete(args: string[]): Promise<void> {
  const flags = parseArgs(args, {
    boolean: ["force"],
    alias: { f: "force", y: "force" },
  });
  const projectId = flags._[0] as string;

  if (!projectId) {
    output.error("Project ID required");
    output.info("Usage: dokploy project delete <projectId>");
    Deno.exit(1);
  }

  if (!flags.force) {
    const confirm = prompt(`Delete project ${projectId}? [y/N]`);
    if (confirm?.toLowerCase() !== "y") {
      output.info("Cancelled");
      return;
    }
  }

  const client = await DokployClient.create();
  const result = await client.deleteProject(projectId);

  if (!result.ok) {
    output.error(`Failed to delete project: ${result.error?.message}`);
    Deno.exit(1);
  }

  output.success("Project deleted");
}
