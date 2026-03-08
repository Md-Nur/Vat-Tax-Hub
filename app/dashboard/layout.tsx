"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useTranslation } from "@/lib/i18n";
import {
  HomeIcon,
  CircleStackIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
  Bars3BottomLeftIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role === "ADMIN")) {
      // For now we allow any logged-in user, but if not logged in push to login
      if (!user) {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-gray-500 animate-pulse">{t("common.loading")}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    { href: "/dashboard", label: t("dashboard.overview"), icon: HomeIcon },
    { href: "/dashboard/transactions", label: t("dashboard.transactions"), icon: CircleStackIcon },
    { href: "/dashboard/reports", label: t("dashboard.reports"), icon: DocumentChartBarIcon },
    { href: "/dashboard/settings", label: t("dashboard.settings"), icon: Cog6ToothIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between px-6 lg:hidden border-b border-slate-100">
            <span className="text-lg font-bold text-slate-900">{t("dashboard.title")}</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500 hover:text-slate-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 border-b border-slate-100 hidden lg:block">
            <h2 className="text-lg font-bold text-slate-900">{t("dashboard.title")}</h2>
            <p className="text-xs text-slate-500 mt-1 truncate">{user.email}</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-indigo-500/20 text-white translate-x-1"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600 hover:translate-x-1"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-slate-100 absolute bottom-0 w-full bg-white z-10">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              {t("dashboard.backToSite")}
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="lg:hidden flex items-center border-b border-slate-200 bg-white px-4 py-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-slate-500 hover:text-slate-700 focus:outline-none"
            >
              <Bars3BottomLeftIcon className="h-6 w-6" />
            </button>
            <span className="ml-3 text-lg font-medium text-slate-900">{t("dashboard.title")}</span>
          </div>
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
