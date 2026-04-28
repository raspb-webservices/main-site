import { getAllPosts } from '$lib/blog.server';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = () => {
  const posts = getAllPosts();
  return { posts };
};
