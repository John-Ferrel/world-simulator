# Deployment

## Compose

From the repository root:

```sh
docker compose -f infra/docker-compose.yml up --build -d
```

Open http://localhost:3001. API serves the built browser bundle; simulator and optional model worker are separate processes. PostgreSQL persists in a named volume. Migrations are idempotent and simulator bootstraps the first fictional world. Default shared time is one year per twenty real minutes. No model credentials are needed for deterministic simulation.

Set `POSTGRES_PASSWORD` before exposing the database/network to untrusted infrastructure. Put HTTPS in front of the API and set `COOKIE_SECURE=true` for public hosting. Server has no browser-visible credentials. Compose defaults are local development settings.

## Native Node/Postgres

Install Node 24, pnpm 10 and PostgreSQL 16. Create a database, set `DATABASE_URL`, then:

```sh
pnpm install --frozen-lockfile
pnpm migrate
pnpm dev
```

Browser development: http://localhost:5173. API: http://localhost:3001. Production without Docker: `pnpm build`, then run `pnpm api`, `pnpm simulator`, and `pnpm worker` under a process manager. API serves `dist/`.

Optional compatible provider variables: `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL`, `LLM_DAILY_TOKEN_CAP`, `LLM_ACTOR_DAILY_TOKEN_CAP`. Creation can use bounded model interpretation; selective decisions/innovation and extractive summaries run asynchronously. No key means local drafting and rule policy, explicitly displayed. Model calls reserve daily global and actor token budgets before network access. Failed calls retain conservative reservations when actual usage is unknown. Provider cost must be monitored externally because price tables differ.

The environment for this implementation has no Docker daemon. Real PostgreSQL checks run against a user-owned PostgreSQL 16 cluster; Compose execution is separately marked unverified until available.

The included Ubuntu/WSL helper `pnpm db:local` downloads/extracts PostgreSQL packages into ignored `.data/` when needed and starts a user-owned loopback cluster. It also creates the dedicated integration and browser-test databases. Browser tests reset only a database whose name ends in `_e2e` and start their own API/Vite processes on ports 3011/5174. They never reset the normal game database.
