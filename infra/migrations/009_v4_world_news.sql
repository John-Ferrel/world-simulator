BEGIN;

-- Phase 23 world gazette. News is narrative material, not an EventFact and not
-- an authority for world state. The payload carries the full bounded item.
CREATE TABLE IF NOT EXISTS v4_world_news (
  world_id text NOT NULL REFERENCES v4_worlds(id) ON DELETE CASCADE,
  id text NOT NULL,
  date_year integer NOT NULL,
  date_month integer NOT NULL,
  scope text NOT NULL,
  category text NOT NULL,
  provenance text NOT NULL,
  title text NOT NULL,
  summary text NOT NULL,
  payload jsonb NOT NULL,
  PRIMARY KEY (world_id, id)
);

CREATE INDEX IF NOT EXISTS v4_world_news_time
  ON v4_world_news(world_id, date_year, date_month);

CREATE INDEX IF NOT EXISTS v4_world_news_scope
  ON v4_world_news(world_id, scope, date_year);

COMMIT;
