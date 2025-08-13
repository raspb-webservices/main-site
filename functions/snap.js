export const handler = async (event) => {
  const isLocal = process.env.NETLIFY_LOCAL === 'true' || process.env.NETLIFY_DEV === 'true';
  const puppeteer = isLocal ? (await import('puppeteer')).default : (await import('puppeteer-core')).default;
  const chromium = isLocal ? null : (await import('@sparticuz/chromium')).default;
  const targetUrl = event.queryStringParameters?.url || 'https://example.com';

  let browser;
  try {
    const launchOptions = isLocal ? { headless: 'new' } : {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    };

    console.log("launchOptions ", launchOptions);

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    const buffer = await page.screenshot({ type: 'png', fullPage: true });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
};