import { loadConfig, requireConfig, type DokployConfig } from "./config.ts";

export interface ApiError {
  message: string;
  code: string;
  issues?: { message: string }[];
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: ApiError;
  status: number;
}

export class DokployClient {
  private config: DokployConfig;
  private baseUrl: string;
  private token: string;

  private constructor(config: DokployConfig) {
    this.config = config;
    this.baseUrl = requireConfig(config, "url").replace(/\/$/, "");
    this.token = requireConfig(config, "token");
  }

  static async create(): Promise<DokployClient> {
    const config = await loadConfig();
    return new DokployClient(config);
  }

  static async createWithConfig(config: DokployConfig): Promise<DokployClient> {
    return new DokployClient(config);
  }

  getConfig(): DokployConfig {
    return this.config;
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST",
    body?: unknown,
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    let url = `${this.baseUrl}/api/${endpoint}`;

    if (queryParams && Object.keys(queryParams).length > 0) {
      const params = new URLSearchParams(queryParams);
      url += `?${params.toString()}`;
    }

    const headers: Record<string, string> = {
      "x-api-key": this.token,
      "Content-Type": "application/json",
      "User-Agent": "dokploy-cli/0.1.0",
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && method === "POST") {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      const text = await response.text();

      let data: T | undefined;
      let error: ApiError | undefined;

      try {
        const json = JSON.parse(text);
        if (response.ok) {
          data = json as T;
        } else {
          error = json as ApiError;
        }
      } catch {
        if (!response.ok) {
          error = { message: text || response.statusText, code: "PARSE_ERROR" };
        }
      }

      return {
        ok: response.ok,
        data,
        error,
        status: response.status,
      };
    } catch (err) {
      return {
        ok: false,
        error: {
          message: err instanceof Error ? err.message : String(err),
          code: "NETWORK_ERROR",
        },
        status: 0,
      };
    }
  }

