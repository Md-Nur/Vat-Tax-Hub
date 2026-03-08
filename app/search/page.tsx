"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import SearchBar from "@/components/SearchBar";
import DocumentCard from "@/components/DocumentCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
}

function SearchContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/docs/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setDocuments(data.documents || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setDocuments([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("search.title")}</h1>
          <div className="max-w-2xl">
            <SearchBar initialQuery={query} />
          </div>
        </div>

        {query && (
          <p className="mb-6 text-gray-500">
            {t("search.resultsFor")}: <span className="font-medium text-gray-900">&quot;{query}&quot;</span>
            {!loading && ` (${documents.length} results)`}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-white animate-pulse" />
            ))}
          </div>
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} {...doc} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <MagnifyingGlassIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">{t("search.noResults")}</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <MagnifyingGlassIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">{t("search.enterTerm")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12"><div className="mx-auto max-w-7xl px-4"><div className="h-8 w-48 bg-gray-200 rounded animate-pulse" /></div></div>}>
      <SearchContent />
    </Suspense>
  );
}
