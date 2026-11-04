import { test, expect } from '@playwright/test';

test('register, give birth, read a concrete log and inspect the map', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => {
    // Private-event detail intentionally returns 403 to non-owners; the modal
    // shows the privacy notice. Those browser resource errors are expected.
    if (message.type() === 'error' && !/status of 403/.test(message.text())) {
      errors.push(message.text());
    }
  });

  const username = `e2e_${Date.now().toString(36)}`;
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '世界人生' })).toBeVisible();
  await page.getByRole('button', { name: '没有身份？注册' }).click();
  await page.getByLabel('用户名').fill(username);
  await page.getByLabel('密码').fill('vienna-e2e-password');
  await page.getByRole('button', { name: '注册并进入' }).click();

  await expect(page.getByRole('heading', { name: '写下一个人的起点' })).toBeVisible();
  await page.getByLabel('名字').fill('E2E Klara');
  await page.getByLabel('自由祝愿').fill('我希望她识字，能自己决定要不要进印刷厂。');
  await page.getByRole('button', { name: '让他出生' }).click();

  // The birth request is async. Browsing while it is pending must not stop
  // the poll that delivers the child.
  const browse = page.getByRole('button', { name: '先浏览世界' });
  if (await browse.isVisible().catch(() => false)) await browse.click();

  await expect(page.locator('.observer')).toBeVisible({ timeout: 30000 });
  await expect(page.locator('.own-badge')).toBeVisible({ timeout: 30000 });
  await expect(page.locator('.person-heading h2')).toHaveText('E2E Klara', { timeout: 30000 });
  await expect(page.locator('.historical-processes')).toBeVisible();
  await expect(page.locator('.historical-legacy')).toBeVisible();
  await expect(page.locator('.historical-legacy')).toContainText('历史遗产');
  await expect(page.locator('.log-entry').first()).toBeVisible({ timeout: 30000 });
  await expect(page.locator('.log-pane')).toContainText('出生');
  await expect(page.locator('.topbar')).toContainText(username);

  await page.locator('.person-switch select').selectOption('person-sigmund-freud');
  await expect(page.locator('.person-heading h2')).toHaveText('Sigmund Freud');
  await expect(page.locator('.historical-badge')).toContainText('历史人物');
  await expect(page.locator('.historical-participation')).toBeVisible();
  const processCard = page.locator('.historical-card').first();
  if (await processCard.isVisible().catch(() => false)) {
    await processCard.click();
    await expect(page.locator('.process-modal')).toBeVisible();
    await page.getByRole('button', { name: '关闭进程档案' }).click();
  }

  await page.locator('.person-switch select').selectOption('person-anton-huber');
  await expect(page.locator('.person-heading h2')).toHaveText('Anton Huber');
  await expect(page.locator('.person-sub')).toContainText('享年');
  await expect(page.locator('.person-dates')).toContainText('1910');

  await page.locator('.person-switch select').selectOption('person-anna-bauer');
  await expect(page.locator('.person-heading h2')).toHaveText('Anna Bauer');
  await expect(page.locator('.log-entry').first()).toBeVisible({ timeout: 30000 });
  await expect(page.locator('.log-pane')).toContainText(/Anna|Bauer|印刷|学校|房租/);
  await expect(page.locator('.log-title', { hasText: 'None' })).toHaveCount(0);
  await expect(page.locator('.log-title', { hasText: /^[a-z][a-z0-9_]*$/ })).toHaveCount(0);

  const semanticPerson = page.locator('.log-entry .semantic-person').first();
  await expect(semanticPerson).toBeVisible();
  await semanticPerson.hover();
  await expect(page.locator('.person-dossier')).toBeVisible();
  await page.locator('.person-heading h2').hover();
  await expect(page.locator('.person-dossier')).toHaveCount(0);

  const klaraOption = page
    .locator('.person-switch select option')
    .filter({ hasText: 'E2E Klara' })
    .first();
  const klaraId = await klaraOption.getAttribute('value');
  expect(klaraId).toBeTruthy();
  await page.locator('.person-switch select').selectOption(klaraId!);
  await expect(page.locator('.log-entry').first()).toBeVisible();
  let traceSeen = false;
  const titleButtons = page.locator('.log-entry[data-trace="true"] .log-title-button');
  const titleCount = Math.min(await titleButtons.count(), 12);
  for (let index = 0; index < titleCount; index += 1) {
    const button = page.locator('.log-entry .log-title-button').nth(index);
    if (!(await button.isVisible().catch(() => false))) continue;
    await button.click();
    await expect(page.locator('.event-modal')).toBeVisible();
    if (
      await page
        .locator('.incident-trace')
        .isVisible()
        .catch(() => false)
    ) {
      traceSeen = true;
      await expect(page.locator('.incident-trace')).toContainText('机制');
      await page.screenshot({ path: 'docs/v4/phase-13-incident-trace.png' });
      await page.getByRole('button', { name: '关闭事件档案' }).click();
      break;
    }
    await page.getByRole('button', { name: '关闭事件档案' }).click();
  }
  expect(traceSeen).toBe(true);
  await page.locator('.person-switch select').selectOption('person-anna-bauer');
  await expect(page.locator('.person-heading h2')).toHaveText('Anna Bauer');

  const pins = page.locator('.map-pin');
  await expect(pins.first()).toBeVisible();
  await pins.nth(12).click();
  await expect(page.locator('.place-people')).toBeVisible();

  await page.screenshot({ path: 'docs/v4/phase-13-browser.png', fullPage: true });
  expect(errors).toEqual([]);
});
