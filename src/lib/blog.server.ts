import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

export interface Post {
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
}

export interface PostWithContent extends Post {
  content: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string | boolean>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const frontmatter = match[1];
  const body = match[2];
  const data: Record<string, string | boolean> = {};

  for (const line of frontmatter.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx < 0) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else data[key] = value;
  }

  return { data, body };
}

const POSTS_DIR = path.join(process.cwd(), 'src', 'posts');

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const { data } = parseFrontmatter(raw);
      return data as unknown as Post;
    })
    .filter((p) => p.published);

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): PostWithContent | null {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    if (data.slug === slug && data.published) {
      return {
        ...(data as unknown as Post),
        content: md.render(body)
      };
    }
  }

  return null;
}
