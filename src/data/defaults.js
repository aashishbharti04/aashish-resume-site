// Default site content. Used as the fallback/seed when Supabase has no data yet.
// The admin dashboard edits this same shape and persists it to Supabase.

export const defaultContent = {
  profile: {
    name: "Aashish Bharti",
    role: "Generative AI Specialist · Vibe Coder · Content Creator",
    tagline:
      "I create with generative AI — content, images, and video — and vibe-code full products using Claude, ChatGPT, Gemini, and Ollama.",
    quote: "I'm doing what I love to do...😎💙",
    location: "Punjab, India",
    email: "jnvpbhaashishbharti@gmail.com",
    phone: "+91 97942 28390",
    about:
      "I'm an AI generalist who builds end to end with generative AI — from content, image, and video generation to shipping full web products by vibe coding across tools like Claude, ChatGPT, Gemini, and Ollama. I turn ideas into working apps fast, blending strong AI fluency with clean, motion-rich interfaces.",
  },

  socials: [
    { platform: "github", url: "https://github.com/aashishbharti04" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/aashana1012" },
    { platform: "x", url: "https://x.com/" },
    { platform: "instagram", url: "https://instagram.com/" },
    { platform: "youtube", url: "https://youtube.com/" },
  ],

  skills: [
    { group: "AI Tools", items: ["Claude", "ChatGPT", "Gemini", "Ollama", "Cursor", "GitHub Copilot"] },
    { group: "Generative AI", items: ["Content Generation", "Image Generation", "Video Generation", "Prompt Engineering", "LLMs", "RAG"] },
    { group: "Vibe Coding", items: ["AI-Assisted Dev", "Rapid Prototyping", "Spec-to-App", "Automation"] },
    { group: "Web Development", items: ["React", "JavaScript", "HTML", "CSS", "Tailwind", "WordPress"] },
    { group: "Programming", items: ["Python", "C", "C++", "Java"] },
    { group: "Data & Version Control", items: ["Pandas", "NumPy", "Power BI", "Git", "GitHub"] },
  ],

  experience: [
    {
      org: "COSMIC365.AI — Associate",
      period: "Aug 2024 – Oct 2024 · Lucknow, India",
      points: [
        "Shipped AI-driven prototypes and elevated UI polish with motion.",
        "Collaborated cross-functionally; emphasized responsiveness & clarity.",
      ],
    },
    {
      org: "BBAU — BCA Student",
      period: "Jul 2022 – Jun 2025 · Lucknow, India",
      points: [
        "Built dynamic websites; analyzed real-world datasets.",
        "Strong base in OOP, DSA, and software engineering practices.",
      ],
    },
    {
      org: "JNV — Computer Science",
      period: "Aug 2015 – Jun 2022 · Pratapgarh, India",
      points: ["Strengthened fundamentals in programming and problem solving."],
    },
  ],

  education: [
    { school: "BBAU, Lucknow — BCA", period: "2022 – 2025" },
    { school: "Jawahar Navodaya Vidyalaya (JNV)", period: "2015 – 2022" },
  ],

  certs: [
    "Communication Skills For Success — In Business & In Life",
    "Make a WordPress Website with Elementor",
    "ChatGPT: Make Money as a New Freelancer",
    "Introduction to Ethical Hacking",
    "Become a HTML Hero",
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
