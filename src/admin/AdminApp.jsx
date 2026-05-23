import { useEffect, useState } from "react";
import {
  Inbox, Pencil, LogOut, Trash2, Mail, Plus, Save, Loader2, ArrowLeft, MailOpen, ShieldAlert,
} from "lucide-react";
import { hasSupabase, supabase } from "../lib/supabase";
import {
  loadContent, saveContent, listMessages, setMessageRead, deleteMessage,
  signIn, signOut, getSession,
} from "../lib/data";

const SOCIAL_PLATFORMS = ["github", "linkedin", "x", "instagram", "youtube"];
const input =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/30";
const btn =
  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition";

export default function AdminApp() {
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    let alive = true;
    getSession().then((s) => {
      if (!alive) return;
      setSession(s);
      setAuthReady(true);
    });
    if (hasSupabase) {
      const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
      return () => data.subscription.unsubscribe();
    }
    return () => {
      alive = false;
    };
  }, []);

  if (!authReady) return <Centered><Loader2 className="h-6 w-6 animate-spin" /></Centered>;

  // With Supabase configured, require login. Without it (local dev), open in local mode.
  if (hasSupabase && !session) return <Login />;

  return <Dashboard localMode={!hasSupabase} onSignOut={() => signOut()} />;
}

function Centered({ children }) {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-100">{children}</div>
  );
}

function BackToSite() {
  return (
    <a href="#/" className={btn + " text-slate-300 hover:bg-white/5"}>
      <ArrowLeft className="h-4 w-4" /> Back to site
    </a>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err?.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Centered>
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div>
          <h1 className="text-xl font-bold">Admin login</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to manage your portfolio.</p>
        </div>
        <input className={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button disabled={busy} className={btn + " w-full justify-center bg-gradient-to-br from-fuchsia-600 to-sky-600 text-white disabled:opacity-60"}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
        </button>
        <BackToSite />
      </form>
    </Centered>
  );
}

function Dashboard({ localMode, onSignOut }) {
  const [tab, setTab] = useState("inbox");
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold">Dashboard</h1>
            <div className="ml-3 flex gap-1">
              <TabBtn active={tab === "inbox"} onClick={() => setTab("inbox")}><Inbox className="h-4 w-4" /> Inbox</TabBtn>
              <TabBtn active={tab === "content"} onClick={() => setTab("content")}><Pencil className="h-4 w-4" /> Content</TabBtn>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BackToSite />
            {!localMode && (
              <button onClick={onSignOut} className={btn + " text-slate-300 hover:bg-white/5"}>
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            )}
          </div>
        </div>
      </header>

      {localMode && (
        <div className="mx-auto mt-4 flex max-w-5xl items-start gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Local mode: Supabase isn&apos;t configured yet, so edits and messages are stored only in this
            browser. Add your Supabase keys to <code>.env</code> to enable real login, cross-device editing,
            and a shared contact inbox.
          </span>
        </div>
      )}

      <main className="mx-auto max-w-5xl px-4 py-6">
        {tab === "inbox" ? <InboxPanel /> : <ContentPanel />}
      </main>
    </div>
  );
}

function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
        active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------- Inbox ----------------
function InboxPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => listMessages().then(setMessages).finally(() => setLoading(false));
  useEffect(() => { refresh(); }, []);

  async function toggleRead(m) {
    await setMessageRead(m.id, !m.read);
    refresh();
  }
  async function remove(id) {
    await deleteMessage(id);
    refresh();
  }

  if (loading) return <Loader2 className="h-5 w-5 animate-spin" />;
  if (messages.length === 0)
    return <p className="text-sm text-slate-400">No messages yet. Submissions from the contact form land here.</p>;

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div key={m.id} className={`rounded-xl border p-4 ${m.read ? "border-white/10 bg-white/5" : "border-fuchsia-400/30 bg-fuchsia-400/5"}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold">{m.name} {!m.read && <span className="ml-1 rounded-full bg-fuchsia-500/30 px-2 py-0.5 text-[11px] text-fuchsia-200">new</span>}</p>
              <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 text-sm text-sky-300 hover:underline">
                <Mail className="h-3.5 w-3.5" /> {m.email}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => toggleRead(m)} title={m.read ? "Mark unread" : "Mark read"} className={btn + " text-slate-300 hover:bg-white/10"}>
                {m.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
              </button>
              <button onClick={() => remove(m.id)} title="Delete" className={btn + " text-rose-300 hover:bg-rose-500/10"}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-200">{m.message}</p>
          <p className="mt-2 text-xs text-slate-500">{new Date(m.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

// ---------------- Content editor ----------------
function Field({ label, value, onChange, textarea }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
      {textarea ? (
        <textarea className={input + " min-h-[80px]"} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={input} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function Group({ title, children, onAdd }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {onAdd && (
          <button onClick={onAdd} className={btn + " bg-white/10 text-white hover:bg-white/15"}>
            <Plus className="h-4 w-4" /> Add
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function ContentPanel() {
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [error, setError] = useState("");

  useEffect(() => { loadContent().then(setContent); }, []);
  if (!content) return <Loader2 className="h-5 w-5 animate-spin" />;

  const set = (patch) => setContent((c) => ({ ...c, ...patch }));
  const setProfile = (k, v) => set({ profile: { ...content.profile, [k]: v } });

  async function save() {
    setStatus("saving");
    setError("");
    try {
      await saveContent(content);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Save failed.");
    }
  }

  // socials normalized so all platforms render
  const socialUrl = (p) => content.socials.find((s) => s.platform === p)?.url || "";
  const setSocial = (p, url) => {
    const others = content.socials.filter((s) => s.platform !== p);
    set({ socials: [...others, { platform: p, url }] });
  };

  return (
    <div className="space-y-6 pb-24">
      <Group title="Profile">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name" value={content.profile.name} onChange={(v) => setProfile("name", v)} />
          <Field label="Role / headline" value={content.profile.role} onChange={(v) => setProfile("role", v)} />
          <Field label="Location" value={content.profile.location} onChange={(v) => setProfile("location", v)} />
          <Field label="Email" value={content.profile.email} onChange={(v) => setProfile("email", v)} />
          <Field label="Phone" value={content.profile.phone} onChange={(v) => setProfile("phone", v)} />
        </div>
        <div className="mt-3">
          <Field label="Hero tagline" textarea value={content.profile.tagline || ""} onChange={(v) => setProfile("tagline", v)} />
        </div>
        <div className="mt-3">
          <Field label="Highlighted quote" value={content.profile.quote || ""} onChange={(v) => setProfile("quote", v)} />
        </div>
        <div className="mt-3">
          <Field label="About" textarea value={content.profile.about} onChange={(v) => setProfile("about", v)} />
        </div>
      </Group>

      <Group title="Social links">
        <div className="grid gap-3 sm:grid-cols-2">
          {SOCIAL_PLATFORMS.map((p) => (
            <Field key={p} label={p} value={socialUrl(p)} onChange={(v) => setSocial(p, v)} />
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">Leave a field blank to hide that icon on the site.</p>
      </Group>

      <Group title="Projects" onAdd={() => set({ projects: [...content.projects, { title: "New project", desc: "", href: "", tags: [] }] })}>
        <div className="space-y-4">
          {content.projects.map((p, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title" value={p.title} onChange={(v) => updateItem(set, content, "projects", i, { title: v })} />
                <Field label="Live URL" value={p.href} onChange={(v) => updateItem(set, content, "projects", i, { href: v })} />
              </div>
              <div className="mt-3">
                <Field label="Description" textarea value={p.desc} onChange={(v) => updateItem(set, content, "projects", i, { desc: v })} />
              </div>
              <div className="mt-3">
                <Field label="Tags (comma-separated)" value={(p.tags || []).join(", ")} onChange={(v) => updateItem(set, content, "projects", i, { tags: splitCsv(v) })} />
              </div>
              <RemoveBtn onClick={() => set({ projects: content.projects.filter((_, j) => j !== i) })} />
            </div>
          ))}
        </div>
      </Group>

      <Group title="Skills" onAdd={() => set({ skills: [...content.skills, { group: "New group", items: [] }] })}>
        <div className="space-y-4">
          {content.skills.map((g, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-4">
              <Field label="Group" value={g.group} onChange={(v) => updateItem(set, content, "skills", i, { group: v })} />
              <div className="mt-3">
                <Field label="Items (comma-separated)" value={g.items.join(", ")} onChange={(v) => updateItem(set, content, "skills", i, { items: splitCsv(v) })} />
              </div>
              <RemoveBtn onClick={() => set({ skills: content.skills.filter((_, j) => j !== i) })} />
            </div>
          ))}
        </div>
      </Group>

      <Group title="Experience" onAdd={() => set({ experience: [...content.experience, { org: "New role", period: "", points: [] }] })}>
        <div className="space-y-4">
          {content.experience.map((e, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Organization / role" value={e.org} onChange={(v) => updateItem(set, content, "experience", i, { org: v })} />
                <Field label="Period · location" value={e.period} onChange={(v) => updateItem(set, content, "experience", i, { period: v })} />
              </div>
              <div className="mt-3">
                <Field label="Bullet points (one per line)" textarea value={e.points.join("\n")} onChange={(v) => updateItem(set, content, "experience", i, { points: splitLines(v) })} />
              </div>
              <RemoveBtn onClick={() => set({ experience: content.experience.filter((_, j) => j !== i) })} />
            </div>
          ))}
        </div>
      </Group>

      <Group title="Education" onAdd={() => set({ education: [...content.education, { school: "New school", period: "" }] })}>
        <div className="space-y-4">
          {content.education.map((ed, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="School" value={ed.school} onChange={(v) => updateItem(set, content, "education", i, { school: v })} />
                <Field label="Period" value={ed.period} onChange={(v) => updateItem(set, content, "education", i, { period: v })} />
              </div>
              <RemoveBtn onClick={() => set({ education: content.education.filter((_, j) => j !== i) })} />
            </div>
          ))}
        </div>
      </Group>

      <Group title="Certifications">
        <Field
          label="One certification per line"
          textarea
          value={content.certs.join("\n")}
          onChange={(v) => set({ certs: splitLines(v) })}
        />
      </Group>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <span className="text-sm text-slate-400">
            {status === "saved" && "Saved!"}
            {status === "error" && <span className="text-rose-400">{error}</span>}
          </span>
          <button onClick={save} disabled={status === "saving"} className={btn + " bg-gradient-to-br from-fuchsia-600 to-sky-600 text-white disabled:opacity-60"}>
            {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function RemoveBtn({ onClick }) {
  return (
    <button onClick={onClick} className={btn + " mt-3 text-rose-300 hover:bg-rose-500/10"}>
      <Trash2 className="h-4 w-4" /> Remove
    </button>
  );
}

// helpers
function updateItem(set, content, key, index, patch) {
  set({ [key]: content[key].map((it, j) => (j === index ? { ...it, ...patch } : it)) });
}
const splitCsv = (v) => v.split(",").map((s) => s.trim()).filter(Boolean);
const splitLines = (v) => v.split("\n").map((s) => s.trim()).filter(Boolean);
