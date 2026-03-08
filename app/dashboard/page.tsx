"use client";

import { useTranslation } from "@/lib/i18n";

export default function DashboardOverviewPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {t("dashboard.overview")}
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            {t("dashboard.overviewDescription")}
          </p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stats cards */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-slate-500 tracking-wide uppercase">{t("dashboard.totalSales")}</h3>
            <p className="mt-4 text-4xl font-black text-slate-900">৳0</p>
            <div className="mt-4 flex items-center text-sm font-medium text-emerald-600">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              0% {t("dashboard.fromLastMonth")}
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 shadow-md shadow-indigo-900/20 hover:shadow-xl hover:shadow-indigo-900/30 hover:-translate-y-1 transition-all duration-300 group text-white">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-blue-100 tracking-wide uppercase">{t("dashboard.outputVat")}</h3>
            <p className="mt-4 text-4xl font-black text-white">৳0</p>
            <div className="mt-4 flex items-center text-sm font-medium text-blue-200">
              <svg className="w-4 h-4 mr-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {t("dashboard.awaitingTransactions")}
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-slate-500 tracking-wide uppercase">{t("dashboard.inputVat")}</h3>
            <p className="mt-4 text-4xl font-black text-slate-900">৳0</p>
            <div className="mt-4 flex items-center text-sm font-medium text-slate-400">
              {t("dashboard.noVendorPayments")}
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl bg-white p-10 shadow-sm border border-slate-100/50 border-dashed min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="h-20 w-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900">{t("dashboard.noData")}</h3>
        <p className="mt-2 text-slate-500 max-w-md mx-auto">
          {t("dashboard.noDataDescription")}
        </p>
        <button className="mt-6 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full shadow-sm hover:bg-slate-800 transition-colors">
          {t("dashboard.addTransaction")}
        </button>
      </div>
    </div>
  );
}
