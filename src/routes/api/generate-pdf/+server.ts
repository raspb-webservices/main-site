import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import puppeteer from 'puppeteer';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { html, filename } = await request.json();

    if (!html) {
      return json({ error: 'HTML content is required' }, { status: 400 });
    }

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2
    });

    // Set content and wait for fonts to load
    await page.setContent(html, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

    // Wait a bit more for fonts to fully load
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate PDF with high quality settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false
    });

    await browser.close();

    // Return PDF as response
    return new Response(pdfBuffer as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename || 'document.pdf'}"`
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return json({ error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
};
