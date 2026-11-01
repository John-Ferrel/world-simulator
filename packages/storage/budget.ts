import { pool } from './index.js';
export async function reserveTokens(
  id: string,
  actorId: string,
  tokens: number,
  promptVersion: string,
) {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const exists = (await c.query('SELECT id FROM model_calls WHERE id=$1', [id])).rowCount;
    if (exists) {
      await c.query('ROLLBACK');
      return false;
    }
    for (const [bucket, cap] of [
      ['world', Number(process.env.LLM_DAILY_TOKEN_CAP ?? 50000)],
      [`actor:${actorId}`, Number(process.env.LLM_ACTOR_DAILY_TOKEN_CAP ?? 6000)],
    ] as const) {
      await c.query(
        'INSERT INTO model_budget(day,bucket,tokens) VALUES(current_date,$1,0) ON CONFLICT DO NOTHING',
        [bucket],
      );
      const result = await c.query(
        'UPDATE model_budget SET tokens=tokens+$2 WHERE day=current_date AND bucket=$1 AND tokens+$2<=$3 RETURNING tokens',
        [bucket, tokens, cap],
      );
      if (!result.rowCount) {
        await c.query('ROLLBACK');
        return false;
      }
    }
    await c.query(
      "INSERT INTO model_calls(id,actor_id,reserved,status,prompt_version) VALUES($1,$2,$3,'reserved',$4)",
      [id, actorId, tokens, promptVersion],
    );
    await c.query('COMMIT');
    return true;
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
}
export async function finishTokens(id: string, tokens: number, model: string, status = 'complete') {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const row = (await c.query('SELECT * FROM model_calls WHERE id=$1 FOR UPDATE', [id])).rows[0];
    if (row && row.status === 'reserved') {
      for (const bucket of ['world', `actor:${row.actor_id}`])
        await c.query(
          'UPDATE model_budget SET tokens=greatest(0,tokens+$3) WHERE day=$1::date AND bucket=$2',
          [row.created_at, bucket, tokens - row.reserved],
        );
      await c.query('UPDATE model_calls SET tokens=$2,model=$3,status=$4 WHERE id=$1', [
        id,
        tokens,
        model,
        status,
      ]);
    }
    await c.query('COMMIT');
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
}
