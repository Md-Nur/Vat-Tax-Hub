"use client";

import { useTranslation } from "@/lib/i18n";

export default function DashboardOverviewPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{t("dashboard.overview") || "Overview"}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome to your business VAT and tax summary.
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards for future data */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-sm font-medium text-slate-500">Total Sales (This Month)</h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">৳0</p>
        </div>
        
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-sm font-medium text-slate-500">Output VAT Collected</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">৳0</p>
        </div>
        
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-sm font-medium text-slate-500">Input VAT Paid</h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">৳0</p>
        </div>
      </div>
      
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 min-h-[300px] flex items-center justify-center">
        <p className="text-slate-400 text-sm">Chart or recent transactions will appear here.</p>
      </div>
    </div>
  );
}
