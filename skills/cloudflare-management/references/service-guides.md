# Cloudflare Service Quick-Start Guides

Practical patterns and quick-start examples for common Cloudflare services.

---

## Workers

### Basic Worker

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return new Response('Hello World!', {
      headers: { 'content-type': 'text/plain' }
    });
  }
};
```

### Worker with KV, R2, D1

```typescript
interface Env {
  MY_KV: KVNamespace;
  MY_BUCKET: R2Bucket;
  DB: D1Database;
  API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === '/kv') {
      const value = await env.MY_KV.get('key');
      return Response.json({ value });
    }
    
    if (url.pathname === '/r2') {
      const object = await env.MY_BUCKET.get('file.txt');
      return new Response(object?.body);
    }
    
    if (url.pathname === '/db') {
      const { results } = await env.DB.prepare(
        'SELECT * FROM users LIMIT 10'
      ).all();
      return Response.json(results);
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
```

### Deployment

```bash
wrangler deploy

wrangler deploy --env production

wrangler dev
```

---

## KV (Key-Value Storage)

### Create Namespace

```bash
wrangler kv namespace create MY_KV

wrangler kv namespace create MY_KV --env production
```

Add to `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "MY_KV"
id = "abc123..."
```

### Basic Operations

```typescript
await env.MY_KV.put('key', 'value');

const value = await env.MY_KV.get('key');

const valueJson = await env.MY_KV.get('key', 'json');

await env.MY_KV.put('key', 'value', {
  expirationTtl: 3600,
  metadata: { user: 'alice' }
});

await env.MY_KV.delete('key');

const list = await env.MY_KV.list({ prefix: 'user:' });
```

### CLI Operations

```bash
wrangler kv key put --namespace-id=<id> "mykey" "myvalue"

wrangler kv key get --namespace-id=<id> "mykey"

wrangler kv key delete --namespace-id=<id> "mykey"

wrangler kv key list --namespace-id=<id> --prefix="user:"

echo '[{"key":"k1","value":"v1"},{"key":"k2","value":"v2"}]' | \
  wrangler kv bulk put --namespace-id=<id> -
```

### Common Patterns

**Caching API responses**:
```typescript
const cacheKey = `api:${url.pathname}`;
let cached = await env.CACHE.get(cacheKey, 'json');

if (!cached) {
  cached = await fetchFromAPI(url.pathname);
  await env.CACHE.put(cacheKey, JSON.stringify(cached), {
    expirationTtl: 300
  });
}

return Response.json(cached);
```

**Session storage**:
```typescript
const sessionId = crypto.randomUUID();
await env.SESSIONS.put(`session:${sessionId}`, JSON.stringify({
  userId: 123,
  createdAt: Date.now()
}), {
  expirationTtl: 86400
});
```

---

## R2 (Object Storage)

### Create Bucket

```bash
wrangler r2 bucket create my-bucket

wrangler r2 bucket create my-bucket --location=eeur
```

Add to `wrangler.toml`:
```toml
[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "my-bucket"
```

### Basic Operations

```typescript
await env.MY_BUCKET.put('path/file.txt', 'content', {
  httpMetadata: {
    contentType: 'text/plain',
    cacheControl: 'public, max-age=3600'
  },
  customMetadata: {
    author: 'alice'
  }
});

const object = await env.MY_BUCKET.get('path/file.txt');
if (object) {
  const text = await object.text();
  const metadata = object.httpMetadata;
}

await env.MY_BUCKET.delete('path/file.txt');

await env.MY_BUCKET.delete(['file1.txt', 'file2.txt']);

const list = await env.MY_BUCKET.list({ prefix: 'images/' });
for (const obj of list.objects) {
  console.log(obj.key, obj.size);
}
```

### Multipart Upload (Large Files)

```typescript
const upload = await env.MY_BUCKET.createMultipartUpload('large-file.bin');

const part1 = await upload.uploadPart(1, chunk1);
const part2 = await upload.uploadPart(2, chunk2);

await upload.complete([part1, part2]);
```

### CLI Operations

```bash
wrangler r2 object put my-bucket/file.txt --file=./local.txt

wrangler r2 object get my-bucket/file.txt --file=./downloaded.txt

wrangler r2 object delete my-bucket/file.txt

wrangler r2 object list my-bucket --prefix="images/"
```

### Common Patterns

**Static asset hosting**:
```typescript
export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    
    const object = await env.ASSETS.get(key);
    if (!object) {
      return new Response('Not Found', { status: 404 });
    }
    
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    
    return new Response(object.body, { headers });
  }
};
```

**Image upload with metadata**:
```typescript
await env.IMAGES.put(`uploads/${userId}/${filename}`, imageData, {
  httpMetadata: {
    contentType: 'image/jpeg'
  },
  customMetadata: {
    uploadedBy: userId,
    uploadedAt: new Date().toISOString()
  }
});
```

---

## D1 (SQLite Databases)

### Create Database

```bash
wrangler d1 create my-database
```

Add to `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "abc123..."
```

### Migrations

Create migration:
```bash
wrangler d1 migrations create my-database "create_users_table"
```

Edit `migrations/0001_create_users_table.sql`:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

Apply migrations:
```bash
wrangler d1 migrations apply my-database --local

