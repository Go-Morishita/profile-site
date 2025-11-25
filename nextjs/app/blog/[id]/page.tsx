import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));

async function getBlogPost(id: string): Promise<BlogPost | null> {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const endpoint = process.env.MICROCMS_ENDPOINT || "blog";

  if (!serviceDomain || !apiKey) return null;

  const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}/${id}`;

  try {
    const res = await fetch(url, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

async function getBlogIds(): Promise<string[]> {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const endpoint = process.env.MICROCMS_ENDPOINT || "blog";

  if (!serviceDomain || !apiKey) return [];

  const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}?fields=id&limit=50`;

  try {
    const res = await fetch(url, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data?.contents)) return [];
    return data.contents.map((item: { id: string }) => item.id);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const ids = await getBlogIds();
  return ids.map((id) => ({ id }));
}

export const dynamicParams = false;

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getBlogPost(params.id);
  if (!post) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950/70 text-neutral-50">
      <div className="pointer-events-none fixed inset-0 z-0 animated-gradient" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-8 px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-neutral-300">
            <Link
              href="/"
              className="rounded-full border border-white/10 px-3 py-1 transition hover:border-cyan-300/50 hover:text-cyan-100"
            >
              ← Back
            </Link>
            <span className="text-neutral-500">Blog</span>
          </div>
          <span className="text-sm text-neutral-400">
            {formatDate(post.publishedAt || post.createdAt)}
          </span>
        </header>

        <article className="space-y-4 rounded-3xl border border-white/10 bg-neutral-900/70 p-6">
          <h1 className="text-3xl font-semibold leading-tight text-neutral-50 md:text-4xl">
            {post.title}
          </h1>
          <div
            className="space-y-4 text-neutral-200 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </main>
  );
}
