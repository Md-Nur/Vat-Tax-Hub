"use client";

import { useTranslation } from "@/lib/i18n";
import {
  DocumentTextIcon,
  TableCellsIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface DocumentCardProps {
  id: string;
  title: string;
  titleBn: string;
  description?: string | null;
  descriptionBn?: string | null;
  fileUrl: string;
  fileType: string;
  language: string;
  views: number;
  createdAt: string;
}

const fileTypeConfig: Record<string, { icon: typeof DocumentTextIcon; color: string; bg: string }> = {
  pdf: { icon: DocumentTextIcon, color: "text-red-600", bg: "bg-red-50" },
  excel: { icon: TableCellsIcon, color: "text-green-600", bg: "bg-green-50" },
  word: { icon: DocumentIcon, color: "text-blue-600", bg: "bg-blue-50" },
};

export default function DocumentCard({
  title,
  titleBn,
  description,
  descriptionBn,
  fileUrl,
  fileType,
  views,
  createdAt,
}: DocumentCardProps) {
  const { locale, t } = useTranslation();
  const config = fileTypeConfig[fileType] || fileTypeConfig.pdf;
  const Icon = config.icon;
  const displayTitle = locale === "bn" && titleBn ? titleBn : title;
  const displayDesc = locale === "bn" && descriptionBn ? descriptionBn : description;

  return (
    <div className="group relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* File type icon */}
        <div className={`shrink-0 rounded-lg p-3 ${config.bg}`}>
          <Icon className={`h-6 w-6 ${config.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {displayTitle}
          </h3>
          {displayDesc && (
            <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {displayDesc}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium uppercase ${config.bg} ${config.color}`}>
              {fileType}
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon className="h-3.5 w-3.5" />
              {views} {t("document.views")}
            </span>
            <span>
              {new Date(createdAt).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US")}
            </span>
          </div>
        </div>

        {/* Download button */}
        <a
          href={fileUrl}
          download
          className="shrink-0 rounded-lg p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
          title={t("document.download")}
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
