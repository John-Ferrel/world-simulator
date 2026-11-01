BEGIN;

ALTER TABLE v4_worlds ADD COLUMN IF NOT EXISTS macro jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE TABLE IF NOT EXISTS v4_macro_proposals(
  id text PRIMARY KEY,
  world_id text NOT NULL REFERENCES v4_worlds(id),
  region_id text NOT NULL,
  world_year integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','running','validated','applied','failed','stale')),
  attempts integer NOT NULL DEFAULT 0,
  model text,
  tokens integer NOT NULL DEFAULT 0,
  proposal jsonb,
  error text,
  snapshot_hash text,
  applied_revision bigint,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS v4_macro_proposals_pending
  ON v4_macro_proposals(world_id, created_at) WHERE status='pending';
CREATE INDEX IF NOT EXISTS v4_macro_proposals_recent
  ON v4_macro_proposals(world_id, created_at DESC);

COMMIT;
