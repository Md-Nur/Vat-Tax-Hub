"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface Category {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  description: string | null;
  descriptionBn: string | null;
  icon: string;
  _count?: { documents: number };
}

interface Document {
  id: string;
  title: string;
  titleBn: string;
  description: string | null;
  descriptionBn: string | null;
  categoryId: string;
  category: Category;
  fileUrl: string;
  fileType: string;
  language: string;
  views: number;
  createdAt: string;
}

interface FormData {
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  categoryId: string;
  fileUrl: string;
  fileType: string;
  language: string;
}

const emptyForm: FormData = {
  title: "",
  titleBn: "",
  description: "",
  descriptionBn: "",
  categoryId: "",
  fileUrl: "",
  fileType: "pdf",
  language: "en",
};

export default function AdminDocuments() {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Document | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [docRes, catRes] = await Promise.all([
        fetch("/api/documents?limit=100"),
        fetch("/api/categories"),
      ]);
      const docData = await docRes.json();
      const catData = await catRes.json();
      setDocuments(docData.documents || []);
      setCategories(catData.categories || []);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (doc: Document) => {
    setEditing(doc);
    setForm({
      title: doc.title,
      titleBn: doc.titleBn,
      description: doc.description || "",
      descriptionBn: doc.descriptionBn || "",
      categoryId: doc.categoryId,
      fileUrl: doc.fileUrl,
      fileType: doc.fileType,
      language: doc.language,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/documents/${editing.id}` : "/api/documents";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowModal(false);
        fetchData();
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("admin.deleteConfirm"))) return;
    try {
      await fetch(`/api/documents/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new window.FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, fileUrl: data.fileUrl }));
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t("admin.documents")}</h1>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          {t("admin.addDocument")}
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">{t("admin.title")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">{t("admin.fileType")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Views</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">{t("admin.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-4 py-3"><div className="h-5 bg-gray-100 rounded animate-pulse w-48" /></td>
                    <td className="px-4 py-3 hidden md:table-cell"><div className="h-5 bg-gray-100 rounded animate-pulse w-24" /></td>
                    <td className="px-4 py-3 hidden sm:table-cell"><div className="h-5 bg-gray-100 rounded animate-pulse w-16" /></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><div className="h-5 bg-gray-100 rounded animate-pulse w-12" /></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-100 rounded animate-pulse w-20 ml-auto" /></td>
                  </tr>
                ))
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                    No documents yet. Click &ldquo;Add Document&rdquo; to create one.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 line-clamp-1">{doc.title}</div>
                      {doc.titleBn && (
                        <div className="text-xs text-gray-400 line-clamp-1">{doc.titleBn}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{doc.category?.name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase text-gray-600">
                        {doc.fileType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{doc.views}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(doc)}
                          className="rounded-lg p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="rounded-lg p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {editing ? t("admin.editDocument") : t("admin.addDocument")}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (BN)</label>
                  <input
                    value={form.titleBn}
                    onChange={(e) => setForm({ ...form, titleBn: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (BN)</label>
                <textarea
                  value={form.descriptionBn}
                  onChange={(e) => setForm({ ...form, descriptionBn: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
                {form.fileUrl && (
                  <p className="mt-1 text-xs text-green-600">File: {form.fileUrl}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
                  <input
                    value={form.fileUrl}
                    onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                    placeholder="/docs/file.pdf"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                  <select
                    value={form.fileType}
                    onChange={(e) => setForm({ ...form, fileType: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="word">Word</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={form.language}
                    onChange={(e) => setForm({ ...form, language: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="en">English</option>
                    <option value="bn">Bengali</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {t("admin.cancel")}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {saving ? t("common.loading") : t("admin.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
