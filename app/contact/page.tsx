"use client";

import { useState, ChangeEvent, FormEvent } from "react";

// ─── Web3Forms ────────────────────────────────────────────────────────────────
// 1. Go to https://web3forms.com
// 2. Enter sri@adviti.in to receive your access key by email
// 3. Replace the value below with that key, or set NEXT_PUBLIC_WEB3FORMS_KEY
//    in your environment and redeploy.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_WEB3FORMS_ACCESS_KEY";

type Tab = "client" | "candidate";

// ─── Client form ─────────────────────────────────────────────────────────────
type ClientForm = {
  name: string;
  email: string;
  organisation: string;
  designation: string;
  mandateType: string;
  mandateBrief: string;
  consent: boolean;
};

const emptyClient: ClientForm = {
  name: "",
  email: "",
  organisation: "",
  designation: "",
  mandateType: "",
  mandateBrief: "",
  consent: false,
};

// ─── Candidate form ───────────────────────────────────────────────────────────
type CandidateForm = {
  name: string;
  email: string;
  organisation: string;
  designation: string;
  domain: string;
  experience: string;
  linkedin: string;
  note: string;
  consent: boolean;
};

const emptyCandidate: CandidateForm = {
  name: "",
  email: "",
  organisation: "",
  designation: "",
  domain: "",
  experience: "",
  linkedin: "",
  note: "",
  consent: false,
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputClass =
  "w-full bg-black/50 border border-offwhite/15 text-offwhite text-sm font-sans px-4 py-3.5 placeholder-offwhite/30 focus:outline-none focus:border-gold transition-colors duration-200";

const labelClass =
  "block text-xs font-sans tracking-widest uppercase text-offwhite/40 mb-2";

const selectClass =
  "w-full bg-black/50 border border-offwhite/15 text-offwhite text-sm font-sans px-4 py-3.5 focus:outline-none focus:border-gold transition-colors duration-200 appearance-none";

// ─── Checkbox ─────────────────────────────────────────────────────────────────
function Checkbox({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <div className="border border-offwhite/10 bg-black/30 p-5">
      <label className="flex gap-4 cursor-pointer" htmlFor={id}>
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            id={id}
            type="checkbox"
            required
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
          />
          <div
            className="w-4 h-4 border border-offwhite/30 peer-checked:border-gold peer-checked:bg-gold transition-all duration-200 flex items-center justify-center"
            aria-hidden="true"
          >
            {checked && (
              <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 10 10" stroke="currentColor" strokeWidth={2.5}>
                <path d="M1.5 5l2.5 2.5 4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-xs font-sans text-offwhite/50 leading-relaxed">{label}</span>
      </label>
    </div>
  );
}

// ─── Success card ─────────────────────────────────────────────────────────────
function SuccessCard({ heading, body, onReset }: { heading: string; body: string; onReset: () => void }) {
  return (
    <div className="border border-gold/30 bg-black/40 p-10 text-center">
      <div className="w-8 h-px bg-gold mx-auto mb-6" />
      <h2 className="font-serif text-2xl text-offwhite mb-3">{heading}</h2>
      <p className="font-sans text-sm text-offwhite/50 leading-relaxed mb-6">{body}</p>
      <button
        onClick={onReset}
        className="text-xs font-sans tracking-widest uppercase text-gold border border-gold/40 px-6 py-2 hover:bg-gold hover:text-black transition-all duration-200"
      >
        Submit Another
      </button>
      <div className="w-8 h-px bg-gold mx-auto mt-6" />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("client");
  const [clientForm, setClientForm] = useState<ClientForm>(emptyClient);
  const [candidateForm, setCandidateForm] = useState<CandidateForm>(emptyCandidate);
  const [clientSuccess, setClientSuccess] = useState(false);
  const [candidateSuccess, setCandidateSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ── Client validation ──────────────────────────────────────────────────────
  const clientReady =
    clientForm.name.trim() !== "" &&
    clientForm.email.trim() !== "" &&
    clientForm.organisation.trim() !== "" &&
    clientForm.designation.trim() !== "" &&
    clientForm.mandateType !== "" &&
    clientForm.mandateBrief.trim().length >= 30 &&
    clientForm.consent;

  // ── Candidate validation ───────────────────────────────────────────────────
  const candidateReady =
    candidateForm.name.trim() !== "" &&
    candidateForm.email.trim() !== "" &&
    candidateForm.organisation.trim() !== "" &&
    candidateForm.designation.trim() !== "" &&
    candidateForm.domain !== "" &&
    candidateForm.experience !== "" &&
    candidateForm.linkedin.trim() !== "" &&
    candidateForm.consent;

  // ── Submit to Web3Forms ────────────────────────────────────────────────────
  async function submitToWeb3Forms(payload: Record<string, string>) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        botcheck: "",           // honeypot — must be empty; bots fill this
        ...payload,
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message ?? "Submission failed");
  }

  // ── Client submit ──────────────────────────────────────────────────────────
  async function handleClientSubmit(e: FormEvent) {
    e.preventDefault();
    if (!clientReady) return;
    setSubmitting(true);
    setError("");
    try {
      await submitToWeb3Forms({
        subject: `[CLIENT MANDATE] ${clientForm.mandateType} — ${clientForm.organisation} | ${clientForm.name}`,
        from_name: clientForm.name,
        from_email: clientForm.email,
        "Full Name": clientForm.name,
        "Corporate Email": clientForm.email,
        Organisation: clientForm.organisation,
        Designation: clientForm.designation,
        "Nature of Mandate": clientForm.mandateType,
        "Mandate Brief": clientForm.mandateBrief,
      });
      setClientSuccess(true);
      setClientForm(emptyClient);
    } catch {
      setError("Something went wrong. Please try again or email us directly at sri@adviti.in");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Candidate submit ───────────────────────────────────────────────────────
  async function handleCandidateSubmit(e: FormEvent) {
    e.preventDefault();
    if (!candidateReady) return;
    setSubmitting(true);
    setError("");
    try {
      await submitToWeb3Forms({
        subject: `[CANDIDATE SUBMISSION] ${candidateForm.domain} | ${candidateForm.experience} — ${candidateForm.name} from ${candidateForm.organisation}`,
        from_name: candidateForm.name,
        from_email: candidateForm.email,
        "Full Name": candidateForm.name,
        "Email Address": candidateForm.email,
        "Current Organisation": candidateForm.organisation,
        "Current Designation": candidateForm.designation,
        "Function / Domain": candidateForm.domain,
        "Years of Experience": candidateForm.experience,
        "LinkedIn Profile": candidateForm.linkedin,
        "Note to Adviti": candidateForm.note || "—",
      });
      setCandidateSuccess(true);
      setCandidateForm(emptyCandidate);
    } catch {
      setError("Something went wrong. Please try again or email us directly at sri@adviti.in");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-charcoal pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Page header */}
        <div className="mb-10">
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-gold mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-offwhite leading-tight mb-4">
            How Can We Help?
          </h1>
          <div className="w-12 h-px bg-gold/50 mb-6" />
          <p className="font-sans text-offwhite/50 text-sm leading-relaxed">
            Whether you are an organisation with a leadership requirement or a professional exploring your next chapter, please select the relevant path below.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-offwhite/10 mb-10" role="tablist">
          {(["client", "candidate"] as Tab[]).map((t) => {
            const labels: Record<Tab, string> = {
              client: "I am a Client",
              candidate: "I am a Candidate",
            };
            const active = tab === t;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={active}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 pb-4 text-xs font-sans tracking-widest uppercase transition-all duration-200 ${
                  active
                    ? "text-gold border-b-2 border-gold -mb-px"
                    : "text-offwhite/40 hover:text-offwhite/70"
                }`}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <p className="mb-6 text-xs font-sans text-red-400 border border-red-400/30 bg-red-400/5 px-4 py-3">
            {error}
          </p>
        )}

        {/* ── CLIENT FORM ───────────────────────────────────────────────────── */}
        {tab === "client" && (
          <>
            {clientSuccess ? (
              <SuccessCard
                heading="Mandate Received"
                body="Thank you for reaching out. A senior Adviti advisor will respond within one business day. All communications are treated with complete discretion."
                onReset={() => setClientSuccess(false)}
              />
            ) : (
              <form onSubmit={handleClientSubmit} noValidate aria-label="Client mandate submission">

                {/* Honeypot — invisible to humans, bots fill this and get blocked */}
                <input type="text" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" readOnly />

                <div className="space-y-5">
                  <div className="mb-2">
                    <p className="text-xs font-sans text-offwhite/40 leading-relaxed">
                      Use this form to invite Adviti for a confidential discussion about a leadership mandate, executive search, or talent advisory requirement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="c-name" className={labelClass}>Full Name <span className="text-gold">*</span></label>
                      <input id="c-name" type="text" required autoComplete="name"
                        placeholder="Your full name"
                        value={clientForm.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setClientForm(p => ({ ...p, name: e.target.value }))}
                        className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="c-email" className={labelClass}>Corporate Email <span className="text-gold">*</span></label>
                      <input id="c-email" type="email" required autoComplete="email"
                        placeholder="name@company.com"
                        value={clientForm.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setClientForm(p => ({ ...p, email: e.target.value }))}
                        className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="c-org" className={labelClass}>Organisation <span className="text-gold">*</span></label>
                      <input id="c-org" type="text" required
                        placeholder="Company name"
                        value={clientForm.organisation}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setClientForm(p => ({ ...p, organisation: e.target.value }))}
                        className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="c-desig" className={labelClass}>Your Designation <span className="text-gold">*</span></label>
                      <input id="c-desig" type="text" required
                        placeholder="e.g. CHRO, CEO, Founder"
                        value={clientForm.designation}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setClientForm(p => ({ ...p, designation: e.target.value }))}
                        className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-mandate-type" className={labelClass}>Nature of Mandate <span className="text-gold">*</span></label>
                    <div className="relative">
                      <select id="c-mandate-type" required
                        value={clientForm.mandateType}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setClientForm(p => ({ ...p, mandateType: e.target.value }))}
                        className={selectClass + (clientForm.mandateType === "" ? " text-offwhite/30" : "")}>
                        <option value="" disabled>Select mandate type</option>
                        <option value="Executive Search">Executive Search</option>
                        <option value="Leadership Advisory">Leadership Advisory</option>
                        <option value="Talent Mapping">Talent Mapping</option>
                        <option value="Fractional CXO Placement">Fractional CXO Placement</option>
                        <option value="Organisational Design">Organisational Design</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg className="w-3 h-3 text-gold/60" fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-brief" className={labelClass}>
                      Mandate Brief <span className="text-gold">*</span>
                      <span className="text-offwhite/25 ml-2 normal-case tracking-normal">(min. 30 characters)</span>
                    </label>
                    <textarea id="c-brief" required rows={6}
                      placeholder="Describe the leadership requirement, seniority level, business context, and any confidential parameters relevant to this mandate..."
                      value={clientForm.mandateBrief}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setClientForm(p => ({ ...p, mandateBrief: e.target.value }))}
                      className={inputClass + " resize-none"} />
                    {clientForm.mandateBrief.length > 0 && clientForm.mandateBrief.length < 30 && (
                      <p className="mt-1 text-xs font-sans text-gold/60">{30 - clientForm.mandateBrief.length} more characters required</p>
                    )}
                  </div>

                  <Checkbox
                    id="c-consent"
                    checked={clientForm.consent}
                    onChange={(v) => setClientForm(p => ({ ...p, consent: v }))}
                    label="I explicitly authorise Adviti Consulting Private Limited to securely process and store this information to facilitate a confidential business engagement, within the governance parameters defined in the Data Privacy Policy."
                  />
                </div>

                <div className="mt-8">
                  <button type="submit" disabled={!clientReady || submitting}
                    className="w-full py-4 border border-gold text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gold">
                    {submitting ? "Submitting..." : "Submit Mandate Confidentially"}
                  </button>
                  {!clientReady && (
                    <p className="mt-3 text-center text-xs font-sans text-offwhite/25">All fields marked * are required before submission.</p>
                  )}
                </div>
              </form>
            )}
          </>
        )}

        {/* ── CANDIDATE FORM ────────────────────────────────────────────────── */}
        {tab === "candidate" && (
          <>
            {candidateSuccess ? (
              <SuccessCard
                heading="Profile Received"
                body="Thank you for submitting your profile. Our team reviews all submissions carefully and will reach out if there is a relevant opportunity. We do not charge candidates any fees at any stage."
                onReset={() => setCandidateSuccess(false)}
              />
            ) : (
              <form onSubmit={handleCandidateSubmit} noValidate aria-label="Candidate profile submission">

                {/* Honeypot */}
                <input type="text" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" readOnly />

                <div className="space-y-5">
                  <div className="mb-2">
                    <p className="text-xs font-sans text-offwhite/40 leading-relaxed">
                      Submit your profile for confidential consideration. Adviti does not charge candidates any fee at any stage of the process. All submissions are reviewed by a senior advisor.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cand-name" className={labelClass}>Full Name <span className="text-gold">*</span></label>
                      <input id="cand-name" type="text" required autoComplete="name"
                        placeholder="Your full name"
                        value={candidateForm.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCandidateForm(p => ({ ...p, name: e.target.value }))}
                        className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="cand-email" className={labelClass}>Email Address <span className="text-gold">*</span></label>
                      <input id="cand-email" type="email" required autoComplete="email"
                        placeholder="your@email.com"
                        value={candidateForm.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCandidateForm(p => ({ ...p, email: e.target.value }))}
                        className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cand-org" className={labelClass}>Current Organisation <span className="text-gold">*</span></label>
                      <input id="cand-org" type="text" required
                        placeholder="Where you currently work"
                        value={candidateForm.organisation}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCandidateForm(p => ({ ...p, organisation: e.target.value }))}
                        className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="cand-desig" className={labelClass}>Current Designation <span className="text-gold">*</span></label>
                      <input id="cand-desig" type="text" required
                        placeholder="Your current title / role"
                        value={candidateForm.designation}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCandidateForm(p => ({ ...p, designation: e.target.value }))}
                        className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cand-domain" className={labelClass}>Function / Domain <span className="text-gold">*</span></label>
                      <div className="relative">
                        <select id="cand-domain" required
                          value={candidateForm.domain}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCandidateForm(p => ({ ...p, domain: e.target.value }))}
                          className={selectClass + (candidateForm.domain === "" ? " text-offwhite/30" : "")}>
                          <option value="" disabled>Select your function</option>
                          <option value="Technology & Engineering">Technology & Engineering</option>
                          <option value="Finance & Accounting">Finance & Accounting</option>
                          <option value="Operations & Supply Chain">Operations & Supply Chain</option>
                          <option value="Sales & Marketing">Sales & Marketing</option>
                          <option value="Human Resources">Human Resources</option>
                          <option value="Legal & Compliance">Legal & Compliance</option>
                          <option value="Strategy & Consulting">Strategy & Consulting</option>
                          <option value="Product Management">Product Management</option>
                          <option value="Manufacturing & Industrial">Manufacturing & Industrial</option>
                          <option value="General Management / P&L">General Management / P&L</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                          <svg className="w-3 h-3 text-gold/60" fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={1.5}>
                            <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cand-exp" className={labelClass}>Years of Experience <span className="text-gold">*</span></label>
                      <div className="relative">
                        <select id="cand-exp" required
                          value={candidateForm.experience}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCandidateForm(p => ({ ...p, experience: e.target.value }))}
                          className={selectClass + (candidateForm.experience === "" ? " text-offwhite/30" : "")}>
                          <option value="" disabled>Select experience range</option>
                          <option value="Under 3 years">Under 3 years</option>
                          <option value="3 to 7 years">3 to 7 years</option>
                          <option value="7 to 12 years">7 to 12 years</option>
                          <option value="12 to 20 years">12 to 20 years</option>
                          <option value="20+ years">20+ years</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                          <svg className="w-3 h-3 text-gold/60" fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth={1.5}>
                            <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cand-linkedin" className={labelClass}>LinkedIn Profile URL <span className="text-gold">*</span></label>
                    <input id="cand-linkedin" type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={candidateForm.linkedin}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setCandidateForm(p => ({ ...p, linkedin: e.target.value }))}
                      className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="cand-note" className={labelClass}>Note to Adviti <span className="text-offwhite/25 normal-case tracking-normal">(optional)</span></label>
                    <textarea id="cand-note" rows={4}
                      placeholder="Briefly describe what you are looking for, any geographic preferences, or context that would help us understand your candidacy..."
                      value={candidateForm.note}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCandidateForm(p => ({ ...p, note: e.target.value }))}
                      className={inputClass + " resize-none"} />
                  </div>

                  <Checkbox
                    id="cand-consent"
                    checked={candidateForm.consent}
                    onChange={(v) => setCandidateForm(p => ({ ...p, consent: v }))}
                    label="I explicitly authorise Adviti Consulting Private Limited to securely process and retain my profile information for the purpose of executive search and talent advisory, within the governance parameters defined in the Data Privacy Policy. I confirm that no fee is payable by me at any stage."
                  />
                </div>

                <div className="mt-8">
                  <button type="submit" disabled={!candidateReady || submitting}
                    className="w-full py-4 border border-gold text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gold">
                    {submitting ? "Submitting..." : "Submit Profile Confidentially"}
                  </button>
                  {!candidateReady && (
                    <p className="mt-3 text-center text-xs font-sans text-offwhite/25">All fields marked * are required before submission.</p>
                  )}
                </div>
              </form>
            )}
          </>
        )}

      </div>
    </section>
  );
}
