const fs = require('fs');

const enPath = 'locales/en.json';
const bnPath = 'locales/bn.json';

let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
let bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

// Calculators
en.calculators = {
  "title": "Smart Tax",
  "vatCalculators": "& VAT Calculators",
  "subtitle": "Free, fast, and accurate calculators designed specifically for Bangladesh tax compliance.",
  "startCalculating": "Start calculating",
  "vatTitle": "VAT Calculator",
  "vatDesc": "Calculate VAT (forward & backward) instantly. Includes standard and reduced rates.",
  "incomeTaxTitle": "Income Tax Estimator",
  "incomeTaxDesc": "Quickly estimate your individual or basic business income tax liability.",
  "importDutyTitle": "Import Duty Estimator",
  "importDutyDesc": "Estimate import duties and landing costs based on product types."
};

bn.calculators = {
  "title": "স্মার্ট কর",
  "vatCalculators": "এবং ভ্যাট ক্যালকুলেটর",
  "subtitle": "বাংলাদেশের কর কমপ্লায়েন্সের জন্য বিশেষভাবে ডিজাইন করা ফ্রি, দ্রুত এবং নির্ভুল ক্যালকুলেটর।",
  "startCalculating": "হিসাব শুরু করুন",
  "vatTitle": "ভ্যাট ক্যালকুলেটর",
  "vatDesc": "ভ্যাট (সামনে ও পেছনে) তাৎক্ষণিকভাবে হিসাব করুন। স্টান্ডার্ড এবং হ্রাসকৃত হার অন্তর্ভুক্ত।",
  "incomeTaxTitle": "আয়কর প্রাক্কলনকারী",
  "incomeTaxDesc": "আপনার ব্যক্তিগত বা প্রাথমিক ব্যবসায়িক আয়করের দায় দ্রুত অনুমান করুন।",
  "importDutyTitle": "আমদানি শুল্ক প্রাক্কলনকারী",
  "importDutyDesc": "পণ্যের প্রকারের উপর ভিত্তি করে আমদানি শুল্ক এবং ল্যান্ডিং খরচ অনুমান করুন।"
};

// Income Tax Calculator
en.incomeTax = {
  "title": "Income Tax Estimator",
  "subtitle": "Quickly estimate your basic individual tax liability based on NBR slabs.",
  "annualIncome": "Annual Income (BDT)",
  "category": "Taxpayer Category",
  "general": "General Individual",
  "femaleSenior": "Female or Senior Citizen (65+ years)",
  "liability": "Estimated Liability",
  "totalIncome": "Total Income",
  "taxPayable": "Tax Payable",
  "effectiveRate": "Effective Tax Rate"
};

bn.incomeTax = {
  "title": "আয়কর প্রাক্কলনকারী",
  "subtitle": "এনবিআর (NBR) স্ল্যাবের উপর ভিত্তি করে আপনার প্রাথমিক ব্যক্তিগত করের দায় দ্রুত অনুমান করুন।",
  "annualIncome": "বার্ষিক আয় (টাকা)",
  "category": "করদাতার ধরন",
  "general": "সাধারণ ব্যক্তি",
  "femaleSenior": "মহিলা বা প্রবীণ নাগরিক (৬৫+ বছর)",
  "liability": "আনুমানিক দায়",
  "totalIncome": "মোট আয়",
  "taxPayable": "প্রদেয় কর",
  "effectiveRate": "কার্যকর করের হার"
};

// VAT Calculator
en.vat = {
  "title": "VAT Calculator",
  "subtitle": "Calculate VAT forwards or backwards instantly.",
  "amount": "Amount (BDT)",
  "rate": "VAT Rate",
  "type": "Calculation Type",
  "addVat": "Add VAT (Exclusive)",
  "removeVat": "Remove VAT (Inclusive)",
  "result": "Calculation Result",
  "netAmount": "Net Amount",
  "vatAmount": "VAT Amount",
  "grossAmount": "Gross Amount"
};

bn.vat = {
  "title": "ভ্যাট ক্যালকুলেটর",
  "subtitle": "ভ্যাট (সামনে ও পেছনে) তাৎক্ষণিকভাবে হিসাব করুন।",
  "amount": "পরিমাণ (টাকা)",
  "rate": "ভ্যাটের হার",
  "type": "হিসাবের ধরন",
  "addVat": "ভ্যাট যোগ করুন (এক্সক্লুসিভ)",
  "removeVat": "ভ্যাট বাদ দিন (ইনক্লুসিভ)",
  "result": "হিসাবের ফলাফল",
  "netAmount": "নিট পরিমাণ",
  "vatAmount": "ভ্যাটের পরিমাণ",
  "grossAmount": "মোট পরিমাণ"
};

