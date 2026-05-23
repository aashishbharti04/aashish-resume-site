import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Mail, Phone, MapPin, FileDown, ArrowRight,
  Briefcase, GraduationCap, Code, Award, ExternalLink
} from "lucide-react";
import AnimatedName from "./components/AnimatedName";
import MascotBand from "./components/Mascots";
import ContactForm from "./components/ContactForm";
import { socialMeta } from "./components/SocialIcons";
import { useContent } from "./hooks/useContent";
import { submitMessage } from "./lib/data";

const RESUME_URL = "/AAshish.pdf";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certs", label: "Certifications" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// -------------------- UI PRIMITIVES --------------------
const Section = ({ id, title, kicker, children }) => (
  <section id={id} className="scroll-mt-24 py-16">
    <div className="mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        {kicker && (
          <p className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {kicker}
          </p>
        )}
        <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-sky-600 dark:from-fuchsia-300 dark:via-violet-300 dark:to-sky-300 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
      </motion.div>
      {children}
    </div>
  </section>
);

const GlassCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className={
      "group relative rounded-2xl border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 p-5 shadow backdrop-blur-xl " +
      "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 " +
      className
    }
  >
    <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-sky-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
    {children}
  </motion.div>
);

const SkillChip = ({ text }) => (
  <motion.span
    whileHover={{ y: -2 }}
    className="rounded-xl border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 px-3 py-1 text-sm text-slate-700 dark:text-slate-200 shadow-sm"
  >
    {text}
  </motion.span>
);

const CARD_HEADING = "text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2";

// Row of social icon links built from editable content.
function SocialRow({ items = [], className = "" }) {
  return (
    <div className={"flex flex-wrap items-center gap-2 " + className}>
      {items.filter((s) => s.url).map((s) => {
        const { label, Icon } = socialMeta(s.platform);
        return (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noreferrer noopener"
            title={label}
            aria-label={label}
            className="inline-grid h-9 w-9 place-items-center rounded-xl border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 text-slate-700 transition hover:-translate-y-0.5 hover:text-fuchsia-500 dark:text-slate-200 dark:hover:text-fuchsia-300"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState(navItems[0].id);
  useEffect(() => {
    const handler = () => {
      let current = active;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) current = item.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

const Magnetic = ({ children, strength = 30, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / strength);
    y.set((e.clientY - rect.top - rect.height / 2) / strength);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
};

const Tilt = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-15, 15], [10, -10]);
  const rotateY = useTransform(x, [-15, 15], [-10, 10]);
  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 30);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 30);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={"[perspective:1000px] " + className}
    >
      {children}
    </motion.div>
  );
};

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP((h.scrollTop / max) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500" style={{ width: `${p}%` }} />
    </div>
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5]"
      animate={{ x: pos.x - 150, y: pos.y - 150 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={{
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.25), transparent 60%)",
        filter: "blur(80px)",
      }}
    />
  );
}

