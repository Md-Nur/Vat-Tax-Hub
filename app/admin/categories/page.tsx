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

interface FormData {
  name: string;
  nameBn: string;
  slug: string;
  description: string;
  descriptionBn: string;
  icon: string;
}

const emptyForm: FormData = {
  name: "",
  nameBn: "",
  slug: "",
  description: "",
  descriptionBn: "",
  icon: "folder",
};

const iconOptions = [
  { value: "document-text", label: "Document" },
  { value: "scale", label: "Scale (Law)" },
  { value: "clipboard", label: "Clipboard" },
  { value: "briefcase", label: "Briefcase" },
  { value: "building", label: "Building" },
  { value: "folder", label: "Folder" },
];

export default function AdminCategories() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories || []);
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

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      nameBn: cat.nameBn,
      slug: cat.slug,
      description: cat.description || "",
      descriptionBn: cat.descriptionBn || "",
      icon: cat.icon,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/categories/${editing.id}` : "/api/categories";
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
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t("admin.categories")}</h1>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          {t("admin.addCategory")}
        </button>
      </div>

      <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">Icon</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">Documents</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">{t("admin.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-4 py-3"><div className="h-5 bg-gray-100 rounded animate-pulse w-32" /></td>
                    <td className="px-4 py-3 hidden md:table-cell"><div className="h-5 bg-gray-100 rounded animate-pulse w-24" /></td>
                    <td className="px-4 py-3 hidden sm:table-cell"><div className="h-5 bg-gray-100 rounded animate-pulse w-16" /></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><div className="h-5 bg-gray-100 rounded animate-pulse w-8" /></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-100 rounded animate-pulse w-20 ml-auto" /></td>
                  </tr>
                ))
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                    No categories yet. Click &ldquo;Add Category&rdquo; to create one.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{cat.name}</div>
                      {cat.nameBn && (
                        <div className="text-xs text-gray-400">{cat.nameBn}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell font-mono text-xs">{cat.slug}</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell capitalize">{cat.icon}</td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{cat._count?.documents ?? 0}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(cat)}
                          className="rounded-lg p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
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
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                {editing ? t("admin.editCategory") : t("admin.addCategory")}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
                  <input
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setForm({ ...form, name, slug: !editing ? generateSlug(name) : form.slug });
                    }}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (BN)</label>
                  <input
                    value={form.nameBn}
                    onChange={(e) => setForm({ ...form, nameBn: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
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
