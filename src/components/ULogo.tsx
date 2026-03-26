import { forwardRef } from "react";
import logoImg from "@/assets/u-logo.png";

interface ULogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const ULogo = forwardRef<HTMLDivElement, ULogoProps>(({ size = 32, animated: _animated = false, className = "" }, ref) => {
  return (
    <div
      className={`rounded-full bg-white flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        verticalAlign: "middle",
      }}
    >
      <img
        src={logoImg}
        alt="BULLETPROOFFIT"
        style={{ width: size * 0.65, height: "auto" }}
        className="select-none pointer-events-none"
      />
    </div>
  );
};

export default ULogo;
