"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import {
  DocumentTextIcon,
  FolderIcon,
  UsersIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface Stats {
  totalDocuments: number;
  totalCategories: number;
  totalUsers: number;
  totalViews: number;
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: t("admin.totalDocs"),
      value: stats?.totalDocuments ?? "—",
      icon: DocumentTextIcon,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: t("admin.totalCats"),
      value: stats?.totalCategories ?? "—",
      icon: FolderIcon,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: t("admin.totalUsers"),
      value: stats?.totalUsers ?? "—",
      icon: UsersIcon,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: t("admin.totalViewsLabel"),
      value: stats?.totalViews ?? "—",
      icon: EyeIcon,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">{t("admin.overview")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`rounded-xl bg-white border border-gray-100 p-6 shadow-sm ${
              loading ? "animate-pulse" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome to Admin Dashboard</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Manage your documents, categories, and users from here. Use the sidebar navigation to
          access different sections.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/admin/documents"
            className="rounded-lg border border-gray-200 p-4 hover:border-blue-200 hover:bg-blue-50 transition-all"
          >
            <DocumentTextIcon className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Manage Documents</h3>
            <p className="text-sm text-gray-500 mt-1">Add, edit, or remove documents</p>
          </a>
          <a
            href="/admin/categories"
            className="rounded-lg border border-gray-200 p-4 hover:border-emerald-200 hover:bg-emerald-50 transition-all"
          >
            <FolderIcon className="h-6 w-6 text-emerald-600 mb-2" />
            <h3 className="font-medium text-gray-900">Manage Categories</h3>
            <p className="text-sm text-gray-500 mt-1">Organize document categories</p>
          </a>
        </div>
      </div>
    </div>
  );
}
