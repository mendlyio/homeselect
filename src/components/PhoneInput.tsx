"use client";

import { useTranslations } from "next-intl";

type Props = {
  value: string;
  onChange: (val: string) => void;
  error?: string;
};

export function PhoneInput({ value, onChange, error }: Props) {
  const t = useTranslations("step2");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    onChange(raw);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold text-black">
        {t("phone")}
      </label>
      <div
        className={`flex items-center overflow-hidden rounded-xl border-2 bg-white transition-all ${
          error
            ? "border-red-400"
            : "border-slate-200 focus-within:border-black"
        }`}
      >
        <div className="flex items-center gap-1.5 border-r border-slate-200 bg-slate-50 px-3 py-3">
          <span className="text-sm">🇦🇪</span>
          <span className="text-sm font-bold text-black">+971</span>
        </div>
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          placeholder={t("phonePlaceholder")}
          className="flex-1 px-3 py-3 text-sm text-black outline-none placeholder:text-slate-400"
          maxLength={10}
        />
      </div>
      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
    </div>
  );
}
