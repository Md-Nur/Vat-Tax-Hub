"use client";

import { useTranslation } from "@/lib/i18n";
import { ArrowTopRightOnSquareIcon, BookOpenIcon, IdentificationIcon, CurrencyDollarIcon, PresentationChartLineIcon } from "@heroicons/react/24/outline";

export default function ResourcesPage() {
  const { t } = useTranslation();

  const resources = [
    {
      category: t("resources.vatRegistration"),
      icon: IdentificationIcon,
      color: "text-blue-600",
      bgLight: "bg-blue-50",
      links: [
        { title: t("resources.binOnline"), url: "/category/bin-registration" },
        { title: t("resources.turnoverTax"), url: "/category/turnover-tax" },
        { title: t("resources.updateAddress"), url: "/category/vat-online-portal" },
      ]
    },
    {
      category: t("resources.monthlyReturns"),
      icon: PresentationChartLineIcon,
      color: "text-purple-600",
      bgLight: "bg-purple-50",
      links: [
        { title: t("resources.commonMistakes"), url: "/category/mushak-9-1" },
        { title: t("resources.inputVat"), url: "/category/input-vat-adjustment" },
        { title: t("resources.nilReturns"), url: "/document/nil-return-guide" },
      ]
    },
    {
      category: t("resources.customsImport"),
      icon: CurrencyDollarIcon,
      color: "text-amber-600",
      bgLight: "bg-amber-50",
      links: [
        { title: t("resources.hsCodes"), url: "/category/hs-codes" },
        { title: t("resources.specialImport"), url: "/category/customs-sro" },
        { title: t("resources.advanceTax"), url: "/category/at-refund" },
      ]
    },
    {
      category: t("resources.generalTax"),
      icon: BookOpenIcon,
      color: "text-emerald-600",
      bgLight: "bg-emerald-50",
      links: [
        { title: t("resources.tdsChart"), url: "/category/tds-rate-chart" },
        { title: t("resources.directorsReturn"), url: "/category/individual-tax" },
        { title: t("resources.corporateTax"), url: "/category/corporate-tax" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            {t("resources.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">TaxVATPoint</span>
          </h1>
          <p className="text-lg text-slate-600">
            {t("resources.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((res, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${res.bgLight}`}>
                  <res.icon className={`h-8 w-8 ${res.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{res.category}</h3>
              </div>
              
              <ul className="space-y-4">
                {res.links.map((link, lidx) => (
                  <li key={lidx}>
                    <a
                      href={`https://taxvatpoint.com${link.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-transparent hover:bg-blue-50 hover:border-blue-100 transition-colors"
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 text-slate-400 group-hover:text-blue-500 mt-0.5 shrink-0" />
                      <span className="font-medium text-slate-700 group-hover:text-blue-700">
                        {link.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://taxvatpoint.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold shadow-lg transition-all hover:scale-105"
          >
            {t("resources.visit")}
            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
