"use client";

import { motion } from "framer-motion";
import { FileText, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
};

export function ValueProps() {
  const t = useTranslations("valueProps");

  const props = [
    { icon: FileText, title: t("quotes"), desc: t("quotesDesc") },
    { icon: ShieldCheck, title: t("certified"), desc: t("certifiedDesc") },
    { icon: Zap, title: t("fast"), desc: t("fastDesc") },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-2"
    >
      {props.map((p) => (
        <motion.div
          key={p.title}
          variants={item}
          className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 shadow-sm"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-400">
            <p.icon className="h-3 w-3 text-black" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold leading-tight text-black">{p.title}</p>
            <p className="text-[8px] leading-tight text-black/50">{p.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
