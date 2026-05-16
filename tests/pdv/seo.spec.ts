import { test, expect } from '@playwright/test';

test.describe('SEO Verification', () => {

  test('robots.txt is served with correct content type', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toMatch(/text\/plain/);
  });

  test('robots.txt contains required directives', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const body = await response.text();
    const lines = body.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);

    // Must have User-agent directive
    const userAgentLine = lines.find((l: string) => l.startsWith('User-agent:'));
    expect(userAgentLine).toBeTruthy();
    expect(userAgentLine).toBe('User-agent: *');

    // Must have Allow directive
    const allowLine = lines.find((l: string) => l.startsWith('Allow:'));
    expect(allowLine).toBeTruthy();
    expect(allowLine).toBe('Allow: /');

    // Must have Sitemap directive with HTTPS URL
    const sitemapLine = lines.find((l: string) => l.startsWith('Sitemap:'));
    expect(sitemapLine).toBeTruthy();
    expect(sitemapLine).toBe('Sitemap: https://asymmetric-effort.com/sitemap.xml');

    // Must NOT contain Disallow directives (we want full crawling)
    const disallowLines = lines.filter((l: string) => l.startsWith('Disallow:'));
    expect(disallowLines).toHaveLength(0);
  });

  test('robots.txt Sitemap URL is reachable', async ({ request }) => {
    const robotsResponse = await request.get('/robots.txt');
    const body = await robotsResponse.text();
    const sitemapLine = body.split('\n').find((l: string) => l.trim().startsWith('Sitemap:'));
    const sitemapUrl = sitemapLine!.replace('Sitemap:', '').trim();

    // The sitemap URL must use HTTPS
    expect(sitemapUrl).toMatch(/^https:\/\//);

    // The sitemap must be reachable (relative check against same host)
    const sitemapResponse = await request.get('/sitemap.xml');
    expect(sitemapResponse.status()).toBe(200);
  });

  test('sitemap.xml is served with correct content type', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toMatch(/xml|text/);
  });

  test('sitemap.xml has valid XML structure', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();

    // Must start with XML declaration
    expect(body.trimStart()).toMatch(/^<\?xml\s+version="1\.0"\s+encoding="UTF-8"\s*\?>/);

    // Must have urlset root element with correct namespace
    expect(body).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    // Must close urlset
    expect(body.trimEnd()).toMatch(/<\/urlset>$/);

    // Must not contain malformed XML (unclosed tags)
    const openUrls = (body.match(/<url>/g) || []).length;
    const closeUrls = (body.match(/<\/url>/g) || []).length;
    expect(openUrls).toBe(closeUrls);
    expect(openUrls).toBeGreaterThan(0);

    const openLocs = (body.match(/<loc>/g) || []).length;
    const closeLocs = (body.match(/<\/loc>/g) || []).length;
    expect(openLocs).toBe(closeLocs);
    expect(openLocs).toBe(openUrls);
  });

  test('sitemap.xml contains all expected routes', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();

    const expectedRoutes = [
      'https://asymmetric-effort.com/',
      'https://asymmetric-effort.com/#/projects',
      'https://asymmetric-effort.com/#/resources',
    ];

    // Extract all <loc> values
    const locMatches = body.match(/<loc>(.*?)<\/loc>/g) || [];
    const actualUrls = locMatches.map((m: string) => m.replace(/<\/?loc>/g, ''));

    // Every expected route must be present
    for (const route of expectedRoutes) {
      expect(actualUrls).toContain(route);
    }

    // No unexpected routes
    expect(actualUrls).toHaveLength(expectedRoutes.length);
  });

  test('sitemap.xml URLs all use HTTPS', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();

    const locMatches = body.match(/<loc>(.*?)<\/loc>/g) || [];
    const urls = locMatches.map((m: string) => m.replace(/<\/?loc>/g, ''));

    for (const url of urls) {
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toMatch(/^http:\/\//);
    }
  });

  test('sitemap.xml has valid lastmod dates', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();

    const lastmodMatches = body.match(/<lastmod>(.*?)<\/lastmod>/g) || [];
    expect(lastmodMatches.length).toBeGreaterThan(0);

    for (const m of lastmodMatches) {
      const date = m.replace(/<\/?lastmod>/g, '');
      // Must be ISO 8601 date format (YYYY-MM-DD)
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      // Must be a valid parseable date
      const parsed = new Date(date);
      expect(parsed.toString()).not.toBe('Invalid Date');
      // Must not be in the future (more than 1 day tolerance for timezone)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(parsed.getTime()).toBeLessThanOrEqual(tomorrow.getTime());
    }
  });

  test('sitemap.xml contains no duplicate URLs', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();

    const locMatches = body.match(/<loc>(.*?)<\/loc>/g) || [];
    const urls = locMatches.map((m: string) => m.replace(/<\/?loc>/g, ''));
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
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

  test('llms.txt is served and valid', async ({ request }) => {
    const response = await request.get('/llms.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('# Asymmetric Effort');
    expect(body).toContain('https://asymmetric-effort.com');
    expect(body).toContain('Sam Caldwell');
  });

  test('noscript fallback exists with structured container', async ({ page }) => {
    await page.goto('/');
    const html = await page.evaluate(() => {
      const noscripts = document.querySelectorAll('noscript');
      for (const ns of noscripts) {
        if (ns.textContent?.includes('ns-container')) return ns.innerHTML;
      }
      return '';
    });
    expect(html.length).toBeGreaterThan(0);

    // Must have a styled container
    expect(html).toContain('ns-container');

    // Must have embedded CSS for no-JS rendering
    expect(html).toContain('<style>');

    // Must have navigation with anchor links
    expect(html).toContain('ns-nav');
    expect(html).toContain('ns-nav-link');
  });

  test('noscript fallback contains all page sections', async ({ page }) => {
    await page.goto('/');
    const html = await page.evaluate(() => {
      const noscripts = document.querySelectorAll('noscript');
      for (const ns of noscripts) {
        if (ns.textContent?.includes('ns-container')) return ns.innerHTML;
      }
      return '';
    });

    // Must have section elements with IDs for anchor navigation
    expect(html).toMatch(/id="about"/);
    expect(html).toMatch(/id="projects"/);
    expect(html).toMatch(/id="resources"/);

    // About Us section content
    expect(html).toContain('About Us');
    expect(html).toContain('cybersecurity');
    expect(html).toContain('peace of mind');

    // Projects section — all nine projects
    expect(html).toContain('SpecifyJS');
    expect(html).toContain('Scrutineer');
    expect(html).toContain('Convocate');
    expect(html).toContain('Actions');
    expect(html).toContain('GreyNet');
    expect(html).toContain('JsonLint');
    expect(html).toContain('YAMLlint');
    expect(html).toContain('NogginLessDom');

    // Resources section
    expect(html).toContain('Coding Standards');
    expect(html).toContain('coding-standards.asymmetric-effort.com');
  });

  test('noscript fallback has project links using HTTPS', async ({ page }) => {
    await page.goto('/');
    const html = await page.evaluate(() => {
      const noscripts = document.querySelectorAll('noscript');
      for (const ns of noscripts) {
        if (ns.textContent?.includes('ns-container')) return ns.innerHTML;
      }
      return '';
    });

    // Extract all href values from the noscript content
    const hrefMatches = html.match(/href="(https?:\/\/[^"]+)"/g) || [];
    const urls = hrefMatches.map((m: string) => m.replace(/href="/g, '').replace(/"$/, ''));

    // All external links must use HTTPS
    for (const url of urls) {
      expect(url).toMatch(/^https:\/\//);
    }

    // Must link to project sites
    expect(urls).toContain('https://specifyjs.asymmetric-effort.com');
    expect(urls).toContain('https://scrutineer.asymmetric-effort.com');
    expect(urls).toContain('https://convocate.asymmetric-effort.com');
    expect(urls).toContain('https://actions.asymmetric-effort.com');
    expect(urls).toContain('https://jsonlint.asymmetric-effort.com');
    expect(urls).toContain('https://yamllint.asymmetric-effort.com');
    expect(urls).toContain('https://nogginlessdom.asymmetric-effort.com');
    expect(urls).toContain('https://coding-standards.asymmetric-effort.com');
  });

  test('noscript fallback has copyright and JS notice', async ({ page }) => {
    await page.goto('/');
    const html = await page.evaluate(() => {
      const noscripts = document.querySelectorAll('noscript');
      for (const ns of noscripts) {
        if (ns.textContent?.includes('ns-container')) return ns.innerHTML;
      }
      return '';
    });

    // Copyright footer
    expect(html).toContain('Asymmetric Effort, LLC.');
    expect(html).toContain('ns-footer');

    // JS-disabled notice
    expect(html).toContain('ns-js-notice');
    expect(html).toContain('JavaScript');
  });

  test('noscript fallback contains no interactive elements', async ({ page }) => {
    await page.goto('/');
    const html = await page.evaluate(() => {
      const noscripts = document.querySelectorAll('noscript');
      for (const ns of noscripts) {
        if (ns.textContent?.includes('ns-container')) return ns.innerHTML;
      }
      return '';
    });

    // Must not contain elements that require JS
    expect(html).not.toMatch(/<button[\s>]/i);
    expect(html).not.toMatch(/<input[\s>]/i);
    expect(html).not.toMatch(/<select[\s>]/i);
    expect(html).not.toMatch(/<textarea[\s>]/i);
    expect(html).not.toMatch(/onclick=/i);
    expect(html).not.toMatch(/onchange=/i);
    expect(html).not.toContain('<script');
  });

});
