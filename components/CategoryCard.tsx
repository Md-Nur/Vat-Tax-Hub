"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import {
  DocumentTextIcon,
  ScaleIcon,
  ClipboardDocumentListIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";

interface CategoryCardProps {
  name: string;
  nameBn: string;
  slug: string;
  description?: string | null;
  descriptionBn?: string | null;
  icon?: string;
  documentCount: number;
}

const iconMap: Record<string, typeof FolderIcon> = {
  "document-text": DocumentTextIcon,
  scale: ScaleIcon,
  clipboard: ClipboardDocumentListIcon,
  briefcase: BriefcaseIcon,
  building: BuildingLibraryIcon,
  folder: FolderIcon,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  "document-text": { bg: "bg-red-50", text: "text-red-600", border: "border-red-100" },
  scale: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  clipboard: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  briefcase: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  building: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  folder: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-100" },
};

export default function CategoryCard({
  name,
  nameBn,
  slug,
  description,
  descriptionBn,
  icon = "folder",
  documentCount,
}: CategoryCardProps) {
  const { locale, t } = useTranslation();
  const Icon = iconMap[icon] || FolderIcon;
  const colors = colorMap[icon] || colorMap.folder;
  const displayName = locale === "bn" && nameBn ? nameBn : name;
  const displayDesc = locale === "bn" && descriptionBn ? descriptionBn : description;

  return (
    <Link
      href={`/categories/${slug}`}
      className={`group relative block rounded-2xl border ${colors.border} bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-${colors.text.split('-')[1]}-900/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
    >
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${colors.bg} opacity-50 blur-2xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      
      <div className={`relative inline-flex items-center justify-center rounded-xl p-3.5 ${colors.bg} mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
        <Icon className={`h-7 w-7 ${colors.text}`} />
      </div>
      
      <div className="relative z-10">
        <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
          {displayName}
        </h3>
        {displayDesc && (
          <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>
        )}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
            {documentCount} {t("category.documents")}
          </p>
          <div className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${colors.text}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
