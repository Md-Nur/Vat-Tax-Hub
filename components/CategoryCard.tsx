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
      className={`group block rounded-xl border ${colors.border} bg-white p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200`}
    >
      <div className={`inline-flex rounded-xl p-3 ${colors.bg} mb-4`}>
        <Icon className={`h-7 w-7 ${colors.text}`} />
      </div>
      <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
        {displayName}
      </h3>
      {displayDesc && (
        <p className="mt-1.5 text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {displayDesc}
        </p>
      )}
      <p className="mt-3 text-xs font-medium text-gray-400">
        {documentCount} {t("category.documents")}
      </p>
    </Link>
  );
}
