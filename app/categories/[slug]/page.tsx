"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import DocumentCard from "@/components/DocumentCard";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  description: string | null;
  descriptionBn: string | null;
}

interface Document {
  id: string;
  title: string;
  titleBn: string;
  description: string | null;
  descriptionBn: string | null;
  fileUrl: string;
  fileType: string;
  language: string;
  views: number;
  createdAt: string;
  category: Category;
}

export default function CategoryPage() {
  const { t, locale } = useTranslation();
  const params = useParams();
  const slug = params.slug as string;
  const [documents, setDocuments] = useState<Document[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get categories to find the one matching slug
        const catRes = await fetch("/api/categories");
        const catData = await catRes.json();
        const cat = catData.categories?.find((c: Category & { slug: string }) => c.slug === slug);

        if (cat) {
          setCategory(cat);
          // Fetch documents for this category
          const docRes = await fetch(`/api/documents?categoryId=${cat.id}&limit=100`);
          const docData = await docRes.json();
          setDocuments(docData.documents || []);
        }
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const displayName = locale === "bn" && category?.nameBn ? category.nameBn : category?.name;
  const displayDesc = locale === "bn" && category?.descriptionBn ? category.descriptionBn : category?.description;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {t("category.backToCategories")}
        </Link>

        {loading ? (
          <div className="space-y-4">
            <div className="h-10 w-64 bg-white rounded-lg animate-pulse" />
            <div className="h-6 w-96 bg-white rounded-lg animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 rounded-xl bg-white animate-pulse" />
              ))}
            </div>
          </div>
        ) : category ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{displayName}</h1>
              {displayDesc && (
                <p className="mt-2 text-gray-500 text-lg">{displayDesc}</p>
              )}
              <p className="mt-2 text-sm text-gray-400">
                {documents.length} {t("category.documents")}
              </p>
            </div>

            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <DocumentCard key={doc.id} {...doc} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <DocumentTextIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">{t("category.noDocuments")}</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t("category.notFound")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
