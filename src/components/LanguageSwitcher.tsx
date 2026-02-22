"use client";

import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LOCALES = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "nl", label: "Nederlands" },
  { code: "es", label: "Español" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (code: string) => {
    setOpen(false);
    // Hard navigation to ensure messages reload fully
    window.location.href = `/${code}`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-black/70 transition-colors hover:bg-slate-50 cursor-pointer"
      >
        <Globe className="h-3.5 w-3.5" />
        {locale.toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 min-w-[130px] overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                l.code === locale
                  ? "bg-amber-400 text-black"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
