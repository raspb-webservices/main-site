import type { PageServerLoad } from './$types';
import { type PostMeta, resolveCoverImage } from '$lib/blog';

export const prerender = true;

export const load: PageServerLoad = async () => {
  const modules = import.meta.glob('/src/content/blog/*.svx', { eager: true });
  const posts: PostMeta[] = [];

  for (const path in modules) {
    const mod = modules[path] as { metadata: PostMeta };
    if (mod.metadata?.published !== false) {
      posts.push({ ...mod.metadata, coverImage: resolveCoverImage(mod.metadata.coverImage) });
    }
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
};
