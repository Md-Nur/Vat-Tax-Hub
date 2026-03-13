"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import BlogCard from "@/components/BlogCard";
import {
  NewspaperIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface BlogPost {
  id: string;
  title: string;
  titleBn: string;
  slug: string;
  excerpt: string | null;
  excerptBn: string | null;
  category: string;
  views: number;
  createdAt: string;
}

export default function BlogsPage() {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "9",
        });
        if (selectedCategory) {
          params.set("category", selectedCategory);
        }
        const res = await fetch(`/api/blogs?${params}`);
        const data = await res.json();
        setBlogs(data.blogs || []);
        setTotalPages(data.totalPages || 1);
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [page, selectedCategory]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat === selectedCategory ? "" : cat);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px] animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-indigo-600/20 blur-[80px] animate-pulse"
            style={{ animationDuration: "5s" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-500/10 text-blue-400 mb-6">
              <NewspaperIcon className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              {t("blog.title")}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t("blog.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="flex flex-wrap gap-2 justify-center bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-4">
          <button
            onClick={() => handleCategoryChange("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === ""
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {t("blog.allCategories")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-2xl bg-white animate-pulse border border-slate-100"
              />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <NewspaperIcon className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              {t("blog.noResults")}
            </h3>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  p === page
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
