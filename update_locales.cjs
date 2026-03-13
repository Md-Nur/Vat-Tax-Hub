const fs = require('fs');

const enPath = 'locales/en.json';
const bnPath = 'locales/bn.json';

let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
let bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

// Dashboard additions
const dashKeys = {
  "overviewDescription": ["Welcome to your business VAT and tax summary. Here's a quick glance at your current financial metrics.", "আপনার ব্যবসা ভ্যাট এবং ট্যাক্স সারাংশে স্বাগতম। এখানে আপনার বর্তমান আর্থিক মেট্রিক্সের একটি দ্রুত নজর দেওয়া হলো।"],
  "totalSales": ["Total Sales (This Month)", "মোট বিক্রয় (এই মাস)"],
  "outputVat": ["Output VAT Collected", "আদায়কৃত আউটপুট ভ্যাট"],
  "inputVat": ["Input VAT Paid", "পরিশোধিত ইনপুট ভ্যাট"],
  "fromLastMonth": ["from last month", "গত মাস থেকে"],
  "awaitingTransactions": ["Awaiting transactions", "লেনদেনের অপেক্ষায়"],
  "noVendorPayments": ["No recent vendor payments", "সাম্প্রতিক কোনো ভেন্ডর পেমেন্ট নেই"],
  "noData": ["No data available yet", "এখনও কোনো তথ্য উপলব্ধ নেই"],
  "noDataDescription": ["Start recording your sales and purchases to see your visual analytics and charts appear here.", "এখানে আপনার ভিজ্যুয়াল অ্যানালিটিক্স এবং চার্ট দেখতে আপনার বিক্রয় এবং ক্রয় রেকর্ড করা শুরু করুন।"],
  "addTransaction": ["Add Transaction", "লেনদেন যোগ করুন"],
  "manageTransactions": ["Manage your sales and purchases to auto-calculate VAT.", "ভ্যাট স্বয়ংক্রিয়ভাবে গণনা করতে আপনার বিক্রয় এবং ক্রয় পরিচালনা করুন।"],
  "uploadCsv": ["Upload CSV", "CSV আপলোড করুন"],
  "newEntry": ["New Entry", "নতুন এন্ট্রি"],
  "salesOutputs": ["Sales (Outputs)", "বিক্রয় (আউটপুট)"],
  "purchasesInputs": ["Purchases (Inputs)", "ক্রয় (ইনপুট)"],
  "noTransactions": ["No", "কোনো"],
  "getStartedTransactions": ["Get started by creating a new entry or uploading a CSV file.", "একটি নতুন এন্ট্রি তৈরি করে বা একটি CSV ফাইল আপলোড করে শুরু করুন।"],
  "backToSite": ["Back to site", "সাইটে ফিরে যান"]
};

for (const [k, v] of Object.entries(dashKeys)) {
  en.dashboard[k] = v[0];
  bn.dashboard[k] = v[1];
}

// Home additions
const homeKeys = {
  "featuredCategoriesDesc": ["Browse our comprehensive collection of tax and VAT resources", "আমাদের কর এবং ভ্যাট রিসোর্সের বিশাল সংগ্রহ ব্রাউজ করুন"],
  "noDocumentsAvail": ["No documents available yet.", "এখনো কোনো নথিপত্র উপলব্ধ নেই।"],
  "vatFormsDesc": ["75+ VAT related forms", "৭৫+ ভ্যাট সম্পর্কিত ফর্ম"],
  "incomeTaxActDesc": ["Complete tax legislation", "সম্পূর্ণ কর আইন"],
  "vatSdAct": ["VAT & SD Act 2012", "ভ্যাট ও এসডি আইন ২০১২"],
  "vatSdActDesc": ["VAT & Supplementary Duty", "ভ্যাট এবং সম্পূরক শুল্ক"],
  "srosDesc": ["Statutory Regulatory Orders", "বিধিবদ্ধ নিয়ন্ত্রক আদেশ (SROs)"],
  "explore": ["Explore", "অন্বেষণ করুন"]
};

for (const [k, v] of Object.entries(homeKeys)) {
  en.home[k] = v[0];
  bn.home[k] = v[1];
}

// Samples additions
en.samples = {
  "sampleFormsTitle": "Pre-filled Sample Forms",
  "sampleFormsDesc": "View and download completed example forms to guide your own filings.",
  "size": "Size",
  "mushak63Title": "Mushak 6.3 - Tax Invoice",
  "mushak63Desc": "Sample standard VAT invoice filled with dummy data for a typical sales transaction.",
  "mushak91Title": "Mushak 9.1 - VAT Return",
  "mushak91Desc": "Sample completed monthly VAT return showing standard inputs and outputs.",
  "treasuryChallanTitle": "Treasury Challan (TR-6)",
  "treasuryChallanDesc": "Example of a properly filled Treasury Challan for VAT deposit.",
  "preview": "Preview",
  "download": "Download"
};

bn.samples = {
  "sampleFormsTitle": "পূরণকৃত নমুনা ফর্মসমূহ",
  "sampleFormsDesc": "আপনার নিজস্ব ফাইলিং পরিচালনা করতে সম্পন্ন উদাহরণ ফর্মগুলো দেখুন এবং ডাউনলোড করুন।",
  "size": "সাইজ",
  "mushak63Title": "মূসক ৬.৩ - কর চালানপত্র",
  "mushak63Desc": "একটি সাধারণ বিক্রয় লেনদেনের জন্য ডামি ডেটা দিয়ে পূরণ করা স্ট্যান্ডার্ড ভ্যাট চালানের নমুনা।",
  "mushak91Title": "মূসক ৯.১ - ভ্যাট রিটার্ন",
  "mushak91Desc": "স্ট্যান্ডার্ড ইনপুট এবং আউটপুট দেখানো সম্পূর্ণ মাসিক ভ্যাট রিটার্নের নমুনা।",
  "treasuryChallanTitle": "ট্রেজারি চালান (টিআর-৬)",
  "treasuryChallanDesc": "ভ্যাট জমাদানের জন্য সঠিকভাবে পূরণ করা ট্রেজারি চালানের উদাহরণ।",
  "preview": "প্রিভিউ",
  "download": "ডাউনলোড"
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');
fs.writeFileSync(bnPath, JSON.stringify(bn, null, 2) + '\n');

console.log("Locales updated!");
