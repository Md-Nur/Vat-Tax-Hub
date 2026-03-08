"use client";

import { useState } from "react";
import ContextualLinks from "@/components/ContextualLinks";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/outline";

export default function ImportDutyCalculatorPage() {
  const [assessableValue, setAssessableValue] = useState<string>("100000");
  const [productType, setProductType] = useState<"raw_material" | "machinery" | "consumer_goods" | "luxury">("consumer_goods");

  const numValue = parseFloat(assessableValue) || 0;

  // Approximate CD rates based on categories
  const rates = {
    raw_material: { cd: 5, sd: 0, vat: 15, ait: 5, at: 5 },
    machinery: { cd: 1, sd: 0, vat: 15, ait: 5, at: 5 },
    consumer_goods: { cd: 25, sd: 20, vat: 15, ait: 5, at: 5 },
    luxury: { cd: 25, sd: 60, vat: 15, ait: 5, at: 5 },
  };

  const activeRates = rates[productType];

  const cdAmount = numValue * (activeRates.cd / 100);
  const sdAmount = (numValue + cdAmount) * (activeRates.sd / 100);
  const vatAmount = (numValue + cdAmount + sdAmount) * (activeRates.vat / 100);
  const aitAmount = numValue * (activeRates.ait / 100);
  const atAmount = (numValue + cdAmount + sdAmount) * (activeRates.at / 100);

  const totalDuties = cdAmount + sdAmount + vatAmount + aitAmount + atAmount;
  const totalLandingCost = numValue + totalDuties;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT' }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 rounded-lg">
              <GlobeAsiaAustraliaIcon className="h-6 w-6 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Import Duty Estimator</h1>
          </div>
          <p className="text-slate-600">Estimate customs duty, SD, VAT, AIT and AT based on product type.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Assessable Value (BDT)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-medium">৳</span>
                  </div>
                  <input
                    type="number"
                    value={assessableValue}
                    onChange={(e) => setAssessableValue(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Product Category
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value as any)}
                  className="block w-full pl-3 pr-10 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                >
                  <option value="raw_material">Raw Materials (approx. 5% CD)</option>
                  <option value="machinery">Capital Machinery (approx. 1% CD)</option>
                  <option value="consumer_goods">Consumer Goods (approx. 25% CD, 20% SD)</option>
                  <option value="luxury">Luxury Goods (approx. 25% CD, 60%+ SD)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-3xl p-8 shadow-xl text-white">
            <h3 className="text-amber-200 font-medium tracking-wide text-sm uppercase mb-6">Duty Breakdown</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center border-b border-amber-600/50 pb-2">
                <div className="text-amber-100">Customs Duty (CD) {activeRates.cd}%</div>
                <div className="font-medium">{formatCurrency(cdAmount)}</div>
              </div>
              <div className="flex justify-between items-center border-b border-amber-600/50 pb-2">
                <div className="text-amber-100">Supplementary Duty (SD) {activeRates.sd}%</div>
                <div className="font-medium">{formatCurrency(sdAmount)}</div>
              </div>
              <div className="flex justify-between items-center border-b border-amber-600/50 pb-2">
                <div className="text-amber-100">Import VAT {activeRates.vat}%</div>
                <div className="font-medium">{formatCurrency(vatAmount)}</div>
              </div>
              <div className="flex justify-between items-center border-b border-amber-600/50 pb-2">
                <div className="text-amber-100">Advance Income Tax (AIT) {activeRates.ait}%</div>
                <div className="font-medium">{formatCurrency(aitAmount)}</div>
              </div>
              <div className="flex justify-between items-center border-b border-amber-600/50 pb-4">
                <div className="text-amber-100">Advance Tax (AT) {activeRates.at}%</div>
                <div className="font-medium">{formatCurrency(atAmount)}</div>
              </div>
              
              <div className="flex justify-between items-end pt-2">
                <div className="text-amber-200 font-medium">Total Duty & Taxes</div>
                <div className="text-2xl font-bold tracking-tight text-white">{formatCurrency(totalDuties)}</div>
              </div>
              
              <div className="flex justify-between items-end pt-4 mt-4 border-t border-amber-500/30">
                <div className="text-amber-100 font-medium text-base">Total Landing Cost</div>
                <div className="text-3xl font-black text-amber-300">{formatCurrency(totalLandingCost)}</div>
              </div>
            </div>
          </div>
        </div>

        <ContextualLinks 
          topic="Import Duties" 
          links={[
            { label: "Locating specific HS Codes in the tariff schedule", url: "/category/hs-codes" },
            { label: "Exemptions under Special SROs", url: "/category/customs-sro" }
          ]} 
        />
      </div>
    </div>
  );
}
