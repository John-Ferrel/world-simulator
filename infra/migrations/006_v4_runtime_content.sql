BEGIN;

CREATE TABLE IF NOT EXISTS v4_content_packs(
  pack_id text PRIMARY KEY,
  version integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'published' CHECK (status IN ('published','disabled')),
  payload jsonb NOT NULL,
  source text NOT NULL DEFAULT 'runtime-author',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS v4_content_jobs(
  id text PRIMARY KEY,
  world_id text REFERENCES v4_worlds(id),
  brief_id text NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','running','published','failed')),
  attempts integer NOT NULL DEFAULT 0,
  tokens integer NOT NULL DEFAULT 0,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS v4_content_jobs_pending
  ON v4_content_jobs(created_at) WHERE status='pending';
CREATE INDEX IF NOT EXISTS v4_content_jobs_world
  ON v4_content_jobs(world_id, created_at DESC);

COMMIT;
