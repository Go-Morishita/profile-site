import Link from "next/link";
import { FadeIn } from "../components/FadeIn";

type BlogPost = {
  id: string;
  title: string;
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

async function getAllBlogPosts(): Promise<BlogPost[] | null> {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const endpoint = process.env.MICROCMS_ENDPOINT || "blog";

  if (!serviceDomain || !apiKey) return null;

  const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}?limit=50`;

  try {
    const res = await fetch(url, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data?.contents) ? data.contents : null;
  } catch {
    return null;
  }
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950/70 text-neutral-50">
      <div className="pointer-events-none fixed inset-0 z-0 animated-gradient" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-16 pt-12 md:gap-10 md:pb-24 md:pt-16">
        <FadeIn>
          <header className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                Blog
              </p>
              <h1 className="text-3xl font-semibold text-neutral-50 md:text-4xl">
                All notes
              </h1>
            </div>
            <Link
              href="/"
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-neutral-200 transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:text-cyan-100"
            >
              ← Home
            </Link>
          </header>
        </FadeIn>

        {posts && posts.length > 0 ? (
          <div className="grid gap-3">
            {posts.map((post, index) => (
              <FadeIn key={post.id} delay={index * 0.04} className="w-full">
                <Link
                  href={`/blog/${post.id}`}
                  className="group block w-full rounded-2xl border border-white/10 bg-neutral-900/70 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
                >
                  <div className="flex items-center justify-between text-sm text-neutral-400">
                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-neutral-300 transition group-hover:border-cyan-300/40 group-hover:text-cyan-100">
                      Read
                    </span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-neutral-50">
                    {post.title}
                  </h2>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 p-4 text-sm text-neutral-400">
            Blog feed not available. Set MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY, and optional MICROCMS_ENDPOINT.
          </FadeIn>
        )}
      </div>
    </main>
  );
}
