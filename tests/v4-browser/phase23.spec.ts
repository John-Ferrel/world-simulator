import { test, expect } from '@playwright/test';

test('Phase 23: political map, gazette and per-outcome titles', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error' && !/status of 403/.test(message.text())) errors.push(message.text());
  });

  const username = `p23_${Date.now().toString(36)}`;
  await page.goto('/');
  await page.getByRole('button', { name: '没有身份？注册' }).click();
  await page.getByLabel('用户名').fill(username);
  await page.getByLabel('密码').fill('phase23-browser-password');
  await page.getByRole('button', { name: '注册并进入' }).click();
  await page.getByRole('heading', { name: '写下一个人的起点' }).waitFor({ timeout: 30000 });
  await page.getByLabel('名字').fill('Phase23 Klara');
  await page.getByLabel('自由祝愿').fill('我想在帝国的黄昏里活成一段让人记住的故事。');
  await page.getByRole('button', { name: '让他出生' }).click();
  await page.locator('.observer').waitFor({ timeout: 60000 });
  await page.locator('.own-badge').waitFor({ timeout: 60000 });

  // Political map: the 1912 Habsburg overlay is present, not a modern-border-only map.
  await expect(page.locator('.world-map-svg')).toBeVisible();
  await expect
    .poll(async () => page.locator('[data-polity="polity-austria-hungary-1912"]').count(), {
      timeout: 20000,
    })
    .toBeGreaterThan(0);
  await expect(page.locator('.world-map-legend')).toContainText('奥匈帝国');
  await expect(page.locator('.world-map-polity-card')).toContainText('弗朗茨·约瑟夫一世');

  // Gazette tab: provenance badges and local/global filters.
  await page.getByRole('tab', { name: '公报' }).click();
  await expect(page.locator('.gazette')).toBeVisible();
  await expect(page.locator('.gazette-head')).toContainText('世界公报');
  await expect(page.locator('.gazette-item').first()).toBeVisible();
  await expect(page.locator('.gazette-legend')).toContainText('历史参考');
  await expect(page.locator('.gazette-legend')).toContainText('传闻');
  await page.locator('.gazette-filters button', { hasText: '本地' }).click();
  await expect
    .poll(async () => page.locator('.gazette-item').count(), { timeout: 10000 })
    .toBeGreaterThan(0);
  await page.locator('.gazette-filters button', { hasText: '全部' }).click();
  await page.screenshot({ path: 'docs/v4/phase-23-gazette.png', fullPage: true });

  // Politics tab: government, leaders, parties and tensions are queryable.
  await page.getByRole('tab', { name: '政治' }).click();
  await expect(page.locator('.political-panel')).toBeVisible();
  await expect(page.locator('.political-current')).toContainText('奥匈帝国');
  await expect(page.locator('.political-current')).toContainText('弗朗茨·约瑟夫一世');
  await expect(page.locator('.political-current')).toContainText('社会民主工人党');
  await expect(page.locator('.political-tension-list')).toContainText('巴尔干');
  await page.screenshot({ path: 'docs/v4/phase-23-politics.png', fullPage: true });

  // Log title must be prose, not an internal action id; detail toggle must work.
  await page.getByRole('tab', { name: '地图' }).click();
  const firstTitle = await page.locator('.log-entry .log-title-button').first().innerText();
  expect(firstTitle).not.toMatch(/^[a-z0-9_-]+$/i);
  expect(firstTitle.length).toBeGreaterThan(0);
  const detailToggle = page.locator('.log-detail-toggle', { hasText: '更多细节' }).first();
  if (await detailToggle.count()) {
    await detailToggle.click();
    await expect(page.locator('.log-detail').first()).toBeVisible();
  }

  await page.mouse.move(0, 0);
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'docs/v4/phase-23-browser-1912.png', fullPage: true });
  expect(errors).toEqual([]);
});
