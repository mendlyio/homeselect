"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hammer,
  Paintbrush,
  TreePine,
  AirVent,
  Droplets,
  Zap,
  Wrench,
  DoorOpen,
  Truck,
  ArrowLeft,
  ArrowRight,
  Send,
  CheckCircle2,
  RotateCcw,
  ClipboardList,
  Users,
  ThumbsUp,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { TrustBadge } from "@/components/TrustBadge";
import { StepIndicator } from "@/components/StepIndicator";
import { ServiceCard } from "@/components/ServiceCard";
import { OwnerTenantSelect } from "@/components/OwnerTenantSelect";
import { PhoneInput } from "@/components/PhoneInput";
import { ValueProps } from "@/components/ValueProps";
import { Reviews } from "@/components/Reviews";
import { trackLead } from "@/components/MetaPixel";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

type ServiceKey = "renovation" | "painting" | "gardening" | "ac" | "plumbing" | "electrical" | "handyman" | "doors" | "moving";

const SERVICES: { key: ServiceKey; icon: typeof Hammer }[] = [
  { key: "renovation", icon: Hammer },
  { key: "painting", icon: Paintbrush },
  { key: "gardening", icon: TreePine },
  { key: "ac", icon: AirVent },
  { key: "plumbing", icon: Droplets },
  { key: "electrical", icon: Zap },
  { key: "handyman", icon: Wrench },
  { key: "doors", icon: DoorOpen },
  { key: "moving", icon: Truck },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 250 : -250, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -250 : 250, opacity: 0 }),
};

