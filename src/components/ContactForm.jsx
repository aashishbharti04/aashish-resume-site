import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const FIELD =
  "w-full rounded-xl border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none placeholder:text-slate-400 focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/30";

export default function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      await onSubmit({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        <p className="text-base font-semibold text-slate-900 dark:text-white">Message sent!</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full border border-slate-900/10 px-4 py-1.5 text-sm hover:bg-slate-900/5 dark:border-white/10 dark:hover:bg-white/5"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={FIELD}
          placeholder="Your name"
          value={form.name}
          onChange={update("name")}
          aria-label="Your name"
        />
        <input
          className={FIELD}
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={update("email")}
          aria-label="Your email"
        />
      </div>
      <textarea
        className={FIELD + " min-h-[120px] resize-y"}
        placeholder="Tell me about your project or role..."
        value={form.message}
        onChange={update("message")}
        aria-label="Your message"
      />
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-fuchsia-600 to-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send message
          </>
        )}
      </button>
    </form>
  );
}
