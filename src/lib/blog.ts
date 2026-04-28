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

export function getAllPosts(): Post[] {
  const modules = import.meta.glob('/src/content/blog/*.svx', { eager: true });
  const posts: Post[] = [];

  for (const path in modules) {
    const mod = modules[path] as { metadata: PostMeta };
    if (mod.metadata?.published !== false) {
      posts.push(mod.metadata as Post);
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
