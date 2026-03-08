import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TaxVATHub - Free Tax & VAT Resources for Bangladesh",
    template: "%s | TaxVATHub",
  },
  description:
    "Access comprehensive tax forms, VAT documents, income tax acts, SROs, and more for Bangladesh — all in one place. TaxVATHub is your free resource for Bangladesh tax and VAT documentation.",
  keywords: [
    "Bangladesh tax",
    "VAT forms",
    "Mushak",
    "income tax",
    "SRO",
    "tax documents",
    "বাংলাদেশ কর",
    "ভ্যাট ফর্ম",
  ],
  authors: [{ name: "TaxVATHub" }],
  openGraph: {
    title: "TaxVATHub - Free Tax & VAT Resources for Bangladesh",
    description:
      "Access comprehensive tax forms, VAT documents, income tax acts, SROs, and more for Bangladesh.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
