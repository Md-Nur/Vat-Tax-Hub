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
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300">
      <div className="flex items-start gap-5">
        {/* File type icon */}
        <div className={`shrink-0 flex items-center justify-center rounded-xl p-3.5 ${config.bg} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
          <Icon className={`h-7 w-7 ${config.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {displayTitle}
          </h3>
          {displayDesc && (
            <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {displayDesc}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
            <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${config.bg} ${config.color}`}>
              {fileType}
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
              <EyeIcon className="h-4 w-4 text-slate-400" />
              {views} {t("document.views")}
            </span>
            <span className="bg-slate-50 px-2 py-1 rounded-md">
              {new Date(createdAt).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US", { year: 'numeric', month: 'short', day: 'numeric'})}
            </span>
          </div>
        </div>

        {/* Download button */}
        <div className="shrink-0 flex flex-col items-center">
          <a
            href={fileUrl}
            download
            className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-50 text-slate-400 hover:text-white hover:bg-blue-600 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            title={t("document.download")}
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
