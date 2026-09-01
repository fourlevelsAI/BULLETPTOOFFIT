import { Link } from "react-router-dom";
import ULogo from "./ULogo";

const Footer = () => (
  <footer className="py-8 px-6 bg-black border-t border-[rgba(192,192,192,0.06)]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <ULogo size={24} className="text-[#606060]" />
        <span className="text-xs text-[#606060] font-body">© 2026 BULLETPROOFFIT. All rights reserved.</span>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/privacy"
          className="text-xs text-[#606060] hover:text-[#E8E8E8] font-body transition-colors"
        >
          Privacy
        </Link>
        <Link
          to="/terms"
          className="text-xs text-[#606060] hover:text-[#E8E8E8] font-body transition-colors"
        >
          Terms
        </Link>
        <a
          href="mailto:info@mohamedibrahim.biz"
          className="text-xs text-[#606060] hover:text-[#E8E8E8] font-body transition-colors"
        >
          Contact
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
