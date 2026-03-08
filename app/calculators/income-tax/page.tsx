"use client";

import { useState } from "react";
import ContextualLinks from "@/components/ContextualLinks";
import { BanknotesIcon } from "@heroicons/react/24/outline";

export default function IncomeTaxCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState<string>("800000");
  const [taxpayerType, setTaxpayerType] = useState<"general" | "female" | "senior">("general");

  const numIncome = parseFloat(annualIncome) || 0;

  // Simple basic slab calculation (approximate NBR generic logic 2023-24)
  // For General: First 350k: 0%, Next 100k: 5%, Next 300k: 10%, Next 400k: 15%, Next 500k: 20%, Rest: 25%
  let taxFreeLimit = 350000;
  if (taxpayerType === "female" || taxpayerType === "senior") {
    taxFreeLimit = 400000;
  }

  let totalTax = 0;
  let remainingIncome = Math.max(0, numIncome - taxFreeLimit);

  const calculateSlabTax = (slabLimit: number, rate: number) => {
    if (remainingIncome <= 0) return 0;
    const amountInSlab = Math.min(remainingIncome, slabLimit);
    remainingIncome -= amountInSlab;
    return amountInSlab * rate;
  };

  const taxSlabs = [
    { limit: 100000, rate: 0.05 },
    { limit: 300000, rate: 0.10 },
    { limit: 400000, rate: 0.15 },
    { limit: 500000, rate: 0.20 },
    { limit: Infinity, rate: 0.25 },
  ];

  for (const slab of taxSlabs) {
    totalTax += calculateSlabTax(slab.limit, slab.rate);
  }

  const effectiveTaxRate = numIncome > 0 ? (totalTax / numIncome) * 100 : 0;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT' }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <BanknotesIcon className="h-6 w-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Income Tax Estimator</h1>
          </div>
          <p className="text-slate-600">Quickly estimate your basic individual tax liability based on NBR slabs.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Annual Income (BDT)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-medium">৳</span>
                  </div>
                  <input
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Taxpayer Category
                </label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                    <input 
                      type="radio" 
                      name="type" 
                      value="general" 
                      checked={taxpayerType === "general"} 
                      onChange={() => setTaxpayerType("general")}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm font-medium text-slate-900">General Individual</span>
                  </label>
                  <label className="flex items-center bg-slate-50 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                    <input 
                      type="radio" 
                      name="type" 
                      value="female" 
                      checked={taxpayerType === "female"} 
                      onChange={() => setTaxpayerType("female")}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm font-medium text-slate-900">Female or Senior Citizen (65+ years)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-8 shadow-xl text-white flex flex-col justify-center">
            <h3 className="text-emerald-300 font-medium tracking-wide text-sm uppercase mb-8">Estimated Liability</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-emerald-700/50 pb-4">
                <div className="text-emerald-200">Total Income</div>
                <div className="text-xl font-medium">{formatCurrency(numIncome)}</div>
              </div>
              
              <div className="flex justify-between items-end border-b border-emerald-700/50 pb-4">
                <div className="text-emerald-200">Tax Payable</div>
                <div className="text-3xl font-bold tracking-tight text-white">{formatCurrency(totalTax)}</div>
              </div>
              
              <div className="flex justify-between items-end pt-2">
                <div className="text-emerald-200 font-medium">Effective Tax Rate</div>
                <div className="text-xl font-medium text-emerald-300">{effectiveTaxRate.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>

        <ContextualLinks 
          topic="Income Tax" 
          links={[
            { label: "Understand the Latest NBR Tax Slabs", url: "/category/tax-slabs" },
            { label: "How to declare wealth efficiently", url: "/category/wealth-statement" }
          ]} 
        />
      </div>
    </div>
  );
}
