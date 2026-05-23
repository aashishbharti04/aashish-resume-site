import { useState } from "react";
import { motion } from "framer-motion";

// Original, hand-drawn anime-style mascots (no copyrighted artwork).

function RobotCat() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="40" fill="#2aa9e0" />
      <circle cx="50" cy="56" r="30" fill="#fff" />
      <circle cx="40" cy="40" r="9" fill="#fff" stroke="#222" strokeWidth="2" />
      <circle cx="60" cy="40" r="9" fill="#fff" stroke="#222" strokeWidth="2" />
      <circle cx="42" cy="42" r="3" fill="#222" />
      <circle cx="58" cy="42" r="3" fill="#222" />
      <circle cx="50" cy="50" r="4" fill="#e23b3b" />
      <line x1="50" y1="54" x2="50" y2="70" stroke="#222" strokeWidth="2" />
      <path d="M50 70 q-8 6 -14 2" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 70 q8 6 14 2" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      <g stroke="#222" strokeWidth="1.5" strokeLinecap="round">
        <line x1="18" y1="50" x2="34" y2="52" />
        <line x1="18" y1="58" x2="34" y2="58" />
        <line x1="66" y1="52" x2="82" y2="50" />
        <line x1="66" y1="58" x2="82" y2="58" />
      </g>
      <rect x="30" y="80" width="40" height="7" rx="3.5" fill="#e23b3b" />
      <circle cx="50" cy="86" r="5" fill="#ffd23f" stroke="#caa400" strokeWidth="1.5" />
    </svg>
  );
}

function Panda() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="28" cy="24" r="12" fill="#222" />
      <circle cx="72" cy="24" r="12" fill="#222" />
      <circle cx="50" cy="52" r="38" fill="#fff" stroke="#e7e7e7" strokeWidth="2" />
      <ellipse cx="37" cy="50" rx="9" ry="12" fill="#222" transform="rotate(-12 37 50)" />
      <ellipse cx="63" cy="50" rx="9" ry="12" fill="#222" transform="rotate(12 63 50)" />
      <circle cx="38" cy="50" r="3.5" fill="#fff" />
      <circle cx="62" cy="50" r="3.5" fill="#fff" />
      <circle cx="50" cy="64" r="4" fill="#222" />
      <path d="M50 68 q-6 5 -11 2" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 68 q6 5 11 2" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Dog() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <path d="M22 30 q-6 26 6 40" fill="#8a5a2b" />
      <path d="M78 30 q6 26 -6 40" fill="#8a5a2b" />
      <circle cx="50" cy="52" r="34" fill="#c8893f" />
      <circle cx="40" cy="46" r="4.5" fill="#1c1c1c" />
      <circle cx="60" cy="46" r="4.5" fill="#1c1c1c" />
      <ellipse cx="50" cy="62" rx="7" ry="5.5" fill="#1c1c1c" />
      <path d="M50 67 v6" stroke="#1c1c1c" strokeWidth="2" />
      <path d="M50 73 q-7 0 -9 -5" fill="none" stroke="#1c1c1c" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 73 q7 0 9 -5" fill="none" stroke="#1c1c1c" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 73 q2 8 4 0" fill="#e36a8a" />
    </svg>
  );
}

function Basketball() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="40" fill="#e8772e" />
      <g fill="none" stroke="#1c1c1c" strokeWidth="2.5">
        <circle cx="50" cy="50" r="40" />
        <line x1="50" y1="10" x2="50" y2="90" />
        <line x1="10" y1="50" x2="90" y2="50" />
        <path d="M22 22 q28 28 0 56" />
        <path d="M78 22 q-28 28 0 56" />
      </g>
    </svg>
  );
}

// "Khadoos" boy — a friendly-but-grumpy anime kid.
function GrumpyBoy() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <path d="M24 40 q26 -28 52 0 q2 -22 -26 -24 q-28 2 -26 24Z" fill="#1f2937" />
      <circle cx="50" cy="54" r="30" fill="#f4c9a3" />
      <path d="M24 42 q26 -22 52 0 v-4 q-26 -22 -52 0Z" fill="#1f2937" />
      <line x1="34" y1="48" x2="46" y2="52" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      <line x1="66" y1="48" x2="54" y2="52" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="58" r="3.5" fill="#1f2937" />
      <circle cx="60" cy="58" r="3.5" fill="#1f2937" />
      <path d="M42 72 q8 -5 16 0" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const MASCOTS = [
  { key: "robot-cat", label: "Robo-Cat", Comp: RobotCat },
  { key: "panda", label: "Panda", Comp: Panda },
  { key: "dog", label: "Pup", Comp: Dog },
  { key: "basketball", label: "Hoops", Comp: Basketball },
  { key: "boy", label: "Khadoos", Comp: GrumpyBoy },
];

// 10 taps on the Khadoos boy secretly opens the admin dashboard.
const SECRET_KEY = "boy";
const SECRET_TAPS = 10;

export default function MascotBand() {
  const [taps, setTaps] = useState(0);

  const handleTap = (key) => {
    if (key !== SECRET_KEY) return;
    setTaps((t) => {
      const next = t + 1;
      if (next >= SECRET_TAPS) {
        window.location.hash = "#/admin";
        return 0;
      }
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-6">
      <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-10">
        {MASCOTS.map((m, i) => (
          <motion.div
            key={m.key}
            onClick={() => handleTap(m.key)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.12, rotate: -4 }}
            whileTap={{ scale: 0.9 }}
            className="group flex cursor-pointer select-none flex-col items-center gap-2"
          >
            <div
              className="h-16 w-16 drop-shadow-[0_6px_18px_rgba(168,85,247,0.35)] sm:h-20 sm:w-20"
              style={{ animation: `float-y ${3 + i * 0.4}s ease-in-out infinite` }}
            >
              <m.Comp />
            </div>
            <span className="text-xs font-medium text-slate-500 transition group-hover:text-fuchsia-400 dark:text-slate-400">
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
