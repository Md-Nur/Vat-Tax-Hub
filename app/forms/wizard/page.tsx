"use client";

import { useState } from "react";
import ContextualLinks from "@/components/ContextualLinks";
import { DocumentTextIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function FormWizardPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    bin: "",
    period: "",
    totalSales: "",
    totalVat: ""
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Mushak 9.1 Return Wizard</h1>
          <p className="text-slate-600">A step-by-step guide to prepare your monthly VAT return.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-purple-600 transition-all duration-300" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors ${
                  step >= s ? "bg-purple-600 text-white" : "bg-white text-slate-400 border-2 border-slate-200"
                }`}
              >
                {step > s ? <CheckIcon className="h-5 w-5" /> : s}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
            <span>Basic Info</span>
            <span>Sales & Purchases</span>
            <span>Review & Export</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold text-slate-900">Step 1: Business Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="block w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g. Acme Corp Ltd."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">BIN (Business Identification Number)</label>
                  <input
                    type="text"
                    value={formData.bin}
                    onChange={(e) => setFormData({...formData, bin: e.target.value})}
                    className="block w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g. 123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tax Period</label>
                  <input
                    type="month"
                    value={formData.period}
                    onChange={(e) => setFormData({...formData, period: e.target.value})}
                    className="block w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold text-slate-900">Step 2: Sales & VAT Data</h2>
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-4">
                Enter your total sales for the selected period. If you use our Dashboard, this can be synced automatically.
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Total Sales (BDT)</label>
                  <input
                    type="number"
                    value={formData.totalSales}
                    onChange={(e) => setFormData({...formData, totalSales: e.target.value})}
                    className="block w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Total Output VAT Collected (BDT)</label>
                  <input
                    type="number"
                    value={formData.totalVat}
                    onChange={(e) => setFormData({...formData, totalVat: e.target.value})}
                    className="block w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <DocumentTextIcon className="h-6 w-6 text-purple-600" />
                Step 3: Review & Generate
              </h2>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <dl className="divide-y divide-slate-200">
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-slate-500">Business Name</dt>
                    <dd className="text-sm text-slate-900">{formData.businessName || '-'}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-slate-500">BIN</dt>
                    <dd className="text-sm text-slate-900">{formData.bin || '-'}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-slate-500">Period</dt>
                    <dd className="text-sm text-slate-900">{formData.period || '-'}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-slate-500">Total Sales</dt>
                    <dd className="text-sm text-slate-900 font-bold">৳ {formData.totalSales || '0'}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-slate-500">Output VAT</dt>
                    <dd className="text-sm text-slate-900 font-bold text-purple-600">৳ {formData.totalVat || '0'}</dd>
                  </div>
                </dl>
              </div>
              <div className="text-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 mx-auto">
                  <DocumentTextIcon className="h-5 w-5" />
                  Generate Mushak 9.1 PDF
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
              step === 1 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-white text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Back
          </button>
          {step < 3 && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium shadow-sm transition-colors"
            >
              Continue
            </button>
          )}
        </div>

        <ContextualLinks 
          topic="Mushak 9.1" 
          links={[
            { label: "Detailed Guide on Filling Mushak 9.1", url: "/category/mushak-9-1" },
            { label: "Penalty for Late Submission", url: "/category/vat-penalties" }
          ]} 
        />
      </div>
    </div>
  );
}
