import { Metadata } from "next";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Travel Blog",
  description: "Read travel tips, destination guides, Umrah advice, and travel inspiration on the Easy Travel & Tours blog.",
};

export default function BlogPage() {
  return <BlogContent />;
}
