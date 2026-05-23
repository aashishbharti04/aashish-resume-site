// Default site content. Used as the fallback/seed when Supabase has no data yet.
// The admin dashboard edits this same shape and persists it to Supabase.

export const defaultContent = {
  profile: {
    name: "Aashish Bharti",
    role: "Generative AI Specialist · Vibe Coder · Content Creator",
    tagline:
      "I create with generative AI — content, images, and video — and vibe-code full products using Claude, ChatGPT, Gemini, and Ollama.",
    quote: "I'm doing what I love to do...😎💙",
    certsNote:
      "Plot twist: I could frame every one of these certificates on my wall... but these days I just let AI do the heavy lifting while I sip my chai. Why memorize syntax when you can vibe? 😎💙",
    location: "Punjab, India",
    email: "jnvpbhaashishbharti@gmail.com",
    phone: "+91 97942 28390",
    about:
      "Hi, I'm Aashish — officially the Khadoos (the grumpy-looking one 😎) of my little squad. Doraemon, Pandu, Pillu, and Jalebi are my partners in crime: I bring the serious face, they bring the chaos.\n" +
      "Honestly, I'm just a curious guy who can't sit still. The moment something new pops up in tech, my brain goes \"ooh, what's that?\" and I have to learn it. New tool, new model, new trick? Count me in.\n" +
      "When I'm not building stuff, you'll find me buried in a book. Total booklover — reading is my happy place and my favorite way to recharge the brain cells.\n" +
      "On the tech side, I live in the world of generative AI: making content, images, and videos, and vibe-coding full products with Claude, ChatGPT, Gemini, and Ollama. I also build for the web with React, JavaScript, HTML, CSS, Tailwind, and WordPress, and I know my way around Python, Pandas, Power BI, and Git.\n" +
      "Short version: serious face, curious mind, big dreams — just doing what I love. 💙",
  },

  socials: [
    { platform: "github", url: "https://github.com/aashishbharti04" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/aashana1012" },
    { platform: "x", url: "https://x.com/" },
    { platform: "instagram", url: "https://instagram.com/" },
    { platform: "youtube", url: "https://youtube.com/" },
  ],

  skills: [
    { group: "AI Tools — my superpowers", note: "My ride-or-die squad. I talk, they build. 🤝", items: ["Claude", "ChatGPT", "Gemini", "Ollama", "Cursor", "GitHub Copilot"] },
    { group: "Generative AI", note: "I describe a dream; AI renders it — words, pixels, and frames. ✨", items: ["Content Generation", "Image Generation", "Video Generation", "Prompt Engineering", "LLMs", "RAG"] },
    { group: "Vibe Coding (my actual job)", note: "Vibes in, full-stack apps out. Zero StackOverflow tears. 😌", items: ["Full-Stack with AI", "AI-Assisted Dev", "Rapid Prototyping", "Spec-to-App"] },
    { group: "Web Dev (AI does the heavy lifting)", note: "I know enough to point at the screen; AI does the typing. 🫵", items: ["React", "HTML", "CSS", "Tailwind", "WordPress"] },
    { group: "Still leveling up", note: "Work in progress — like everyone, just honest about it. 📈", items: ["Python (basics)", "JavaScript (basics)", "Git (basics)"] },
  ],

  experience: [
    {
      org: "Pulselead Signals & Corerank Digital — AI Manager",
      period: "Dec 2025 – Present · ~6 months",
      points: [
        "Leading AI across two companies at once — officially the human in charge of a very smart robot army. 🤖",
        "Turn \"can AI even do this?\" into shipped products: content, automation, and generative-AI workflows.",
        "Coach Claude, ChatGPT, Gemini & Ollama like a team — and somehow they listen to me more than humans do. 😎",
      ],
    },
    {
      org: "COSMIC365.AI — Associate",
      period: "Aug 2024 – Oct 2024 · Lucknow, India",
      points: [
        "Shipped AI-driven prototypes and made the UI so shiny that people forgot to read the actual text. ✨",
        "Collaborated cross-functionally (translation: explained to humans what the AI was trying to say).",
        "Learned the real secret of building cool things — 90% is just asking the right question, to the AI and the team.",
        "Walked away with one superpower: turning vague ideas into working demos before the chai went cold. ☕",
      ],
    },
  ],

  education: [
    {
      school: "BBAU, Lucknow — BCA (Bachelor of Computer Applications)",
      period: "2022 – 2025 · 3 years",
      detail:
        "Three glorious years where I learned that good wifi + curiosity can genuinely change a life. Survived assignments by night, ran on chai by day, and somewhere between group projects and last-minute submissions I fell completely in love with building things. Peak student energy: 10% lectures, 90% \"let's just try and see what happens.\" 🎓",
    },
    {
      school: "Jawahar Navodaya Vidyalaya (JNV) — Class 6th to 12th",
      period: "2015 – 2022 · 7 years",
      detail:
        "Seven full years of hostel life — discipline by day, legendary masti by night. From Class 6th to 12th I learned maths, science, and the far more important art of surviving mess food and making friends who feel like family. Lights-out rules, midnight talks, morning PT, and a whole childhood of memories. Honestly, JNV raised me as much as it taught me. 🏫❤️",
    },
  ],

  certs: [
    "BCA Degree — 3 official years of proof that I can, in fact, computer 🎓",
    "ADCA — Advanced Diploma in Computer Applications (from back when I typed everything myself)",
    "ChatGPT: Make Money as a New Freelancer — the prophecy turned out to be real 💸",
    "Introduction to Ethical Hacking — I promise I only hack for good 🕵️",
    "Make a WordPress Website with Elementor — dragged, dropped, conquered",
    "Become a HTML Hero — cape sadly not included",
    "Communication Skills for Success — so I can explain to humans what the AI just said",
    "...and a few more quietly gathering digital dust 🏆",
  ],

  projects: [
    {
      title: "ArchEye",
      desc: "Employee monitoring dashboard for real-time workforce productivity and activity tracking, built for HR and business teams.",
      href: "https://archeyeadmin.com/",
      tags: ["Dashboard", "Monitoring", "HR Tech"],
    },
    {
      title: "One In A Million Award",
      desc: "Business recognition platform with a four-step nomination-to-winner flow across 12 industries; featured in Forbes, Inc., and Bloomberg.",
      href: "https://oneinamillionaward.com/",
      tags: ["Web", "Awards", "Branding"],
    },
    {
      title: "FindBestRates",
      desc: "Insurance comparison platform connecting consumers with vetted, licensed local agencies across auto, home, life, health, and business — zero spam.",
      href: "https://findbestinsurancerates.com/",
      tags: ["Web", "Insurance", "Marketplace"],
    },
    {
      title: "AashRow — SEO Insights",
      desc: "SEO insights and analytics tool to track keywords, audit pages, and improve search visibility.",
      href: "https://myseoinsights.com/AashRow/",
      tags: ["SEO", "Analytics", "Tools"],
    },
  ],
};
