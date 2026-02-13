import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

const SITE_URL = 'https://raspb.de';

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/services', priority: '0.9', changefreq: 'monthly' },
	{ path: '/about-us', priority: '0.8', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ path: '/wizard', priority: '0.8', changefreq: 'monthly' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ path: '/insights', priority: '0.7', changefreq: 'weekly' },
	{ path: '/appointment', priority: '0.6', changefreq: 'monthly' },
	{ path: '/imprint', priority: '0.3', changefreq: 'yearly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly' }
];

const locales = ['de', 'en'] as const;

const localizedPaths: Record<string, Record<string, string>> = {
	'/': { de: '/', en: '/' },
	'/services': { de: '/de/leistungsportfolio', en: '/en/services' },
	'/about-us': { de: '/de/ueber-uns', en: '/en/about-us' },
	'/contact': { de: '/de/kontakt', en: '/en/contact' },
	'/wizard': { de: '/de/projektkonfigurator', en: '/en/project-wizard' },
	'/faq': { de: '/de/haeufig-gestellte-fragen', en: '/en/frequently-asked-questions' },
	'/insights': { de: '/de/einblicke', en: '/en/insights' },
	'/appointment': { de: '/de/appointment', en: '/en/appointment' },
	'/imprint': { de: '/de/impressum', en: '/en/imprint' },
	'/privacy': { de: '/de/datenschutzhinweis', en: '/en/privacy-notice' },
	'/terms': { de: '/de/allgemeine-geschaeftsbedingungen', en: '/en/terms-and-conditions' }
};

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().split('T')[0];

	const urls = staticPages
		.map((page) => {
			const alternates = localizedPaths[page.path];
			const xhtmlLinks = alternates
				? locales
						.map(
							(locale) =>
								`    <xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${alternates[locale]}" />`
						)
						.join('\n')
				: '';

			return `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${xhtmlLinks}
  </url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
