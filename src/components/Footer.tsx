import { Link } from "react-router-dom";
import LogoBadge from "./landing/LogoBadge";
import { APP_STORE_URL } from "./landing/SiteHeader";

const border = "rgba(244,243,238,0.10)";

const Footer = () => (
  <footer className="bg-[#09090a] border-t" style={{ borderColor: border }}>
    <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
      <div>
        <div className="flex items-center gap-3">
          <LogoBadge size={34} />
          <span className="font-display text-[14px] font-extrabold uppercase tracking-[0.16em] text-[#f4f3ee]">BULLETPROOFFIT</span>
        </div>
        <p className="mt-4 text-sm text-[#8d8d92] font-body max-w-xs leading-relaxed">
          Your whole day, one screen. Built solo in Barcelona.
        </p>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8d8d92] mb-4">Product</p>
        <ul className="space-y-2.5 text-sm font-body">
          <li><a href="/#coach" className="text-[#f4f3ee]/80 hover:text-[#ff5a2e] transition-colors">Coach</a></li>
          <li><a href="/#features" className="text-[#f4f3ee]/80 hover:text-[#ff5a2e] transition-colors">Features</a></li>
          <li><a href="/#pricing" className="text-[#f4f3ee]/80 hover:text-[#ff5a2e] transition-colors">Pricing</a></li>
        </ul>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8d8d92] mb-4">Company</p>
        <ul className="space-y-2.5 text-sm font-body">
          <li>
            <a href="https://apps.apple.com/us/developer/mohamed-ibrahim/id1886207823" target="_blank" rel="noopener noreferrer" className="text-[#f4f3ee]/80 hover:text-[#ff5a2e] transition-colors">Developer</a>
          </li>
          <li><Link to="/privacy" className="text-[#f4f3ee]/80 hover:text-[#ff5a2e] transition-colors">Privacy Policy</Link></li>
          <li><Link to="/terms" className="text-[#f4f3ee]/80 hover:text-[#ff5a2e] transition-colors">Terms of Service</Link></li>
          <li>
            <a href="mailto:mohamed.ibrahim1213@gmail.com" className="text-[#f4f3ee]/80 hover:text-[#ff5a2e] transition-colors">Contact</a>
          </li>
        </ul>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8d8d92] mb-4">Get It</p>
        <ul className="space-y-2.5 text-sm font-body">
          <li>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-[#f4f3ee]/80 hover:text-[#ff5a2e] transition-colors">App Store</a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t" style={{ borderColor: border }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8d8d92]">© 2026 BULLETPROOFFIT</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8d8d92]">SYS:07 — END OF SEQUENCE</span>
      </div>
    </div>
  </footer>
);

export default Footer;
