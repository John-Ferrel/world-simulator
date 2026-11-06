BEGIN;

-- Phase 15 mechanism states. Instances are world facts with a committed source
-- event; definitions are versioned content and are not stored here.
CREATE TABLE IF NOT EXISTS v4_states (
  world_id text NOT NULL REFERENCES v4_worlds(id) ON DELETE CASCADE,
  id text NOT NULL,
  owner_type text NOT NULL,
  owner_id text NOT NULL,
  definition_id text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  payload jsonb NOT NULL,
  PRIMARY KEY (world_id, id)
);

CREATE INDEX IF NOT EXISTS v4_states_owner
  ON v4_states(world_id, owner_type, owner_id, active);

CREATE INDEX IF NOT EXISTS v4_states_definition
  ON v4_states(world_id, definition_id, active);

COMMIT;
