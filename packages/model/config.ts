import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
if (existsSync(resolve('.env'))) process.loadEnvFile(resolve('.env'));
const opencodeKey = process.env.OPENCODE_API_KEY ?? process.env.OPENCODE_key;
if (process.env.LLM_API_KEY === undefined && process.env.NODE_ENV !== 'test' && opencodeKey) {
  process.env.LLM_API_KEY = opencodeKey;
  process.env.LLM_PROVIDER = 'opencode-go';
  process.env.LLM_BASE_URL = 'https://opencode.ai/zen/go/v1';
  process.env.LLM_MODEL = 'opencode-go/deepseek-v4.1-flash';
}
export function modelConfig() {
  const provider =
    process.env.LLM_PROVIDER ??
    (process.env.LLM_MODEL?.startsWith('opencode-go/') ? 'opencode-go' : 'compatible');
  return {
    provider,
    apiKey: process.env.LLM_API_KEY,
    baseUrl: (process.env.LLM_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/$/, ''),
    model: process.env.LLM_MODEL ?? 'gpt-4.1-mini',
    wireModel: (process.env.LLM_MODEL ?? 'gpt-4.1-mini').replace(/^opencode(?:-go)?\//, ''),
    timeoutMs: Number(process.env.LLM_TIMEOUT_MS ?? 45000),
  };
}
export function modelHeaders(conversation: string) {
  const c = modelConfig();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${c.apiKey}`,
    'Content-Type': 'application/json',
    'User-Agent': 'shared-living-world/1.0',
  };
  if (c.provider.startsWith('opencode'))
    headers['x-opencode-session'] = `slw-${createHash('sha256')
      .update(`${process.env.OPENCODE_SESSION ?? 'world-simulator'}:${conversation}`)
      .digest('hex')
      .slice(0, 32)}`;
  return headers;
}
export async function chat(
  messages: { role: string; content: string }[],
  options: { conversation: string; maxTokens?: number; timeoutMs?: number; json?: boolean },
) {
  const c = modelConfig();
  if (!c.apiKey) throw new Error('No model credentials');
  const body: Record<string, unknown> = {
    model: c.wireModel,
    messages,
    ...(c.provider === 'opencode-go'
      ? { max_tokens: options.maxTokens ?? 1800, thinking: { type: 'disabled' } }
      : { max_completion_tokens: options.maxTokens ?? 1800 }),
    ...(options.json === false ? {} : { response_format: { type: 'json_object' } }),
  };
  const response = await fetch(`${c.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: modelHeaders(options.conversation),
    signal: AbortSignal.timeout(options.timeoutMs ?? c.timeoutMs),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    let code = '';
    try {
      const data = (await response.json()) as any;
      code = String(data.error?.code ?? data.error?.type ?? '');
    } catch {}
    throw new Error(`Model HTTP ${response.status}${code ? ` (${code})` : ''}`);
  }
  const result = (await response.json()) as any;
  const content = result.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) throw new Error('Model returned no text');
  return {
    text: content,
    model: result.model ?? c.wireModel,
    usage: result.usage ?? {},
    tokens: result.usage?.total_tokens ?? 0,
  };
}
export function parseModelJSON(text: string) {
  return JSON.parse(text.replace(/^\s*```(?:json)?\s*/, '').replace(/\s*```\s*$/, ''));
}
