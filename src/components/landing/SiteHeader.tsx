import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import LogoBadge from "./LogoBadge";

export const APP_STORE_URL = "https://apps.apple.com/us/app/bulletprooffit/id6760779717";

const navLinks = [
  { label: "Coach", href: "#coach" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Download", href: APP_STORE_URL, external: true },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 border-b"
        style={{
          borderColor: "rgba(244,243,238,0.10)",
          background: "rgba(9,9,10,0.82)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="max-w-[1200px] mx-auto h-full px-5 sm:px-8 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 min-w-0">
            <LogoBadge size={34} />
            <span className="font-display text-[13px] sm:text-[15px] font-extrabold uppercase tracking-[0.16em] text-[#f4f3ee] truncate">
              BULLETPROOFFIT
            </span>
          </a>

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center rounded-full border px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#f4f3ee] transition-colors hover:border-[#ff5a2e] hover:text-[#ff5a2e]"
            style={{ borderColor: "rgba(244,243,238,0.22)" }}
          >
            Get the app
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="md:hidden text-[#f4f3ee] p-2 -mr-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#09090a] flex flex-col"
          >
            <div className="h-16 px-5 flex items-center justify-between border-b" style={{ borderColor: "rgba(244,243,238,0.10)" }}>
              <div className="flex items-center gap-3">
                <LogoBadge size={34} />
                <span className="font-display text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#f4f3ee]">BULLETPROOFFIT</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="text-[#f4f3ee] p-2 -mr-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center gap-2 px-8">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.05, duration: 0.4 }}
                  className="font-display text-[13vw] leading-[1.05] font-extrabold uppercase tracking-[-0.02em] text-[#f4f3ee] hover:text-[#ff5a2e] transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <p className="px-8 pb-10 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8d8d92]">
              SYS:07 — FREE FOREVER
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
