import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@taxvathub.com" },
    update: {},
    create: {
      email: "admin@taxvathub.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // Create categories
  const categoriesData = [
    {
      name: "VAT Forms",
      nameBn: "ভ্যাট ফর্ম",
      slug: "vat-forms",
      description: "All VAT related forms including Mushak series",
      descriptionBn: "মুশক সিরিজ সহ সমস্ত ভ্যাট সম্পর্কিত ফর্ম",
      icon: "document-text",
    },
    {
      name: "Income Tax Act",
      nameBn: "আয়কর আইন",
      slug: "income-tax-act",
      description: "Income Tax Ordinance and related amendments",
      descriptionBn: "আয়কর অধ্যাদেশ এবং সম্পর্কিত সংশোধনী",
      icon: "scale",
    },
    {
      name: "VAT & SD Act 2012",
      nameBn: "ভ্যাট ও এসডি আইন ২০১২",
      slug: "vat-sd-act",
      description: "Value Added Tax and Supplementary Duty Act 2012",
      descriptionBn: "মূল্য সংযোজন কর ও সম্পূরক শুল্ক আইন ২০১২",
      icon: "building",
    },
    {
      name: "SROs",
      nameBn: "এসআরও",
      slug: "sros",
      description: "Statutory Regulatory Orders related to tax and VAT",
      descriptionBn: "কর ও ভ্যাট সম্পর্কিত সংবিধিবদ্ধ নিয়ন্ত্রক আদেশ",
      icon: "clipboard",
    },
    {
      name: "General Orders",
      nameBn: "সাধারণ আদেশ",
      slug: "general-orders",
      description: "General orders issued by NBR and tax authorities",
      descriptionBn: "এনবিআর এবং কর কর্তৃপক্ষ কর্তৃক জারিকৃত সাধারণ আদেশ",
      icon: "briefcase",
    },
    {
      name: "Customs",
      nameBn: "শুল্ক",
      slug: "customs",
      description: "Customs Act, rules, and related documents",
      descriptionBn: "শুল্ক আইন, বিধি এবং সম্পর্কিত নথিপত্র",
      icon: "building",
    },
  ];

  const categories = [];
  for (const catData of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: catData,
      create: catData,
    });
    categories.push(category);
    console.log(`✅ Category: ${category.name}`);
  }

  // Create sample documents
  const vatFormsCategory = categories.find((c) => c.slug === "vat-forms")!;
  const incomeTaxCategory = categories.find((c) => c.slug === "income-tax-act")!;
  const vatSdCategory = categories.find((c) => c.slug === "vat-sd-act")!;
  const sroCategory = categories.find((c) => c.slug === "sros")!;
  const ordersCategory = categories.find((c) => c.slug === "general-orders")!;
  const customsCategory = categories.find((c) => c.slug === "customs")!;

  // Delete existing documents first to avoid duplicates on re-seed
  await prisma.document.deleteMany({});

  const documentsData = [
    {
      title: "Mushak 6.3 - VAT Return Form",
      titleBn: "মুশক ৬.৩ - ভ্যাট রিটার্ন ফর্ম",
      description: "Monthly VAT return form for registered taxpayers",
      descriptionBn: "নিবন্ধিত করদাতাদের জন্য মাসিক ভ্যাট রিটার্ন ফর্ম",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-6.3.pdf",
      fileType: "pdf",
      language: "both",
      views: 1250,
    },
    {
      title: "Mushak 6.5 - Input-Output Coefficient",
      titleBn: "মুশক ৬.৫ - ইনপুট-আউটপুট সহগ",
      description: "Form for declaring input-output coefficient for manufacturing",
      descriptionBn: "উৎপাদনের জন্য ইনপুট-আউটপুট সহগ ঘোষণা ফর্ম",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-6.5.pdf",
      fileType: "pdf",
      language: "both",
      views: 890,
    },
    {
      title: "Mushak 6.10 - Supplementary Duty Return",
      titleBn: "মুশক ৬.১০ - সম্পূরক শুল্ক রিটার্ন",
      description: "Monthly supplementary duty return form",
      descriptionBn: "মাসিক সম্পূরক শুল্ক রিটার্ন ফর্ম",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-6.10.pdf",
      fileType: "pdf",
      language: "both",
      views: 654,
    },
    {
      title: "Mushak 2.1 - VAT Registration Application",
      titleBn: "মুশক ২.১ - ভ্যাট নিবন্ধন আবেদন",
      description: "Application form for new VAT registration",
      descriptionBn: "নতুন ভ্যাট নিবন্ধনের জন্য আবেদন ফর্ম",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-2.1.pdf",
      fileType: "pdf",
      language: "both",
      views: 1100,
    },
    {
      title: "Mushak 4.3 - Tax Invoice",
      titleBn: "মুশক ৪.৩ - কর চালান",
      description: "Standard tax invoice format for VAT registered entities",
      descriptionBn: "ভ্যাট নিবন্ধিত প্রতিষ্ঠানের জন্য স্ট্যান্ডার্ড কর চালান ফরম্যাট",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-4.3.pdf",
      fileType: "pdf",
      language: "both",
      views: 980,
    },
    {
      title: "Mushak 6.1 - Purchase Register",
      titleBn: "মুশক ৬.১ - ক্রয় রেজিস্টার",
      description: "Register for recording purchases with VAT",
      descriptionBn: "ভ্যাট সহ ক্রয় রেকর্ড করার রেজিস্টার",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-6.1.xlsx",
      fileType: "excel",
      language: "both",
      views: 720,
    },
    {
      title: "Mushak 6.2 - Sales Register",
      titleBn: "মুশক ৬.২ - বিক্রয় রেজিস্টার",
      description: "Register for recording sales with VAT",
      descriptionBn: "ভ্যাট সহ বিক্রয় রেকর্ড করার রেজিস্টার",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-6.2.xlsx",
      fileType: "excel",
      language: "both",
      views: 680,
    },
    {
      title: "Mushak 9.1 - Withholding VAT Certificate",
      titleBn: "মুশক ৯.১ - উৎসে ভ্যাট কর্তন সনদ",
      description: "Certificate for VAT deducted at source",
      descriptionBn: "উৎসে কর্তনকৃত ভ্যাটের সনদ",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-9.1.pdf",
      fileType: "pdf",
      language: "both",
      views: 540,
    },
    {
      title: "Mushak 11.1 - VAT Audit Report",
      titleBn: "মুশক ১১.১ - ভ্যাট অডিট প্রতিবেদন",
      description: "Form for submitting VAT audit findings",
      descriptionBn: "ভ্যাট অডিটের ফলাফল জমা দেওয়ার ফর্ম",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-11.1.pdf",
      fileType: "pdf",
      language: "both",
      views: 430,
    },
    {
      title: "Mushak 2.2 - VAT Registration Certificate",
      titleBn: "মুশক ২.২ - ভ্যাট নিবন্ধন সনদ",
      description: "Format of VAT registration certificate (BIN)",
      descriptionBn: "ভ্যাট নিবন্ধন সনদপত্রের (বিআইএন) ফরম্যাট",
      categoryId: vatFormsCategory.id,
      fileUrl: "/docs/mushak-2.2.pdf",
      fileType: "pdf",
      language: "both",
      views: 850,
    },
    {
      title: "Income Tax Ordinance 1984 (Amended)",
      titleBn: "আয়কর অধ্যাদেশ ১৯৮৪ (সংশোধিত)",
      description: "The complete Income Tax Ordinance 1984 with all amendments",
      descriptionBn: "সমস্ত সংশোধনী সহ সম্পূর্ণ আয়কর অধ্যাদেশ ১৯৮৪",
      categoryId: incomeTaxCategory.id,
      fileUrl: "/docs/income-tax-ordinance-1984.pdf",
      fileType: "pdf",
      language: "en",
      views: 2100,
    },
    {
      title: "Income Tax Rules 1984",
      titleBn: "আয়কর বিধিমালা ১৯৮৪",
      description: "Rules governing income tax administration and procedures",
      descriptionBn: "আয়কর প্রশাসন ও পদ্ধতি পরিচালনার বিধিমালা",
      categoryId: incomeTaxCategory.id,
      fileUrl: "/docs/income-tax-rules-1984.pdf",
      fileType: "pdf",
      language: "en",
      views: 1560,
    },
    {
      title: "VAT and Supplementary Duty Act 2012",
      titleBn: "মূল্য সংযোজন কর ও সম্পূরক শুল্ক আইন ২০১২",
      description: "The complete VAT and Supplementary Duty Act 2012",
      descriptionBn: "সম্পূর্ণ মূল্য সংযোজন কর ও সম্পূরক শুল্ক আইন ২০১২",
      categoryId: vatSdCategory.id,
      fileUrl: "/docs/vat-sd-act-2012.pdf",
      fileType: "pdf",
      language: "both",
      views: 1800,
    },
    {
      title: "VAT and SD Rules 2016",
      titleBn: "ভ্যাট ও এসডি বিধিমালা ২০১৬",
      description: "Rules under the VAT and Supplementary Duty Act 2012",
      descriptionBn: "ভ্যাট ও সম্পূরক শুল্ক আইন ২০১২ এর অধীনে বিধিমালা",
      categoryId: vatSdCategory.id,
      fileUrl: "/docs/vat-sd-rules-2016.pdf",
      fileType: "pdf",
      language: "both",
      views: 1340,
    },
    {
      title: "SRO 186/2019 - VAT Exemption List",
      titleBn: "এসআরও ১৮৬/২০১৯ - ভ্যাট অব্যাহতি তালিকা",
      description: "List of goods and services exempted from VAT",
      descriptionBn: "ভ্যাট থেকে অব্যাহতিপ্রাপ্ত পণ্য ও সেবার তালিকা",
      categoryId: sroCategory.id,
      fileUrl: "/docs/sro-186-2019.pdf",
      fileType: "pdf",
      language: "both",
      views: 920,
    },
    {
      title: "SRO 190/2019 - Reduced VAT Rates",
      titleBn: "এসআরও ১৯০/২০১৯ - হ্রাসকৃত ভ্যাট হার",
      description: "Items subject to reduced VAT rates (5%, 7.5%, 10%)",
      descriptionBn: "হ্রাসকৃত ভ্যাট হারের (৫%, ৭.৫%, ১০%) অধীন আইটেম",
      categoryId: sroCategory.id,
      fileUrl: "/docs/sro-190-2019.pdf",
      fileType: "pdf",
      language: "both",
      views: 780,
    },
    {
      title: "General Order No. 01/2020 - E-filing Procedures",
      titleBn: "সাধারণ আদেশ নং ০১/২০২০ - ই-ফাইলিং পদ্ধতি",
      description: "Guidelines for electronic filing of VAT returns",
      descriptionBn: "ভ্যাট রিটার্নের ইলেকট্রনিক ফাইলিং এর নির্দেশিকা",
      categoryId: ordersCategory.id,
      fileUrl: "/docs/go-01-2020.pdf",
      fileType: "pdf",
      language: "en",
      views: 560,
    },
    {
      title: "Customs Act 1969",
      titleBn: "শুল্ক আইন ১৯৬৯",
      description: "The Customs Act 1969 with amendments",
      descriptionBn: "সংশোধনী সহ শুল্ক আইন ১৯৬৯",
      categoryId: customsCategory.id,
      fileUrl: "/docs/customs-act-1969.pdf",
      fileType: "pdf",
      language: "en",
      views: 980,
    },
  ];

  for (const docData of documentsData) {
    const doc = await prisma.document.create({ data: docData });
    console.log(`✅ Document: ${doc.title}`);
  }

  // Seed Blog Posts from taxvatpoint.com
  console.log("\n📝 Seeding blog posts...");

  await prisma.blogPost.deleteMany({});

  const blogPostsData = [
    {
      title: "TDS Rate 2025-2026 – At What Rate Should You Deduct Tax at Source?",
      titleBn: "উৎসে কর কর্তনের হার ২০২৫-২০২৬। কত হারে উৎসে কর কর্তন করবেন ?",
      slug: "utse-kor-kortoner-har-2025",
      excerpt: "TDS Rate 2025–2026: Tax Deducted at Source (TDS) is considered an important part of compliance under the Income Tax Act 2023.",
      excerptBn: "উৎসে কর কর্তনের হার ২০২৫–২০২৬ঃ উৎসে কর কর্তন (TDS) আয়কর আইন ২০২৩ এর অধীনে পরিপালনীয় একটি গুরুত্বপূর্ণ অংশ হিসেবে বিবেচিত হয়। উৎসে আয়কর কর্তনের বাধ্যবাধকতা বিভিন্ন ধরনের প্রতিষ্ঠানের জন্য প্রযোজ্য।",
      category: "TDS Rules",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%89%e0%a7%8e%e0%a6%b8%e0%a7%87-%e0%a6%95%e0%a6%b0-%e0%a6%95%e0%a6%b0%e0%a7%8d%e0%a6%a4%e0%a6%a8%e0%a7%87%e0%a6%b0-%e0%a6%b9%e0%a6%be%e0%a6%b0-%e0%a7%a8%e0%a7%a6%e0%a7%a8%e0%a7%ab/",
      views: 1820,
    },
    {
      title: "VDS Rate List 2025 – VAT Deduction Rate 2025-26",
      titleBn: "উৎসে ভ্যাট কর্তনের তালিকা ২০২৫ – ভ্যাট কর্তনের হার ২০২৫-২৬",
      slug: "utse-vat-kortoner-talika-2025",
      excerpt: "VDS Rate List 2025 – When a portion of payment made to a supplier is deducted as VAT at source, it is called VDS.",
      excerptBn: "উৎসে ভ্যাট কর্তনের তালিকা ২০২৫ – পণ্য বা সেবা ক্রয়ের সময় সরবরাহকারীরকে পরিশোধিত অর্থের একটি অংশ থেকে যখন মূল্য সংযোজন কর (ভ্যাট) বাবদ কেটে রাখা হয়, তখন সেটিকে 'উৎসে মূসক কর্তন (VDS)' বলা হয়।",
      category: "VDS Rules",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%89%e0%a7%8e%e0%a6%b8%e0%a7%87-%e0%a6%ad%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%9f-%e0%a6%95%e0%a6%b0%e0%a7%8d%e0%a6%a4%e0%a6%a8%e0%a7%87%e0%a6%b0-%e0%a6%a4%e0%a6%be%e0%a6%b2%e0%a6%bf%e0%a6%95/",
      views: 1650,
    },
    {
      title: "VAT Schedules 2025 Bangladesh",
      titleBn: "ভ্যাট আইন ২০১২ এর তফসিলসমূহ – হালনাগাদকৃত অনলাইন সংস্করণ",
      slug: "vat-schedules-2025-bangladesh",
      excerpt: "VAT Act 2012 Schedules as updated till Finance Ordinance 2025 and Certain Laws Relating to Finance (Amendment) Ordinance 2025.",
      excerptBn: "ভ্যাট আইন ২০১২ এর তফসিলসমূহ অর্থ অধ্যাদেশ, ২০২৫ এবং অর্থ সংক্রান্ত কতিপয় আইন (সংশোধন) অধ্যাদেশ, ২০২৫ পর্যন্ত হালনাগাদকৃত।",
      category: "VAT Schedules",
      sourceUrl: "https://www.taxvatpoint.com/vat-schedules-2025-bangladesh/",
      views: 2100,
    },
    {
      title: "Income Tax Schedules Bangladesh 2025",
      titleBn: "আয়কর আইন ২০২৩ এর তফসিলসমূহ – হালনাগাদকৃত অনলাইন সংস্করণ",
      slug: "income-tax-schedules-bangladesh-2025",
      excerpt: "Income Tax Act 2023 Schedules as updated till Finance Ordinance 2025. There are 8 schedules under the Income Tax Act 2023.",
      excerptBn: "আয়কর আইন ২০২৩ এর তফসিলসমূহ অর্থ অধ্যাদেশ, ২০২৫ এবং অর্থ সংক্রান্ত কতিপয় আইন (সংশোধন) অধ্যাদেশ, ২০২৫ পর্যন্ত হালনাগাদকৃত। আয়কর আইন ২০২৩ এর অধীন সর্বমোট ৮টি তফসিল রয়েছে।",
      category: "Income Tax Schedules",
      sourceUrl: "https://www.taxvatpoint.com/income-tax-schedules-bangladesh-2025/",
      views: 1950,
    },
    {
      title: "VAT Act 2012 PDF Download – Updated Online Version",
      titleBn: "ভ্যাট আইন ২০১২ pdf download – হালনাগাদকৃত অনলাইন সংস্করণ",
      slug: "vat-ain-2012-pdf-download",
      excerpt: "VAT and Supplementary Duty Act 2012 – Updated till Finance Ordinance 2025. The primary legislation governing VAT in Bangladesh.",
      excerptBn: "মূল্য সংযোজন কর ও সম্পূরক শুল্ক আইন, ২০১২ অর্থ অধ্যাদেশ, ২০২৫ পর্যন্ত হালনাগাদকৃত। বাংলাদেশে ভ্যাটের মূল আইন।",
      category: "VAT & SD Act 2012",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%ad%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%9f-%e0%a6%86%e0%a6%87%e0%a6%a8-%e0%a7%a8%e0%a7%a6%e0%a7%a7%e0%a7%a8-pdf-download/",
      views: 2340,
    },
    {
      title: "Income Tax Act 2023 BD PDF Free Download 2025",
      titleBn: "আয়কর আইন ২০২৩ – হালনাগাদকৃত অনলাইন সংস্করণ",
      slug: "income-tax-act-2023-bd-pdf-free-download-2025",
      excerpt: "Income Tax Act 2023 as updated till Finance Ordinance 2025. The main law that sets out the rules for the income tax system in Bangladesh.",
      excerptBn: "আয়কর আইন ২০২৩ অর্থ অধ্যাদেশ, ২০২৫ পর্যন্ত হালনাগাদকৃত। বাংলাদেশে আয়করের মূল আইন।",
      category: "Income Tax Act 2023",
      sourceUrl: "https://www.taxvatpoint.com/income-tax-act-2023-bd-pdf-free-download-2025-%e0%a6%86%e0%a6%af%e0%a6%bc%e0%a6%95%e0%a6%b0-%e0%a6%86%e0%a6%87%e0%a6%a8-%e0%a7%a8%e0%a7%a6%e0%a7%a8%e0%a7%a9/",
      views: 3100,
    },
    {
      title: "Investment Tax Rebate – How Much to Invest for Tax Exemption",
      titleBn: "বিনিয়োগ কর রেয়াত – কর ছাড় পেতে আয়ের কত টাকা বিনিয়োগ করবেন",
      slug: "biniyog-kor-reyat",
      excerpt: "Investment Tax Rebate is a strategic provision designed to reduce the tax burden of individual taxpayers by encouraging investment in approved sectors.",
      excerptBn: "বিনিয়োগ কর রেয়াত (Investment Tax Rebate) একটি কৌশলগত বিধান যা অনুমোদিত খাতে বিনিয়োগ বা দান প্রদানে উৎসাহ দিয়ে ব্যক্তি করদাতার করের বোঝা হ্রাস করার জন্য প্রণয়ন করা হয়েছে।",
      category: "Income Tax Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%ac%e0%a6%bf%e0%a6%a8%e0%a6%bf%e0%a6%af%e0%a6%bc%e0%a7%8b%e0%a6%97-%e0%a6%95%e0%a6%b0-%e0%a6%b0%e0%a7%87%e0%a6%af%e0%a6%bc%e0%a6%be%e0%a6%a4-%e0%a6%95%e0%a6%b0-%e0%a6%9b%e0%a6%be/",
      views: 1430,
    },
    {
      title: "Ways to Get Tax Exemption Through Investment in Bangladesh 2025",
      titleBn: "বাংলাদেশে বিনিয়োগের মাধ্যমে কর ছাড় পাওয়ার উপায়সমূহ ২০২৫",
      slug: "biniyoger-madhyome-kor-chad-2025",
      excerpt: "Tax payment is a civic duty, but tax savings is a smart decision. Under the Income Tax Act 2023, taxpayers can get tax exemptions through specific investments.",
      excerptBn: "কর প্রদান একটি নাগরিক দায়িত্ব, কিন্তু কর সাশ্রয় করা একটি স্মার্ট সিদ্ধান্ত। আয়কর আইন ২০২৩ অনুসারে করদাতারা নির্দিষ্ট কিছু খাতে বিনিয়োগের মাধ্যমে কর ছাড় পেতে পারেন।",
      category: "Income Tax Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%ac%e0%a6%bf%e0%a6%a8%e0%a6%bf%e0%a6%af%e0%a6%bc%e0%a7%8b%e0%a6%97%e0%a7%87%e0%a6%b0-%e0%a6%ae%e0%a6%be%e0%a6%a7%e0%a7%8d%e0%a6%af%e0%a6%ae%e0%a7%87-%e0%a6%95%e0%a6%b0-%e0%a6%9b%e0%a6%be/",
      views: 1280,
    },
    {
      title: "Who Needs to Submit IT 10BB Lifestyle Statement Under Income Tax Act 2023?",
      titleBn: "আয়কর আইন ২০২৩ অনুযায়ী কাদেরকে জীবনযাপন সংশ্লিষ্ট ব্যয় বিবরণী-IT 10BB দাখিল করতে হবে ?",
      slug: "jibonjaapon-byoy-biboroni-it-10bb",
      excerpt: "IT 10BB Lifestyle Statement is a form that individual taxpayers submit along with their income tax return.",
      excerptBn: "জীবনযাপন সংশ্লিষ্ট ব্যয় বিবরণী-IT 10BB হলো মূলত আয়কর রিটার্নের একটি ফর্ম যা কোন ব্যক্তি শ্রেণীর করদাতা তার আয়কর রিটার্নের সহিত দাখিল করে থাকেন।",
      category: "Income Tax Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%9c%e0%a7%80%e0%a6%ac%e0%a6%a8%e0%a6%af%e0%a6%be%e0%a6%aa%e0%a6%a8-%e0%a6%b8%e0%a6%82%e0%a6%b6%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%b7%e0%a7%8d%e0%a6%9f-%e0%a6%ac%e0%a7%8d%e0%a6%af%e0%a6%af%e0%a6%bc/",
      views: 980,
    },
    {
      title: "Who Needs to Submit IT 10B Asset & Liability Statement in Bangladesh?",
      titleBn: "আয়কর আইন ২০২৩ অনুযায়ী বাংলাদেশে কাকে পরিসম্পদ ও দায়ের বিবরণী-IT 10B দাখিল করতে হয়?",
      slug: "porisompod-dayer-biboroni-it-10b",
      excerpt: "IT 10B Asset & Liability Statement is a form listing a taxpayer's financial position on the last day of an income year (June 30).",
      excerptBn: "পরিসম্পদ ও দায়ের বিবরণী-IT 10B হল এমন একটি ফর্ম যা কোন আয়বর্ষের শেষ তারিখে একজন স্বাভাবিক ব্যক্তি করদাতার কি কি পরিসম্পদ ও দায় আছে সেই সম্পর্কিত আর্থিক অবস্থার একটি তালিকাস্বরূপ।",
      category: "Income Tax Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%aa%e0%a6%b0%e0%a6%bf%e0%a6%b8%e0%a6%ae%e0%a7%8d%e0%a6%aa%e0%a6%a6-%e0%a6%93-%e0%a6%a6%e0%a6%be%e0%a6%af%e0%a6%bc%e0%a7%87%e0%a6%b0-%e0%a6%ac%e0%a6%bf%e0%a6%ac%e0%a6%b0%e0%a6%a3%e0%a7%80-it-10b/",
      views: 870,
    },
    {
      title: "Minimum Tax 2024 – Types of Minimum Tax Applicable in Bangladesh",
      titleBn: "ন্যূনতম কর ২০২৪ – বাংলাদেশে কি কি ধরণের ন্যূনতম কর প্রযোজ্য",
      slug: "nyunotom-kor-2024-bangladesh",
      excerpt: "Minimum tax is the minimum amount of tax that a taxpayer must pay in certain circumstances regardless of their tax-free income or losses.",
      excerptBn: "ন্যূনতম কর হল সেই সর্বনিম্ন পরিমাণ কর যা নির্দিষ্ট পরিস্থিতিতে একজন করদাতাকে বাধ্যতামূলকভাবে প্রদান করতে হয়। বাংলাদেশের আয়কর ব্যবস্থায় নূন্যতম কর একটি গুরুত্বপূর্ণ উপাদান।",
      category: "Income Tax Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%a8%e0%a7%8d%e0%a6%af%e0%a7%82%e0%a6%a8%e0%a6%a4%e0%a6%ae-%e0%a6%95%e0%a6%b0-%e0%a7%a8%e0%a7%a6%e0%a7%a8%e0%a7%aa-%e0%a6%ac%e0%a6%be%e0%a6%82%e0%a6%b2%e0%a6%be%e0%a6%a6%e0%a7%87%e0%a6%b6/",
      views: 1120,
    },
    {
      title: "VAT and SD Act 2012 PDF Download",
      titleBn: "মূল্য সংযোজন কর ও সম্পূরক শুল্ক আইন ২০১২ – পিডিএফ ডাউনলোড",
      slug: "vat-and-sd-act-2012-pdf-download",
      excerpt: "VAT & SD Act 2012 as updated till Finance Act 2024. The primary legislation governing VAT regulations in Bangladesh.",
      excerptBn: "ভ্যাট ও এসডি আইন ২০১২ অর্থ আইন ২০২৪ পর্যন্ত হালনাগাদকৃত। বাংলাদেশে ভ্যাট নিয়ন্ত্রণকারী প্রাথমিক আইন।",
      category: "VAT & SD Act 2012",
      sourceUrl: "https://www.taxvatpoint.com/vat-and-sd-act-2012-pdf-download/",
      views: 1870,
    },
    {
      title: "Income Tax Act 2023 PDF Free Download",
      titleBn: "আয়কর আইন ২০২৩ পিডিএফ ফ্রি ডাউনলোড",
      slug: "income-tax-act-2023-pdf-free-download",
      excerpt: "Income Tax Act 2023 as updated till Finance Act 2024. The primary legislation governing income tax regulations in Bangladesh.",
      excerptBn: "আয়কর আইন ২০২৩ অর্থ আইন ২০২৪ পর্যন্ত হালনাগাদকৃত। বাংলাদেশে আয়কর নিয়ন্ত্রণকারী প্রাথমিক আইন।",
      category: "Income Tax Act 2023",
      sourceUrl: "https://www.taxvatpoint.com/income-tax-act-2023-pdf-free-download/",
      views: 2560,
    },
    {
      title: "Corporate Tax Rate 2024-25 in Bangladesh",
      titleBn: "বাংলাদেশের কর্পোরেট কর হার ২০২৪-২৫ – ২০২৪-২৫ করবর্ষের জন্য কোম্পানির কর হার কত ?",
      slug: "corporate-kor-har-2024-25",
      excerpt: "Corporate Tax Rate 2024-25 in Bangladesh – Corporate tax is an important aspect of Bangladesh's tax system and plays a vital role in government revenue.",
      excerptBn: "বাংলাদেশের কর্পোরেট কর হার ২০২৪-২৫ – বাংলাদেশে আয়কর ব্যবস্থার প্রধানত দুটি প্রধান ভাগ রয়েছে যথাক্রমে ব্যক্তি শ্রেণীর জন্য আয়কর এবং কর্পোরেট কর হার।",
      category: "Income Tax Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%95%e0%a6%b0%e0%a7%8d%e0%a6%aa%e0%a7%8b%e0%a6%b0%e0%a7%87%e0%a6%9f-%e0%a6%95%e0%a6%b0-%e0%a6%b9%e0%a6%be%e0%a6%b0-%e0%a7%a8%e0%a7%a6%e0%a7%a8%e0%a7%aa/",
      views: 1340,
    },
    {
      title: "Income Tax Rate for FY 2024-25 – Tax-Free Income Limit & Minimum Tax",
      titleBn: "২০২৪-২৫ অর্থ বছরের জন্য আয়কর হার – করমুক্ত আয়ের সীমা কত ? ন্যূনতম করের পরিমাণ",
      slug: "aykor-har-2024-25-ortho-bochor",
      excerpt: "The government has made significant changes to the Income Tax Slab for individual taxpayers through Finance Act 2024.",
      excerptBn: "২০২৪-২৫ অর্থ বছরের জন্য আয়কর হার – অর্থ আইন ২০২৪ এর মাধ্যমে সরকার ব্যক্তি শ্রেণীর করদাতাদের জন্য আয়কর কাঠামোতে (Income Tax Slab) উল্লেখযোগ্য পরিবর্তন করেছে।",
      category: "Income Tax Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a7%a8%e0%a7%a6%e0%a7%a8%e0%a7%aa-%e0%a7%a8%e0%a7%ab-%e0%a6%85%e0%a6%b0%e0%a7%8d%e0%a6%a5-%e0%a6%ac%e0%a6%9b%e0%a6%b0%e0%a7%87%e0%a6%b0-%e0%a6%9c%e0%a6%a8%e0%a7%8d%e0%a6%af-%e0%a6%86%e0%a6%af/",
      views: 1690,
    },
    {
      title: "TDS Rate 2024-2025 – At What Rate to Deduct Income Tax at Source",
      titleBn: "উৎসে আয়কর কর্তনের হার ২০২৪-২০২৫। কখন কোন হারে উৎসে আয়কর কর্তন করবেন",
      slug: "aykor-kortoner-har-2024-2025",
      excerpt: "TDS Rate 2024-2025: Tax Deduction at Source is an important compliance under the Income Tax Act 2023.",
      excerptBn: "উৎসে আয়কর কর্তনের হার ২০২৪–২০২৫: আয়কর আইন ২০২৩ এর অধীনে উৎসে আয়কর কর্তন একটি গুরুত্বপূর্ণ কমপ্লায়েন্স। এই বাধ্যবাধকতা কোম্পানি, ব্যবসা প্রতিষ্ঠান, সরকারী প্রতিষ্ঠান সবার জন্য প্রযোজ্য।",
      category: "TDS Rules",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%86%e0%a6%af%e0%a6%bc%e0%a6%95%e0%a6%b0-%e0%a6%95%e0%a6%b0%e0%a7%8d%e0%a6%a4%e0%a6%a8%e0%a7%87%e0%a6%b0-%e0%a6%b9%e0%a6%be%e0%a6%b0-%e0%a7%a8%e0%a7%a6%e0%a7%a8%e0%a7%aa-%e0%a7%a8%e0%a7%a6/",
      views: 1560,
    },
    {
      title: "VAT Deduction Rate 2024-2025 – Sector-wise VAT Deduction",
      titleBn: "ভ্যাট কর্তনের হার ২০২৪-২০২৫ – কোন খাতে কত ভ্যাট কর্তন করতে হবে",
      slug: "vat-kortoner-har-2024-2025",
      excerpt: "VAT Deduction Rate 2024-2025 – When payment is made for purchase of goods or services, the VAT deducted at source is called VDS.",
      excerptBn: "ভ্যাট কর্তনের হার ২০২৪-২০২৫ – যখন কোন পণ্য ক্রয় বা সেবা গ্রহণ বাবদ সরবরাহকারীকে মূল্য পরিশোধ করা হয় তখন পরিশোধিত মূল্য হতে ভ্যাট বাবদ যে টাকা কর্তন করে রাখা হয় তাকে উৎসে মূসক কর্তন বলা হয়।",
      category: "VDS Rules",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%ad%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%9f-%e0%a6%95%e0%a6%b0%e0%a7%8d%e0%a6%a4%e0%a6%a8%e0%a7%87%e0%a6%b0-%e0%a6%b9%e0%a6%be%e0%a6%b0-%e0%a7%a8%e0%a7%a6%e0%a7%a8%e0%a7%aa-%e0%a7%a8%e0%a7%a6/",
      views: 1410,
    },
    {
      title: "Land Building or Apartment Tax Rate – PSR Submission Requirements",
      titleBn: "জমি বিল্ডিং বা অ্যাপার্টমেন্ট করহার – 'রিটান দাখিলের প্রমাণ' বা PSR উপস্থাপন/ প্রদর্শন",
      slug: "jomi-building-apartment-korhar-psr",
      excerpt: "Under Section 264 of the Income Tax Act 2023, PSR submission is mandatory for 43 types of services and purchases.",
      excerptBn: "আয়কর আইন ২০২৩ এর ধারা ২৬৪ অনুযায়ী বিভিন্ন সেবা, পণ্য ক্রয় সহ নানাবিধ ক্ষেত্রে 'রিটান দাখিলের প্রমাণ' বা PSR দাখিল বাধ্যতামূলক করা হয়েছে। ধারা ২৬৪ অনুসারে, ৪৩ ধরনের সেবা গ্রহণে PSR আবশ্যক।",
      category: "Income Tax Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%9c%e0%a6%ae%e0%a6%bf-%e0%a6%ac%e0%a6%bf%e0%a6%b2%e0%a7%8d%e0%a6%a1%e0%a6%bf%e0%a6%82-%e0%a6%ac%e0%a6%be-%e0%a6%85%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%aa%e0%a6%be%e0%a6%b0%e0%a7%8d%e0%a6%9f/",
      views: 1230,
    },
    {
      title: "All VAT Forms of Bangladesh – Under VAT & SD Act 2012",
      titleBn: "বাংলাদেশের ভ্যাট ফরমসমূহ – ভ্যাট এবং এসডি আইন ২০১২ এর অধীনে ইস্যুকৃত সমস্ত ভ্যাট ফরমসমূহ",
      slug: "bangladesher-vat-formsomuh",
      excerpt: "Every business entity in Bangladesh must follow various VAT law rules and regulations to operate within the legal framework.",
      excerptBn: "বাংলাদেশে আইনী প্রক্রিয়ার মধ্যে থেকে ব্যবসা পরিচালনা করার জন্য প্রতিটি ব্যবসা প্রতিষ্ঠানকে ভ্যাট আইনের নানাবিধ নিয়ম-কানুন অনুসরণ করতে হয়।",
      category: "VAT Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%ac%e0%a6%be%e0%a6%82%e0%a6%b2%e0%a6%be%e0%a6%a6%e0%a7%87%e0%a6%b6%e0%a7%87%e0%a6%b0-%e0%a6%ad%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%9f-%e0%a6%ab%e0%a6%b0%e0%a6%ae%e0%a6%b8%e0%a6%ae%e0%a7%82%e0%a6%b9/",
      views: 1150,
    },
    {
      title: "VAT Penalty and Interest – What is VAT Penalty and When is Interest Imposed",
      titleBn: "ভ্যাট জরিমানা ও সুদ – ভ্যাট জরিমানা কি এবং কখন সুদ আরোপ করা হয়",
      slug: "vat-jorimana-o-sud",
      excerpt: "VAT penalty refers to financial penalties imposed by NBR under the VAT Act for violations of VAT law provisions.",
      excerptBn: "ভ্যাট জরিমানা বলতে বোঝায় মূল্য সংযোজন কর আইনের বিধান লঙ্ঘনের জন্য জাতীয় রাজস্ব বোর্ড কর্তৃক ভ্যাট আইন অনুসারে আরোপিত আর্থিক দণ্ড।",
      category: "VAT Blog",
      sourceUrl: "https://www.taxvatpoint.com/%e0%a6%ad%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%9f-%e0%a6%9c%e0%a6%b0%e0%a6%bf%e0%a6%ae%e0%a6%be%e0%a6%a8%e0%a6%be-%e0%a6%93-%e0%a6%b8%e0%a7%81%e0%a6%a6/",
      views: 890,
    },
  ];

  for (const blogData of blogPostsData) {
    const blog = await prisma.blogPost.create({ data: blogData });
    console.log(`✅ Blog: ${blog.title}`);
  }

  console.log("\n🎉 Seed completed successfully!");
  console.log(`   Admin login: admin@taxvathub.com / admin123`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
