import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-black px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-charcoal opacity-90" />

        <div className="relative z-10 max-w-4xl mx-auto text-center pt-16">
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-8">
            Boutique Talent Advisory &amp; Acquisition
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-offwhite leading-[1.1] font-bold mb-6">
            Connecting Visionary Leaders with Exceptional Enterprises.
          </h1>

          <div className="mx-auto w-24 h-px bg-gold my-8" />

          <p className="font-sans text-base lg:text-lg text-offwhite/60 max-w-xl mx-auto leading-relaxed mb-12">
            Adviti operates at the intersection of leadership capital and organisational ambition, with the discretion, rigour, and reach that define premier advisory.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-gold text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-200"
            >
              Submit a Mandate
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-offwhite/20 text-offwhite/60 text-xs font-sans tracking-widest uppercase hover:border-offwhite/50 hover:text-offwhite transition-all duration-200"
            >
              Read Insights
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="w-px h-10 bg-gold/30" />
          <div className="w-1 h-1 rounded-full bg-gold/40" />
        </div>
      </section>

      {/* Narrative */}
      <section className="bg-charcoal py-24 px-6 lg:px-8 border-t border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-6">Our Mandate</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-offwhite leading-snug mb-6">
                The Boutique Difference in an Overcrowded Market
              </h2>
              <div className="w-12 h-px bg-gold/50 mb-6" />
              <p className="font-sans text-offwhite/60 leading-relaxed mb-4">
                Adviti was founded on a singular belief: that the most consequential leadership appointments demand an advisor, not a vendor. We bring the intimacy of a boutique practice where every engagement is personally overseen, with the breadth of a firm that has mapped talent across India&apos;s most dynamic markets.
              </p>
              <p className="font-sans text-offwhite/60 leading-relaxed">
                Our practice spans executive search, leadership advisory, and infrastructure talent acquisition, anchored in the twin hubs of Bangalore and Coimbatore. We serve founders, boards, and CHROs who recognise that a single hire can alter the trajectory of an organisation.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  label: "High-Discretion Search",
                  desc: "Sensitive leadership transitions managed with absolute confidentiality. No public postings. No intermediaries.",
                },
                {
                  label: "Leadership Intelligence",
                  desc: "Deep market mapping across GCCs, startups, and conglomerates, delivering intelligence, not just CVs.",
                },
                {
                  label: "Infrastructure Talent",
                  desc: "Precision sourcing for technology, operations, and engineering leadership across Tier-1 and Tier-2 markets.",
                },
              ].map(({ label, desc }) => (
                <div key={label} className="flex gap-5">
                  <div className="flex-shrink-0 w-px bg-gold/40 self-stretch" />
                  <div>
                    <p className="font-sans text-sm text-offwhite font-medium tracking-wide mb-1">{label}</p>
                    <p className="font-sans text-xs text-offwhite/50 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Presence Grid */}
      <section className="bg-black py-24 px-6 lg:px-8 border-t border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-4">Geographic Presence</p>
            <h2 className="font-serif text-3xl text-offwhite">Our Regional Hubs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/20 max-w-3xl mx-auto">
            {[
              {
                city: "Bangalore Hub",
                state: "Karnataka, India",
                desc: "Primary operations centre for GCC mandates, technology leadership, and Pan-India executive search.",
              },
              {
                city: "Coimbatore Office",
                state: "Tamil Nadu, India",
                desc: "Regional presence serving industrial, manufacturing, and emerging tech leadership across South Tamil Nadu.",
              },
            ].map(({ city, state, desc }) => (
              <div
                key={city}
                className="bg-charcoal p-10 group hover:bg-black transition-colors duration-300"
              >
                <p className="text-xs font-sans tracking-widest uppercase text-gold mb-3">{state}</p>
                <h3 className="font-serif text-2xl text-offwhite mb-3 group-hover:text-gold transition-colors duration-200">
                  {city}
                </h3>
                <div className="w-8 h-px bg-gold/40 mb-4" />
                <p className="text-xs font-sans text-offwhite/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-charcoal py-20 px-6 lg:px-8 border-t border-gold/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-offwhite mb-4">
            A Leadership Challenge Demands a Senior Conversation.
          </h2>
          <p className="font-sans text-offwhite/50 text-sm mb-8">
            All engagements are handled with complete discretion. Reach out to begin.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-4 border border-gold text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-200"
          >
            Initiate a Confidential Mandate
          </Link>
        </div>
      </section>
    </>
  );
}
