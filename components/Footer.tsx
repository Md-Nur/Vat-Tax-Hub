"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm">
                TV
              </div>
              <span className="text-lg font-bold text-white">
                Tax<span className="text-blue-400">VAT</span>Hub
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-blue-400 transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm hover:text-blue-400 transition-colors">
                  {t("nav.categories")}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm hover:text-blue-400 transition-colors">
                  {t("nav.search")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.resources")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/vat-forms" className="text-sm hover:text-blue-400 transition-colors">
                  {t("footer.vatForms")}
                </Link>
              </li>
              <li>
                <Link href="/categories/income-tax-act" className="text-sm hover:text-blue-400 transition-colors">
                  {t("footer.incomeTax")}
                </Link>
              </li>
              <li>
                <Link href="/categories/sros" className="text-sm hover:text-blue-400 transition-colors">
                  {t("footer.sros")}
                </Link>
              </li>
              <li>
                <Link href="/categories/general-orders" className="text-sm hover:text-blue-400 transition-colors">
                  {t("footer.generalOrders")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@taxvathub.com</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
