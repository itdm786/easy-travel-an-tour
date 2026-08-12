"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import { ArrowRight, Clock, Tag } from "lucide-react";

type BlogLike = {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  readTime?: string | null;
};

export function BlogContent() {
  const [posts, setPosts] = useState<BlogLike[]>(BLOG_POSTS);

  useEffect(() => {
    fetch("/api/blogs")
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.blogs) && result.blogs.length > 0) {
          setPosts(result.blogs);
        }
      })
      .catch(() => undefined);
  }, []);

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center bg-primary pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-accent uppercase">Travel Insights</p>
            <h1 className="font-display text-5xl font-bold text-white md:text-7xl">Our Blog</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">Travel tips, destination guides, and inspiration for your next adventure.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="mb-5 overflow-hidden rounded-3xl">
                    <div className="h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${post.image})` }} />
                  </div>
                  <div className="mb-3 flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs text-text-light"><Tag className="h-3 w-3 text-accent" />{post.category}</span>
                    <span className="flex items-center gap-1 text-xs text-text-light"><Clock className="h-3 w-3 text-accent" />{post.readTime || "5 min read"}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-text transition-colors group-hover:text-accent">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-light">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-accent">Read More <ArrowRight className="h-4 w-4" /></div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
