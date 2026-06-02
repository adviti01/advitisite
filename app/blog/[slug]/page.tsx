import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/lib/posts";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Adviti Consulting`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-charcoal pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-offwhite/40 hover:text-gold transition-colors duration-200 mb-12"
        >
          <span aria-hidden="true">&#8592;</span> All Insights
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-sans tracking-widest uppercase border border-gold/40 text-gold px-2 py-0.5">
              {post.category}
            </span>
            <span className="text-[10px] font-sans text-offwhite/30 tracking-wide">
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl lg:text-4xl text-offwhite leading-tight mb-6">
            {post.title}
          </h1>

          <div className="w-12 h-px bg-gold/50 mb-6" />

          <p className="font-sans text-sm text-offwhite/50 leading-relaxed italic">
            {post.excerpt}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/10 mb-12" />

        {/* Body */}
        <div className="space-y-8">
          {post.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-serif text-xl text-offwhite mb-4">
                  {section.heading}
                </h2>
              )}
              <p className="font-sans text-sm text-offwhite/60 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-10 border-t border-gold/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-offwhite/40 hover:text-gold transition-colors duration-200"
          >
            <span aria-hidden="true">&#8592;</span> Back to Insights
          </Link>
        </div>
      </div>
    </article>
  );
}