wrangler d1 migrations apply my-database --env production
```

### Basic Operations

```typescript
const { results } = await env.DB.prepare(
  'SELECT * FROM users WHERE email = ?'
).bind('alice@example.com').all();

const { success, meta } = await env.DB.prepare(
  'INSERT INTO users (email, name) VALUES (?, ?)'
).bind('bob@example.com', 'Bob').run();

const user = await env.DB.prepare(
  'SELECT * FROM users WHERE id = ?'
).bind(1).first();

const count = await env.DB.prepare(
  'SELECT COUNT(*) as count FROM users'
).first('count');
```

### Batch Operations

```typescript
const results = await env.DB.batch([
  env.DB.prepare('INSERT INTO users (email, name) VALUES (?, ?)').bind('alice@example.com', 'Alice'),
  env.DB.prepare('INSERT INTO users (email, name) VALUES (?, ?)').bind('bob@example.com', 'Bob'),
  env.DB.prepare('SELECT COUNT(*) as count FROM users')
]);
```

### CLI Operations

```bash
wrangler d1 execute my-database --command="SELECT * FROM users"

wrangler d1 execute my-database --file=./query.sql

wrangler d1 execute my-database --local --command="SELECT * FROM users"
```

### Common Patterns

**REST API with D1**:
```typescript
export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === '/users' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT id, email, name FROM users'
      ).all();
      return Response.json(results);
    }
    
    if (url.pathname === '/users' && request.method === 'POST') {
      const { email, name } = await request.json();
      const { success, meta } = await env.DB.prepare(
        'INSERT INTO users (email, name) VALUES (?, ?)'
      ).bind(email, name).run();
      
      if (success) {
        return Response.json({ id: meta.last_row_id }, { status: 201 });
      }
      return Response.json({ error: 'Failed to create user' }, { status: 500 });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
```

---

## Pages

### Deploy Static Site

```bash
wrangler pages deploy ./dist

wrangler pages deploy ./dist --project-name=my-site --branch=main
```

### Pages Functions

Place functions in `functions/`:

**functions/api/hello.ts**:
```typescript
export async function onRequest(context) {
  return new Response('Hello from Pages Function!');
}
```

**functions/api/users/[id].ts**:
```typescript
export async function onRequest(context) {
  return Response.json({
    id: context.params.id,
    name: 'Alice'
  });
}
```

### Pages + D1

**functions/api/posts.ts**:
```typescript
interface Env {
  DB: D1Database;
}

export async function onRequest(context) {
  const { DB } = context.env as Env;
  const { results } = await DB.prepare('SELECT * FROM posts').all();
  return Response.json(results);
}
```

### Configuration

**wrangler.toml**:
```toml
name = "my-pages-project"
pages_build_output_dir = "./dist"

[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "abc123..."

[env.production]
vars = { ENVIRONMENT = "production" }

[env.preview]
vars = { ENVIRONMENT = "preview" }
```

---

## Queues

### Create Queue

```bash
wrangler queues create my-queue
```

Add to `wrangler.toml`:
```toml
[[queues.producers]]
binding = "MY_QUEUE"
queue = "my-queue"

[[queues.consumers]]
queue = "my-queue"
max_batch_size = 10
max_batch_timeout = 30
```

### Producer (Send Messages)

```typescript
interface Env {
  MY_QUEUE: Queue;
}

export default {
  async fetch(request, env): Promise<Response> {
    await env.MY_QUEUE.send({
      userId: 123,
      action: 'send_email',
      timestamp: Date.now()
    });
    
    await env.MY_QUEUE.sendBatch([
      { body: { task: 'task1' } },
      { body: { task: 'task2' } },
      { body: { task: 'task3' } }
    ]);
    
    return Response.json({ status: 'queued' });
  }
};
```

### Consumer (Process Messages)

```typescript
export default {
  async queue(batch: MessageBatch<any>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      console.log('Processing:', message.body);
      
      try {
        await processMessage(message.body);
        message.ack();
      } catch (error) {
        message.retry();
      }
    }
  }
};
```

---

## Durable Objects

### Define Durable Object

```typescript
export class Counter {
  state: DurableObjectState;
  value: number = 0;
  
  constructor(state: DurableObjectState) {
    this.state = state;
  }
  
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === '/increment') {
      this.value = (await this.state.storage.get('value') || 0) + 1;
      await this.state.storage.put('value', this.value);
      return Response.json({ value: this.value });
    }
    
    if (url.pathname === '/get') {
      this.value = await this.state.storage.get('value') || 0;
      return Response.json({ value: this.value });
    }
    
    return new Response('Not Found', { status: 404 });
  }
}
```

### Configure in wrangler.toml

```toml
[[durable_objects.bindings]]
name = "COUNTER"
class_name = "Counter"
script_name = "my-worker"

