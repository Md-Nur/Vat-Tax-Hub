"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import CategoryCard from "@/components/CategoryCard";

interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  description: string | null;
  descriptionBn: string | null;
  icon: string;
  _count: { documents: number };
}

export default function CategoriesPage() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">{t("nav.categories")}</h1>
          <p className="mt-2 text-gray-500">
            Browse all document categories
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                nameBn={cat.nameBn}
                slug={cat.slug}
                description={cat.description}
                descriptionBn={cat.descriptionBn}
                icon={cat.icon}
                documentCount={cat._count.documents}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
