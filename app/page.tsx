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
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Animated Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-indigo-600/20 blur-[80px] animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute -bottom-40 left-1/2 w-80 h-80 rounded-full bg-purple-600/20 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-fade-in relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 max-w-2xl mx-auto animate-slide-up shadow-2xl shadow-blue-900/20 rounded-2xl">
              <SearchBar large />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {[
              { icon: DocumentTextIcon, label: t("home.totalDocuments"), value: recentDocs.length > 0 ? "75+" : "—" },
              { icon: ShieldCheckIcon, label: t("home.totalCategories"), value: categories.length || "—" },
              { icon: GlobeAltIcon, label: t("common.bengali"), value: "EN/BN" },
              { icon: ClockIcon, label: "24/7", value: t("nav.search") },
            ].map((stat, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-center hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-blue-500/10 text-blue-400 mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-2 font-medium">{stat.label}</div>
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
                {t("home.featuredCategoriesDesc")}
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
              <p>{t("home.noDocumentsAvail")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {t("home.quickLinks")}
            </h2>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: "/categories/vat-forms", label: t("footer.vatForms"), labelBn: "ভ্যাট ফর্ম", desc: t("home.vatFormsDesc") },
              { href: "/categories/income-tax-act", label: t("footer.incomeTax"), labelBn: "আয়কর আইন", desc: t("home.incomeTaxActDesc") },
              { href: "/categories/vat-sd-act", label: t("home.vatSdAct"), labelBn: t("home.vatSdActBn"), desc: t("home.vatSdActDesc") },
              { href: "/categories/sros", label: "SROs", labelBn: "এসআরও", desc: t("home.srosDesc") },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="group relative block rounded-2xl bg-white p-8 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                  {link.label}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{link.desc}</p>
                <div className="mt-6 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  {t("home.explore")} <ArrowRightIcon className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
