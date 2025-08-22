import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { projectTypes, subTypes, availableFeatures, formFieldTypes } from '$lib/components/wizard/wizard-config';
import deTranslations from '$lib/i18n/locales/de/pdf-generator.json';
import enTranslations from '$lib/i18n/locales/en/pdf-generator.json';

// Translation function for server-side use
function getTranslation(key: string, locale: string = 'de'): string {
  const translations = locale === 'en' ? enTranslations : deTranslations;
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}

export const POST: RequestHandler = async ({ request }) => {
  let browser;
  try {
    const { config, customerData, uploadedFiles, customFeatures, filename, locale = 'de' } = await request.json();
    const htmlContent = generateHTMLContent(config, customerData, uploadedFiles, customFeatures, locale);
    const isLocal = process.env.NETLIFY_LOCAL === 'true' || process.env.NETLIFY_DEV === 'true' || process.env.NODE_ENV === 'development';

    if (isLocal) {
      // Local development - use regular puppeteer
      const puppeteer = (await import('puppeteer')).default;
      const launchOptions = {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      };
      browser = await puppeteer.launch(launchOptions);
    } else {
      // Production - use puppeteer-core with @sparticuz/chromium
      const puppeteerCore = (await import('puppeteer-core')).default;
      const chromium = (await import('@sparticuz/chromium')).default;

      // Configure chromium for serverless environment
      await chromium.font('https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2');

      const launchOptions = {
        args: [
          ...chromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--single-process',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-ipc-flooding-protection',
          '--disable-extensions',
          '--disable-default-apps',
          '--disable-sync',
          '--disable-translate',
          '--hide-scrollbars',
          '--metrics-recording-only',
          '--mute-audio',
          '--no-first-run',
          '--safebrowsing-disable-auto-update',
          '--ignore-gpu-blacklist',
          '--ignore-certificate-errors',
          '--ignore-ssl-errors',
          '--ignore-certificate-errors-spki-list'
        ],
        executablePath: await chromium.executablePath(),
        headless: true,
        ignoreHTTPSErrors: true,
        defaultViewport: {
          width: 1280,
          height: 720
        }
      };
      browser = await puppeteerCore.launch(launchOptions);
    }
    const page = await browser.newPage();

    // Set content and wait for fonts to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '12mm',
        right: '10mm',
        bottom: '12mm',
        left: '10mm'
      }
    });
    await browser.close();

    // Return PDF as response
    return new Response(pdfBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } catch (error) {
    const errorInfo = {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      details: error
    };

    const environmentInfo = {
      NODE_ENV: process.env.NODE_ENV,
      platform: process.platform,
      architecture: process.arch,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage()
    };

    const isPuppeteerError = error?.message?.includes('puppeteer') || error?.message?.includes('browser') || error?.message?.includes('chrome');

    return json(
      {
        error: 'PDF generation failed (api)',
        timestamp: new Date().toISOString(),
        errorInfo,
        environmentInfo,
        isPuppeteerError
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
};

function generateHTMLContent(config: any, customerData: any, uploadedFiles: any[], customFeatures: string, locale: string = 'de'): string {
  const projectType = projectTypes.find((p) => p.id === config.projectType);
  const subType = subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType);

  // Helper function to get translations
  const t = (key: string) => getTranslation(key, locale);

  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RASPB - Projekt Konfiguration</title>
    <link href="https://fonts.googleapis.com/css2?family=Circular+Std:wght@300;400;500;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Circular Std', 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #010101;
            background: #fafafa;
            min-height: 100vh;
        }
        
        .container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            border-radius: 16px;
        }
        
        .header {
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #8b5cf6 100%);
            color: white;
            padding: 40px;
            position: relative;
            border-radius: 16px 16px 0 0;
        }
        
        .header-content {
            position: relative;
        }
        
        .logo {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: 1px;
            color: white;
            font-family: 'Circular Std', sans-serif;
        }
        
        .subtitle {
            font-size: 18px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 0;
        }
        
        .date {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            position: absolute;
            top: 0;
            right: 0;
            background: rgba(255,255,255,0.15);
            padding: 8px 12px;
            border-radius: 6px;
            backdrop-filter: blur(10px);
        }
        
        .content {
            padding-bottom: 40px;
            background: #fefefe;
        }
        
        .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
        }
        
        .section-header {
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f472b6 100%);
            color: white;
            padding: 12px 20px;
            margin: 0 0 20px 0;
            border-radius: 12px;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-left: 4px solid #9333ea;
            font-family: 'Circular Std', sans-serif;
            font-weight: 700;
        }
        
        .project-overview {
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
            color: #010101;
            padding: 35px;
            border-radius: 0 0 20px 20px;
            margin-bottom: 40px;
            position: relative;
            overflow: hidden;
        }
        
        .project-name {
            font-size: 28px;
            line-height: 32px;
            font-weight: 700;
            color: #010101;
            font-family: 'Circular Std', sans-serif;
        }
        
        .project-name-special {
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #8b5cf6 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
        }
        
        .project-type {
            font-size: 16px;
            color: #9333ea;
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .price-highlight {
            background: linear-gradient(135deg, #f09b1b 0%, #f3c739 100%);
            padding: 20px;
            border-radius: 20px;
            text-align: center;
            margin-top: 25px;
            color: white;
        }
        
        .price {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
            font-family: 'Circular Std', sans-serif;
        }
        
        .price-label {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
        }
        
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .detail-item {
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
            border: 1px solid #e9d5ff;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 12px;
            border-left: 4px solid #c084fc;
            transition: all 0.3s ease;
        }

        .detail-grid .detail-item {
            margin-bottom: 0;
        }
        
        .detail-label {
            font-weight: 600;
            color: #7c3aed;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-family: 'Circular Std', sans-serif;
        }
        
        .detail-value {
            color: #010101;
            font-size: 16px;
            line-height: 20px;
            font-weight: 300;
            display: flex;
            justify-content: start;
            align-items: center;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .feature-item {
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
            border: 1px solid #e9d5ff;
            padding: 15px;
            border-radius: 12px;
            border-left: 4px solid #c084fc;
        }
        
        .feature-title {
            font-weight: 600;
            color: #7c3aed;
            margin-bottom: 5px;
            font-family: 'Circular Std', sans-serif;
        }
        
        .feature-description {
            font-size: 14px;
            color: #9333ea;
            font-weight: 300;
        }
        
        .footer {
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f472b6 100%);
            color: white;
            padding: 20px 40px;
            text-align: center;
            margin-top: 60px;
            border-radius: 0 0 20px 20px;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .footer-logo {
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 1px;
            font-family: 'Circular Std', sans-serif;
        }
        
        .footer-info {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
        }
        
        /* RASPB Brand Typography */
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Circular Std', sans-serif;
            font-weight: 700;
            line-height: 1.1;
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #8b5cf6 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
        }
        
        .add-padding {
            padding: 0 20px 0 20px;
        }
        .color-box {
            display: inline-block;
            margin-left: 10px;
            width: 22px;
            height: 22px;
        }
    </style>
</head>
<body>
    <div class="container">

        <header class="header">
            <div class="date">${t('wizard.hardcodedTexts.summary.createdOn')} ${new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'de-DE')}</div>
            <div class="header-content">
                <div class="logo">raspb Webservices</div>
                <div class="subtitle">${t('wizard.hardcodedTexts.summary.projectConfiguration')}</div>
            </div>
        </header>
        
        <div class="content">
            <!-- Project Overview -->
            <div class="project-overview">
                <div class="project-name">
                    <span class="gradient-text">${config.name || t('wizard.hardcodedTexts.summary.projectType')}</span>
                </div>
                <div class="project-type">
                    ${projectType ? t(projectType.title) : ''}${subType ? ` - ${t(subType.title)}` : ''}
                </div>
                ${
                  config.estimatedPrice > 0
                    ? `
                <div class="price-highlight">
                    <div class="price">${config.estimatedPrice.toLocaleString()}€</div>
                    <div class="price-label">${t('wizard.hardcodedTexts.summary.estimatedPrice')}</div>
                </div>
                `
                    : ''
                }
            </div>
            
            ${
              config.description
                ? `
            <div class="section">
                <div class="section-header">${t('wizard.hardcodedTexts.summary.projectDescription')}</div>
                <div class="detail-value add-padding">${config.description}</div>
            </div>
            `
                : ''
            }
            
            <!-- Project Details -->
            <div class="section">
                <div class="section-header">${t('wizard.hardcodedTexts.summary.projectType')}</div>
                <div class="detail-grid">
                    ${
                      config.targetAudience
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.form.targetAudience')}</div>
                        <div class="detail-value">${config.targetAudience}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.goals
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.goals')}</div>
                        <div class="detail-value">${config.goals}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.desiredDomain
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.desiredDomain')}</div>
                        <div class="detail-value">${config.desiredDomain}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.domainStatus
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.domainStatus')}</div>
                        <div class="detail-value">${config.domainStatus}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.timeline
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.timeline')}</div>
                        <div class="detail-value">${config.timeline}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.budget
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.budget')}</div>
                        <div class="detail-value">${config.budget}</div>
                    </div>
                    `
                        : ''
                    }
                </div>
            </div>
            
            ${
              config.features && config.features.length > 0
                ? `
            <div class="section">
                <div class="section-header">${t('wizard.hardcodedTexts.summary.selectedFeatures')}</div>
                <div class="features-grid">
                    ${config.features
                      .map((featureId: string) => {
                        const feature = availableFeatures.find((f) => f.name === featureId);
                        return feature
                          ? `
                        <div class="feature-item">
                            <div class="feature-title">${t(feature.title)}</div>
                            ${feature.description ? `<div class="feature-description">${t(feature.description)}</div>` : ''}
                        </div>
                        `
                          : '';
                      })
                      .join('')}
                </div>
                ${
                  customFeatures
                    ? `
                <div class="detail-item">
                    <div class="detail-label">${t('wizard.hardcodedTexts.customFeatures.label')}</div>
                    <div class="detail-value">${customFeatures}</div>
                </div>
                `
                    : ''
                }
            </div>
            `
                : ''
            }
            
            ${
              config.pages && config.pages.length > 0
                ? `
            <div class="section">
                <div class="section-header">${t('wizard.hardcodedTexts.summary.pages')}</div>

                    ${config.pages
                      .map((page: any, index: number) => {
                        if (!page.name?.trim()) return '';
                        return `
                        <div class="detail-item">
                            <div class="detail-label">${t('wizard.hardcodedTexts.summary.page')} ${index + 1}: ${page.name}</div>
                            ${page.content ? `<div class="detail-value">${page.content}</div>` : ''}
                            ${page.characteristic ? `<div class="detail-value"><strong>${t('wizard.hardcodedTexts.summary.characteristics')}:</strong> ${page.characteristic}</div>` : ''}
                        </div>
                        `;
                      })
                      .join('')}

            </div>
            `
                : ''
            }
            
            ${
              config.formFields && config.formFields.length > 0
                ? `
            <div class="section">
                <div class="section-header">${t('wizard.hardcodedTexts.summary.formFields')}</div>
                <div class="detail-grid">
                    ${config.formFields
                      .map((field: any) => {
                        if (!field.name?.trim()) return '';
                        const fieldType = formFieldTypes.find((f) => f.id === field.type);
                        return `
                        <div class="detail-item">
                            <div class="detail-label">${field.name} (${fieldType ? t(fieldType.title) : field.type})</div>
                            <div class="detail-value">${field.required ? t('wizard.hardcodedTexts.summary.required') : t('wizard.hardcodedTexts.summary.optional')}</div>
                        </div>
                        `;
                      })
                      .join('')}
                </div>
            </div>
            `
                : ''
            }
            
            ${
              config.projectType !== 'freestyle' && (config.primaryColour || config.desiredFont || config.customFont)
                ? `
            <div class="section">
                <div class="section-header">${t('wizard.hardcodedTexts.summary.design')}</div>
                <div class="detail-grid">
                    ${
                      config.primaryColour
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.primaryColor')}</div>
                        <div class="detail-value">${config.primaryColour} <span class="color-box" style="background:${config.primaryColour}"></span></div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.secondaryColour
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.secondaryColor')}</div>
                        <div class="detail-value">${config.secondaryColour} <span class="color-box" style="background:${config.secondaryColour}"></span></div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.accentColour
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.accentColor')}</div>
                        <div class="detail-value">${config.accentColour} <span class="color-box" style="background:${config.accentColour}"></span></div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.customFont || config.desiredFont
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.font')}</div>
                        <div class="detail-value">${config.customFont || config.desiredFont}</div>
                    </div>
                    `
                        : ''
                    }
                </div>
            </div>
            `
                : ''
            }
            
            ${
              uploadedFiles && uploadedFiles.length > 0
                ? `
            <div class="section">
                <div class="section-header">${t('wizard.hardcodedTexts.summary.uploadedFiles')}</div>
                <div class="detail-grid">
                    ${uploadedFiles
                      .map(
                        (file: any) => `
                        <div class="detail-item">
                            <div class="detail-label">${file.name}</div>
                            <div class="detail-value">${Math.round(file.size / 1024)}KB</div>
                        </div>
                    `
                      )
                      .join('')}
                </div>
            </div>
            `
                : ''
            }
            
            ${
              customerData && (customerData.givenName || customerData.familyName || customerData.email)
                ? `
            <div class="section">
                <div class="section-header">${t('wizard.hardcodedTexts.summary.contactInformation')}</div>
                <div class="detail-grid">
                    ${
                      customerData.salutation
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.salutation')}</div>
                        <div class="detail-value">${customerData.salutation}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      customerData.givenName || customerData.familyName
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.name')}</div>
                        <div class="detail-value">${(customerData.givenName || '') + ' ' + (customerData.familyName || '')}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      customerData.email
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.email')}</div>
                        <div class="detail-value">${customerData.email}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      customerData.phone
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.phone')}</div>
                        <div class="detail-value">${customerData.phone}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      customerData.company
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">${t('wizard.hardcodedTexts.summary.company')}</div>
                        <div class="detail-value">${customerData.company}</div>
                    </div>
                    `
                        : ''
                    }
                </div>
            </div>
            `
                : ''
            }
        </div>
        
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-logo">raspb &copy;</div>
                <div class="footer-info">
                    ${t('wizard.hardcodedTexts.summary.createdOn')} ${new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'de-DE')} | raspb Webservices | www.raspb.de
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
    `;
}
