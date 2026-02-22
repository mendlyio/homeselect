"use client";

import { motion } from "framer-motion";
import { House, KeyRound, Check } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  value: "owner" | "tenant" | null;
  onChange: (val: "owner" | "tenant") => void;
};

export function OwnerTenantSelect({ value, onChange }: Props) {
  const t = useTranslations("step2");

  const options = [
    { key: "owner" as const, icon: House, label: t("owner") },
    { key: "tenant" as const, icon: KeyRound, label: t("tenant") },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-black">
        {t("ownerTitle")}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <motion.button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center gap-2.5 rounded-xl border-2 bg-white p-3 transition-all duration-200 cursor-pointer ${
              value === opt.key
                ? "border-black ring-1 ring-black"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            {value === opt.key && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400"
              >
                <Check className="h-3 w-3 text-black" strokeWidth={3} />
              </motion.div>
            )}
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                value === opt.key ? "bg-amber-400" : "bg-slate-100"
              }`}
            >
              <opt.icon
                className={`h-4.5 w-4.5 ${
                  value === opt.key ? "text-black" : "text-slate-400"
                }`}
                strokeWidth={2}
              />
            </div>
            <span className={`text-sm font-bold ${value === opt.key ? "text-black" : "text-slate-500"}`}>
              {opt.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
