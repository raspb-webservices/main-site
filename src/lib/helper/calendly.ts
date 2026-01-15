import { browser } from '$app/environment';

export type CalendlyGlobal = {
  initInlineWidget: (opts: { url: string; parentElement: Element | null; prefill?: Record<string, unknown>; utm?: Record<string, string> }) => void;
  initPopupWidget: (opts: { url: string }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

let promise: Promise<CalendlyGlobal> | null = null;

export function loadCalendly(): Promise<CalendlyGlobal> {
  if (!browser) return Promise.reject(new Error('Calendly can only be loaded in the browser.'));
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (promise) return promise;

  promise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-calendly-widget="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Calendly));
      existing.addEventListener('error', reject);
      return;
    }

    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.defer = true; // optional
    s.dataset.calendlyWidget = 'true';

    s.onload = () => resolve(window.Calendly);
    s.onerror = () => reject(new Error('Failed to load Calendly widget.js'));

    document.head.appendChild(s);
  });

  return promise;
}
