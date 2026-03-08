"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/components/AuthProvider";
import { LanguageToggle } from "@/components/LanguageToggle";
import SearchBar from "@/components/SearchBar";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0 rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <div className="relative flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5">
              <Image 
                src="/img/logo.png" 
                width={46} 
                height={46} 
                alt="TaxVATHub Logo" 
                className="drop-shadow-md transition-all duration-300 p-2"
                priority
              />
            </div>
              
            <span className="hidden sm:block text-2xl font-black tracking-tight text-slate-900 transition-colors">
              Tax<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">VAT</span>Hub
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchBar compact />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "nav.home" },
              { href: "/calculators", label: "nav.calculators" },
              { href: "/forms", label: "nav.forms" },
              { href: "/dashboard", label: "nav.dashboard" },
              { href: "/resources", label: "nav.resources" },
              { href: "/categories", label: "nav.categories" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group"
              >
                {t(link.label)}
                <span className="absolute inset-x-3 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full duration-300 ease-out" />
              </Link>
            ))}
            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="relative px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group"
              >
                {t("nav.admin")}
                <span className="absolute inset-x-3 -bottom-1 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full duration-300 ease-out" />
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all"
                >
                  <UserCircleIcon className="h-6 w-6 text-slate-500" />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-1 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5 py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      {user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          {t("nav.admin")}
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        {t("nav.logout")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full shadow-sm shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 rounded-lg"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-blue-100 py-4 space-y-2">
            <div className="mb-3">
              <SearchBar compact />
            </div>
            <Link
              href="/"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/calculators"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.calculators")}
            </Link>
            <Link
              href="/forms"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.forms")}
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.dashboard")}
            </Link>
            <Link
              href="/resources"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.resources")}
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.categories")}
            </Link>
            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.admin")}
              </Link>
            )}
            {!user && (
              <div className="border-t border-gray-100 pt-2 mt-2 space-y-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
