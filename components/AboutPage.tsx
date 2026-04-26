import type { Authors } from 'contentlayer/generated'

interface Props {
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

const STACK = ['NESTJS', 'TYPESCRIPT', 'PYTHON', 'AWS', 'REACT NATIVE', 'POSTGRESQL']

const EXPERIENCE = [
  {
    title: 'KUP studio  ·  Backend Engineer',
    desc: '2026-02 — Present  ·  High-traffic adtech platform on NestJS / TypeScript / Prisma. PostgreSQL on AWS. Korean and English working environment.',
    accent: 'bg-[var(--color-cat-infra)]',
  },
  {
    title: 'Mobile Game Studio  ·  Game Developer',
    desc: '2025 — 2026  ·  Real-time networking and mobile client engineering. React Native + native bridges.',
    accent: 'bg-[var(--color-up)]',
  },
  {
    title: 'Blockchain Startup  ·  Frontend / App Engineer',
    desc: '2024 — 2025  ·  Web3 integration, React Native client, wallet connection and on-chain data flows.',
    accent: 'bg-[var(--color-cat-japan)]',
  },
]

const PROJECTS = [
  {
    title: 'AWS Live Trading System',
    desc: 'Production deployment stack: EC2 + Secrets Manager + S3 + Athena + CodePipeline + CloudWatch. Hosts the crypto and ELW bots end-to-end.',
    accent: 'bg-[var(--color-cat-infra)]',
  },
  {
    title: 'Crypto Market-Making Bot',
    desc: 'Live multi-strategy portfolio on Binance and Hyperliquid. Backtester in Python, daily PnL reconciliation, exchange-native SL/TP, daily blog log.',
    accent: 'bg-[var(--color-up)]',
  },
  {
    title: 'Korean ELW Options Bot',
    desc: 'Kiwoom API integration. Options-surface analysis and execution engine. Candidate dataset for the master-thesis research line.',
    accent: 'bg-[var(--color-cat-japan)]',
  },
]

const EDUCATION = [
  {
    title: 'B.S. in Physics',
    desc: 'Republic of Korea  ·  Foundation in probability, statistical mechanics and numerical methods that powers the quant work today.',
    accent: 'bg-[var(--color-cat-infra)]',
  },
  {
    title: 'M.S. Financial Engineering',
    desc: 'University of Tsukuba — Tokyo Bunkyo evening campus  ·  Expected 2028-04  ·  Business Sciences (Finance) track. Targeting APAC hedge-fund quant after graduation.',
    accent: 'bg-[var(--color-cat-japan)]',
  },
  {
    title: 'Languages',
    desc: 'Korean — native    ·    English — business, interview-capable    ·    Japanese — JLPT N2 target Dec 2026, N1 target 2027',
    accent: 'bg-[var(--color-up)]',
  },
]

function StackedRow({ title, desc, accent }: { title: string; desc: string; accent: string }) {
  return (
    <div className="flex items-center gap-6 py-9">
      <div className="flex flex-1 flex-col gap-1.5">
        <h3 className="font-serif text-2xl font-medium text-[var(--color-text-base)] md:text-[26px]">
          {title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-[var(--color-text-sub)]">{desc}</p>
      </div>
      <span className={`h-10 w-20 shrink-0 ${accent}`} aria-hidden />
    </div>
  )
}

function StackedSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string
  title: string
  items: typeof EXPERIENCE
}) {
  return (
    <section className="flex flex-col items-center gap-12 px-4 py-10 md:px-0">
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--color-text-sub)]">
          {eyebrow}
        </p>
        <h2 className="text-center font-serif text-[34px] leading-tight font-medium text-[var(--color-text-base)] md:text-[42px]">
          {title}
        </h2>
      </div>
      <div className="flex w-full flex-col divide-y divide-[var(--color-border-soft)]">
        {items.map((item) => (
          <StackedRow key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}

export default function AboutPage({ content }: Props) {
  const { name, email, github } = content

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center gap-7 px-4 pt-24 pb-20 text-center md:px-0">
        <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--color-text-sub)]">
          ABOUT
        </p>
        <h1 className="font-serif text-[64px] leading-none font-medium text-[var(--color-text-base)] md:text-[96px]">
          {name}
        </h1>
        <p className="font-sans text-lg text-[var(--color-text-sub)]">
          Backend Engineer · Quant Systems · Future Quant Researcher
        </p>
        <p className="max-w-[680px] font-sans text-base leading-relaxed text-[var(--color-text-sub)]">
          Full-stack engineer with 3+ years across blockchain, mobile gaming, and adtech backend.
          Physics graduate turned quant: operates live crypto and Korean ELW options bots on AWS.
          Preparing for M.S. in Financial Engineering at the University of Tsukuba (2028-04).
          Relocating to Japan via Working Holiday visa in March 2027.
        </p>
        <a
          href="#contact"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-cat-infra)] px-10 py-3.5 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Get in touch
        </a>
      </section>

      {/* Trust strip */}
      <section className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 px-4 pb-6 md:px-0">
        {STACK.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[13px] tracking-[0.18em] text-[var(--color-text-sub)]"
          >
            {tech}
          </span>
        ))}
      </section>

      <StackedSection eyebrow="EXPERIENCE" title="Where I have built things" items={EXPERIENCE} />

      <StackedSection eyebrow="PROJECTS" title="What I run in production" items={PROJECTS} />

      <StackedSection
        eyebrow="EDUCATION & LANGUAGES"
        title="Where I keep learning"
        items={EDUCATION}
      />

      {/* Footer / CTA */}
      <section
        id="contact"
        className="flex scroll-mt-24 flex-col items-center gap-7 px-4 py-24 text-center md:px-0"
      >
        <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--color-text-sub)]">
          GET IN TOUCH
        </p>
        <h2 className="font-serif text-[48px] leading-tight font-medium text-[var(--color-text-base)] md:text-[64px]">
          Let&apos;s talk
        </h2>
        <p className="max-w-[640px] font-sans text-base leading-relaxed text-[var(--color-text-sub)]">
          Open to remote part-time and contract work that overlaps with finance, fintech, or trading
          systems. Especially interested in conversations about the Tokyo / APAC remote scene.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 font-sans text-sm">
          {email && (
            <a
              href={`mailto:${email}`}
              className="font-medium text-[var(--color-text-base)] underline underline-offset-4 hover:text-[var(--color-accent)]"
            >
              {email}
            </a>
          )}
          {email && github && <span className="text-[var(--color-text-sub)]">·</span>}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--color-text-base)] underline underline-offset-4 hover:text-[var(--color-accent)]"
            >
              {github.replace('https://', '')}
            </a>
          )}
          <span className="text-[var(--color-text-sub)]">·</span>
          <a
            href="https://seo-dong-ok-github-io.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[var(--color-text-base)] underline underline-offset-4 hover:text-[var(--color-accent)]"
          >
            seo-dong-ok-github-io.vercel.app
          </a>
        </div>
      </section>
    </div>
  )
}
