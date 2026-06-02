"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  corporate: string;
  mandate: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  email: "",
  corporate: "",
  mandate: "",
  consent: false,
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.consent) return;

    // TODO: Replace with API route or email integration (e.g. Resend, SendGrid, or a Next.js Route Handler at app/api/contact/route.ts)
    console.log("Mandate submission:", form);

    setSubmitted(true);
    setForm(initialForm);
  }

  const inputClass =
    "w-full bg-black/50 border border-offwhite/15 text-offwhite text-sm font-sans px-4 py-3.5 placeholder-offwhite/30 focus:outline-none focus:border-gold transition-colors duration-200";

  return (
    <section className="min-h-screen bg-charcoal pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-4">
            Confidential Mandate Submission
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-offwhite leading-tight mb-4">
            Begin the Conversation
          </h1>
          <div className="w-12 h-px bg-gold/50 mb-6" />
          <p className="font-sans text-offwhite/50 text-sm leading-relaxed">
            All submissions are handled with absolute discretion. A senior advisor will respond within one business day.
          </p>
        </div>

        {submitted ? (
          <div className="border border-gold/30 bg-black/40 p-10 text-center">
            <div className="w-8 h-px bg-gold mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-offwhite mb-3">Mandate Received</h2>
            <p className="font-sans text-sm text-offwhite/50 leading-relaxed">
              Thank you for reaching out. A member of the Adviti team will be in contact shortly to progress your mandate.
            </p>
            <div className="w-8 h-px bg-gold mx-auto mt-6" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate aria-label="Mandate submission form">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-sans tracking-widest uppercase text-offwhite/40 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-sans tracking-widest uppercase text-offwhite/40 mb-2">
                  Corporate Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="corporate" className="block text-xs font-sans tracking-widest uppercase text-offwhite/40 mb-2">
                  Corporate Identity
                </label>
                <input
                  id="corporate"
                  name="corporate"
                  type="text"
                  required
                  placeholder="Company or organisation name"
                  value={form.corporate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="mandate" className="block text-xs font-sans tracking-widest uppercase text-offwhite/40 mb-2">
                  Strategic Mandate Brief
                </label>
                <textarea
                  id="mandate"
                  name="mandate"
                  required
                  rows={6}
                  placeholder="Describe the leadership mandate, role context, and any relevant confidential parameters..."
                  value={form.mandate}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="border border-offwhite/10 bg-black/30 p-5">
                <label className="flex gap-4 cursor-pointer group" htmlFor="consent">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div
                      className="w-4 h-4 border border-offwhite/30 peer-checked:border-gold peer-checked:bg-gold transition-all duration-200 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {form.consent && (
                        <svg
                          className="w-2.5 h-2.5 text-black"
                          fill="none"
                          viewBox="0 0 10 10"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-sans text-offwhite/50 leading-relaxed">
                    I explicitly authorize Adviti Consulting Private Limited to securely process and store this information to facilitate corporate recruitment, explicitly operating within the governance parameters defined in the Data Privacy Policy.
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={!form.consent}
                className="w-full py-4 border border-gold text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gold"
              >
                Submit Mandate Confidentially
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
