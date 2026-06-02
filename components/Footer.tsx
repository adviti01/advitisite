import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-black mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-lg tracking-[0.2em] text-offwhite mb-3">ADVITI</p>
            <p className="text-xs font-sans text-offwhite/50 tracking-wide leading-relaxed mb-4">
              Connecting visionary leaders with exceptional enterprises.
            </p>
            <p className="text-[10px] font-sans text-offwhite/30 tracking-wider uppercase">
              An Associate Firm of{" "}
              <span className="text-gold/60">HunterZ Research</span>
            </p>
          </div>

          {/* Bangalore */}
          <div>
            <p className="text-xs font-sans tracking-widest uppercase text-gold mb-4">Bangalore Hub</p>
            <div className="border-l border-gold/30 pl-4 space-y-1">
              <p className="text-xs font-sans text-offwhite/70 font-medium">Suite 207, Hunterz Research</p>
              <p className="text-xs font-sans text-offwhite/45 leading-relaxed">
                DBS House, 26, Cunningham Rd<br />
                Vasanth Nagar<br />
                Bengaluru, Karnataka 560001<br />
                India
              </p>
              <a
                href="tel:+919901199895"
                className="inline-block pt-2 text-xs font-sans text-offwhite/40 hover:text-gold transition-colors duration-200 tracking-wide"
              >
                +91 99011 99895
              </a>
            </div>
          </div>

          {/* Coimbatore */}
          <div>
            <p className="text-xs font-sans tracking-widest uppercase text-gold mb-4">Coimbatore Office</p>
            <div className="border-l border-gold/30 pl-4 space-y-1">
              <p className="text-xs font-sans text-offwhite/70 font-medium">GRD Layout</p>
              <p className="text-xs font-sans text-offwhite/45 leading-relaxed">
                21, GRD Layout, RS Puram<br />
                Coimbatore<br />
                Tamil Nadu 641002<br />
                India
              </p>
              <a
                href="tel:+919901199895"
                className="inline-block pt-2 text-xs font-sans text-offwhite/40 hover:text-gold transition-colors duration-200 tracking-wide"
              >
                +91 99011 99895
              </a>
            </div>
          </div>

          {/* Compliance */}
          <div>
            <p className="text-xs font-sans tracking-widest uppercase text-gold mb-4">Compliance</p>
            <ul className="space-y-2 mb-6">
              {[
                { label: "Privacy Policy", href: "/privacy-terms#privacy" },
                { label: "Engagement Terms", href: "/privacy-terms#terms" },
                { label: "Grievance Redressal", href: "/privacy-terms#grievance" },
                { label: "Website Terms of Use", href: "/privacy-terms#website-terms" },
                { label: "Disclaimer", href: "/privacy-terms#disclaimer" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs font-sans text-offwhite/50 hover:text-gold tracking-wide transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="mailto:compliance@adviti.in"
              className="text-xs font-sans text-offwhite/30 hover:text-gold transition-colors duration-200 tracking-wide"
            >
              compliance@adviti.in
            </a>
          </div>

        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-sans text-offwhite/30 tracking-wide">
            © 2026 Adviti Consulting Private Limited. All Rights Reserved.
          </p>
          <p className="text-[10px] font-sans text-offwhite/20 tracking-wider">
            Governing jurisdiction: Bangalore, Karnataka, India
          </p>
        </div>
      </div>
    </footer>
  );
}