  async get<T>(endpoint: string, queryParams?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "GET", undefined, queryParams);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "POST", body);
  }

  // ============ User / Auth ============

  async verifyAuth(): Promise<ApiResponse<{ userId: string; email: string }>> {
    return this.get("user.get");
  }

  // ============ Projects ============

  async listProjects(): Promise<ApiResponse<Project[]>> {
    return this.get("project.all");
  }

  async getProject(projectId: string): Promise<ApiResponse<ProjectWithDetails>> {
    return this.get("project.one", { projectId });
  }

  async createProject(input: { name: string; description?: string }): Promise<ApiResponse<Project>> {
    return this.post("project.create", input);
  }

  async deleteProject(projectId: string): Promise<ApiResponse<void>> {
    return this.post("project.remove", { projectId });
  }

  // ============ Environments ============

  async createEnvironment(input: {
    projectId: string;
    name: string;
    description?: string;
  }): Promise<ApiResponse<Environment>> {
    return this.post("environment.create", input);
  }

  async deleteEnvironment(environmentId: string): Promise<ApiResponse<void>> {
    return this.post("environment.remove", { environmentId });
  }

  // ============ Applications ============

  async getApplication(applicationId: string): Promise<ApiResponse<Application>> {
    return this.get("application.one", { applicationId });
  }

  async createApplication(input: {
    name: string;
    environmentId: string;
    appName?: string;
    description?: string;
    serverId?: string;
  }): Promise<ApiResponse<Application>> {
    return this.post("application.create", input);
  }

  async updateApplication(
    applicationId: string,
    input: Partial<ApplicationUpdate>
  ): Promise<ApiResponse<Application>> {
    return this.post("application.update", { applicationId, ...input });
  }

  async deployApplication(
    applicationId: string,
    options?: { title?: string; description?: string }
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post("application.deploy", { applicationId, ...options });
  }

  async redeployApplication(
    applicationId: string,
    options?: { title?: string; description?: string }
  ): Promise<ApiResponse<{ message: string }>> {
    return this.post("application.redeploy", { applicationId, ...options });
  }

  async startApplication(applicationId: string): Promise<ApiResponse<void>> {
    return this.post("application.start", { applicationId });
  }

  async stopApplication(applicationId: string): Promise<ApiResponse<void>> {
    return this.post("application.stop", { applicationId });
  }

  async deleteApplication(applicationId: string): Promise<ApiResponse<void>> {
    return this.post("application.delete", { applicationId });
  }

  async reloadApplication(applicationId: string, appName: string): Promise<ApiResponse<void>> {
    return this.post("application.reload", { applicationId, appName });
  }

  async saveApplicationEnvironment(
    applicationId: string,
    env: string,
    options?: { buildArgs?: string; buildSecrets?: string; createEnvFile?: boolean }
  ): Promise<ApiResponse<void>> {
    return this.post("application.saveEnvironment", {
      applicationId,
      env,
      createEnvFile: options?.createEnvFile ?? false,
      ...options,
    });
  }

  // ============ Compose ============

  async getCompose(composeId: string): Promise<ApiResponse<Compose>> {
    return this.get("compose.one", { composeId });
  }

  async createCompose(input: {
    name: string;
    environmentId: string;
    composeType?: "docker-compose" | "stack";
    appName?: string;
    description?: string;
    composeFile?: string;
    serverId?: string;
  }): Promise<ApiResponse<Compose>> {
    return this.post("compose.create", input);
  }

  async updateCompose(
    composeId: string,
    input: Partial<ComposeUpdate>
  ): Promise<ApiResponse<Compose>> {
    return this.post("compose.update", { composeId, ...input });
  }

  async deployCompose(composeId: string): Promise<ApiResponse<{ message: string }>> {
    return this.post("compose.deploy", { composeId });
  }

  async startCompose(composeId: string): Promise<ApiResponse<void>> {
    return this.post("compose.start", { composeId });
  }

  async stopCompose(composeId: string): Promise<ApiResponse<void>> {
    return this.post("compose.stop", { composeId });
  }

  async deleteCompose(composeId: string): Promise<ApiResponse<void>> {
    return this.post("compose.delete", { composeId });
  }

  // ============ Domains ============

  async getDomain(domainId: string): Promise<ApiResponse<Domain>> {
    return this.get("domain.one", { domainId });
  }

  async getDomainsByApplication(applicationId: string): Promise<ApiResponse<Domain[]>> {
    return this.get("domain.byApplicationId", { applicationId });
  }

  async getDomainsByCompose(composeId: string): Promise<ApiResponse<Domain[]>> {
    return this.get("domain.byComposeId", { composeId });
  }

  async createDomain(input: {
    host: string;
    applicationId?: string;
    composeId?: string;
    serviceName?: string;
    path?: string;
    port?: number;
    https?: boolean;
    certificateType?: "letsencrypt" | "none" | "custom";
  }): Promise<ApiResponse<Domain>> {
    return this.post("domain.create", input);
  }

  async updateDomain(
    domainId: string,
    input: Partial<DomainUpdate>
  ): Promise<ApiResponse<Domain>> {
    return this.post("domain.update", { domainId, ...input });
  }

  async deleteDomain(domainId: string): Promise<ApiResponse<void>> {
    return this.post("domain.delete", { domainId });
  }

  async generateDomain(appName: string, serverId?: string): Promise<ApiResponse<{ domain: string }>> {
    return this.post("domain.generateDomain", { appName, serverId });
  }

  // ============ Databases ============

  async createPostgres(input: DatabaseCreateInput): Promise<ApiResponse<Database>> {
    return this.post("postgres.create", input);
  }

  async deployPostgres(postgresId: string): Promise<ApiResponse<void>> {
    return this.post("postgres.deploy", { postgresId });
  }

  async startPostgres(postgresId: string): Promise<ApiResponse<void>> {
    return this.post("postgres.start", { postgresId });
  }

  async stopPostgres(postgresId: string): Promise<ApiResponse<void>> {
    return this.post("postgres.stop", { postgresId });
  }

  async deletePostgres(postgresId: string): Promise<ApiResponse<void>> {
    return this.post("postgres.remove", { postgresId });
  }

  async createMysql(input: DatabaseCreateInput): Promise<ApiResponse<Database>> {
    return this.post("mysql.create", input);
  }

  async deployMysql(mysqlId: string): Promise<ApiResponse<void>> {
    return this.post("mysql.deploy", { mysqlId });
  }

  async startMysql(mysqlId: string): Promise<ApiResponse<void>> {
    return this.post("mysql.start", { mysqlId });
  }

  async stopMysql(mysqlId: string): Promise<ApiResponse<void>> {
    return this.post("mysql.stop", { mysqlId });
  }

  async deleteMysql(mysqlId: string): Promise<ApiResponse<void>> {
    return this.post("mysql.remove", { mysqlId });
  }

  async createMariadb(input: DatabaseCreateInput): Promise<ApiResponse<Database>> {
    return this.post("mariadb.create", input);
  }

  async deployMariadb(mariadbId: string): Promise<ApiResponse<void>> {
    return this.post("mariadb.deploy", { mariadbId });
  }

  async startMariadb(mariadbId: string): Promise<ApiResponse<void>> {
    return this.post("mariadb.start", { mariadbId });
  }

  async stopMariadb(mariadbId: string): Promise<ApiResponse<void>> {
    return this.post("mariadb.stop", { mariadbId });
  }

  async deleteMariadb(mariadbId: string): Promise<ApiResponse<void>> {
    return this.post("mariadb.remove", { mariadbId });
  }

  async createMongo(input: DatabaseCreateInput): Promise<ApiResponse<Database>> {
    return this.post("mongo.create", input);
  }

  async deployMongo(mongoId: string): Promise<ApiResponse<void>> {
    return this.post("mongo.deploy", { mongoId });
  }

  async startMongo(mongoId: string): Promise<ApiResponse<void>> {
    return this.post("mongo.start", { mongoId });
  }

  async stopMongo(mongoId: string): Promise<ApiResponse<void>> {
    return this.post("mongo.stop", { mongoId });
  }

  async deleteMongo(mongoId: string): Promise<ApiResponse<void>> {
    return this.post("mongo.remove", { mongoId });
  }

  async createRedis(input: DatabaseCreateInput): Promise<ApiResponse<Database>> {
    return this.post("redis.create", input);
  }

  async deployRedis(redisId: string): Promise<ApiResponse<void>> {
    return this.post("redis.deploy", { redisId });
  }

  async startRedis(redisId: string): Promise<ApiResponse<void>> {
    return this.post("redis.start", { redisId });
  }

  async stopRedis(redisId: string): Promise<ApiResponse<void>> {
    return this.post("redis.stop", { redisId });
  }

  async deleteRedis(redisId: string): Promise<ApiResponse<void>> {
    return this.post("redis.remove", { redisId });
  }

  // ============ Servers ============

  async listServers(): Promise<ApiResponse<Server[]>> {
    return this.get("server.all");
  }

  async getServer(serverId: string): Promise<ApiResponse<Server>> {
    return this.get("server.one", { serverId });
  }

  async createServer(input: {
    name: string;
    ipAddress: string;
    port: number;
    username: string;
    sshKeyId: string;
    serverType: "deploy" | "build";
    description?: string;
  }): Promise<ApiResponse<Server>> {
    return this.post("server.create", input);
  }

  async deleteServer(serverId: string): Promise<ApiResponse<void>> {
    return this.post("server.remove", { serverId });
  }

  async validateServer(serverId: string): Promise<ApiResponse<{ valid: boolean }>> {
    return this.get("server.validate", { serverId });
  }

  // ============ Deployments ============

  async listDeployments(applicationId?: string): Promise<ApiResponse<Deployment[]>> {
    if (applicationId) {
      return this.get("deployment.allByType", { applicationId, type: "application" });
    }
    return this.get("deployment.all");
  }

  async listDeploymentsByCompose(composeId: string): Promise<ApiResponse<Deployment[]>> {
    return this.get("deployment.allByCompose", { composeId });
  }

  async killDeployment(deploymentId: string): Promise<ApiResponse<void>> {
    return this.post("deployment.killProcess", { deploymentId });
  }

  // ============ Docker ============

  async listContainers(serverId?: string): Promise<ApiResponse<Container[]>> {
    return this.get("docker.getContainers", serverId ? { serverId } : undefined);
  }

  async restartContainer(containerId: string, serverId?: string): Promise<ApiResponse<void>> {
    return this.post("docker.restartContainer", { containerId, serverId });
  }

  // ============ Backups ============

  async createBackup(input: {
    destinationId: string;
    schedule?: string;
    prefix?: string;
    enabled?: boolean;
    postgresId?: string;
    mysqlId?: string;
    mariadbId?: string;
    mongoId?: string;
  }): Promise<ApiResponse<Backup>> {
    return this.post("backup.create", input);
  }

  async triggerBackup(
    type: "postgres" | "mysql" | "mariadb" | "mongo" | "compose",
    resourceId: string
  ): Promise<ApiResponse<void>> {
    const endpointMap = {
      postgres: "backup.manualBackupPostgres",
      mysql: "backup.manualBackupMySql",
      mariadb: "backup.manualBackupMariadb",
      mongo: "backup.manualBackupMongo",
      compose: "backup.manualBackupCompose",
    };
    const idKey = type === "compose" ? "composeId" : `${type}Id`;
    return this.post(endpointMap[type], { [idKey]: resourceId });
  }

  // ============ Settings ============

  async getVersion(): Promise<ApiResponse<{ version: string }>> {
    return this.get("settings.getDokployVersion");
  }

  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.get("settings.health");
  }
}

