import { test, expect } from '@playwright/test';

test.describe('SEO Verification', () => {

  test('robots.txt is served and valid', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('User-agent:');
    expect(body).toContain('Sitemap: https://asymmetric-effort.com/sitemap.xml');
  });

  test('sitemap.xml is served and valid', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<urlset');
    expect(body).toContain('<loc>https://asymmetric-effort.com/</loc>');
  });

  test('Open Graph tags are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://asymmetric-effort.com/');
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Asymmetric Effort');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();

    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc).toBeTruthy();

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/^https:\/\/.*\.(png|jpg|jpeg|svg|webp)$/);
  });

  test('canonical URL is set', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://asymmetric-effort.com/');
  });

  test('JSON-LD structured data is present', async ({ page }) => {
    await page.goto('/');
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const raw = await jsonLd.textContent();
    expect(raw).toBeTruthy();
    const data = JSON.parse(raw!);
    expect(data['@type']).toBe('Organization');
    expect(data.name).toContain('Asymmetric Effort');
    expect(data.url).toBe('https://asymmetric-effort.com');
    expect(data.logo).toMatch(/^https:\/\//);
  });

  test('theme-color meta tag is present', async ({ page }) => {
    await page.goto('/');
    const color = await page.locator('meta[name="theme-color"]').getAttribute('content');
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  test('OG title updates dynamically per page', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    const homeOg = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(homeOg).toContain('About Us');

    await page.goto('/#/projects');
    await page.waitForTimeout(500);
    const projOg = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(projOg).toContain('Projects');

    await page.goto('/#/resources');
    await page.waitForTimeout(500);
    const resOg = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(resOg).toContain('Resources');
  });

  test('meta description updates dynamically per page', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    const homeDesc = await page.locator('meta[name="description"]').getAttribute('content');

    await page.goto('/#/projects');
    await page.waitForTimeout(500);
    const projDesc = await page.locator('meta[name="description"]').getAttribute('content');

    expect(homeDesc).not.toBe(projDesc);
    expect(projDesc).toContain('projects');
  });

  test('no Twitter or Facebook meta tags present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(0);
    await expect(page.locator('meta[property="fb:app_id"]')).toHaveCount(0);
  });

});
