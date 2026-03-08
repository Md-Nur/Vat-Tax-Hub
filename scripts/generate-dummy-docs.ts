import fs from "fs";
import path from "path";

const docsDir = path.join(process.cwd(), "public", "docs");

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const minimalPdf = Buffer.from(
  "%PDF-1.4\n" +
  "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n" +
  "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n" +
  "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents 4 0 R >>\nendobj\n" +
  "4 0 obj\n<< /Length 53 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Dummy Document) Tj\nET\nendstream\nendobj\n" +
  "xref\n0 5\n0000000000 65535 f \n" +
  "0000000009 00000 n \n" +
  "0000000058 00000 n \n" +
  "0000000115 00000 n \n" +
  "0000000288 00000 n \n" +
  "trailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n393\n%%EOF\n",
  "utf8"
);

// We will just create dummy text files for xlsx to satisfy the download
const minimalExcel = Buffer.from("Dummy Excel Data", "utf8");

const documents = [
  "mushak-6.3.pdf",
  "mushak-6.5.pdf",
  "mushak-6.10.pdf",
  "mushak-2.1.pdf",
  "mushak-4.3.pdf",
  "mushak-6.1.xlsx",
  "mushak-6.2.xlsx",
  "mushak-9.1.pdf",
  "mushak-11.1.pdf",
  "mushak-2.2.pdf",
  "income-tax-ordinance-1984.pdf",
  "income-tax-rules-1984.pdf",
  "vat-sd-act-2012.pdf",
  "vat-sd-rules-2016.pdf",
  "sro-186-2019.pdf",
  "sro-190-2019.pdf",
  "go-01-2020.pdf",
  "customs-act-1969.pdf"
];

for (const doc of documents) {
  const filePath = path.join(docsDir, doc);
  if (doc.endsWith(".pdf")) {
    fs.writeFileSync(filePath, minimalPdf);
  } else {
    fs.writeFileSync(filePath, minimalExcel);
  }
}

console.log(`✅ Generated ${documents.length} dummy files in public/docs`);
