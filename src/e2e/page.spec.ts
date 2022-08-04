import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/page');
});

test.describe('Page', () => {
  test('translate', async ({ page }) => {
    await expect(page.locator('main')).toContainText('Qwik Speak');
    await expect(page.locator('main')).toContainText("I'm another page");

    await expect(page.locator('title')).toContainText('Page - Qwik Speak');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', "I'm another page");
  });

  test('change language', async ({ page }) => {
    await page.locator('text=it-IT').click();

    await expect(page.locator('main')).toContainText('Qwik Speak');
    await expect(page.locator('main')).toContainText("Io sono un'altra pagina");
    await expect(page.locator('main')).toContainText("I'm a fallback text");

    await expect(page.locator('title')).toContainText('Pagina - Qwik Speak');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', "Io sono un'altra pagina");
  });
});
