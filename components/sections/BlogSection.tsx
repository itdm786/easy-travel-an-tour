"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

export function BlogSection() {
  const [posts, setPosts] = useState<BlogLike[]>(BLOG_POSTS);

  useEffect(() => {
    fetch("/api/blogs")
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.blogs) && result.blogs.length > 0) {
          setPosts(result.blogs.slice(0, 3));
        }
      })
      .catch(() => undefined);
  }, []);

  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          subtitle="Travel Insights"
          title="Latest from Our Blog"
          description="Travel tips, destination guides, and inspiration to help you plan your next adventure."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
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
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                  Read More <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-accent">
            Read All Articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
