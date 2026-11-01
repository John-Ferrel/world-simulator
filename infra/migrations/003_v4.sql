BEGIN;

CREATE TABLE IF NOT EXISTS v4_worlds (
  id text PRIMARY KEY,
  seed text NOT NULL,
  status text NOT NULL CHECK (status IN ('running','archived')),
  date_year integer NOT NULL,
  date_month integer NOT NULL CHECK (date_month BETWEEN 1 AND 12),
  seconds_per_year integer NOT NULL,
  months_per_tick integer NOT NULL,
  pressures jsonb NOT NULL DEFAULT '{}'::jsonb,
  history_meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  terminal_reason text,
  revision bigint NOT NULL,
  last_tick_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS v4_one_active_world ON v4_worlds((status)) WHERE status='running';

CREATE TABLE IF NOT EXISTS v4_places(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_households(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_persons(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_organizations(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_positions(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_projects(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_interactions(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_relations(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_knowledge(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_scenes(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE TABLE IF NOT EXISTS v4_events(world_id text NOT NULL REFERENCES v4_worlds(id), id text NOT NULL, date_year integer NOT NULL, date_month integer NOT NULL, subject_id text NOT NULL, payload jsonb NOT NULL, PRIMARY KEY(world_id,id));
CREATE INDEX IF NOT EXISTS v4_events_person ON v4_events(world_id, subject_id, date_year, date_month);
CREATE INDEX IF NOT EXISTS v4_events_world_time ON v4_events(world_id, date_year, date_month);
CREATE TABLE IF NOT EXISTS v4_birth_requests(
  id text PRIMARY KEY,
  world_id text NOT NULL REFERENCES v4_worlds(id),
  user_id text NOT NULL REFERENCES users(id),
  name text NOT NULL,
  sex text NOT NULL,
  health real NOT NULL,
  body text,
  appearance jsonb NOT NULL,
  wish text NOT NULL,
  life_mode text NOT NULL DEFAULT 'ordinary',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','born','failed')),
  child_id text,
  failure text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS v4_birth_pending ON v4_birth_requests(world_id, created_at) WHERE status='pending';

COMMIT;
