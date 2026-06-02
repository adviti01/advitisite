import { posts } from "@/lib/posts";

export const metadata = {
  title: "Insights | Adviti Consulting",
  description: "Premium editorial intelligence on executive search, GCC talent, and leadership in India.",
};

const categoryColors: Record<string, string> = {
  "GCC & Tech Talent": "text-gold border-gold/40",
  "Executive Search": "text-offwhite/70 border-offwhite/20",
  "Leadership & Culture": "text-gold/80 border-gold/30",
  "Regulatory & Compliance": "text-offwhite/60 border-offwhite/15",
};

export default function BlogPage() {
  return (
    <section className="min-h-screen bg-charcoal pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-4">
            Editorial Intelligence
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-offwhite leading-tight mb-4">
            Insights &amp; Perspectives
          </h1>
          <div className="w-12 h-px bg-gold/50 mb-6" />
          <p className="font-sans text-offwhite/50 text-sm leading-relaxed">
            Rigorous analysis of leadership markets, talent dynamics, and regulatory developments across India&apos;s most strategic sectors.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
          {posts.map((post) => {
            const tagClass = categoryColors[post.category] ?? "text-gold border-gold/30";
            return (
              <article
                key={post.slug}
                className="bg-charcoal p-8 group hover:bg-black transition-colors duration-300 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`text-[10px] font-sans tracking-widest uppercase border px-2 py-0.5 ${tagClass}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-[10px] font-sans text-offwhite/30 tracking-wide">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-lg text-offwhite leading-snug mb-4 group-hover:text-gold transition-colors duration-200 flex-1">
                  {post.title}
                </h2>

                <div className="w-6 h-px bg-gold/30 mb-4" />

                <p className="font-sans text-xs text-offwhite/45 leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
