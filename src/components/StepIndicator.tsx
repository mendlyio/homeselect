"use client";

import { motion } from "framer-motion";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export function StepIndicator({ currentStep, totalSteps }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-1.5 rounded-full ${
            i < currentStep
              ? "bg-black"
              : i === currentStep
                ? "bg-black"
                : "bg-black/20"
          }`}
          initial={false}
          animate={{ width: i === currentStep ? 32 : 10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
