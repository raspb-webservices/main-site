<script lang="ts">
  import type { WizardConfig } from '$interfaces/project.interface';
  import type { Customer } from '$interfaces/customer.interface';
  import { projectTypes, subTypes, availableFeatures, formFieldTypes } from './wizard-config';

  interface Props {
    config: WizardConfig;
    customerData: Partial<Customer>;
    uploadedFiles?: File[];
    customFeatures?: string;
  }

  let { config, customerData, uploadedFiles = [], customFeatures = '' }: Props = $props();

  export async function generatePDF() {
    try {
      // Generate HTML content
      const htmlContent = generateHTMLContent();

      // Send HTML to server-side PDF generation
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          html: htmlContent,
          filename: `${config.name || 'Projekt'}_Konfiguration_${new Date().toISOString().split('T')[0]}.pdf`
        })
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${config.name || 'Projekt'}_Konfiguration_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Fehler beim Erstellen des PDFs. Bitte versuchen Sie es erneut.');
    }
  }

  function generateHTMLContent(): string {
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
            font-family: 'Lato', 'Circular Std', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            color: white;
            padding: 60px 40px;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
        
        .logo {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            letter-spacing: 2px;
        }
        
        .subtitle {
            font-size: 24px;
            font-weight: 300;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        
        .date {
            font-size: 14px;
            opacity: 0.8;
            position: absolute;
            top: 40px;
            right: 40px;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
        }
        
        .section-header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            margin: -10px -10px 25px -10px;
            border-radius: 12px;
            font-size: 20px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .project-overview {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 8px 25px rgba(240, 147, 251, 0.3);
        }
        
        .project-name {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }
        
        .project-type {
            font-size: 18px;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        
        .price-highlight {
            background: rgba(255,255,255,0.2);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        
        .price {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .price-label {
            font-size: 14px;
            opacity: 0.8;
        }
        
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .detail-item {
            background: linear-gradient(135deg, #f8fafc, #e2e8f0);
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .detail-label {
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .detail-value {
            color: #2d3748;
            font-size: 16px;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .feature-item {
            background: linear-gradient(135deg, #e6fffa, #b2f5ea);
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #38b2ac;
        }
        
        .feature-title {
            font-weight: 600;
            color: #234e52;
            margin-bottom: 5px;
        }
        
        .feature-description {
            font-size: 14px;
            color: #2c7a7b;
        }
        
        .pages-list {
            display: grid;
            gap: 20px;
        }
        
        .page-item {
            background: linear-gradient(135deg, #fef5e7, #fed7aa);
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #f6ad55;
        }
        
        .page-number {
            background: #f6ad55;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            margin-right: 15px;
            font-size: 14px;
        }
        
        .page-name {
            font-weight: 600;
            color: #744210;
            margin-bottom: 10px;
            font-size: 18px;
        }
        
        .page-content {
            color: #975a16;
            margin-bottom: 10px;
        }
        
        .color-palette {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .color-item {
            text-align: center;
        }
        
        .color-swatch {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 0 auto 10px;
            border: 3px solid white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .color-label {
            font-size: 12px;
            font-weight: 600;
            color: #4a5568;
        }
        
        .color-value {
            font-size: 11px;
            color: #718096;
            font-family: monospace;
        }
        
        .files-list {
            display: grid;
            gap: 10px;
        }
        
        .file-item {
            background: linear-gradient(135deg, #e6f3ff, #cce7ff);
            padding: 15px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            border-left: 4px solid #4299e1;
        }
        
        .file-icon {
            font-size: 24px;
            margin-right: 15px;
        }
        
        .file-info {
            flex: 1;
        }
        
        .file-name {
            font-weight: 600;
            color: #2b6cb0;
            margin-bottom: 2px;
        }
        
        .file-size {
            font-size: 12px;
            color: #4299e1;
        }
        
        .contact-info {
            background: linear-gradient(135deg, #f0fff4, #c6f6d5);
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #48bb78;
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
        }
        
        .contact-label {
            font-weight: 600;
            color: #22543d;
            margin-right: 10px;
            min-width: 80px;
        }
        
        .contact-value {
            color: #2f855a;
        }
        
        .footer {
            background: linear-gradient(135deg, #2d3748, #4a5568);
            color: white;
            padding: 30px 40px;
            text-align: center;
            margin-top: 40px;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .footer-logo {
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 1px;
        }
        
        .footer-info {
            font-size: 14px;
            opacity: 0.8;
        }
        
        @media print {
            body {
                background: white;
            }
            
            .container {
                box-shadow: none;
                max-width: none;
            }
            
            .section {
                page-break-inside: avoid;
            }
            
            .header::before {
                animation: none;
            }
        }
        
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            margin: 2px;
        }
        
        .badge-primary { background: #667eea; color: white; }
        .badge-secondary { background: #764ba2; color: white; }
        .badge-success { background: #48bb78; color: white; }
        .badge-warning { background: #ed8936; color: white; }
        .badge-info { background: #4299e1; color: white; }
        .badge-error { background: #f56565; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="date">Erstellt am ${new Date().toLocaleDateString('de-DE')}</div>
            <div class="header-content">
                <div class="logo">RASPB</div>
                <div class="subtitle">Projekt Konfiguration</div>
            </div>
        </header>
        
        <div class="content">
            <!-- Project Overview -->
            <div class="project-overview">
                <div class="project-name">${config.name || 'Unbenanntes Projekt'}</div>
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
                <div class="detail-value">${config.description}</div>
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
              config.features.length > 0
                ? `
            <div class="section">
                <div class="section-header">Gewählte Features</div>
                <div class="features-grid">
                    ${config.features
                      .map((featureId) => {
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
              config.pages.length > 0
                ? `
            <div class="section">
                <div class="section-header">Seiten/Bereiche</div>
                <div class="pages-list">
                    ${config.pages
                      .map((page, index) => {
                        if (!page.name.trim()) return '';
                        return `
                        <div class="page-item">
                            <div class="page-name">
                                <span class="page-number">${index + 1}</span>
                                ${page.name}
                            </div>
                            ${
                              page.content
                                ? `
                            <div class="page-content">
                                <strong>Inhalte:</strong> ${page.content}
                            </div>
                            `
                                : ''
                            }
                            ${
                              page.characteristic
                                ? `
                            <div class="page-content">
                                <strong>Besonderheiten:</strong> ${page.characteristic}
                            </div>
                            `
                                : ''
                            }
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
              config.formFields.length > 0
                ? `
            <div class="section">
                <div class="section-header">Formular-Felder</div>
                <div class="detail-grid">
                    ${config.formFields
                      .map((field, index) => {
                        if (!field.name.trim()) return '';
                        const fieldType = formFieldTypes.find((f) => f.id === field.type);
                        return `
                        <div class="detail-item">
                            <div class="detail-label">Feld ${index + 1}</div>
                            <div class="detail-value">
                                <strong>${field.name}</strong><br>
                                <small>(${fieldType?.title || field.type})</small>
                                ${field.required ? '<span class="badge badge-warning">Pflicht</span>' : ''}
                            </div>
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
              config.projectType !== 'individual'
                ? `
            <div class="section">
                <div class="section-header">Design</div>
                <div class="color-palette">
                    <div class="color-item">
                        <div class="color-swatch" style="background-color: ${config.primaryColour}"></div>
                        <div class="color-label">Primärfarbe</div>
                        <div class="color-value">${config.primaryColour}</div>
                    </div>
                    <div class="color-item">
                        <div class="color-swatch" style="background-color: ${config.secondaryColour}"></div>
                        <div class="color-label">Sekundärfarbe</div>
                        <div class="color-value">${config.secondaryColour}</div>
                    </div>
                    <div class="color-item">
                        <div class="color-swatch" style="background-color: ${config.accentColour}"></div>
                        <div class="color-label">Akzentfarbe</div>
                        <div class="color-value">${config.accentColour}</div>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Schriftart</div>
                    <div class="detail-value" style="font-family: ${config.customFont || config.desiredFont}, sans-serif">
                        ${config.customFont || config.desiredFont || 'Nicht angegeben'}
                    </div>
                </div>
            </div>
            `
                : ''
            }
            
            ${
              uploadedFiles.length > 0
                ? `
            <div class="section">
                <div class="section-header">Hochgeladene Dateien</div>
                <div class="files-list">
                    ${uploadedFiles
                      .map(
                        (file, index) => `
                    <div class="file-item">
                        <div class="file-icon">📄</div>
                        <div class="file-info">
                            <div class="file-name">${file.name}</div>
                            <div class="file-size">${Math.round(file.size / 1024)}KB</div>
                        </div>
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
              customerData.givenName || customerData.familyName || customerData.email
                ? `
            <div class="section">
                <div class="section-header">Kontaktinformationen</div>
                <div class="contact-info">
                    <div class="contact-grid">
                        ${
                          customerData.salutation
                            ? `
                        <div class="contact-item">
                            <div class="contact-label">Anrede:</div>
                            <div class="contact-value">${customerData.salutation}</div>
                        </div>
                        `
                            : ''
                        }
                        ${
                          customerData.givenName || customerData.familyName
                            ? `
                        <div class="contact-item">
                            <div class="contact-label">Name:</div>
                            <div class="contact-value">${(customerData.givenName || '') + ' ' + (customerData.familyName || '')}</div>
                        </div>
                        `
                            : ''
                        }
                        ${
                          customerData.email
                            ? `
                        <div class="contact-item">
                            <div class="contact-label">E-Mail:</div>
                            <div class="contact-value">${customerData.email}</div>
                        </div>
                        `
                            : ''
                        }
                        ${
                          customerData.phone
                            ? `
                        <div class="contact-item">
                            <div class="contact-label">Telefon:</div>
                            <div class="contact-value">${customerData.phone}</div>
                        </div>
                        `
                            : ''
                        }
                        ${
                          customerData.company
                            ? `
                        <div class="contact-item">
                            <div class="contact-label">Unternehmen:</div>
                            <div class="contact-value">${customerData.company}</div>
                        </div>
                        `
                            : ''
                        }
                        ${
                          customerData.address || customerData.postCode || customerData.city
                            ? `
                        <div class="contact-item">
                            <div class="contact-label">Adresse:</div>
                            <div class="contact-value">
                                ${customerData.address || ''}<br>
                                ${(customerData.postCode || '') + ' ' + (customerData.city || '')}<br>
                                ${customerData.country || ''}
                            </div>
                        </div>
                        `
                            : ''
                        }
                    </div>
                </div>
            </div>
            `
                : ''
            }
        </div>
        
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-logo">RASPB</div>
                <div class="footer-info">
                    Erstellt am ${new Date().toLocaleDateString('de-DE')} | RASPB Webservices | www.raspb.de
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
    `;
  }
</script>

<!-- This component has no template - it's purely functional -->