// ============ Type Definitions ============

export interface Project {
  projectId: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface ProjectWithDetails extends Project {
  environments: Environment[];
}

export interface Environment {
  environmentId: string;
  name: string;
  description?: string;
  projectId: string;
  applications: Application[];
  compose: Compose[];
  postgres: Database[];
  mysql: Database[];
  mariadb: Database[];
  mongo: Database[];
  redis: Database[];
}

export interface Application {
  applicationId: string;
  name: string;
  appName: string;
  description?: string;
  env?: string;
  applicationStatus: "idle" | "running" | "done" | "error";
  sourceType: "github" | "docker" | "git" | "gitlab" | "bitbucket" | "gitea" | "drop";
  buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
  repository?: string;
  branch?: string;
  dockerImage?: string;
  environmentId: string;
  createdAt: string;
}

export interface ApplicationUpdate {
  name: string;
  appName: string;
  description?: string;
  env?: string;
  sourceType: Application["sourceType"];
  buildType: Application["buildType"];
  repository?: string;
  branch?: string;
  buildPath?: string;
  dockerImage?: string;
  dockerfile?: string;
  memoryLimit?: string;
  cpuLimit?: string;
  replicas?: number;
  autoDeploy?: boolean;
}

export interface Compose {
  composeId: string;
  name: string;
  appName: string;
  description?: string;
  env?: string;
  composeFile?: string;
  composeType: "docker-compose" | "stack";
  sourceType: "github" | "docker" | "git" | "gitlab" | "bitbucket" | "gitea" | "raw";
  composeStatus: "idle" | "running" | "done" | "error";
  environmentId: string;
  createdAt: string;
}

export interface ComposeUpdate {
  name: string;
  appName: string;
  description?: string;
  env?: string;
  composeFile?: string;
}

export interface Domain {
  domainId: string;
  host: string;
  path?: string;
  port?: number;
  https: boolean;
  certificateType: "letsencrypt" | "none" | "custom";
  applicationId?: string;
  composeId?: string;
  serviceName?: string;
  createdAt: string;
}

export interface DomainUpdate {
  host: string;
  path?: string;
  port?: number;
  https?: boolean;
  certificateType?: Domain["certificateType"];
}

export interface Database {
  postgresId?: string;
  mysqlId?: string;
  mariadbId?: string;
  mongoId?: string;
  redisId?: string;
  name: string;
  appName: string;
  description?: string;
  databaseName?: string;
  databaseUser?: string;
  dockerImage?: string;
  applicationStatus: "idle" | "running" | "done" | "error";
  environmentId: string;
  createdAt: string;
}

export interface DatabaseCreateInput {
  name: string;
  environmentId: string;
  appName?: string;
  description?: string;
  databaseName?: string;
  databaseUser?: string;
  databasePassword?: string;
  dockerImage?: string;
  serverId?: string;
}

export interface Server {
  serverId: string;
  name: string;
  description?: string;
  ipAddress: string;
  port: number;
  username: string;
  serverType: "deploy" | "build";
  serverStatus: "active" | "inactive";
  createdAt: string;
}

export interface Deployment {
  deploymentId: string;
  title?: string;
  description?: string;
  status: "running" | "done" | "error";
  logPath?: string;
  applicationId?: string;
  composeId?: string;
  createdAt: string;
}

export interface Container {
  containerId: string;
  name: string;
  image: string;
  state: string;
  status: string;
}

export interface Backup {
  backupId: string;
  schedule?: string;
  prefix?: string;
  enabled: boolean;
  destinationId: string;
  createdAt: string;
}
