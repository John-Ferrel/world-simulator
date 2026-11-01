# ADR 011: Bounded, pinned journal recovery

Large-world recovery previously fetched every patch after its checkpoint into one PostgreSQL result. A read-only verification of the development world exceeded 4 GiB RSS and was stopped. Its checkpoint and history remained untouched.

Recovery now pins the committed world revision/checksum first, chooses a checkpoint no newer than that head, and fetches one successive immutable journal row at a time. Each link must have the expected revision and previous checksum; the recovered final checksum must equal the pinned head. Missing final rows therefore fail instead of silently returning an older valid checkpoint. Later commits cannot extend an in-progress recovery.

The checksum encoder preserves the existing sorted-key canonical byte format but feeds SHA-256 in bounded chunks, avoiding an additional whole-world canonical string. This changes no stored checksum or simulation outcome. Compatibility is checked against an independent Unicode/JSON normalization byte vector and existing persisted world checksums.

Alternatives were fetching all rows with a larger Node heap, or holding a database cursor transaction throughout recovery. The first retains unnecessary payloads; the second holds database resources for a long verification. Immutable history and a pinned head permit bounded indexed reads without either. Individual world states and patches still need to fit memory; this is not a claim of unlimited recovery capacity.
