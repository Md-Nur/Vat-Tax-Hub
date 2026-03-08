const fs = require('fs');

const enPath = 'locales/en.json';
const bnPath = 'locales/bn.json';

let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
let bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

// Categories
en.category = en.category || {};
bn.category = bn.category || {};

en.category.browseAll = "Browse all document categories";
bn.category.browseAll = "সবগুলো নথিপত্রের বিভাগ ব্রাউজ করুন";

en.category.backToCategories = "Back to Categories";
bn.category.backToCategories = "বিভাগসমূহে ফিরে যান";

en.category.documents = "Documents";
bn.category.documents = "নথিপত্র";

en.category.noDocuments = "No documents found in this category.";
bn.category.noDocuments = "এই বিভাগে কোনো নথিপত্র পাওয়া যায়নি।";

en.category.notFound = "Category not found";
bn.category.notFound = "বিভাগটি পাওয়া যায়নি";

// Resources
en.resources = {
  "title": "Learn from ",
  "subtitle": "A curated directory of our best articles, guides, and circulars directly from our main knowledge base.",
  "visit": "Visit Full Knowledge Base",
  "vatRegistration": "VAT Registration (BIN)",
  "monthlyReturns": "Monthly VAT Returns",
  "customsImport": "Customs & Import",
  "generalTax": "General Business Tax",
  "binOnline": "How to apply for BIN online",
  "turnoverTax": "Documents required for Turnover Tax",
  "updateAddress": "Updating Business Address in VAT Online",
  "commonMistakes": "Common Mistakes in Mushak 9.1",
  "inputVat": "Adjusting Input VAT Claims",
  "nilReturns": "Submitting Nil Returns",
  "hsCodes": "HS Code Directory",
  "specialImport": "Special Import Tax Exemptions",
  "advanceTax": "Advance Tax Refund Process",
  "tdsChart": "TDS / VDS Rate Chart 2024",
  "directorsReturn": "Directors' Income Tax Return",
  "corporateTax": "Understanding the Corporate Tax Slabs"
};

bn.resources = {
  "title": "শিখুন এখান থেকে ",
  "subtitle": "আমাদের মূল নলেজ বেস থেকে সরাসরি আমাদের সেরা প্রবন্ধ, নির্দেশিকা এবং পরিপত্রগুলোর একটি নির্বাচিত ডিরেক্টরি।",
  "visit": "সম্পূর্ণ নলেজ বেস পরিদর্শন করুন",
  "vatRegistration": "ভ্যাট নিবন্ধন (বিন)",
  "monthlyReturns": "মাসিক ভ্যাট রিটার্ন",
  "customsImport": "কাস্টমস এবং আমদানি",
  "generalTax": "সাধারণ ব্যবসা কর",
  "binOnline": "অনলাইনে বিনের (BIN) জন্য কীভাবে আবেদন করবেন",
  "turnoverTax": "টার্নওভার ট্যাক্সের জন্য প্রয়োজনীয় নথিপত্র",
  "updateAddress": "ভ্যাট অনলাইনে ব্যবসার ঠিকানা আপডেট করা",
  "commonMistakes": "মূসক ৯.১ এ সাধারণ ভুলগুলো",
  "inputVat": "ইনপুট ভ্যাট দাবি সমন্বয়",
  "nilReturns": "নিল রিটার্ন জমা দেওয়া",
  "hsCodes": "এইচএস (HS) কোড ডিরেক্টরি",
  "specialImport": "বিশেষ আমদানি কর ছাড়",
  "advanceTax": "অগ্রিম কর ফেরত প্রক্রিয়া",
  "tdsChart": "টিডিএস (TDS) / ভিডিএস (VDS) রেট চার্ট ২০২৪",
  "directorsReturn": "পরিচালকদের আয়কর রিটার্ন",
  "corporateTax": "কর্পোরেট ট্যাক্স স্ল্যাবগুলো বোঝা"
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');
fs.writeFileSync(bnPath, JSON.stringify(bn, null, 2) + '\n');

console.log("Locales updated for categories/resources!");
