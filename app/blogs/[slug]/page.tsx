"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import BlogCard from "@/components/BlogCard";
import {
  ArrowLeftIcon,
  EyeIcon,
  CalendarDaysIcon,
  ArrowTopRightOnSquareIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

interface BlogPost {
  id: string;
  title: string;
  titleBn: string;
  slug: string;
  excerpt: string | null;
  excerptBn: string | null;
  content: string | null;
  contentBn: string | null;
  category: string;
  sourceUrl: string | null;
  views: number;
  createdAt: string;
}

interface RelatedPost {
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

export default function BlogDetailPage() {
  const { t, locale } = useTranslation();
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setBlog(data.blog);
        setRelatedPosts(data.relatedPosts || []);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded-xl w-1/3" />
            <div className="h-12 bg-slate-200 rounded-xl w-2/3" />
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="space-y-3 mt-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-slate-100 rounded"
                  style={{ width: `${85 + Math.random() * 15}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
          <p className="text-slate-500 mb-6">Blog post not found</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {t("blog.backToBlogs")}
          </Link>
        </div>
      </div>
    );
  }

  const displayTitle =
    locale === "bn" && blog.titleBn ? blog.titleBn : blog.title;
  const displayExcerpt =
    locale === "bn" && blog.excerptBn ? blog.excerptBn : blog.excerpt;
  const displayContent =
    locale === "bn" && blog.contentBn
      ? blog.contentBn
      : blog.content || displayExcerpt;

  const categoryColors: Record<string, string> = {
    "Income Tax Blog": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "VAT Blog": "bg-blue-50 text-blue-700 border-blue-200",
    "TDS Rules": "bg-amber-50 text-amber-700 border-amber-200",
    "VDS Rules": "bg-purple-50 text-purple-700 border-purple-200",
    "Income Tax Schedules": "bg-rose-50 text-rose-700 border-rose-200",
    "VAT Schedules": "bg-cyan-50 text-cyan-700 border-cyan-200",
    "Income Tax Act 2023": "bg-indigo-50 text-indigo-700 border-indigo-200",
    "VAT & SD Act 2012": "bg-teal-50 text-teal-700 border-teal-200",
  };

  const colorClass =
    categoryColors[blog.category] ||
    "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Article Header */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px] animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-indigo-600/15 blur-[80px] animate-pulse"
            style={{ animationDuration: "6s" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {t("blog.backToBlogs")}
          </Link>

          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}
            >
              <TagIcon className="h-3 w-3" />
              {blog.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {displayTitle}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <CalendarDaysIcon className="h-4 w-4" />
              {t("blog.published")}:{" "}
              {new Date(blog.createdAt).toLocaleDateString(
                locale === "bn" ? "bn-BD" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <EyeIcon className="h-4 w-4" />
              {blog.views.toLocaleString()} {t("blog.views")}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <article className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8 sm:p-12">
          {/* Excerpt as lead paragraph */}
          {displayExcerpt && (
            <p className="text-lg text-slate-600 leading-relaxed mb-8 pb-8 border-b border-slate-100 font-medium">
              {displayExcerpt}
            </p>
          )}

          {/* Content */}
          {displayContent && (
            <div className="prose prose-slate prose-lg max-w-none">
              <div
                className="text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: displayContent }}
              />
            </div>
          )}

        </article>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
            {t("blog.relatedPosts")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
