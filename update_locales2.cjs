const fs = require('fs');

const enPath = 'locales/en.json';
const bnPath = 'locales/bn.json';

let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
let bn = JSON.parse(fs.readFileSync(bnPath, 'utf8'));

// Admin additions
en.admin.welcome = "Welcome to Admin Dashboard";
en.admin.welcomeDesc = "Manage your documents, categories, and users from here. Use the sidebar navigation to access different sections.";
en.admin.manageDocuments = "Manage Documents";
en.admin.manageDocumentsDesc = "Add, edit, or remove documents";
en.admin.manageCategories = "Manage Categories";
en.admin.manageCategoriesDesc = "Organize document categories";

bn.admin.welcome = "অ্যাডমিন ড্যাশবোর্ডে স্বাগতম";
bn.admin.welcomeDesc = "এখান থেকে আপনার নথিপত্র, বিভাগ এবং ব্যবহারকারী পরিচালনা করুন। বিভিন্ন বিভাগে প্রবেশ করতে সাইডবার নেভিগেশন ব্যবহার করুন।";
bn.admin.manageDocuments = "নথিপত্র পরিচালনা করুন";
bn.admin.manageDocumentsDesc = "নথিপত্র যোগ, সম্পাদনা বা অপসারণ করুন";
bn.admin.manageCategories = "বিভাগ পরিচালনা করুন";
bn.admin.manageCategoriesDesc = "নথির বিভাগ সংগঠিত করুন";

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');
fs.writeFileSync(bnPath, JSON.stringify(bn, null, 2) + '\n');

console.log("Locales updated for admin!");
