"use client";

import { useState } from "react";
import ContextualLinks from "@/components/ContextualLinks";
import { useTranslation } from "@/lib/i18n";
import { CalculatorIcon } from "@heroicons/react/24/outline";

export default function VatCalculatorPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<string>("1000");
  const [rate, setRate] = useState<number>(15);
  const [calculationType, setCalculationType] = useState<"exclusive" | "inclusive">("exclusive");

  const numAmount = parseFloat(amount) || 0;
  
  // Calculations
  let netAmount = 0;
  let vatAmount = 0;
  let grossAmount = 0;

  if (calculationType === "exclusive") {
    // Add VAT to price
    netAmount = numAmount;
    vatAmount = netAmount * (rate / 100);
    grossAmount = netAmount + vatAmount;
  } else {
    // Extract VAT from price
    grossAmount = numAmount;
    vatAmount = grossAmount - (grossAmount / (1 + rate / 100));
    netAmount = grossAmount - vatAmount;
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT' }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalculatorIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{t("vat.title")}</h1>
          </div>
          <p className="text-slate-600">{t("vat.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t("vat.amount")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-medium">৳</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  {t("vat.rate")}
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[5, 7.5, 10, 15].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRate(r)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        rate === r 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  {t("vat.type")}
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setCalculationType("exclusive")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      calculationType === "exclusive"
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t("vat.addVat")}
                  </button>
                  <button
                    onClick={() => setCalculationType("inclusive")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      calculationType === "inclusive"
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t("vat.removeVat")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl text-white flex flex-col justify-center">
            <h3 className="text-slate-400 font-medium tracking-wide text-sm uppercase mb-8">{t("vat.result")}</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-slate-700/50 pb-4">
                <div className="text-slate-300">{t("vat.netAmount")}</div>
                <div className="text-xl font-medium">{formatCurrency(netAmount)}</div>
              </div>
              
              <div className="flex justify-between items-end border-b border-slate-700/50 pb-4">
                <div className="text-slate-300">{t("vat.vatAmount")} ({rate}%)</div>
                <div className="text-xl font-medium text-blue-400">+{formatCurrency(vatAmount)}</div>
              </div>
              
              <div className="flex justify-between items-end pt-2">
                <div className="text-slate-200 font-medium">{t("vat.grossAmount")}</div>
                <div className="text-3xl font-bold tracking-tight text-white">{formatCurrency(grossAmount)}</div>
              </div>
            </div>
          </div>
        </div>

        <ContextualLinks 
          topic="Value Added Tax (VAT)" 
          links={[
            { label: "Understand Standard vs Truncated VAT Rates", url: "/category/vat-rates" },
            { label: "When to issue Mushak 6.3 (Tax Invoice)", url: "/category/mushak-6-3" }
          ]} 
        />
      </div>
    </div>
  );
}
