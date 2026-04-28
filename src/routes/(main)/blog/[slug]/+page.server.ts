import { getPost } from '$lib/blog.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = ({ params }) => {
  const post = getPost(params.slug);
  if (!post) {
    error(404, { message: 'Artikel nicht gefunden' });
  }
  return { post };
};
