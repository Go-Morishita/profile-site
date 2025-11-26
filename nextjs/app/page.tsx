import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./components/FadeIn";

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
      period: "Apr 2026 – Mar 2028",
      title: "Master of Technology, Computer Science — Aoyama Gakuin University",
      detail: "CG Lab (Aoyama Graphics Group). Focus on optimization and realistic rendering.",
      iconPath: "/agu-logo.png",
    },
    {
      period: "Apr 2022 – Mar 2026",
      title: "Bachelor of Technology, Computer Science — Aoyama Gakuin University",
      detail: "GPA 3.6/4.0. Swim Team (AGUST), CG Lab(Aoyama Graphics Group).",
      iconPath: "/agu-logo.png",
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
      label: "Application Development",
      items: ["Next.js", "TypeScript", "Python"],
    },
    {
      label: "Cloud & Infrastructure",
      items: ["AWS", "Terraform", "Docker", "Kubernetes"],
    },
    {
      label: "Other Skills",
      items: ["CI/CD", "Google Apps Script", "Rendering", "Optimization"],
    },
  ];

  const projects = [
    {
      title: "ABS Equipment Management System",
      description: "As Project Manager, I developed the equipment management system for the Broadcasting Club at Aoyama Gakuin University.",
      links: [
        { label: "Code", href: "https://github.com/daichi0812/abs-ems" }
      ],
    },
    {
      title: "ROLEE Official Site",
      description: "I developed the official website for ROLEE Inc. I utilized Three.js and Framer Motion to create a modern appearance.",
      links: [
        { label: "Link", href: "https://www.rolee.co.jp/" }
      ],
    },
    {
      title: "LingoAI",
      description: "I created an application that enables multilingual conversations with AI by combining an LLM API with a text-to-speech synthesis API.",
      links: [
        { label: "Link", href: "https://gogo-lingoai.vercel.app/" }
      ],
    },
    {
      title: "Mail Generator",
      description: "I created an application that can generate formal email content from casual text.",
      links: [
        { label: "Link", href: "https://mail-generator.logicode.tech/" },
        { label: "Code", href: "https://github.com/Go-Morishita/mail-master" },
      ],
    },
    {
      title: "Helplee",
      description: "I have developed an application that generates and saves CSS with intuitive operation. I won the corporate award at the Supporters Hackathon with this application.",
      links: [
        { label: "Link", href: "https://helplee2.vercel.app/" },
        { label: "Code", href: "https://github.com/balckowl/helplee2" },
      ],
    },
  ];
  const cloudLogos = [
    { label: "AWS", src: "/aws.svg", bg: "bg-white/90" },
    { label: "GCP", src: "/google-cloud.svg", bg: "bg-white/90" },
    { label: "Azure", src: "/microsoft-azure.svg", bg: "bg-white/90" },
  ];

  const links = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/go-morishita", handle: "go-morishita", iconPath: "/linkedin-icon.svg" },
    { label: "GitHub", href: "https://github.com/Go-Morishita", handle: "Go-Morishita", iconPath: "/github-icon.svg" },
    { label: "Zenn", href: "https://zenn.dev/go_morishita", handle: "go_morishita" },
    { label: "CV", href: "https://www.notion.so/your-cv-link", handle: "Notion" },
  ];
  const defaultLinkIcon = "/file.svg";

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950/70 text-neutral-50">
      <div className="pointer-events-none fixed inset-0 z-0 animated-gradient" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-10 px-6 pb-16 pt-12 md:gap-12 md:pb-24 md:pt-16">
        <FadeIn>
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10 bg-neutral-800/80 ring-2 ring-cyan-400/30">
                <Image
                  src="/profile.jpg"
                  alt="Go Morishita avatar"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                  priority
                />
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
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-200"
            >
              Email
              <span aria-hidden className="text-lg leading-none">↗</span>
            </a>
          </header>
        </FadeIn>

        <section className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <FadeIn className="space-y-6">
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
                I believe the cloud is a form of “technological democratization” that empowers anyone to take on new challenges.<br />With low costs, easy scalability, and fast development, the cloud accelerates ideas and enables more people to experiment and grow freely.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {cloudLogos.map((cloud) => (
                <div
                  key={cloud.label}
                  className={`flex h-10 w-14 items-center justify-center rounded-lg border border-white/10 px-2 py-1 ${cloud.bg ?? "bg-neutral-900/70"}`}
                >
                  <Image
                    src={cloud.src}
                    alt={`${cloud.label} logo`}
                    width={48}
                    height={24}
                    className="h-6 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:-translate-y-0.5"
              >
                Blog
                <span aria-hidden>→</span>
              </Link>
              <a
                href="#timeline"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm font-semibold text-neutral-100 transition hover:-translate-y-0.5"
              >
                View Experience
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="flex justify-center">
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
          </FadeIn>
        </section>

        <section id="about">
          <FadeIn className="space-y-4 rounded-2xl border border-white/10 bg-neutral-900/70 p-6">
            <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
              About
            </p>
            <p className="text-neutral-200">
              Driven by my passion for creating value through technology, I have built full-stack experience across frontend development, backend systems, infrastructure, and cloud-native architectures. Alongside this engineering work, I am conducting computer graphics research at Aoyama Gakuin University, aiming to publish at SIGGRAPH with a focus on particle distributions, rendering methods, and numerical optimization. I am also deeply interested in machine learning and cloud computing, and I enjoy integrating these domains to design practical, scalable systems. Ultimately, I hope to enrich the world through cloud technology by empowering people and organizations to build and operate better systems with greater efficiency and impact.
            </p>
          </FadeIn>
        </section>

        <section id="timeline" className="space-y-4">
          <FadeIn>
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                Timeline
              </p>
              <h2 className="text-2xl font-semibold text-neutral-50">Experience</h2>
            </div>
          </FadeIn>
          <div className="relative space-y-6">
            <div className="pointer-events-none absolute left-[22px] top-4 bottom-4 w-px bg-white/10" />
            {timeline.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 0.05}
                className="relative grid gap-2 rounded-xl border border-white/5 bg-neutral-900/70 p-4 md:grid-cols-[150px_1fr] md:items-start"
              >
                <div className="flex items-center gap-2 text-sm text-neutral-400 md:justify-start">
                  <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-cyan-400/80 ring-4 ring-neutral-900/70">
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
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="education" className="space-y-4">
          <FadeIn>
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                Education
              </p>
              <h2 className="text-2xl font-semibold text-neutral-50">Schools</h2>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {education.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 0.05}
                className="rounded-xl border border-white/10 bg-neutral-900/70 p-4"
              >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-neutral-400">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-neutral-900">
                      {item.iconPath ? (
                        <Image
                          src={item.iconPath}
                          alt={`${item.title} logo`}
                          width={36}
                          height={36}
                          className="h-full w-full object-contain p-0.5"
                        />
                      ) : (
                        <div className="text-[10px] font-semibold uppercase text-neutral-200">
                          EDU
                        </div>
                      )}
                    </div>
                    <span>{item.period}</span>
                  </div>
                </div>
                <p className="mt-1 text-base font-semibold text-neutral-50">
                  {item.title}
                </p>
                <p className="text-sm text-neutral-300">{item.detail}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="certifications" className="space-y-4">
          <FadeIn>
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                Certifications
              </p>
              <h2 className="text-2xl font-semibold text-neutral-50">Credentials</h2>
            </div>
          </FadeIn>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <FadeIn key={cert.title} className="group">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-1 rounded-xl border border-white/10 bg-neutral-900/70 px-4 py-3 transition hover:-translate-y-0.5 hover:border-cyan-300/50"
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
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="skills" className="space-y-4">
          <FadeIn>
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                Skills
              </p>
              <h2 className="text-2xl font-semibold text-neutral-50">What I use</h2>
            </div>
          </FadeIn>
          <div className="grid gap-4 md:grid-cols-3">
            {skills.map((group, index) => (
              <FadeIn
                key={group.label}
                delay={index * 0.05}
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
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-4">
          <FadeIn>
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                Projects
              </p>
              <h2 className="text-2xl font-semibold text-neutral-50">Works</h2>
            </div>
          </FadeIn>
          {projects && projects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project, index) => (
                <FadeIn
                  key={project.title}
                  delay={index * 0.05}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900/70 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-lg font-semibold text-neutral-50">
                        {project.title}
                      </p>
                      <p className="mt-1 text-sm text-neutral-300">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  {project.links && project.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-neutral-100 transition hover:-translate-y-0.5 hover:border-cyan-300/50"
                        >
                          {link.label}
                          <span aria-hidden>↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4 text-sm text-neutral-400">
              Projects not available. Add project entries to the list in app/page.tsx.
            </FadeIn>
          )}
        </section>

        <section id="blog" className="space-y-4">
          <FadeIn>
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                Blog
              </p>
              <h2 className="text-2xl font-semibold text-neutral-50">Latest notes</h2>
            </div>
          </FadeIn>
          {blogPosts && blogPosts.length > 0 ? (
            <div className="grid gap-3">
              {blogPosts.map((post) => (
                <FadeIn key={post.id} className="w-full">
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
                    <h3 className="mt-2 text-lg font-semibold text-neutral-50">
                      {post.title}
                    </h3>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn className="w-full rounded-2xl border border-white/10 bg-neutral-900/60 p-4 text-sm text-neutral-400">
              Blog feed not available. Set MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY, and optional MICROCMS_ENDPOINT.
            </FadeIn>
          )}
        </section>

        <section id="links" className="space-y-4">
          <FadeIn>
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-neutral-500">
                Links
              </p>
              <h2 className="text-2xl font-semibold text-neutral-50">Social Media</h2>
            </div>
          </FadeIn>
          <div className="grid gap-3 md:grid-cols-2">
            {links.map((link) => (
              <FadeIn key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:-translate-y-0.5 hover:border-cyan-300/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-xs uppercase tracking-wide">
                      <Image
                        src={link.iconPath ?? defaultLinkIcon}
                        alt={`${link.label} logo`}
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </span>
                    <span>{link.label}</span>
                  </span>
                  <span className="flex items-center gap-2 text-neutral-400">
                    {link.handle}
                    <span aria-hidden>↗</span>
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
