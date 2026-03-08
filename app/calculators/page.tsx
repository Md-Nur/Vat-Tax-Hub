"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { CalculatorIcon, BanknotesIcon, GlobeAsiaAustraliaIcon } from "@heroicons/react/24/outline";

export default function CalculatorsPage() {
  const { t } = useTranslation();

  const calculators = [
    {
      title: t("calculators.vatTitle"),
      description: t("calculators.vatDesc"),
      icon: CalculatorIcon,
      href: "/calculators/vat",
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: t("calculators.incomeTaxTitle"),
      description: t("calculators.incomeTaxDesc"),
      icon: BanknotesIcon,
      href: "/calculators/income-tax",
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      title: t("calculators.importDutyTitle"),
      description: t("calculators.importDutyDesc"),
      icon: GlobeAsiaAustraliaIcon,
      href: "/calculators/import-duty",
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            {t("calculators.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t("calculators.vatCalculators")}</span>
          </h1>
          <p className="text-lg text-slate-600">
            {t("calculators.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc, idx) => (
            <Link 
              key={idx} 
              href={calc.href}
              className="group block relative rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:ring-blue-500 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center rounded-2xl ${calc.bgLight} p-4 mb-6 transition-transform duration-300 group-hover:scale-110`}>
                <calc.icon className={`h-8 w-8 ${calc.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{calc.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {calc.description}
              </p>
              <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-indigo-600">
                {t("calculators.startCalculating")} 
                <span className="ml-2 transform text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
