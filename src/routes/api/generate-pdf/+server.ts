import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { projectTypes, subTypes, availableFeatures, formFieldTypes } from '$lib/components/wizard/wizard-config';

export const POST: RequestHandler = async ({ request }) => {
  console.log('🚀 PDF Generation API called');
  console.log('📅 Timestamp:', new Date().toISOString());
  console.log('🌍 Environment:', process.env.NODE_ENV);
  console.log('💻 Platform:', process.platform);
  console.log('🏗️ Architecture:', process.arch);

  let browser;
  try {
    console.log('📥 Parsing request body...');
    const requestBody = await request.json();
    const { config, customerData, uploadedFiles, customFeatures, filename } = requestBody;

    console.log('✅ Request body parsed successfully');
    console.log('📋 Config keys:', Object.keys(config || {}));
    console.log('👤 Customer data keys:', Object.keys(customerData || {}));
    console.log('📁 Uploaded files count:', uploadedFiles?.length || 0);
    console.log('🎯 Custom features length:', customFeatures?.length || 0);
    console.log('📄 Filename:', filename);

    console.log('🏗️ Generating HTML content...');
    const htmlContent = generateHTMLContent(config, customerData, uploadedFiles, customFeatures);
    console.log('✅ HTML content generated, length:', htmlContent.length);

    // Detect environment and configure Puppeteer accordingly
    const isLocal = process.env.NETLIFY_LOCAL === 'true' || process.env.NETLIFY_DEV === 'true' || process.env.NODE_ENV === 'development';
    console.log('🔍 Environment detection:', { isLocal, NETLIFY_LOCAL: process.env.NETLIFY_LOCAL, NETLIFY_DEV: process.env.NETLIFY_DEV, NODE_ENV: process.env.NODE_ENV });

    console.log('📦 Loading Puppeteer modules...');
    const puppeteer = isLocal ? (await import('puppeteer')).default : (await import('puppeteer-core')).default;
    const chromium = isLocal ? null : (await import('@sparticuz/chromium')).default;
    console.log('✅ Puppeteer modules loaded successfully');

    console.log('🚀 Launching Puppeteer browser...');
    const launchOptions = isLocal ? {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    } : {
      args: chromium.args,
      defaultViewport: { width: 1280, height: 720 },
      executablePath: await chromium.executablePath(),
      headless: true
    };
    
    console.log('🔧 Launch options:', launchOptions);
    browser = await puppeteer.launch(launchOptions);
    console.log('✅ Browser launched successfully');

    console.log('📄 Creating new page...');
    const page = await browser.newPage();
    console.log('✅ Page created successfully');

    console.log('🎨 Setting page content and waiting for network idle...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    console.log('✅ Page content set successfully');

    console.log('📊 Generating PDF...');
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
    console.log('✅ PDF generated successfully, buffer size:', pdfBuffer.length);

    console.log('🔒 Closing browser...');
    await browser.close();
    console.log('✅ Browser closed successfully');

    console.log('📤 Returning PDF response...');
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

    const possibleCauses = isPuppeteerError
      ? ['Missing Chrome/Chromium dependencies', 'Insufficient memory', 'Sandbox restrictions', 'Network connectivity issues']
      : [];

    console.error('❌ PDF generation error occurred:');
    console.error('🔍 Error name:', errorInfo.name);
    console.error('💬 Error message:', errorInfo.message);
    console.error('📚 Error stack:', errorInfo.stack);
    console.error('🔧 Error details:', errorInfo.details);

    console.error('🌍 Environment details:');
    console.error('  - NODE_ENV:', environmentInfo.NODE_ENV);
    console.error('  - Platform:', environmentInfo.platform);
    console.error('  - Architecture:', environmentInfo.architecture);
    console.error('  - Node version:', environmentInfo.nodeVersion);
    console.error('  - Memory usage:', environmentInfo.memoryUsage);

    if (isPuppeteerError) {
      console.error('🤖 This appears to be a Puppeteer/Browser related error');
      console.error('💡 Possible causes:', possibleCauses);
    }

    return json(
      {
        error: 'PDF generation failed (api)',
        timestamp: new Date().toISOString(),
        errorInfo,
        environmentInfo,
        isPuppeteerError,
        possibleCauses,
        debugInfo: {
          message: 'Detailed error information for debugging',
          serverLogs: 'Check server console for additional details'
        }
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
};

function generateHTMLContent(config: any, customerData: any, uploadedFiles: any[], customFeatures: string): string {
  const projectType = projectTypes.find((p) => p.id === config.projectType);
  const subType = subTypes.find((s) => s.id === config.subType && s.parentId === config.projectType);

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
            <div class="date">Erstellt am ${new Date().toLocaleDateString('de-DE')}</div>
            <div class="header-content">
                <div class="logo">raspb Webservices</div>
                <div class="subtitle">Ihre Projekt Konfiguration</div>
            </div>
        </header>
        
        <div class="content">
            <!-- Project Overview -->
            <div class="project-overview">
                <div class="project-name">
                    <span class="gradient-text">${config.name || 'Unbenanntes Projekt'}</span>
                </div>
                <div class="project-type">
                    ${projectType?.title}${subType ? ` - ${subType.title}` : ''}
                </div>
                ${
                  config.estimatedPrice > 0
                    ? `
                <div class="price-highlight">
                    <div class="price">${config.estimatedPrice.toLocaleString()}€</div>
                    <div class="price-label">Geschätzter Preis</div>
                </div>
                `
                    : ''
                }
            </div>
            
            ${
              config.description
                ? `
            <div class="section">
                <div class="section-header">Projektbeschreibung</div>
                <div class="detail-value add-padding">${config.description}</div>
            </div>
            `
                : ''
            }
            
            <!-- Project Details -->
            <div class="section">
                <div class="section-header">Projekt Details</div>
                <div class="detail-grid">
                    ${
                      config.targetAudience
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Zielgruppe</div>
                        <div class="detail-value">${config.targetAudience}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.goals
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Hauptziele</div>
                        <div class="detail-value">${config.goals}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.desiredDomain
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Gewünschte Domain</div>
                        <div class="detail-value">${config.desiredDomain}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.domainStatus
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Domain-Status</div>
                        <div class="detail-value">${config.domainStatus}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.timeline
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Zeitrahmen</div>
                        <div class="detail-value">${config.timeline}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.budget
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Budget</div>
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
                <div class="section-header">Gewählte Features</div>
                <div class="features-grid">
                    ${config.features
                      .map((featureId: string) => {
                        const feature = availableFeatures.find((f) => f.name === featureId);
                        return feature
                          ? `
                        <div class="feature-item">
                            <div class="feature-title">${feature.title}</div>
                            ${feature.description ? `<div class="feature-description">${feature.description}</div>` : ''}
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
                    <div class="detail-label">Weitere Features</div>
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
                <div class="section-header">Seiten/Bereiche</div>

                    ${config.pages
                      .map((page: any, index: number) => {
                        if (!page.name?.trim()) return '';
                        return `
                        <div class="detail-item">
                            <div class="detail-label">Seite ${index + 1}: ${page.name}</div>
                            ${page.content ? `<div class="detail-value">${page.content}</div>` : ''}
                            ${page.characteristic ? `<div class="detail-value"><strong>Besonderheiten:</strong> ${page.characteristic}</div>` : ''}
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
                <div class="section-header">Formular-Felder</div>
                <div class="detail-grid">
                    ${config.formFields
                      .map((field: any) => {
                        if (!field.name?.trim()) return '';
                        const fieldType = formFieldTypes.find((f) => f.id === field.type);
                        return `
                        <div class="detail-item">
                            <div class="detail-label">${field.name} (${fieldType?.title || field.type})</div>
                            <div class="detail-value">${field.required ? 'Pflichtfeld' : 'Optional'}</div>
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
              config.projectType !== 'individual' && (config.primaryColour || config.desiredFont || config.customFont)
                ? `
            <div class="section">
                <div class="section-header">Design</div>
                <div class="detail-grid">
                    ${
                      config.primaryColour
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Primärfarbe</div>
                        <div class="detail-value">${config.primaryColour} <span class="color-box" style="background:${config.primaryColour}"></span></div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.secondaryColour
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Sekundärfarbe</div>
                        <div class="detail-value">${config.secondaryColour} <span class="color-box" style="background:${config.secondaryColour}"></span></div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.accentColour
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Akzentfarbe</div>
                        <div class="detail-value">${config.accentColour} <span class="color-box" style="background:${config.accentColour}"></span></div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      config.customFont || config.desiredFont
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Schriftart</div>
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
                <div class="section-header">Hochgeladene Dateien</div>
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
                <div class="section-header">Kontaktinformationen</div>
                <div class="detail-grid">
                    ${
                      customerData.salutation
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Anrede</div>
                        <div class="detail-value">${customerData.salutation}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      customerData.givenName || customerData.familyName
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Name</div>
                        <div class="detail-value">${(customerData.givenName || '') + ' ' + (customerData.familyName || '')}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      customerData.email
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">E-Mail</div>
                        <div class="detail-value">${customerData.email}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      customerData.phone
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Telefon</div>
                        <div class="detail-value">${customerData.phone}</div>
                    </div>
                    `
                        : ''
                    }
                    ${
                      customerData.company
                        ? `
                    <div class="detail-item">
                        <div class="detail-label">Unternehmen</div>
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
                    Erstellt am ${new Date().toLocaleDateString('de-DE')} | raspb Webservices | www.raspb.de
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
    `;
}
