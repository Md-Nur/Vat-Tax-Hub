"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useTranslation } from "@/lib/i18n";
import {
  HomeIcon,
  DocumentTextIcon,
  FolderIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">{t("common.loading")}</div>
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  const navItems = [
    { href: "/admin", label: t("admin.dashboard"), icon: HomeIcon },
    { href: "/admin/documents", label: t("admin.documents"), icon: DocumentTextIcon },
    { href: "/admin/categories", label: t("admin.categories"), icon: FolderIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">{t("nav.admin")}</h2>
            <p className="text-xs text-gray-500 mt-1">{user.email}</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              {t("admin.backToSite")}
            </Link>
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-2">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 lg:p-8 pb-20 lg:pb-8">{children}</div>
      </div>
    </div>
  );
}
