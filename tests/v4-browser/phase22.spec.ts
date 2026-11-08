import { test, expect } from '@playwright/test';

test('Phase 22: original portrait, real map and early-life story', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    if (message.type() === 'error' && !/status of 403/.test(message.text())) errors.push(message.text());
  });

  const username = `p22_${Date.now().toString(36)}`;
  await page.goto('/');
  await page.getByRole('button', { name: '没有身份？注册' }).click();
  await page.getByLabel('用户名').fill(username);
  await page.getByLabel('密码').fill('phase22-browser-password');
  await page.getByRole('button', { name: '注册并进入' }).click();
  await page.getByRole('heading', { name: '写下一个人的起点' }).waitFor({ timeout: 30000 });
  await page.getByLabel('名字').fill('Phase22 Klara');
  await page.getByLabel('自由祝愿').fill('我想经历一段既荒诞又温暖的人生。');
  await expect(page.locator('.compact-doll-preview .original-portrait')).toBeVisible();
  await page.getByRole('button', { name: '让他出生' }).click();
  await page.locator('.observer').waitFor({ timeout: 60000 });
  await page.locator('.own-badge').waitFor({ timeout: 60000 });

  const portrait = await page.locator('.portrait .original-portrait').boundingBox();
  expect(portrait?.width ?? 0).toBeGreaterThan(180);
  expect(portrait?.height ?? 0).toBeGreaterThan(220);
  await expect(page.locator('.world-map-svg')).toBeVisible();
  expect(await page.locator('.world-map-countries path').count()).toBeGreaterThan(100);
  await expect(page.locator('.log-pane')).toContainText('出生');
  await expect
    .poll(async () => page.locator('.log-entry').count(), { timeout: 30000 })
    .toBeGreaterThan(2);
  await page.mouse.move(0, 0);
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'docs/v4/phase-22-browser-final.png', fullPage: true });
  expect(errors).toEqual([]);
});
