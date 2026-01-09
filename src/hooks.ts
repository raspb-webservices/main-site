import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';
import type { Transport } from '@sveltejs/kit';

export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname;
export const transport: Transport = {};
