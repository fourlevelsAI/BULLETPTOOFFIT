import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import SiteHeader, { APP_STORE_URL } from "@/components/landing/SiteHeader";
import PhoneMockup from "@/components/landing/PhoneMockup";
import Reveal from "@/components/landing/Reveal";
import CountUp from "@/components/landing/CountUp";
import appScreenshot from "@/assets/app-screenshot.png";

const ACCENT = "#ff5a2e";
const BORDER = "rgba(244,243,238,0.10)";
const BORDER_STRONG = "rgba(244,243,238,0.22)";

const panels = [
  {
    index: "01 / 06 — ONBOARDING",
    title: "Built around your goal.",
    body: "One question in, ARIA already knows whether you're cutting, bulking, or just trying to stay consistent — and shapes every plan around it.",
    tags: ["Goal-First Setup", "Personalized", "30 Seconds"],
  },
  {
    index: "02 / 06 — TARGETS",
    title: "Macros calculated for you.",
    body: "Calorie and macro targets built from your stats and goal, laid out clearly — protein, carbs, fat — and recalculated as your body changes.",
    tags: ["Smart Targets", "Auto-Adjusting"],
  },
  {
    index: "03 / 06 — FOOD LOGGING",
    title: "Log any meal in seconds.",
    body: "Snap a photo, scan a barcode, or say it out loud. A 63-food database and full macro breakdowns mean the search bar is optional.",
    tags: ["Photo AI", "Barcode", "Voice Log"],
  },
  {
    index: "04 / 06 — COACHING",
    title: "Ask anything. Get a real plan.",
    body: "ARIA answers in voice or text, English or Spanish, grounded in what you actually logged this week — not a script.",
    tags: ["GPT-4o", "Voice + Text", "EN / ES"],
  },
  {
    index: "05 / 06 — TRAINING",
    title: "Your training plan, ready.",
    body: "40 exercises across every major muscle group, structured around your schedule and equipment, with a live session timer built in.",
    tags: ["40 Exercises", "Session Timer"],
  },
  {
    index: "06 / 06 — SECURITY",
    title: "Your data, locked down.",
    body: "Face ID keeps the app locked, Apple Health sync runs both ways, and sign-in goes through Apple with Supabase-backed accounts.",
    tags: ["Face ID", "Apple Health", "Sign in with Apple"],
  },
];

const included = [
  "Unlimited food & workout tracking",
  "63-food database with full macro breakdowns",
  "40 exercises across every major muscle group",
  "Unlimited barcode scanning",
  "Photo AI food recognition",
  "Voice logging",
  "ARIA coach — chat & voice, powered by GPT-4o",
  "Chef meal recommendations",
  "Today dashboard & streaks",
  "Face ID app lock & Sign in with Apple",
  "Full support in English and Spanish",
  "iOS, iPadOS, macOS, and visionOS",
];

const trust = [
  { n: "01", title: "Health & Fitness Data", body: "Used only to power your tracking, targets, and coaching — linked to your account, not sold." },
  { n: "02", title: "Face ID App Lock", body: "Biometric lock with automatic re-lock whenever the app returns to the foreground." },
  { n: "03", title: "Sign in with Apple", body: "Native authentication with Supabase-backed sync — server-side entitlement checks, locked-down data columns." },
  { n: "04", title: "Accessible by Design", body: "Larger text up to 200%+, dark interface, sufficient contrast, and reduced-motion support throughout." },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em]" style={{ color: ACCENT }}>
    <span className="inline-block w-[7px] h-[7px]" style={{ background: ACCENT }} />
    {children}
  </p>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span
    className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8d8d92]"
    style={{ borderColor: BORDER_STRONG }}
  >
    {children}
  </span>
);

const SolidButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className="inline-flex items-center justify-center rounded-full bg-[#f4f3ee] px-7 py-3.5 font-body text-sm font-semibold text-[#09090a] transition-colors hover:bg-[#ff5a2e] hover:text-[#f4f3ee]"
  >
    {children}
  </a>
);

