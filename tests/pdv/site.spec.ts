import { test, expect } from '@playwright/test';

test.describe('Post-Deployment Verification', () => {

  test('homepage loads and enforces HTTPS in production', async ({ page }) => {
    const response = await page.goto('/');
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);
    const baseURL = process.env.PDV_BASE_URL || '';
    if (baseURL.startsWith('https://')) {
      expect(page.url()).toMatch(/^https:\/\//);
    }
  });

  test('homepage renders About Us content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#root')).not.toBeEmpty();
    await expect(page.locator('h1')).toContainText('About Us');
  });

  test('header contains logo', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('header img.logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('alt', 'Asymmetric Effort');
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toContainText('About Us');
    await expect(page.locator('nav')).toContainText('Projects');
  });

  test('footer displays copyright with current year', async ({ page }) => {
    await page.goto('/');
    const year = new Date().getFullYear().toString();
    const footer = page.locator('footer');
    await expect(footer).toContainText('2022-' + year);
    await expect(footer).toContainText('Asymmetric Effort, LLC.');
  });

  test('footer displays version', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer .version')).toContainText(/^v\d+\.\d+\.\d+$/);
  });

  test('projects page loads and lists all projects', async ({ page }) => {
    await page.goto('/#/projects');
    await expect(page.locator('h1')).toContainText('Our Projects');

    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(3);

    await expect(page.locator('.project-card >> text=SpecifyJS')).toBeVisible();
    await expect(page.locator('.project-card >> text=Scrutineer')).toBeVisible();
    await expect(page.locator('.project-card >> text=Convocate')).toBeVisible();
  });

  test('project links use HTTPS', async ({ page }) => {
    await page.goto('/#/projects');
    const links = page.locator('.project-card a');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toMatch(/^https:\/\//);
    }
  });

  test('navigation between pages works', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('About Us');

    await page.locator('nav >> text=Projects').click();
    await expect(page.locator('h1')).toContainText('Our Projects');

    await page.locator('nav >> text=About Us').click();
    await expect(page.locator('h1')).toContainText('About Us');
  });

  test('favicon is served', async ({ request }) => {
    const response = await request.get('/favicon.ico');
    expect(response.status()).toBe(200);
  });

  test('logo image is served', async ({ request }) => {
    const response = await request.get('/logo.png');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('no GreyNet references on site', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toContainText('GreyNet');

    await page.goto('/#/projects');
    await expect(page.locator('body')).not.toContainText('GreyNet');
  });

});
