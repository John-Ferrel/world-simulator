import { chat, modelConfig, parseModelJSON } from '../packages/model/config.js';
const c = modelConfig();
try {
  const result = await chat(
    [
      {
        role: 'system',
        content:
          'You are checking connectivity for a world simulation application. Return JSON only.',
      },
      { role: 'user', content: 'Return {"connected":true,"message":"连接成功"}.' },
    ],
    { conversation: 'connectivity', maxTokens: 256 },
  );
  console.log({
    provider: c.provider,
    model: c.model,
    endpoint: c.baseUrl,
    status: 'connected',
    response: parseModelJSON(result.text),
    tokens: result.tokens,
  });
} catch (e) {
  console.log({
    provider: c.provider,
    model: c.model,
    status: 'failed',
    error: (e as Error).message,
  });
  process.exitCode = 1;
}
