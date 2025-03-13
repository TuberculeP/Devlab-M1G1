"use client"

import { posts } from "@/.velite";
import { MDXContent } from "@/components/mdx-content";
import { notFound } from "next/navigation";
import '@/style/components/pages/Faq.scss';
import Link from "next/link";
import { useContext } from "react";
import { LightAndDarkModeContext } from "@/context/lightAndDarkMode";

const slugify = (s: string) => s.replace(/\s+/g, "-").toLowerCase();

export default function Post({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { isDark } = useContext(LightAndDarkModeContext)!;

  const post = posts.find((i) => {
    console.log(i)
    return slugify(i.title) === slug;
  });
  if (!post) return notFound();


  return (
    <section className={isDark ? "article-container-dark": "article-container"}>
      <Link href={"/faq"}>
        <div className="article-return">Retour</div>
      </Link>
      <article className="prose">
        <h1>{post.title}</h1>
        <MDXContent code={post.code} components={{}} />
      </article>
    </section>
  );
}
