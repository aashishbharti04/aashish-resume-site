import { useEffect, useState } from "react";
import { loadContent } from "../lib/data";
import { defaultContent } from "../data/defaults";

export function useContent() {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    loadContent()
      .then((c) => alive && setContent(c))
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return { content, loading };
}