export default function HomePage() {
  const th = useTranslations("hero");
  const t1 = useTranslations("step1");
  const t2 = useTranslations("step2");
  const t3 = useTranslations("step3");
  const tv = useTranslations("validation");

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceKey[]>([]);
  const [ownerStatus, setOwnerStatus] = useState<"owner" | "tenant" | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const toggleService = (key: ServiceKey) => {
    setSelectedServices((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
    setErrors((e) => ({ ...e, services: "" }));
  };

  const goNext = () => {
    if (step === 0 && selectedServices.length === 0) {
      setErrors({ services: tv("selectService") });
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!ownerStatus) newErrors.status = tv("selectStatus");
    if (!name.trim()) newErrors.name = tv("enterName");
    if (!phone.trim()) newErrors.phone = tv("enterPhone");
    else if (phone.length < 7) newErrors.phone = tv("phoneFormat");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        services: selectedServices,
        ownerStatus,
        name: name.trim(),
        phone: `+971${phone}`,
      };

      await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      trackLead();
      setDirection(1);
      setStep(2);
    } catch {
      // silently handle
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSelectedServices([]);
    setOwnerStatus(null);
    setName("");
    setPhone("");
    setErrors({});
    setDirection(-1);
    setStep(0);
  };

  const serviceLabels: Record<ServiceKey, string> = {
    renovation: t1("renovation"),
    painting: t1("painting"),
    gardening: t1("gardening"),
    ac: t1("ac"),
    plumbing: t1("plumbing"),
    electrical: t1("electrical"),
    handyman: t1("handyman"),
    doors: t1("doors"),
    moving: t1("moving"),
  };

  return (
    <div className="flex min-h-screen flex-col items-center pb-10 pt-0">
      {/* Header plein bord */}
      <header className="mb-4 flex w-full items-center justify-between bg-white px-4 py-3 shadow-sm">
        <Logo />
        <LanguageSwitcher />
      </header>

      <div className="w-full max-w-md px-4">

        {/* Hero - step 0 only */}
        <AnimatePresence>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
              transition={{ duration: 0.25 }}
              className="mb-4"
            >
              <div className="mb-3">
                <TrustBadge />
              </div>
              <h1 className="text-3xl font-black leading-[1.1] text-black sm:text-4xl">
                {th("title")}{" "}
                <span className="underline decoration-black/20 decoration-4 underline-offset-4">
                  {th("titleHighlight")}
                </span>
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                {th("subtitle")}
              </p>
              <div className="mt-4">
                <ValueProps />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step indicator */}
        <div className="mb-4">
          <StepIndicator currentStep={step} totalSteps={3} />
        </div>

        {/* Form steps */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            {/* STEP 0 - Services */}
            {step === 0 && (
              <motion.div
                key="step0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <p className="mb-3 text-sm font-medium text-black/50">{t1("subtitle")}</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {SERVICES.map((service, i) => (
                    <ServiceCard
                      key={service.key}
                      icon={service.icon}
                      label={t1(service.key)}
                      selected={selectedServices.includes(service.key)}
                      onToggle={() => toggleService(service.key)}
                      index={i}
                    />
                  ))}
                </div>

                {errors.services && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2.5 text-center text-sm font-semibold text-red-500"
                  >
                    {errors.services}
                  </motion.p>
                )}

                <motion.button
                  onClick={goNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-emerald-700 cursor-pointer"
                >
                  {t1("next")}
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )}

            {/* STEP 1 - Contact */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="mb-4 text-center">
                  <h2 className="text-2xl font-black text-black">
                    {t2("title")}
                  </h2>
                  <p className="mt-1 text-sm text-black/60">{t2("subtitle")}</p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-xl">
                  <div className="space-y-4">
                    <OwnerTenantSelect
                      value={ownerStatus}
                      onChange={(val) => {
                        setOwnerStatus(val);
                        setErrors((e) => ({ ...e, status: "" }));
                      }}
                    />
                    {errors.status && (
                      <p className="text-xs font-semibold text-red-500">
                        {errors.status}
                      </p>
                    )}

                    <div className="space-y-1.5">
                      <label className="block text-sm font-bold text-black">
                        {t2("name")}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                        placeholder={t2("namePlaceholder")}
                        className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-slate-400 transition-all ${
                          errors.name
                            ? "border-red-400"
                            : "border-slate-200 focus:border-black"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs font-semibold text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <PhoneInput
                      value={phone}
                      onChange={(val) => {
                        setPhone(val);
                        setErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                      error={errors.phone}
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <motion.button
                    onClick={goBack}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-black/70 shadow-md transition-all hover:shadow-lg cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t2("back")}
                  </motion.button>

                  <motion.button
                    onClick={handleSubmit}
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.97 }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
                  >
                    {submitting ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t2("submit")}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 - Confirmation */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                    className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg"
                  >
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </motion.div>
                  <h2 className="text-2xl font-black text-black sm:text-3xl">
                    {t3("title")}
                  </h2>
                  <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-black/60">
                    {t3("subtitle")}
                  </p>
                </div>

                {/* 3-step visual */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-5 grid grid-cols-3 gap-2"
                >
                  {[
                    { icon: ClipboardList, label: "1" },
                    { icon: Users, label: "2" },
                    { icon: ThumbsUp, label: "3" },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-3 shadow-lg"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400">
                        <s.icon className="h-4 w-4 text-black" strokeWidth={2} />
                      </div>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-black shadow ring-1 ring-black/10">
                        {s.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-3 rounded-2xl bg-white p-4 shadow-lg"
                >
                  <h3 className="mb-2.5 text-[10px] font-black uppercase tracking-widest text-black/40">
                    {t3("summary")}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-black/50">{t3("services")}</span>
                      <span className="max-w-[55%] text-right font-bold text-black">
                        {selectedServices.map((s) => serviceLabels[s]).join(", ")}
                      </span>
                    </div>
                    <div className="h-px bg-black/5" />
                    <div className="flex items-center justify-between">
                      <span className="text-black/50">{t3("status")}</span>
                      <span className="font-bold text-black">
                        {ownerStatus === "owner" ? t2("owner") : t2("tenant")}
                      </span>
                    </div>
                    <div className="h-px bg-black/5" />
                    <div className="flex items-center justify-between">
                      <span className="text-black/50">{t3("contact")}</span>
                      <div className="text-right">
                        <p className="font-bold text-black">{name}</p>
                        <p className="text-xs text-black/40">+971 {phone}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* What's next */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="mt-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-black text-black">{t3("whatsNext")}</p>
                  <p className="mt-1 text-xs leading-relaxed text-black/60">
                    {t3("whatsNextDesc")}
                  </p>
                </motion.div>

                <motion.button
                  onClick={reset}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black/70 shadow-md transition-all hover:shadow-lg cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t3("newRequest")}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>{/* max-w-md */}

      {/* Avis clients */}
      <Reviews />

    </div>
  );
}