// -------------------- MAIN PAGE --------------------
export default function ResumeSite() {
  const active = useActiveSection();
  const { content } = useContent();
  const { profile, socials, skills, experience, education, certs, projects } = content;
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100 selection:bg-fuchsia-500/40">
      <ScrollProgress />
      <CursorGlow />
      <BgAurora />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-base font-bold tracking-tight">
            <AnimatedName name={profile.name} />
          </span>
          <nav className="hidden gap-1 sm:flex">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-all hover:bg-slate-900/5 dark:hover:bg-white/5 ${
                  active === n.id ? "bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white" : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-fuchsia-600 to-sky-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:brightness-110"
            >
              <FileDown className="h-4 w-4" /> Download
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:grid-cols-2">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 px-3 py-1 text-[13px] text-slate-600 dark:text-slate-300">
                <MapPin className="h-3.5 w-3.5" /> {profile.location}
              </div>
              <h1 className="text-balance text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
                <AnimatedName name={profile.name} />
              </h1>
              <p className="mt-3 text-lg font-semibold text-slate-700 dark:text-slate-200 sm:text-xl">
                {profile.role}
              </p>
              <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
                BCA graduate crafting high-polish, animated interfaces and reliable code. I bring UX
                clarity, performance, and motion to your product.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="group inline-flex items-center gap-2 rounded-full border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/10 px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-white/90 shadow transition hover:-translate-y-0.5 hover:bg-slate-900/10 dark:hover:bg-white/15"
                  >
                    Contact Me <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                </Magnetic>
                <SocialRow items={socials} />
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {profile.email}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {profile.phone}
                </span>
              </div>
            </motion.div>
          </div>

          <Tilt>
            <GlassCard className="p-0">
              <div className="relative isolate overflow-hidden rounded-2xl">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-sky-500/20 blur-xl" />
                <div className="relative z-10 space-y-5 p-6">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Hello, I&apos;m</p>
                    <p className="text-2xl font-bold">
                      <AnimatedName name={profile.name} />
                    </p>
                  </div>
                  <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-900/10 to-transparent dark:via-white/10" />
                  <SocialRow items={socials} />
                </div>
              </div>
            </GlassCard>
          </Tilt>
        </div>
      </section>

      {/* Mascots */}
      <MascotBand />

      {/* ABOUT */}
      <Section id="about" title="About" kicker="who i am">
        <GlassCard>
          <p className="text-slate-700 dark:text-slate-200">{profile.about}</p>
        </GlassCard>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" kicker="what i use">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ group, items }) => (
            <GlassCard key={group}>
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
                <Code className="h-4 w-4" /> {group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <SkillChip key={s} text={s} />
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience" kicker="where i've worked">
        <div className="grid gap-4 md:grid-cols-2">
          {experience.map((e) => (
            <GlassCard key={e.org}>
              <h3 className={CARD_HEADING}>
                <Briefcase className="h-4 w-4" /> {e.org}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{e.period}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {e.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Education" kicker="learning">
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((ed) => (
            <GlassCard key={ed.school}>
              <h3 className={CARD_HEADING}>
                <GraduationCap className="h-4 w-4" /> {ed.school}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{ed.period}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certs" title="Certifications" kicker="proof">
        <GlassCard>
          <div className="flex flex-wrap gap-2">
            {certs.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-700 dark:border-emerald-400/20 dark:text-emerald-100"
              >
                <Award className="h-4 w-4" /> {c}
              </span>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" kicker="selected work">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Tilt key={p.title}>
              <GlassCard className="h-full">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.desc}</p>
                {p.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-900/10 bg-slate-900/5 px-2.5 py-0.5 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <a
                  href={p.href}
                  target={p.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-2 text-fuchsia-600 hover:underline dark:text-fuchsia-200"
                >
                  Visit live site <ExternalLink className="h-4 w-4" />
                </a>
              </GlassCard>
            </Tilt>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" kicker="say hi">
        <div className="grid gap-4 md:grid-cols-3">
          <GlassCard className="md:col-span-2">
            <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">Send me a message</h3>
            <ContactForm onSubmit={submitMessage} />
          </GlassCard>

          <GlassCard>
            <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-white">Reach me</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a className="inline-flex items-center gap-2 text-slate-700 hover:text-fuchsia-500 dark:text-slate-200" href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" /> {profile.email}
              </a>
              <a className="inline-flex items-center gap-2 text-slate-700 hover:text-fuchsia-500 dark:text-slate-200" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                <Phone className="h-4 w-4" /> {profile.phone}
              </a>
              <a
                className="inline-flex items-center gap-2 text-fuchsia-600 hover:underline dark:text-fuchsia-200"
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                <FileDown className="h-4 w-4" /> Download Resume (PDF)
              </a>
            </div>
            <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-slate-900/10 to-transparent dark:via-white/10" />
            <SocialRow items={socials} />
          </GlassCard>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 py-8 text-sm text-slate-500 dark:text-slate-400 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <SocialRow items={socials} />
        </div>
      </footer>
    </div>
  );
}

// -------------------- BACKGROUND --------------------
function BgAurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px]" />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute left-[-10%] top-[-10%] h-[40vmax] w-[40vmax] rounded-full bg-fuchsia-500/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute right-[-10%] top-[10%] h-[45vmax] w-[45vmax] rounded-full bg-violet-500/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 25, 0], x: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[20%] h-[35vmax] w-[35vmax] rounded-full bg-sky-500/20 blur-3xl"
      />
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const cls = document.documentElement.classList;
    if (dark) cls.add("dark");
    else cls.remove("dark");
  }, [dark]);
  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 shadow hover:bg-slate-900/10 dark:hover:bg-white/10"
      title="Toggle theme"
    >
      <span
        className={`h-4 w-4 rounded-full ${
          dark ? "bg-gradient-to-br from-fuchsia-500 to-sky-500" : "bg-gradient-to-br from-yellow-400 to-orange-500"
        }`}
      />
      {dark ? "Dark" : "Light"}
    </button>
  );
}
