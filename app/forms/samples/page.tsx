"use client";

import { useTranslation } from "@/lib/i18n";
import { DocumentArrowDownIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function SampleFormsPage() {
  const { t } = useTranslation();

  const samples = [
    {
      id: "mushak-6-3",
      title: t("samples.mushak63Title"),
      description: t("samples.mushak63Desc"),
      type: "PDF",
      size: "145 KB",
    },
    {
      id: "mushak-9-1",
      title: t("samples.mushak91Title"),
      description: t("samples.mushak91Desc"),
      type: "PDF",
      size: "210 KB",
    },
    {
      id: "treasury-challan",
      title: t("samples.treasuryChallanTitle"),
      description: t("samples.treasuryChallanDesc"),
      type: "PDF",
      size: "180 KB",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t("samples.sampleFormsTitle")}</h1>
          <p className="text-slate-600">{t("samples.sampleFormsDesc")}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <ul className="divide-y divide-slate-100">
            {samples.map((sample) => (
              <li key={sample.id} className="p-6 sm:px-8 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {sample.type}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 truncate">
                        {sample.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {sample.description}
                    </p>
                    <p className="mt-2 flex text-xs text-slate-400">
                      {t("samples.size")}: {sample.size}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                      <EyeIcon className="h-4 w-4 text-slate-500" />
                      {t("samples.preview")}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm transition-colors">
                      <DocumentArrowDownIcon className="h-4 w-4" />
                      {t("samples.download")}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
