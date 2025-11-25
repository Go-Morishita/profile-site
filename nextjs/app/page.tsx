import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

async function getBlogPosts(): Promise<BlogPost[] | null> {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const endpoint = process.env.MICROCMS_ENDPOINT || "blog";

  if (!serviceDomain || !apiKey) return null;

  const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}?limit=5`;
  try {
    const res = await fetch(url, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      console.error("microCMS fetch failed", res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    return Array.isArray(data?.contents) ? data.contents : null;
  } catch (error) {
    console.error("microCMS fetch error", error);
    return null;
  }
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));

export default async function Home() {
  const blogPosts = await getBlogPosts();
  const timeline = [
    {
      period: "Sep 2025 – Present",
      title: "Student Internship · VirtualTech Japan",
      detail: "Hybrid / Tokyo — Docker, Kubernetes. Learning containerized delivery with Next.js.",
    },
    {
      period: "Oct 2024 – Present",
      title: "Student Internship · Comsquare",
      detail: "Hybrid / Tokyo — Python, IaC, automation.",
    },
    {
      period: "Jan 2025 – Jul 2025",
      title: "Vice Representative · ROLEE (Self-employed)",
      detail: "Next.js and Google Apps Script; led small delivery squads.",
    },
    {
      period: "Mar 2024 – Oct 2024",
      title: "Project Leader · Logicode",
      detail: "Next.js projects; coordinated team delivery.",
    },
    {
      period: "Aug 2024 – Sep 2024",
      title: "Student Internship · SKY Inc.",
      detail: "On-site / Tokyo — Next.js feature delivery.",
    },
  ];

  const education = [
    {
      period: "Apr 2025 – Mar 2028",
      title: "Master of Technology, Computer Science — Aoyama Gakuin University",
      detail: "CG Lab (Aoyama Graphics Group). Focus on optimization and realistic rendering.",
    },
    {
      period: "Apr 2022 – Mar 2026",
      title: "Bachelor of Technology, Computer Science — Aoyama Gakuin University",
      detail: "GPA 3.6/4.0. Swim Team (AGUST), CG Lab.",
    },
  ];

  const certifications = [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issued: "Issued Mar 2025 · Expires Mar 2028",
      credential: "Credential ID 4392ae80de6f418a81d5def9fec60df9",
      link: "https://cp.certmetrics.com/amazon/en/public/verify/credential/4392ae80de6f418a81d5def9fec60df9",
    },
  ];

  const skills = [
    {
      label: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Storybook"],
    },
    {
      label: "Backend / Infra",
      items: ["Python", "Node.js", "Docker", "Kubernetes", "IaC / Terraform"],
    },
    {
      label: "Workflow",
      items: ["CI/CD", "Performance tuning", "Accessibility", "AWS", "Google Apps Script"],
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950/70 text-neutral-50">
      <div className="pointer-events-none fixed inset-0 z-0 animated-gradient" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-10 px-6 pb-16 pt-12 md:gap-12 md:pb-24 md:pt-16">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-sm font-semibold">
              GM
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-50">Go Morishita</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                full-stack engineer
              </p>
            </div>
          </div>
          <a
            href="mailto:go.morishita.dev@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-200"
          >
            Email
            <span aria-hidden className="text-lg leading-none">↗</span>
          </a>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] text-neutral-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Tokyo / Remote
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Hello!! こんにちは!<br />I&apos;m Go Morishita.
              </h1>
              <p className="max-w-2xl text-lg text-neutral-300 italic">
                “恩は石に刻め, 恨みは水に流せ”
              </p>
              <p className="max-w-2xl text-lg text-neutral-300">
                I believe that any modern system should be operated on the cloud—whether it’s AWS, Azure, or GCP—and I aim to enrich the world by empowering people and organizations through cloud technology.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:go.morishita.dev@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5"
              >
                Email me
                <span aria-hidden>→</span>
              </a>
              <a
                href="#timeline"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-neutral-100 transition hover:-translate-y-0.5"
              >
                View timeline
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-2">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-800">
                <Image
                  src="/profile.jpg"
                  alt="Go Morishita portrait"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-white/10 bg-neutral-900/70 p-6" id="about">
          <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
            About
          </p>
          <p className="text-neutral-200">
            Driven by my passion for creating value through technology, I have built full-stack experience across frontend development, backend systems, infrastructure, and cloud-native architectures. Alongside this engineering work, I am conducting computer graphics research at Aoyama Gakuin University, aiming to publish at SIGGRAPH with a focus on particle distributions, rendering methods, and numerical optimization. I am also deeply interested in machine learning and cloud computing, and I enjoy integrating these domains to design practical, scalable systems. Ultimately, I hope to enrich the world through cloud technology by empowering people and organizations to build and operate better systems with greater efficiency and impact.
          </p>
        </section>

        <section id="timeline" className="space-y-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
              Timeline
            </p>
            <h2 className="text-2xl font-semibold text-neutral-50">Experience</h2>
          </div>
          <div className="relative space-y-6">
            <div className="pointer-events-none absolute left-3 top-4 bottom-4 w-px bg-white/10 md:left-4" />
            {timeline.map((item) => (
              <div
                key={item.title}
                className="relative grid gap-2 rounded-xl border border-white/5 bg-neutral-900/70 p-4 md:grid-cols-[150px_1fr] md:items-start"
              >
                <div className="flex items-center gap-2 text-sm text-neutral-400 md:justify-start">
                  <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-cyan-400/80 ring-4 ring-neutral-900/70 md:ml-[-6px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                  </span>
                  <span className="pl-1">{item.period}</span>
                </div>
                <div className="md:pl-2">
                  <p className="text-base font-semibold text-neutral-50">
                    {item.title}
                  </p>
                  <p className="text-sm text-neutral-300">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="space-y-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
              Education
            </p>
            <h2 className="text-2xl font-semibold text-neutral-50">Schools</h2>
          </div>
          <div className="space-y-4">
            {education.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-neutral-900/70 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-neutral-400">
                  <span>{item.period}</span>
                </div>
                <p className="mt-1 text-base font-semibold text-neutral-50">
                  {item.title}
                </p>
                <p className="text-sm text-neutral-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="space-y-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
              Certifications
            </p>
            <h2 className="text-2xl font-semibold text-neutral-50">Credentials</h2>
          </div>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-1 rounded-xl border border-white/10 bg-neutral-900/70 px-4 py-3 transition hover:-translate-y-0.5 hover:border-cyan-300/50"
              >
                <div className="flex items-center justify-between text-sm text-neutral-400">
                  <span>{cert.issuer}</span>
                  <span className="text-[12px] uppercase tracking-[0.16em] text-cyan-200">
                    AWS
                  </span>
                </div>
                <p className="text-base font-semibold text-neutral-50">
                  {cert.title}
                </p>
                <p className="text-sm text-neutral-300">{cert.issued}</p>
                <p className="text-xs text-neutral-400">{cert.credential}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="skills" className="space-y-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
              Skills
            </p>
            <h2 className="text-2xl font-semibold text-neutral-50">What I use</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {skills.map((group) => (
              <div
                key={group.label}
                className="rounded-xl border border-white/10 bg-neutral-900/70 p-4"
              >
                <p className="text-sm font-semibold text-neutral-100">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-neutral-300">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 px-3 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="blog" className="space-y-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
              Blog
            </p>
            <h2 className="text-2xl font-semibold text-neutral-50">Latest notes</h2>
          </div>
          {blogPosts && blogPosts.length > 0 ? (
            <div className="grid gap-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group rounded-2xl border border-white/10 bg-neutral-900/70 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
                >
                  <div className="flex items-center justify-between text-sm text-neutral-400">
                    <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-neutral-300 transition group-hover:border-cyan-300/40 group-hover:text-cyan-100">
                      Read
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-neutral-50">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4 text-sm text-neutral-400">
              Blog feed not available. Set MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY, and optional MICROCMS_ENDPOINT.
            </div>
          )}
        </section>

        <section id="links" className="space-y-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
              Links
            </p>
            <h2 className="text-2xl font-semibold text-neutral-50">Elsewhere</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { label: "Resume (PDF)", href: "/Go-Morishita_Resume.pdf", handle: "download" },
              { label: "CV (Notion)", href: "https://www.notion.so/your-cv-link", handle: "view" },
              { label: "GitHub", href: "https://github.com/Go-Morishita", handle: "@gomorishita" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/gomorishita", handle: "/in/gomorishita" },
              { label: "X (Twitter)", href: "https://x.com/gomorishita", handle: "@gomorishita" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:-translate-y-0.5 hover:border-cyan-300/50"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-xs uppercase tracking-wide">
                    {link.label.slice(0, 2)}
                  </span>
                  <span>{link.label}</span>
                </span>
                <span className="flex items-center gap-2 text-neutral-400">
                  {link.handle}
                  <span aria-hidden>↗</span>
                </span>
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
