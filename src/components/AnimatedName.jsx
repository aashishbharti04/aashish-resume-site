import { motion } from "framer-motion";

// Per-letter reveal + continuous gradient shimmer. `shimmer` keyframes live in index.css.
export default function AnimatedName({ name = "", className = "" }) {
  const letters = Array.from(name);
  return (
    <span
      className={
        "inline-block bg-[linear-gradient(110deg,#7c3aed,#db2777,#2563eb,#06b6d4,#7c3aed)] " +
        "bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_6s_linear_infinite] " +
        className
      }
      aria-label={name}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: "0.4em", rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.04 * i, type: "spring", stiffness: 220, damping: 16 }}
          style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}
