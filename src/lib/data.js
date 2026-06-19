import { supabase, hasSupabase } from "./supabase";
import { defaultContent } from "../data/defaults";

const CONTENT_KEY = "site_content";
const MESSAGES_KEY = "contact_messages";
const CONTENT_ROW_ID = "site";

// ---------------- Content ----------------

// Merge a saved snapshot over the code defaults. Saved values win, but newly
// added default fields (e.g. a new social platform) still appear so the site
// isn't frozen to whatever was last saved.
function mergeContent(saved) {
  if (!saved || typeof saved !== "object") return defaultContent;
  const merged = { ...defaultContent, ...saved };
  merged.profile = { ...defaultContent.profile, ...(saved.profile || {}) };
  const socialMap = new Map(defaultContent.socials.map((s) => [s.platform, { ...s }]));
  (saved.socials || []).forEach((s) => {
    if (s && s.platform) socialMap.set(s.platform, { ...(socialMap.get(s.platform) || {}), ...s });
  });
  merged.socials = [...socialMap.values()];
  return merged;
}

export async function loadContent() {
  if (hasSupabase) {
    const { data, error } = await supabase
      .from("content")
      .select("data")
      .eq("id", CONTENT_ROW_ID)
      .maybeSingle();
    if (error) throw error;
    return mergeContent(data?.data);
  }
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    return raw ? mergeContent(JSON.parse(raw)) : defaultContent;
  } catch {
    return defaultContent;
  }
}

export async function saveContent(content) {
  if (hasSupabase) {
    const { error } = await supabase
      .from("content")
      .upsert({ id: CONTENT_ROW_ID, data: content, updated_at: new Date().toISOString() });
    if (error) throw error;
    return;
  }
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
}

// ---------------- Contact messages (inbox) ----------------

export async function submitMessage({ name, email, message }) {
  if (hasSupabase) {
    const { error } = await supabase.from("contact_messages").insert({ name, email, message });
    if (error) throw error;
    return;
  }
  const list = readLocalMessages();
  list.unshift({
    id: crypto.randomUUID(),
    name,
    email,
    message,
    read: false,
    created_at: new Date().toISOString(),
  });
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(list));
}

export async function listMessages() {
  if (hasSupabase) {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  }
  return readLocalMessages();
}

export async function setMessageRead(id, read) {
  if (hasSupabase) {
    const { error } = await supabase.from("contact_messages").update({ read }).eq("id", id);
    if (error) throw error;
    return;
  }
  const list = readLocalMessages().map((m) => (m.id === id ? { ...m, read } : m));
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(list));
}

export async function deleteMessage(id) {
  if (hasSupabase) {
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const list = readLocalMessages().filter((m) => m.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(list));
}

function readLocalMessages() {
  try {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
  } catch {
    return [];
  }
}

// ---------------- Auth (Supabase only) ----------------

export async function signIn(email, password) {
  if (!hasSupabase) throw new Error("Admin login requires Supabase to be configured (.env keys).");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  if (hasSupabase) await supabase.auth.signOut();
}

export async function getSession() {
  if (!hasSupabase) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
}
