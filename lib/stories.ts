import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export interface StoryMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  related: string[];
}

const DIR = join(process.cwd(), "content/stories");

export function getStories(): StoryMeta[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => getStory(f.replace(/\.mdx$/, ""))!.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getStory(slug: string): { meta: StoryMeta; content: string } | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const raw = readFileSync(join(DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    const words = content.split(/\s+/).length;
    return {
      meta: {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category: data.category,
        image: data.image,
        imageAlt: data.imageAlt ?? "",
        related: data.related ?? [],
        readingMinutes: Math.max(2, Math.round(words / 220)),
      },
      content,
    };
  } catch {
    return null;
  }
}
