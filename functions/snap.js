export const handler = async (event) => {
  const isLocal = process.env.NETLIFY_LOCAL === 'true' || process.env.NETLIFY_DEV === 'true';
  const puppeteer = isLocal ? (await import('puppeteer')).default : (await import('puppeteer-core')).default;
  const chromium = isLocal ? null : (await import('@sparticuz/chromium')).default;
  const targetUrl = event.queryStringParameters?.url || 'https://example.com';
  const chromePath = (await myChrome.executablePath()) ?? '/chrome/linux-139.0.7258.66/chrome-linux64/chrome';

  let browser;
  try {
    const launchOptions = isLocal ? { headless: true} : {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--single-process',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ],
        executablePath: chromePath,
        headless: true
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