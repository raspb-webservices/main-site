export interface PostMeta {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
}

export interface Post extends PostMeta {
  // used for glob typing
}

const blogImages = import.meta.glob<string>(
  '/src/lib/assets/images/blog/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

export function resolveCoverImage(coverImage: string | undefined | null): string {
  if (!coverImage) return '';
  const basename = coverImage.split('/').pop();
  if (!basename) return '';
  for (const path in blogImages) {
    if (path.endsWith('/' + basename)) {
      return blogImages[path];
    }
  }
  return '';
}

export function getAllPosts(): Post[] {
  const modules = import.meta.glob('/src/content/blog/*.svx', { eager: true });
  const posts: Post[] = [];

  for (const path in modules) {
    const mod = modules[path] as { metadata: PostMeta };
    if (mod.metadata?.published !== false) {
      const meta = mod.metadata;
      posts.push({ ...meta, coverImage: resolveCoverImage(meta.coverImage) } as Post);
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
