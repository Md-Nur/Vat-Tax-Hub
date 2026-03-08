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

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-sm">
              TV
            </div>
            <span className="hidden sm:block text-lg font-bold text-gray-900">
              Tax<span className="text-blue-600">VAT</span>Hub
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchBar compact />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/categories"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {t("nav.categories")}
            </Link>
            {user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {t("nav.admin")}
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
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  <UserCircleIcon className="h-6 w-6" />
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
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
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
