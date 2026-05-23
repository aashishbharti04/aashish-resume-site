import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

function Jalebi() {
  const turns = 3.4;
  const steps = 140;
  const b = 5.2;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * 2 * Math.PI;
    const r = 4 + b * (t / (2 * Math.PI));
    pts.push([50 + r * Math.cos(t), 50 + r * Math.sin(t)]);
  }
  const d = "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <linearGradient id="jalebi-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#jalebi-grad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#fff7ed" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Khadush — full-body grumpy guy: long hair, beard + moustache, only shorts.
export function GrumpyBoy() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {/* long hair (back), flowing past shoulders */}
      <path d="M31 32 q-5 -28 19 -28 q24 0 19 28 q2 16 -3 24 l-5 -2 q3 -14 0 -22 -11 -7 -22 0 q-3 8 0 22 l-5 2 q-5 -8 -3 -24Z" fill="#171a21" />
      {/* arms */}
      <rect x="30" y="47" width="7" height="21" rx="3.5" fill="#f0c19a" />
      <rect x="63" y="47" width="7" height="21" rx="3.5" fill="#f0c19a" />
      {/* bare torso */}
      <rect x="36" y="44" width="28" height="24" rx="10" fill="#f4c9a3" />
      {/* legs */}
      <rect x="42" y="73" width="6.5" height="18" rx="3" fill="#f0c19a" />
      <rect x="51.5" y="73" width="6.5" height="18" rx="3" fill="#f0c19a" />
      {/* shorts */}
      <path d="M35 63 h30 v6 q0 5 -5 5 h-7 l-3 -6 -3 6 h-7 q-5 0 -5 -5Z" fill="#2563eb" />
      <path d="M35 63 h30 v2 h-30Z" fill="#1d4ed8" />
      {/* head */}
      <circle cx="50" cy="27" r="15" fill="#f4c9a3" />
      {/* hair top */}
      <path d="M34 26 q-1 -17 16 -17 q17 0 16 17 q-7 -9 -16 -9 -9 0 -16 9Z" fill="#171a21" />
      {/* angry brows */}
      <line x1="40" y1="23" x2="47" y2="26" stroke="#171a21" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="60" y1="23" x2="53" y2="26" stroke="#171a21" strokeWidth="2.6" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="44" cy="29" r="2" fill="#171a21" />
      <circle cx="56" cy="29" r="2" fill="#171a21" />
      {/* beard */}
      <path d="M37 32 q1 16 13 18 q12 -2 13 -18 q-5 9 -13 9 -8 0 -13 -9Z" fill="#171a21" />
      {/* moustache */}
      <path d="M43 35 q7 5 14 0 q-3 5 -7 5 -4 0 -7 -5Z" fill="#171a21" />
    </svg>
  );
}

const MASCOTS = [
  { key: "robot-cat", label: "Doraemon", Comp: RobotCat },
  { key: "panda", label: "Pandu", Comp: Panda },
  { key: "dog", label: "Pillu", Comp: Dog },
  { key: "jalebi", label: "Jalebi", Comp: Jalebi },
  { key: "boy", label: "Khadush", Comp: GrumpyBoy, big: true },
];

// 10 taps on Khadush secretly opens the admin dashboard.
const SECRET_KEY = "boy";
const SECRET_TAPS = 10;

export default function MascotBand({ links = {} }) {
  const [following, setFollowing] = useState(null);
  const secretRef = useRef(0);

  const toggleFollow = (key) => setFollowing((f) => (f === key ? null : key));

  // Single tap: the mascot follows you while scrolling (tap again to send it home).
  const handleClick = (key) => {
    if (key === SECRET_KEY) {
      secretRef.current += 1;
      if (secretRef.current >= SECRET_TAPS) {
        secretRef.current = 0;
        window.location.hash = "#/admin";
        return;
      }
    }
    toggleFollow(key);
  };

  // Double / triple tap: open the mascot's link (if one is set in the admin).
  const handleDouble = (key) => {
    if (key !== SECRET_KEY && links[key]) {
      window.open(links[key], "_blank", "noopener,noreferrer");
    }
  };

  const follower = MASCOTS.find((m) => m.key === following);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pb-6">
        <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-10">
          {MASCOTS.map((m, i) => (
            <motion.div
              key={m.key}
              onClick={() => handleClick(m.key)}
              onDoubleClick={() => handleDouble(m.key)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.12, rotate: -4 }}
              whileTap={{ scale: 0.9 }}
              className="group flex cursor-pointer select-none flex-col items-center gap-2"
            >
              <div
                className={
                  (m.big ? "h-24 w-24 sm:h-28 sm:w-28" : "h-16 w-16 sm:h-20 sm:w-20") +
                  " drop-shadow-[0_6px_18px_rgba(168,85,247,0.35)] " +
                  (following === m.key ? "opacity-30" : "")
                }
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

      {/* The selected mascot detaches and follows the screen while scrolling. */}
      <AnimatePresence>
        {follower && (
          <motion.button
            key="mascot-follower"
            initial={{ opacity: 0, scale: 0.4, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.4, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setFollowing(null)}
            title="Tap to send me home"
            className="fixed bottom-5 right-5 z-40 h-16 w-16 drop-shadow-[0_8px_24px_rgba(168,85,247,0.55)] sm:h-20 sm:w-20"
            style={{ animation: "float-y 3s ease-in-out infinite" }}
          >
            <follower.Comp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
