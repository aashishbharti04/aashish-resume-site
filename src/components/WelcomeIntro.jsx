import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GrumpyBoy } from "./Mascots";

// Playful splash shown once per browser session.
export default function WelcomeIntro() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem("welcomed");
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem("welcomed", "1");
    } catch {}
    const t = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome"
          onClick={() => setShow(false)}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center overflow-hidden bg-slate-950 px-6 text-center"
        >
          {/* glow blobs */}
          <div className="pointer-events-none absolute -left-1/4 top-0 h-[60vmax] w-[60vmax] rounded-full bg-fuchsia-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-1/4 bottom-0 h-[60vmax] w-[60vmax] rounded-full bg-sky-600/20 blur-3xl" />

          <div className="relative">
            {/* Khadush welcomes you, then heads back to his place */}
            <motion.div
              className="mx-auto mb-4 h-32 w-32 drop-shadow-[0_10px_30px_rgba(168,85,247,0.5)] sm:h-40 sm:w-40"
              initial={{ opacity: 0, scale: 0.4, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              exit={{ opacity: 0, scale: 0.3, y: 120 }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { type: "spring", stiffness: 200, damping: 12 },
                y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <GrumpyBoy />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-sm uppercase tracking-[0.4em] text-slate-400"
            >
              Welcome to
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 14 }}
              className="mt-3 text-5xl font-extrabold tracking-tight sm:text-7xl"
            >
              <span className="bg-[linear-gradient(110deg,#c084fc,#f0abfc,#60a5fa,#22d3ee,#c084fc)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_5s_linear_infinite]">
                Khadush World
              </span>{" "}
              <motion.span
                className="inline-block"
                style={{ transformOrigin: "70% 70%" }}
                animate={{ rotate: [0, 18, -10, 18, 0] }}
                transition={{ delay: 0.9, duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
              >
                😎
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mx-auto mt-4 max-w-md text-slate-300"
            >
              Where AI does the work and the mascots do the vibing. Buckle up. 🚀💙
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              onClick={() => setShow(false)}
              className="mt-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            >
              Enter the vibe →
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="mt-4 text-xs text-slate-500"
            >
              (tap anywhere to skip)
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
