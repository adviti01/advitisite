import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-black mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg tracking-[0.2em] text-offwhite mb-3">ADVITI</p>
            <p className="text-xs font-sans text-offwhite/50 tracking-wide leading-relaxed">
              Boutique Talent Advisory &amp; Acquisition.<br />
              Connecting visionary leaders with exceptional enterprises.
            </p>
          </div>

          {/* Offices */}
          <div>
            <p className="text-xs font-sans tracking-widest uppercase text-gold mb-4">Presence</p>
            <div className="flex gap-6">
              <div className="border-l border-gold/30 pl-4">
                <p className="text-sm font-sans text-offwhite font-medium">Bangalore Hub</p>
                <p className="text-xs font-sans text-offwhite/50 mt-1">Karnataka, India</p>
              </div>
              <div className="border-l border-gold/30 pl-4">
                <p className="text-sm font-sans text-offwhite font-medium">Coimbatore Office</p>
                <p className="text-xs font-sans text-offwhite/50 mt-1">Tamil Nadu, India</p>
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div>
            <p className="text-xs font-sans tracking-widest uppercase text-gold mb-4">Compliance</p>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", href: "/privacy-terms" },
                { label: "Engagement Terms", href: "/privacy-terms" },
                { label: "Grievance Redressal", href: "/privacy-terms" },
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
          </div>
        </div>

        <div className="border-t border-white/5 pt-6">
          <p className="text-xs font-sans text-offwhite/30 tracking-wide text-center">
            © 2026 Adviti Consulting Private Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
