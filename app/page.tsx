"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import DocumentCard from "@/components/DocumentCard";
import Link from "next/link";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  description: string | null;
  descriptionBn: string | null;
  icon: string;
  _count: { documents: number };
}

interface Document {
  id: string;
  title: string;
  titleBn: string;
  description: string | null;
  descriptionBn: string | null;
  fileUrl: string;
  fileType: string;
  language: string;
  views: number;
  createdAt: string;
}

export default function HomePage() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentDocs, setRecentDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, docRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/documents?limit=6"),
        ]);
        const catData = await catRes.json();
        const docData = await docRes.json();
        setCategories(catData.categories || []);
        setRecentDocs(docData.documents || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 animate-slide-up">
              <SearchBar large />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: DocumentTextIcon, label: t("home.totalDocuments"), value: recentDocs.length > 0 ? "75+" : "—" },
              { icon: ShieldCheckIcon, label: t("home.totalCategories"), value: categories.length || "—" },
              { icon: GlobeAltIcon, label: t("common.bengali"), value: "EN/BN" },
              { icon: ClockIcon, label: "24/7", value: t("nav.search") },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center"
              >
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-blue-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t("home.featuredCategories")}
              </h2>
              <p className="mt-2 text-gray-500">
                Browse our comprehensive collection of tax and VAT resources
              </p>
            </div>
            <Link
              href="/categories"
              className="hidden sm:flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {t("home.browseAll")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 rounded-xl bg-white animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  name={cat.name}
                  nameBn={cat.nameBn}
                  slug={cat.slug}
                  description={cat.description}
                  descriptionBn={cat.descriptionBn}
                  icon={cat.icon}
                  documentCount={cat._count.documents}
                />
              ))}
            </div>
          )}

          <div className="sm:hidden mt-6 text-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 text-blue-600 font-medium"
            >
              {t("home.browseAll")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Documents */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t("home.recentDocuments")}
            </h2>
            <Link
              href="/search"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {t("home.viewAll")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : recentDocs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentDocs.map((doc) => (
                <DocumentCard key={doc.id} {...doc} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No documents available yet. Run the seed script to add sample data.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
            {t("home.quickLinks")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/categories/vat-forms", label: "VAT Forms (Mushak)", labelBn: "ভ্যাট ফর্ম (মুশক)", desc: "75+ VAT related forms" },
              { href: "/categories/income-tax-act", label: "Income Tax Act", labelBn: "আয়কর আইন", desc: "Complete tax legislation" },
              { href: "/categories/vat-sd-act", label: "VAT & SD Act 2012", labelBn: "ভ্যাট ও এসডি আইন ২০১২", desc: "VAT & Supplementary Duty" },
              { href: "/categories/sros", label: "SROs", labelBn: "এসআরও", desc: "Statutory Regulatory Orders" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="group block rounded-xl bg-white p-5 shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-100 transition-all"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {link.label}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