[[migrations]]
tag = "v1"
new_classes = ["Counter"]
```

### Use from Worker

```typescript
interface Env {
  COUNTER: DurableObjectNamespace;
}

export default {
  async fetch(request, env): Promise<Response> {
    const id = env.COUNTER.idFromName('global-counter');
    const stub = env.COUNTER.get(id);
    return stub.fetch(request);
  }
};
```

---

## AI (Workers AI)

### Configure

```toml
[ai]
binding = "AI"
```

### Text Generation

```typescript
interface Env {
  AI: Ai;
}

const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
  prompt: 'What is the capital of France?'
});
```

### Text Embeddings

```typescript
const embeddings = await env.AI.run('@cf/baai/bge-base-en-v1.5', {
  text: 'The quick brown fox jumps over the lazy dog'
});
```

### Image Classification

```typescript
const result = await env.AI.run('@cf/microsoft/resnet-50', {
  image: imageData
});
```

---

## Vectorize

### Create Index

```bash
wrangler vectorize create my-index --dimensions=768 --metric=cosine

wrangler vectorize create my-index --preset=openai-text-embedding-ada-002
```

Add to `wrangler.toml`:
```toml
[[vectorize]]
binding = "VECTORIZE"
index_name = "my-index"
```

### Insert Vectors

```typescript
await env.VECTORIZE.insert([
  {
    id: '1',
    values: [0.1, 0.2, 0.3, ...],
    metadata: { text: 'Hello world' }
  },
  {
    id: '2',
    values: [0.4, 0.5, 0.6, ...],
    metadata: { text: 'Goodbye world' }
  }
]);
```

### Query Vectors

```typescript
const results = await env.VECTORIZE.query(queryVector, {
  topK: 10,
  returnMetadata: true
});

for (const match of results.matches) {
  console.log(match.id, match.score, match.metadata);
}
```

### Combined with AI

```typescript
const embeddings = await env.AI.run('@cf/baai/bge-base-en-v1.5', {
  text: userQuery
});

const results = await env.VECTORIZE.query(embeddings.data[0], {
  topK: 5
});

return Response.json(results);
```

---

## Common Architecture Patterns

### Pattern 1: REST API with Database

```toml
[[d1_databases]]
binding = "DB"
database_name = "api-db"
database_id = ""

[[kv_namespaces]]
binding = "CACHE"
id = ""
```

```typescript
const cacheKey = `user:${userId}`;
let user = await env.CACHE.get(cacheKey, 'json');

if (!user) {
  user = await env.DB.prepare('SELECT * FROM users WHERE id = ?')
    .bind(userId).first();
  await env.CACHE.put(cacheKey, JSON.stringify(user), { expirationTtl: 300 });
}

return Response.json(user);
```

### Pattern 2: Background Job Processor

```toml
[[queues.producers]]
binding = "JOBS"
queue = "background-jobs"

[[queues.consumers]]
queue = "background-jobs"
max_batch_size = 100

[[d1_databases]]
binding = "DB"
database_name = "jobs-db"
database_id = ""
```

### Pattern 3: AI-Powered Search

```toml
[ai]
binding = "AI"

[[vectorize]]
binding = "VECTORIZE"
index_name = "search-index"

[[d1_databases]]
binding = "DB"
database_name = "content-db"
database_id = ""
```

### Pattern 4: Multi-Tenant SaaS

```toml
[[kv_namespaces]]
binding = "TENANT_DATA"
id = ""

[[d1_databases]]
binding = "DB"
database_name = "tenants-db"
database_id = ""
```

```typescript
const tenantId = request.headers.get('X-Tenant-ID');
const tenantData = await env.TENANT_DATA.get(`tenant:${tenantId}:config`, 'json');
```

---

## Resources

- **Workers Examples**: https://developers.cloudflare.com/workers/examples/
- **Workers Playground**: https://workers.cloudflare.com/playground
- **Templates**: https://github.com/cloudflare/workers-sdk/tree/main/templates
- **Discord**: https://discord.gg/cloudflaredev
