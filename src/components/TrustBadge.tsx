"use client";

import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function TrustBadge() {
  const t = useTranslations("trust");

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black shadow-sm">
      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
      {t("badge")}
    </div>
  );
}
