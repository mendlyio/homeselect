"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  { nameKey: "r1Name", textKey: "r1Text", service: "r1Service", rating: 5, initials: "SC" },
  { nameKey: "r2Name", textKey: "r2Text", service: "r2Service", rating: 5, initials: "AM" },
  { nameKey: "r3Name", textKey: "r3Text", service: "r3Service", rating: 5, initials: "PV" },
  { nameKey: "r4Name", textKey: "r4Text", service: "r4Service", rating: 5, initials: "LH" },
  { nameKey: "r5Name", textKey: "r5Text", service: "r5Service", rating: 5, initials: "KR" },
  { nameKey: "r6Name", textKey: "r6Text", service: "r6Service", rating: 4, initials: "FB" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= count ? "fill-amber-400 text-amber-400" : "text-black/10"}`}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const t = useTranslations("reviews");

  return (
    <div className="w-full max-w-md px-4">
      {/* Séparateur */}
      <div className="my-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-black/10" />
        <span className="text-xs font-bold uppercase tracking-widest text-black/30">{t("title")}</span>
        <div className="h-px flex-1 bg-black/10" />
      </div>

      {/* Rating global */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-5 flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm"
      >
        <div className="text-center">
          <p className="text-4xl font-black text-black">4.9</p>
          <Stars count={5} />
          <p className="mt-1 text-xs text-black/40">{t("based")}</p>
        </div>
        <div className="h-12 w-px bg-black/5" />
        <div className="text-center">
          <p className="text-sm font-black text-black">{t("verified")}</p>
          <p className="text-xs text-black/40">{t("verifiedDesc")}</p>
        </div>
      </motion.div>

      {/* Cartes avis */}
      <div className="flex flex-col gap-3">
        {REVIEWS.map(({ nameKey, textKey, service, rating, initials }, i) => (
          <motion.div
            key={nameKey}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              {/* Avatar initiales */}
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-400">
                <span className="text-xs font-black text-black">{initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-black truncate">{t(nameKey)}</p>
                  <Stars count={rating} />
                </div>
                <p className="mt-0.5 text-[10px] font-medium text-amber-600">{t(service)}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-black/60">{t(textKey)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
