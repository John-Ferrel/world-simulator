BEGIN;

CREATE TABLE IF NOT EXISTS v4_birth_contracts(
  id text PRIMARY KEY,
  world_id text NOT NULL REFERENCES v4_worlds(id),
  person_id text NOT NULL,
  request_id text NOT NULL REFERENCES v4_birth_requests(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','done','failed')),
  attempts integer NOT NULL DEFAULT 0,
  model text,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS v4_birth_contracts_pending
  ON v4_birth_contracts(created_at) WHERE status='pending';
CREATE UNIQUE INDEX IF NOT EXISTS v4_birth_contracts_person
  ON v4_birth_contracts(person_id);

COMMIT;
