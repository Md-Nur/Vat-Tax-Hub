"use client";

import { DocumentTextIcon, CheckBadgeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";

export default function FormsPage() {
  const { t } = useTranslation();

  const formsLinks = [
    {
      title: t("forms.mushakWizardTitle"),
      description: t("forms.mushakWizardDesc"),
      icon: PencilSquareIcon,
      href: "/forms/wizard",
      color: "text-purple-600",
      bgLight: "bg-purple-50",
    },
    {
      title: t("forms.samplesTitle"),
      description: t("forms.samplesDesc"),
      icon: DocumentTextIcon,
      href: "/forms/samples",
      color: "text-blue-600",
      bgLight: "bg-blue-50",
    },
    {
      title: t("forms.checklistTitle"),
      description: t("forms.checklistDesc"),
      icon: CheckBadgeIcon,
      href: "/compliance-checklist",
      color: "text-emerald-600",
      bgLight: "bg-emerald-50",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            {t("forms.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{t("forms.returnHelpers")}</span>
          </h1>
          <p className="text-lg text-slate-600">
            {t("forms.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {formsLinks.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href}
              className="group block relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-purple-500 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center rounded-2xl ${link.bgLight} p-4 mb-6 transition-transform duration-300 group-hover:scale-110`}>
                <link.icon className={`h-8 w-8 ${link.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{link.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {link.description}
              </p>
              <div className="flex items-center text-sm font-semibold text-purple-600 group-hover:text-indigo-600">
                {t("forms.explore")} 
                <span className="ml-2 transform text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