const LandingPage = () => {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div id="top" className="min-h-screen bg-[#09090a] text-[#f4f3ee] overflow-x-hidden">
      <SiteHeader />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 sm:pt-32 lg:pt-40 pb-20 lg:pb-28 px-5 sm:px-8">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(244,243,238,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,243,238,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 75%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-10 items-center">
          <div>
            <Reveal>
              <Eyebrow>AI Fitness &amp; Nutrition · Free to Download</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                className="mt-6 font-grotesk uppercase font-extrabold text-[clamp(2.9rem,9vw,5.6rem)]"
                style={{ lineHeight: 0.94, letterSpacing: "-0.02em" }}
              >
                Your whole
                <br />
                day, <span style={{ color: ACCENT }}>one</span>
                <br />
                screen.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-lg font-body text-[15px] sm:text-base leading-relaxed text-[#8d8d92]">
                Track your food, train smarter, and get coaching that actually knows your data — powered by GPT-4o,
                backed by 40 exercises and a 63-food database, and free to start.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <SolidButton href={APP_STORE_URL}>Download Free →</SolidButton>
                <a
                  href="#coach"
                  className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 font-body text-sm font-semibold text-[#f4f3ee] transition-colors hover:border-[#ff5a2e] hover:text-[#ff5a2e]"
                  style={{ borderColor: BORDER_STRONG }}
                >
                  See Features →
                </a>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <div className="mb-6 text-right font-mono text-[10px] uppercase tracking-[0.22em] leading-relaxed text-[#8d8d92]">
              <p>SYS:07 — LAST SEQUENCE</p>
              <p>V1.3 · iOS · iPadOS · macOS · visionOS</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <PhoneMockup src={appScreenshot} alt="BULLETPROOFFIT Today dashboard" width={288} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ COACH ═══ */}
      <section id="coach" className="scroll-mt-24 border-t px-5 sm:px-8 py-24" style={{ borderColor: BORDER, background: "#0b0b0c" }}>
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8d8d92]">SYS:01 — COACH</p>
            <h2
              className="mt-5 max-w-3xl font-grotesk uppercase font-extrabold text-[clamp(2rem,5vw,3.4rem)]"
              style={{ lineHeight: 0.96, letterSpacing: "-0.02em" }}
            >
              A coach that reads your logs, not a script — meet <span style={{ color: ACCENT }}>ARIA</span>.
            </h2>
            <p className="mt-5 max-w-xl font-body text-[15px] text-[#8d8d92]">
              Five things BULLETPROOFFIT does that a spreadsheet and a generic AI chatbot can't.
            </p>
          </Reveal>

          <div className="relative mt-16 lg:pl-14">
            {/* progress rail */}
            <div className="hidden lg:flex flex-col gap-3 absolute left-0 top-1/2 -translate-y-1/2">
              {panels.map((p, i) => (
                <span
                  key={p.index}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === active ? ACCENT : "rgba(244,243,238,0.18)",
                    transform: i === active ? "scale(1.4)" : "none",
                  }}
                />
              ))}
            </div>

            <div className="space-y-16 lg:space-y-28">
              {panels.map((p, i) => (
                <div
                  key={p.index}
                  data-index={i}
                  ref={(el) => (panelRefs.current[i] = el)}
                  className={`grid gap-10 lg:gap-16 items-center lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <Reveal>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: ACCENT }}>{p.index}</p>
                    <h3
                      className="mt-4 font-grotesk uppercase font-extrabold text-[clamp(1.6rem,3.4vw,2.5rem)]"
                      style={{ lineHeight: 0.98, letterSpacing: "-0.02em" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-[#8d8d92]">{p.body}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </Reveal>

                  <Reveal delay={0.1} className="flex justify-center">
                    <PhoneMockup src={appScreenshot} alt={`${p.title} screen`} width={252} />
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section id="features" className="scroll-mt-24 border-t px-5 sm:px-8 py-24" style={{ borderColor: BORDER }}>
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8d8d92]">SYS:02 — NUMBERS</p>
            <h2
              className="mt-5 font-grotesk uppercase font-extrabold text-[clamp(2rem,5vw,3.4rem)]"
              style={{ lineHeight: 0.96, letterSpacing: "-0.02em" }}
            >
              Everything you need. <span style={{ color: ACCENT }}>Nothing you don't.</span>
            </h2>
            <p className="mt-5 max-w-xl font-body text-[15px] text-[#8d8d92]">
              The numbers behind BULLETPROOFFIT — no bloat, no filler features.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: BORDER }}>
            {[
              { value: <CountUp to={63} suffix="+" />, label: "Foods in the built-in database, full macro breakdowns included." },
              { value: <CountUp to={40} />, label: "Exercises spanning every major muscle group." },
              { value: <span style={{ color: ACCENT }}>FREE</span>, label: "Forever — no paywall, no trial, no credit card, ever." },
              { value: <CountUp to={2} />, label: "Full languages: English and Spanish, coach included." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.06} className="bg-[#09090a]">
                <div className="h-full p-8">
                  <p className="font-grotesk font-extrabold text-[clamp(2.6rem,6vw,4rem)]" style={{ lineHeight: 1, letterSpacing: "-0.03em" }}>
                    {s.value}
                  </p>
                  <p className="mt-4 font-body text-sm leading-relaxed text-[#8d8d92]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING (FREE) ═══ */}
      <section id="pricing" className="scroll-mt-24 border-t px-5 sm:px-8 py-24" style={{ borderColor: BORDER, background: "#0b0b0c" }}>
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8d8d92]">SYS:03 — PRICING</p>
            <h2
              className="mt-5 font-grotesk uppercase font-extrabold text-[clamp(2rem,5vw,3.4rem)]"
              style={{ lineHeight: 0.96, letterSpacing: "-0.02em" }}
            >
              One plan. Everything included.
            </h2>
            <p className="mt-5 max-w-xl font-body text-[15px] text-[#8d8d92]">
              No tiers, no trial, no credit card. Every feature, free, forever.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative mt-12 overflow-hidden rounded-[24px] border p-8 sm:p-12"
              style={{
                borderColor: BORDER_STRONG,
                background: "rgba(244,243,238,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div
                className="absolute -top-24 -right-16 w-[340px] h-[340px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,90,46,0.28) 0%, transparent 68%)" }}
              />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: ACCENT }}>BULLETPROOFFIT</p>
                <p className="mt-4 font-grotesk font-extrabold text-[clamp(2.8rem,8vw,4.5rem)]" style={{ lineHeight: 1, letterSpacing: "-0.03em" }}>
                  $0<span className="text-[#8d8d92] text-[0.35em] align-middle font-mono tracking-[0.1em]">/forever</span>
                </p>

                <ul className="mt-10 grid gap-y-3 gap-x-8 sm:grid-cols-2">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-sm text-[#f4f3ee]/85">
                      <span className="mt-[7px] w-[6px] h-[6px] shrink-0" style={{ background: ACCENT }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <SolidButton href={APP_STORE_URL}>Download Free →</SolidButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TRUST ═══ */}
      <section id="trust" className="scroll-mt-24 border-t px-5 sm:px-8 py-24" style={{ borderColor: BORDER }}>
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8d8d92]">SYS:04 — TRUST</p>
            <h2
              className="mt-5 font-grotesk uppercase font-extrabold text-[clamp(2rem,5vw,3.4rem)]"
              style={{ lineHeight: 0.96, letterSpacing: "-0.02em" }}
            >
              Your data, accounted for.
            </h2>
            <p className="mt-5 max-w-xl font-body text-[15px] text-[#8d8d92]">
              What's collected, what it's used for, and how it's locked down — no surprises.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {trust.map((t, i) => (
              <Reveal key={t.n} delay={i * 0.06}>
                <div className="h-full rounded-[16px] border p-7" style={{ borderColor: BORDER, background: "#141416" }}>
                  <span
                    className="inline-flex items-center justify-center rounded-[6px] border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-[#8d8d92]"
                    style={{ borderColor: BORDER_STRONG }}
                  >
                    {t.n}
                  </span>
                  <h3 className="mt-5 font-grotesk uppercase font-extrabold text-xl tracking-[-0.01em]">{t.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-[#8d8d92]">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="border-t px-5 sm:px-8 py-28 text-center" style={{ borderColor: BORDER, background: "#0b0b0c" }}>
        <Reveal className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8d8d92]">Available now on the App Store</p>
          <h2
            className="mt-6 font-grotesk uppercase font-extrabold text-[clamp(2.2rem,6.5vw,4.2rem)]"
            style={{ lineHeight: 0.94, letterSpacing: "-0.02em" }}
          >
            Free to download. Free,{" "}
            <span className="italic" style={{ color: ACCENT }}>forever.</span>
          </h2>
          <p className="mt-6 font-body text-[15px] text-[#8d8d92]">
            No paywall, no trial. iOS 26.5+, iPadOS, macOS, and visionOS. English and Spanish, everywhere.
          </p>
          <div className="mt-9">
            <SolidButton href={APP_STORE_URL}>Download on the App Store →</SolidButton>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
