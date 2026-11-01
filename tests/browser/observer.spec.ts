import { test, expect } from '@playwright/test';
import { Client } from 'pg';

test('birth, one timeline, replay, previews and mobile layout', async ({ page }) => {
  test.setTimeout(180000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/api/births', (route) =>
    route.continue({
      headers: {
        ...route.request().headers(),
        'idempotency-key': `birth-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      },
    }),
  );
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '你写下起点，世界写下余生。' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '人生纪事' })).toBeVisible();
  await page.getByRole('button', { name: '写下一段人生' }).click();
  await page.getByRole('textbox', { name: '用户名' }).fill(`reader_${Date.now()}`);
  await page.getByLabel('密码', { exact: true }).fill('long-test-password-123');
  await page.getByRole('button', { name: '注册', exact: true }).click();
  await expect(page.locator('.creation-oracle')).toBeVisible();
  await expect(page.getByText('命运钩子')).toBeVisible();
  await page.screenshot({ path: 'docs/metrics/creation-oracle.png' });
  let creationRerolls = 0;
  page.on('request', (request) => {
    if (request.url().includes('/api/creation/random')) creationRerolls++;
  });
  const draftName = await page.locator('.creation-oracle h3').innerText();
  await page.getByRole('button', { name: /传奇人生/ }).click();
  await expect(page.getByRole('button', { name: /传奇人生/ })).toHaveClass(/active/);
  await page.waitForTimeout(400);
  expect(creationRerolls).toBe(0);
  await expect(page.locator('.creation-oracle h3')).toHaveText(draftName);
  await page.getByRole('textbox', { name: '姓名', exact: true }).fill('林雾');
  await page
    .getByRole('textbox', { name: '自由祝愿' })
    .fill('希望她幸福，也希望能听见别人的情绪。');
  await page.getByRole('button', { name: '让孩子出生 →' }).click();
  await expect(page.locator('.identity h2')).toHaveText('林雾', { timeout: 90000 });
  await expect(page.getByText('出生愿望')).toBeVisible({ timeout: 30000 });
  await expect(page.getByText('命运暗线')).toBeVisible();
  await expect(page.locator('.event-text').filter({ hasText: '出生在' })).toBeVisible();

  await page.locator('.place-link').click();
  await expect(page.getByRole('dialog', { name: '轻量预览' })).toBeVisible();
  await page.getByRole('button', { name: '关闭预览' }).click();

  const slider = page.getByRole('slider', { name: '人生回放时间' });
  await slider.focus();
  await slider.press('Home');
  await expect(page.locator('.map-time')).toContainText('历史');
  await expect(page.getByText('世界时间轴')).toBeVisible();
  await page.getByRole('button', { name: '此刻', exact: true }).click();
  await expect(page.locator('.map-time')).toContainText('当前世界');
  await expect(page.getByText('出生愿望')).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1),
  ).toBe(true);
  await page.screenshot({ path: 'docs/metrics/observer-desktop.png' });

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('heading', { name: '人生纪事' })).toBeVisible();
  await expect(page.locator('.mobile-tabs button.active')).toHaveText('人生纪事');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1),
  ).toBe(true);
  await page.screenshot({ path: 'docs/metrics/observer-mobile.png' });

  await page.getByRole('button', { name: '人物', exact: true }).click();
  await expect(page.locator('.identity h2')).toHaveText('林雾');
  await expect(page.locator('.mobile-tabs button.active')).toHaveText('人物');
  await page.screenshot({ path: 'docs/metrics/observer-mobile-person.png' });

  await page.getByRole('button', { name: '世界', exact: true }).click();
  await expect(page.getByRole('heading', { name: '世界', exact: true })).toBeVisible();
  await expect(page.locator('.mobile-tabs button.active')).toHaveText('世界');
  await page.screenshot({ path: 'docs/metrics/observer-mobile-world.png' });

  await page.getByRole('button', { name: '人生纪事', exact: true }).click();
  await expect(page.getByRole('heading', { name: '人生纪事' })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test('a simulator commit appends a new chapter without reloading the page', async ({ page }) => {
  test.setTimeout(180000);
  const database = process.env.E2E_DATABASE_URL ?? 'postgres://localhost:55432/living_world_e2e';
  const client = new Client({ connectionString: database });
  await client.connect();
  let paused = false;
  try {
    await page.goto('/');
    await page.getByRole('button', { name: '写下一段人生' }).click();
    await page.getByRole('textbox', { name: '用户名' }).fill(`live_${Date.now()}`);
    await page.getByLabel('密码', { exact: true }).fill('long-test-password-123');
    await page.getByRole('button', { name: '注册', exact: true }).click();
    await page.getByRole('textbox', { name: '姓名', exact: true }).fill('顾潮');
    await page.getByRole('textbox', { name: '自由祝愿' }).fill('想知道河流尽头是什么样子。');
    await page.getByRole('button', { name: '让孩子出生 →' }).click();
    await expect(page.locator('.identity h2')).toHaveText('顾潮', { timeout: 90000 });
    await expect(page.locator('.life-chapter')).toHaveCount(1, { timeout: 30000 });

    const initialTitle = await page.locator('.life-chapter .chapter-year').first().innerText();
    const initialYear = Number(initialTitle.slice(0, 4));
    let activeRequests = 0;
    let navigations = 0;
    page.on('request', (request) => {
      if (request.url().includes('/api/world/active')) activeRequests++;
    });
    page.on('framenavigated', () => navigations++);
    await page.evaluate(() => {
      (window as any).__samePageMarker = 'kept';
      const body = document.querySelector('.chronicle-body') as HTMLElement | null;
      if (body) body.scrollTop = 0;
    });

    await client.query(
      "INSERT INTO settings(key,value) VALUES('minutesPerYear',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value",
      [0.02],
    );
    await client.query(
      "INSERT INTO settings(key,value) VALUES('lastTickAt',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value",
      [0],
    );

    await expect
      .poll(
        async () => {
          const title = await page.locator('.life-chapter .chapter-year').first().innerText();
          return Number(title.slice(0, 4));
        },
        { timeout: 120000, intervals: [500, 1000, 2000] },
      )
      .toBeGreaterThan(initialYear);

    await client.query(
      "INSERT INTO settings(key,value) VALUES('paused',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value",
      [true],
    );
    paused = true;
    await client.query(
      "INSERT INTO settings(key,value) VALUES('lastTickAt',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value",
      [Date.now()],
    );

    const firstYear = Number(
      (await page.locator('.life-chapter .chapter-year').first().innerText()).slice(0, 4),
    );
    const chapterCount = await page.locator('.life-chapter').count();
    expect(firstYear).toBeGreaterThan(initialYear);
    expect(chapterCount).toBeGreaterThan(1);
    expect(await page.evaluate(() => (window as any).__samePageMarker)).toBe('kept');
    expect(navigations).toBe(0);
    expect(activeRequests).toBe(0);
    expect(
      await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1),
    ).toBe(true);
    expect(await page.locator('.chronicle-body').evaluate((el) => el.scrollTop)).toBe(0);
    await page.screenshot({ path: 'docs/metrics/observer-live-chapter.png' });
  } finally {
    if (!paused)
      await client.query(
        "INSERT INTO settings(key,value) VALUES('paused',$1) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value",
        [true],
      );
    await client.end();
  }
});
