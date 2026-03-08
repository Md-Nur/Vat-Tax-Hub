const fs = require('fs');

const enPath = 'locales/en.json';
const bnPath = 'locales/bn.json';

let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
let bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

// Search Page
en.search = en.search || {};
bn.search = bn.search || {};

en.search.title = "Search Documents";
bn.search.title = "নথিপত্র খুঁজুন";

en.search.resultsFor = "Results for";
bn.search.resultsFor = "ফলাফল";

en.search.noResults = "No matching documents found. Try different keywords.";
bn.search.noResults = "কোনো মানানসই নথিপত্র পাওয়া যায়নি। ভিন্ন কীওয়ার্ড দিয়ে চেষ্টা করুন।";

en.search.enterTerm = "Enter a search term to find documents";
bn.search.enterTerm = "নথিপত্র খুঁজতে একটি কীওয়ার্ড লিখুন";


// Form Wizard Page
en.wizard = {
  "title": "Mushak 9.1 Return Wizard",
  "subtitle": "A step-by-step guide to prepare your monthly VAT return.",
  "basicInfo": "Basic Info",
  "salesPurchases": "Sales & Purchases",
  "reviewExport": "Review & Export",
  "step1": "Step 1: Business Details",
  "businessName": "Business Name",
  "businessNamePlaceholder": "e.g. Acme Corp Ltd.",
  "bin": "BIN (Business Identification Number)",
  "binPlaceholder": "e.g. 123456789",
  "taxPeriod": "Tax Period",
  "step2": "Step 2: Sales & VAT Data",
  "step2Hint": "Enter your total sales for the selected period. If you use our Dashboard, this can be synced automatically.",
  "totalSales": "Total Sales (BDT)",
  "totalOutputVat": "Total Output VAT Collected (BDT)",
  "step3": "Step 3: Review & Generate",
  "generatePdf": "Generate Mushak 9.1 PDF",
  "back": "Back",
  "continue": "Continue"
};

bn.wizard = {
  "title": "মূসক ৯.১ রিটার্ন উইজার্ড",
  "subtitle": "আপনার মাসিক ভ্যাট রিটার্ন প্রস্তুত করার জন্য একটি ধাপে ধাপে নির্দেশিকা।",
  "basicInfo": "প্রাথমিক তথ্য",
  "salesPurchases": "বিক্রয় ও ক্রয়",
  "reviewExport": "পর্যালোচনা ও রপ্তানি",
  "step1": "ধাপ ১: ব্যবসার বিবরণ",
  "businessName": "ব্যবসার নাম",
  "businessNamePlaceholder": "যেমন, এবিসি কর্পোরেশন লিমিটেড",
  "bin": "বিন (ব্যবসায় সনাক্তকরণ নম্বর)",
  "binPlaceholder": "যেমন, ১২৩৪৫৬৭৮৯",
  "taxPeriod": "করের মেয়াদ",
  "step2": "ধাপ ২: বিক্রয় ও ভ্যাট ডেটা",
  "step2Hint": "নির্বাচিত সময়ের জন্য আপনার মোট বিক্রয় ইনপুট করুন। আপনি যদি আমাদের ড্যাশবোর্ড ব্যবহার করেন, এটি স্বয়ংক্রিয়ভাবে সিঙ্ক হতে পারে।",
  "totalSales": "মোট বিক্রয় (টাকা)",
  "totalOutputVat": "মোট সংগৃহীত আউটপুট ভ্যাট (টাকা)",
  "step3": "ধাপ ৩: পর্যালোচনা ও তৈরি করুন",
  "generatePdf": "মূসক ৯.১ পিডিএফ (PDF) তৈরি করুন",
  "back": "ফিরে যান",
  "continue": "চালিয়ে যান"
};


// Admin Layout
en.admin = en.admin || {};
bn.admin = bn.admin || {};

en.admin.backToSite = "Back to site";
bn.admin.backToSite = "সাইটে ফিরে যান";


fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');
fs.writeFileSync(bnPath, JSON.stringify(bn, null, 2) + '\n');

console.log("Locales updated for search, wizard, and admin!");
