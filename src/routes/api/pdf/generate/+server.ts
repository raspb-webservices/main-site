import { json } from '@sveltejs/kit';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export async function POST({ request }) {
  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    // Hier kommt deine PDF-Logik
    const data = await request.json();
    await page.setContent(`<h1>Hallo, ${data.name}</h1>`);

    const pdf = await page.pdf({ format: 'A4' });

    return new Response(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
      },
    });

  } catch (error) {
    const errorInfo = {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      details: error
    };

    console.error('Fehler beim Rendern des PDFs:', error);
    return json({ error: 'PDF-Generierung fehlgeschlagen', timestamp: new Date().toISOString(), errorInfo}, { status: 500 });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}
