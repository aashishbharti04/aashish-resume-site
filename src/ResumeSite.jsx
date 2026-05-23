import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Mail, Phone, Github, Linkedin, MapPin, FileDown, ArrowRight,
  Briefcase, GraduationCap, Code, Award, ExternalLink, Sparkles
} from "lucide-react";

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
          <p className="text-sm uppercase tracking-widest text-slate-400">
            {kicker}
          </p>
        )}
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-sky-300 bg-clip-text text-transparent">
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
      "group relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow backdrop-blur-xl " +
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
    className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 shadow-sm"
  >
    {text}
  </motion.span>
);

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

// Magnetic button effect
const Magnetic = ({ children, strength = 30, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  function onMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX / strength);
    y.set(relY / strength);
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
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Tilt card effect
const Tilt = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-15, 15], [10, -10]);
  const rotateY = useTransform(x, [-15, 15], [-10, 10]);
  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 30);
    y.set((py - 0.5) * 30);
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

// Scroll progress bar
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
      <div
        className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
// Cursor glow effect
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
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const skills = useMemo(
    () => ({
      Programming: ["C", "C++", "Java", "Python"],
      "Web Development": ["HTML", "CSS", "JavaScript", "Bootstrap", "WordPress"],
      "Data Analysis": ["Python (Pandas, NumPy)", "MS Excel", "Power BI"],
      "Software Development": ["OOP", "Data Structures", "Software Engineering"],
      "Version Control": ["Git", "GitHub"],
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-fuchsia-500/40">
      <ScrollProgress />
      <CursorGlow />
      <BgAurora />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-sky-500 shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Aashish Bharti
            </span>
          </div>
          <nav className="hidden gap-1 sm:flex">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-all hover:bg-white/5 ${
                  active === n.id ? "bg-white/10 text-white" : "text-slate-300"
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
  <ThemeToggle /> {/* 🌗 Dark/Light switch */}
</div>

        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[13px] text-slate-300">
                <MapPin className="h-3.5 w-3.5" /> Punjab, India
              </div>
              <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                <span className="bg-[linear-gradient(110deg,#ffffff_0%,#c084fc_30%,#60a5fa_60%,#22d3ee_100%)] bg-clip-text text-transparent">
                  Generative AI Designer
                </span>
                <br /> & Full-Stack-leaning Web Developer
              </h1>
              <p className="mt-4 max-w-xl text-slate-300">
                BCA graduate crafting high-polish, animated interfaces and reliable
                code. I bring UX clarity, performance, and motion to your product.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <button
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-medium text-white/90 shadow transition hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    Contact Me{" "}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                </Magnetic>
                <a
                  href="https://aashishbharti04.github.io/Codsoft-Personal-Portfolio/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-5 py-2.5 text-sm font-medium text-fuchsia-100 shadow transition hover:brightness-110"
                >
                  View Portfolio <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" /> jnvpbhaashishbharti@gmail.com
                </span>
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" /> +91 97942 28390
                </span>
              </div>
            </motion.div>
          </div>

          <Tilt>
            <GlassCard className="p-0">
              <div className="relative isolate overflow-hidden rounded-2xl">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-sky-500/20 blur-xl" />
                <div className="relative z-10 space-y-5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-fuchsia-600 to-sky-600 shadow" />
                    <div>
                      <p className="text-sm text-slate-300">Hello, I’m</p>
                      <p className="text-xl font-semibold">Aashish Bharti</p>
                    </div>
                  </div>
                  <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <a
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 shadow-sm hover:bg-white/10"
                      href="mailto:jnvpbhaashishbharti@gmail.com"
                    >
                      <Mail className="h-4 w-4" /> Email
                    </a>
                    <a
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 shadow-sm hover:bg-white/10"
                      href="tel:+919794228390"
                    >
                      <Phone className="h-4 w-4" /> Call
                    </a>
                    <a
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 shadow-sm hover:bg-white/10"
                      target="_blank"
                      rel="noreferrer noopener"
                      href="https://www.linkedin.com/in/aashana1012"
                    >
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                    <a
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 shadow-sm hover:bg-white/10"
                      target="_blank"
                      rel="noreferrer noopener"
                      href="https://github.com/aashishbharti04/"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Tilt>
        </div>

        {/* Skills marquee */}
        <div className="mt-12 overflow-hidden py-2">
          <div className="flex w-max animate-[marquee_20s_linear_infinite] whitespace-nowrap text-sm text-slate-300 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {[
              ...[
                "C","C++","Java","Python","HTML","CSS","JavaScript",
                "Bootstrap","WordPress","Pandas","NumPy",
                "Excel","Power BI","Git","GitHub"
              ],
              ...[
                "C","C++","Java","Python","HTML","CSS","JavaScript",
                "Bootstrap","WordPress","Pandas","NumPy",
                "Excel","Power BI","Git","GitHub"
              ],
            ].map((s, i) => (
              <span
                key={i}
                className="mx-4 inline-flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="About" kicker="who i am">
        <GlassCard>
          <p className="text-slate-200">
            I design and build expressive, performant web experiences. My sweet
            spot is marrying <span className="text-fuchsia-300">clean UX</span>{" "}
            with <span className="text-sky-300">solid engineering</span>, using
            delightful motion to guide attention without getting in the way.
          </p>
        </GlassCard>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" kicker="what i use">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([group, list]) => (
            <GlassCard key={group}>
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                <Code className="h-4 w-4" /> {group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {list.map((s) => (
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
          <GlassCard>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> COSMIC365.AI — Associate
            </h3>
            <p className="text-sm text-slate-400">
              Aug 2024 – Oct 2024 · Lucknow, India
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-200">
              <li>Shipped AI-driven prototypes and elevated UI polish with motion.</li>
              <li>Collaborated cross-functionally; emphasized responsiveness & clarity.</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> BBAU — BCA Student
            </h3>
            <p className="text-sm text-slate-400">Jul 2022 – Jun 2025 · Lucknow, India</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-200">
              <li>Built dynamic websites; analyzed real-world datasets.</li>
              <li>Strong base in OOP, DSA, and software engineering practices.</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> JNV — Computer Science
            </h3>
            <p className="text-sm text-slate-400">Aug 2015 – Jun 2022 · Pratapgarh, India</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-200">
              <li>Strengthened fundamentals in programming and problem solving.</li>
            </ul>
          </GlassCard>
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Education" kicker="learning">
        <div className="grid gap-4 md:grid-cols-2">
          <GlassCard>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> BBAU, Lucknow — BCA
            </h3>
            <p className="text-sm text-slate-400">2022 – 2025</p>
          </GlassCard>
          <GlassCard>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Jawahar Navodaya Vidyalaya (JNV)
            </h3>
            <p className="text-sm text-slate-400">2015 – 2022</p>
          </GlassCard>
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certs" title="Certifications" kicker="proof">
        <GlassCard>
          <div className="flex flex-wrap gap-2">
            {[
              "Communication Skills For Success — In Business & In Life",
              "Make a WordPress Website with Elementor",
              "ChatGPT: Make Money as a New Freelancer",
              "Introduction to Ethical Hacking",
              "Become a HTML Hero",
            ].map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-sm text-emerald-100"
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
          {[
            {
              title: "Portfolio Site",
              desc: "Static portfolio with custom animations and micro-interactions.",
              href: "https://aashishbharti04.github.io/Codsoft-Personal-Portfolio/",
            },
            {
              title: "Resume Website (this)",
              desc: "Dark neon theme, animated hero, tilt cards, marquee skills.",
              href: "#",
            },
          ].map((p) => (
            <Tilt key={p.title}>
              <GlassCard className="h-full">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{p.desc}</p>
                <a
                  href={p.href}
                  target={p.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-2 text-fuchsia-200 hover:underline"
                >
                  View <ExternalLink className="h-4 w-4" />
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
            <h3 className="mb-3 text-base font-semibold text-white">Work with me</h3>
            <p className="text-sm text-slate-300">
              Open to internships and full-time roles in front-end, web, or
              data-focused teams. Email or call is fastest.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 shadow-sm hover:bg-white/10"
                href="mailto:jnvpbhaashishbharti@gmail.com"
              >
                <Mail className="h-4 w-4" /> jnvpbhaashishbharti@gmail.com
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 shadow-sm hover:bg-white/10"
                href="tel:+919794228390"
              >
                <Phone className="h-4 w-4" /> +91 97942 28390
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 shadow-sm hover:bg-white/10"
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.linkedin.com/in/aashana1012"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 shadow-sm hover:bg-white/10"
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/aashishbharti04/"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-3 text-base font-semibold text-white">Quick links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="group inline-flex items-center gap-2 text-fuchsia-200 hover:underline"
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FileDown className="h-4 w-4" /> Download Resume (PDF)
                </a>
              </li>
              <li>
                <a
                  className="group inline-flex items-center gap-2 text-fuchsia-200 hover:underline"
                  href="https://aashishbharti04.github.io/Codsoft-Personal-Portfolio/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <ExternalLink className="h-4 w-4" /> Personal Portfolio
                </a>
              </li>
            </ul>
          </GlassCard>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950/80 py-8 text-sm text-slate-400 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4">
          <p>© {new Date().getFullYear()} Aashish Bharti. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              className="inline-flex items-center gap-2 hover:underline"
              href="https://www.linkedin.com/in/aashana1012"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              className="inline-flex items-center gap-2 hover:underline"
              href="https://github.com/aashishbharti04"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
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
    if (dark) {
      cls.add("dark");
    } else {
      cls.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 shadow hover:bg-white/10"
      title="Toggle theme"
    >
      <span
        className={`h-4 w-4 rounded-full ${
          dark
            ? "bg-gradient-to-br from-fuchsia-500 to-sky-500"
            : "bg-gradient-to-br from-yellow-400 to-orange-500"
        }`}
      />
      {dark ? "Dark" : "Light"}
    </button>
  );
}