// Checklist
en.checklist = {
  "title": "Compliance Checklist",
  "subtitle": "Never miss a deadline. Keep track of your monthly and annual tax obligations.",
  "monthly": "Monthly Obligations",
  "annual": "Annual Obligations",
  "due": "Due:",
  "vatReturn": "Submit Mushak 9.1 (Monthly VAT Return)",
  "vatReturnDeadline": "15th of next month",
  "vdsCert": "Issue VDS Certificate (Mushak 6.6)",
  "vdsCertDeadline": "Within 3 days of deduction",
  "taxReturn": "File Annual Income Tax Return",
  "taxReturnDeadline": "30th November (General)",
  "auditReport": "Submit Audited Financials",
  "auditReportDeadline": "With Income Tax Return"
};

bn.checklist = {
  "title": "কমপ্লায়েন্স চেকলিস্ট",
  "subtitle": "কখনো সময়সীমা মিস করবেন না। আপনার মাসিক এবং বার্ষিক করের দায়বদ্ধতার হিসাব রাখুন।",
  "monthly": "মাসিক দায়বদ্ধতা",
  "annual": "বার্ষিক দায়বদ্ধতা",
  "due": "সময়সীমা:",
  "vatReturn": "মূসক ৯.১ জমা দিন (মাসিক ভ্যাট রিটার্ন)",
  "vatReturnDeadline": "পরবর্তী মাসের ১৫ তারিখ",
  "vdsCert": "ভিডিএস (VDS) প্রত্যয়নপত্র ইস্যু করুন (মূসক ৬.৬)",
  "vdsCertDeadline": "কর্তনের ৩ দিনের মধ্যে",
  "taxReturn": "বার্ষিক আয়কর রিটার্ন দাখিল করুন",
  "taxReturnDeadline": "৩০শ নভেম্বর (সাধারণ)",
  "auditReport": "নিরীক্ষিত আর্থিক প্রতিবেদন জমা দিন",
  "auditReportDeadline": "আয়কর রিটার্নের সাথে"
};

// Forms Helper
en.forms = {
  "title": "Form",
  "returnHelpers": "& Return Helpers",
  "subtitle": "Simplify your tax return process. Use our wizards or download pre-filled PDF samples.",
  "explore": "Explore tool",
  "mushakWizardTitle": "Mushak Wizard",
  "mushakWizardDesc": "Step-by-step guide to generating common NBR VAT forms.",
  "samplesTitle": "Pre-filled Samples",
  "samplesDesc": "View dummy samples of common tax forms. Edit and export to PDF.",
  "checklistTitle": "Compliance Checklist",
  "checklistDesc": "Stay organized with monthly and annual compliance task lists."
};

bn.forms = {
  "title": "ফর্ম",
  "returnHelpers": "এবং রিটার্ন হেল্পার",
  "subtitle": "আপনার কর রিটার্ন প্রক্রিয়া সহজ করুন। আমাদের উইজার্ডগুলি ব্যবহার করুন বা পূরণকৃত পিডিএফ (PDF) নমুনা ডাউনলোড করুন।",
  "explore": "টুল অন্বেষণ করুন",
  "mushakWizardTitle": "মূসক উইজার্ড",
  "mushakWizardDesc": "সাধারণ এনবিআর (NBR) ভ্যাট ফর্মগুলো তৈরিতে ধাপে ধাপে নির্দেশিকা।",
  "samplesTitle": "পূরণকৃত নমুনা",
  "samplesDesc": "সাধারণ কর ফর্মগুলোর ডামি নমুনা দেখুন। সম্পাদনা এবং পিডিএফ (PDF) এ রপ্তানি করুন।",
  "checklistTitle": "কমপ্লায়েন্স চেকলিস্ট",
  "checklistDesc": "মাসিক এবং বার্ষিক কমপ্লায়েন্স কার্যতালিকা নিয়ে সংগঠিত থাকুন।"
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');
fs.writeFileSync(bnPath, JSON.stringify(bn, null, 2) + '\n');

console.log("Locales updated for remaining tools/forms!");
