<script>
  import { page } from '$app/stores';
  
  // Schema.org structured data for raspb.de
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "raspb",
    "url": "https://raspb.de",
    "logo": "https://raspb.de/logo.png",
    "description": "KI-Agenten und Business OS für KMUs. Automatisieren Sie Routineaufgaben und steigern Sie die Effizienz.",
    "foundingDate": "2007",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["German", "English"]
    },
    "sameAs": [
      "https://github.com/raspb-mac",
      "https://github.com/raspb-webservices"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "raspb - KI-Agenten & Business OS für KMUs",
    "url": "https://raspb.de",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://raspb.de/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "raspb Business OS",
    "description": "KI-gestütztes Geschäftsoperatingssystem für KMUs mit 20 spezialisierten KI-Agenten",
    "provider": {
      "@type": "Organization",
      "name": "raspb"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Germany"
    },
    "serviceType": "Business Automation",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "99",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "99",
        "priceCurrency": "EUR",
        "billingDuration": "P1M"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist das raspb Business OS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das raspb Business OS ist eine KI-gestützte Plattform, die Ihre Geschäftsprozesse automatisiert und 20 spezialisierte KI-Agenten für Routineaufgaben bereitstellt."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet das raspb Business OS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das raspb Business OS beginnt bei 99€ monatlich. Der genaue Preis hängt von den benötigten KI-Agenten und Funktionen ab."
        }
      },
      {
        "@type": "Question",
        "name": "Welche KI-Agenten bietet raspb an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "raspb bietet 20 spezialisierte KI-Agenten an, darunter Eliza (Datenerfassung), Rohan (Kundenservice), Finn (Buchhaltung), Anna (Rechtsfachkraft) und viele mehr."
        }
      },
      {
        "@type": "Question",
        "name": "Ist das raspb Business OS DSGVO-konform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, das raspb Business OS ist vollständig DSGVO-konform und hosted auf Servern in Deutschland."
        }
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "raspb",
    "image": "https://raspb.de/logo.png",
    "url": "https://raspb.de",
    "telephone": "",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.1657,
      "longitude": 10.4515
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  // Combine all schemas
  const schemas = [
    organizationSchema,
    websiteSchema,
    serviceSchema,
    faqSchema,
    localBusinessSchema
  ];
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(schemas)}</script>`}
</svelte:head>
