import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';
import { type PostMeta, resolveCoverImage } from '$lib/blog';

export const prerender = true;

export async function load({ params }: Parameters<PageLoad>[0]) {
  const slug = params.slug;
  const posts = import.meta.glob('/src/content/blog/*.svx');
  const importer = posts[`/src/content/blog/${slug}.svx`];

  if (!importer) {
    throw error(404, `Artikel "${slug}" nicht gefunden.`);
  }

  const mod = (await importer()) as { default: Component; metadata: PostMeta };

  return {
    content: mod.default,
    meta: { ...mod.metadata, coverImage: resolveCoverImage(mod.metadata.coverImage) }
  };
}
