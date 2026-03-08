"use client";

import { useTranslation } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "bn" : "en")}
      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
      title={locale === "en" ? "বাংলায় পরিবর্তন করুন" : "Switch to English"}
    >
      <span className="text-base">{locale === "en" ? "🇧🇩" : "🇬🇧"}</span>
      <span>{locale === "en" ? t("common.bengali") : t("common.english")}</span>
    </button>
  );
}
