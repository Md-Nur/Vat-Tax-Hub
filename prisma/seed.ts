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

  // Seed Blog Posts from taxvatpoint.com (using scraped full content from JSON)
  console.log("\n📝 Seeding blog posts from blogs_data.json...");

  await prisma.blogPost.deleteMany({});
  
  try {
    const fs = require('fs');
    const path = require('path');
    const blogsPath = path.join(__dirname, 'blogs_data.json');
    const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
    
    for (const blogData of blogsData) {
      // Remove auto-generated ID to let Prisma handle it
      const { id, createdAt, updatedAt, ...rest } = blogData;
      const blog = await prisma.blogPost.create({ data: rest });
      console.log(`✅ Blog: ${blog.title}`);
    }
  } catch(e: any) {
    console.warn("⚠️ Could not load blogs_data.json. Skipping blog seeding.");
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
