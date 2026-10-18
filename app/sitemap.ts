import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Dodaj sve staticke stranice i dinamicki generisi za blog/proizvode
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    // Primer za dinamicke stranice (blog, proizvodi):
    // ...posts.map((post) => ({
    //   url: `${SITE_URL}/blog/${post.slug}`,
    //   lastModified: new Date(post.updatedAt),
    //   changeFrequency: "weekly" as const,
    //   priority: 0.8,
    // })),
  ];
}
