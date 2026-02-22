"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onToggle: () => void;
  index: number;
};

export function ServiceCard({
  icon: Icon,
  label,
  selected,
  onToggle,
  index,
}: Props) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative flex flex-col items-center gap-2 rounded-xl bg-white p-3 transition-all duration-200 cursor-pointer ${
        selected
          ? "ring-[3px] ring-black shadow-xl"
          : "shadow-lg hover:shadow-xl"
      }`}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400"
        >
          <Check className="h-3 w-3 text-black" strokeWidth={3} />
        </motion.div>
      )}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
          selected ? "bg-amber-400" : "bg-amber-100"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${selected ? "text-black" : "text-amber-700"}`}
          strokeWidth={1.8}
        />
      </div>
      <span className="text-[11px] font-bold leading-tight text-center text-black">{label}</span>
    </motion.button>
  );
}
