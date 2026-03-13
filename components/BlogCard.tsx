"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import {
  EyeIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface BlogCardProps {
  title: string;
  titleBn: string;
  slug: string;
  excerpt: string | null;
  excerptBn: string | null;
  category: string;
  views: number;
  createdAt: string;
}

export default function BlogCard({
  title,
  titleBn,
  slug,
  excerpt,
  excerptBn,
  category,
  views,
  createdAt,
}: BlogCardProps) {
  const { t, locale } = useTranslation();
  const displayTitle = locale === "bn" && titleBn ? titleBn : title;
  const displayExcerpt =
    locale === "bn" && excerptBn ? excerptBn : excerpt;

  const categoryColors: Record<string, string> = {
    "Income Tax Blog":
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    "VAT Blog": "bg-blue-50 text-blue-700 border-blue-200",
    "TDS Rules": "bg-amber-50 text-amber-700 border-amber-200",
    "VDS Rules": "bg-purple-50 text-purple-700 border-purple-200",
    "Income Tax Schedules":
      "bg-rose-50 text-rose-700 border-rose-200",
    "VAT Schedules": "bg-cyan-50 text-cyan-700 border-cyan-200",
    "Income Tax Act 2023":
      "bg-indigo-50 text-indigo-700 border-indigo-200",
    "VAT & SD Act 2012":
      "bg-teal-50 text-teal-700 border-teal-200",
  };

  const colorClass =
    categoryColors[category] ||
    "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <Link
      href={`/blogs/${slug}`}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
          {displayTitle}
        </h3>

        {/* Excerpt */}
        {displayExcerpt && (
          <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1 leading-relaxed">
            {displayExcerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <CalendarDaysIcon className="h-3.5 w-3.5" />
              {new Date(createdAt).toLocaleDateString(
                locale === "bn" ? "bn-BD" : "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon className="h-3.5 w-3.5" />
              {views.toLocaleString()}
            </span>
          </div>

          <span className="flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            {t("blog.readMore")}
            <ArrowRightIcon className="ml-1 h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
