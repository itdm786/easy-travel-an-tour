"use client";

import { useMemo, useState } from "react";
import { Edit3, FileText, Plus, Save, Trash2, X } from "lucide-react";
import { slugify } from "@/lib/utils";

type BlogRow = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[] | unknown;
  readTime: string | null;
  published: boolean | null;
};

type BlogForm = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string;
  readTime: string;
  published: boolean;
};

const emptyForm: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
  author: "Easy Travel Editorial Team",
  category: "Travel Guide",
  tags: "",
  readTime: "5 min read",
  published: true,
};

function toForm(blog: BlogRow): BlogForm {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    image: blog.image,
    author: blog.author,
    category: blog.category,
    tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
    readTime: blog.readTime || "5 min read",
    published: Boolean(blog.published),
  };
}

function tagsToArray(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function BlogManager({ initialBlogs }: { initialBlogs: BlogRow[] }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      [blog.title, blog.category, blog.author].some((value) =>
        value.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [blogs, query]);

  const saveBlog = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      tags: tagsToArray(form.tags),
    };

    const url = form.id ? `/api/admin/blogs/${form.id}` : "/api/admin/blogs";
    const method = form.id ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Unable to save blog");
      setSaving(false);
      return;
    }

    const saved = result.blog as BlogRow;
    setBlogs((current) =>
      form.id ? current.map((blog) => (blog.id === saved.id ? saved : blog)) : [saved, ...current]
    );
    setForm(emptyForm);
    setIsEditing(false);
    setMessage("Blog post saved successfully.");
    setSaving(false);
  };

  const deleteBlog = async (id: number) => {
    if (!confirm("Delete this blog post?")) return;
    const response = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    if (response.ok) {
      setBlogs((current) => current.filter((blog) => blog.id !== id));
      setMessage("Blog post deleted successfully.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search blog posts..."
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent sm:w-80"
        />
        <button
          onClick={() => {
            setForm(emptyForm);
            setIsEditing(true);
          }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-accent-light"
        >
          <Plus className="h-4 w-4" /> Add Blog
        </button>
      </div>

      {message && (
        <div className="rounded-2xl border border-accent/20 bg-accent/10 px-5 py-3 text-sm text-accent">
          {message}
        </div>
      )}

      {isEditing && (
        <form onSubmit={saveBlog} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold">{form.id ? "Edit Blog" : "Add Blog"}</h2>
              <p className="text-sm text-white/45">Blog title, SEO slug, content, image, tags, and publish status are editable.</p>
            </div>
            <button type="button" onClick={() => setIsEditing(false)} className="rounded-xl border border-white/10 p-2 text-white/60 hover:text-accent">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value, slug: form.slug || slugify(value) })} required />
            <Field label="Slug" value={form.slug} onChange={(value) => setForm({ ...form, slug: slugify(value) })} />
            <Field label="Author" value={form.author} onChange={(value) => setForm({ ...form, author: value })} />
            <Field label="Category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} />
            <Field label="Read Time" value={form.readTime} onChange={(value) => setForm({ ...form, readTime: value })} />
            <Field label="Tags (comma separated)" value={form.tags} onChange={(value) => setForm({ ...form, tags: value })} />
            <Field label="Image URL" value={form.image} onChange={(value) => setForm({ ...form, image: value })} className="md:col-span-2" />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <TextArea label="Excerpt" value={form.excerpt} onChange={(value) => setForm({ ...form, excerpt: value })} rows={4} />
            <TextArea label="Full Content" value={form.content} onChange={(value) => setForm({ ...form, content: value })} rows={10} />
          </div>

          <label className="mt-4 flex items-center gap-3 text-sm text-white/70">
            <input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} className="h-4 w-4 accent-accent" />
            Published on website
          </label>

          <button disabled={saving} className="mt-6 flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 font-semibold text-primary disabled:opacity-60">
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Blog"}
          </button>
        </form>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <article key={blog.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all hover:border-accent/40">
            <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${blog.image})` }} />
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">{blog.category}</span>
                <span className={`rounded-full px-3 py-1 text-xs ${blog.published ? "bg-emerald-400/10 text-emerald-300" : "bg-white/10 text-white/45"}`}>
                  {blog.published ? "Published" : "Draft"}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">{blog.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-white/45">{blog.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
                <FileText className="h-3.5 w-3.5 text-accent" /> {blog.author} · {blog.readTime}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => { setForm(toForm(blog)); setIsEditing(true); }} className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-accent hover:text-primary">
                  <Edit3 className="h-4 w-4" /> Edit
                </button>
                <button onClick={() => deleteBlog(blog.id)} className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 px-4 py-2 text-sm text-red-200 transition-all hover:bg-red-500 hover:text-white">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, className = "" }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; className?: string }) {
  return (
    <label className={className}>
      <span className="mb-2 block text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none focus:border-accent" />
    </label>
  );
}

function TextArea({ label, value, onChange, rows }: { label: string; value: string; onChange: (value: string) => void; rows: number }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold tracking-[0.15em] text-white/40 uppercase">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none focus:border-accent" />
    </label>
  );
}
