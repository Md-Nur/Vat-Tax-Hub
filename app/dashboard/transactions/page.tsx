"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { PlusIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function TransactionsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"sales" | "purchases">("sales");

  return (
    <div className="space-y-6">
      <header className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("dashboard.transactions")}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {t("dashboard.manageTransactions")}
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0 flex gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
          >
            <ArrowUpTrayIcon className="-ml-0.5 h-5 w-5 text-slate-400" aria-hidden="true" />
            {t("dashboard.uploadCsv")}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            {t("dashboard.newEntry")}
          </button>
        </div>
      </header>
      
      <div className="bg-white shadow-sm rounded-2xl border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("sales")}
              className={`w-1/2 md:w-auto border-b-2 py-4 px-8 text-center text-sm font-medium ${
                activeTab === "sales"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {t("dashboard.salesOutputs")}
            </button>
            <button
              onClick={() => setActiveTab("purchases")}
              className={`w-1/2 md:w-auto border-b-2 py-4 px-8 text-center text-sm font-medium ${
                activeTab === "purchases"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {t("dashboard.purchasesInputs")}
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-slate-900">{t("dashboard.noTransactions")} {activeTab === "sales" ? t("dashboard.salesOutputs") : t("dashboard.purchasesInputs")}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {t("dashboard.getStartedTransactions")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
