BEGIN;

-- Older databases created v4_macro_proposals before world_year was part of the
-- schema; CREATE TABLE IF NOT EXISTS never added it. The Director enqueue path
-- reads and writes world_year, so an explicit additive migration is required.
ALTER TABLE v4_macro_proposals
  ADD COLUMN IF NOT EXISTS world_year integer NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS v4_macro_proposals_world_year
  ON v4_macro_proposals(world_id, world_year);

COMMIT;
