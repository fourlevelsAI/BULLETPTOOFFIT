import { motion } from "framer-motion";

interface ULogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const ULogo = ({ size = 32, animated = false, className = "" }: ULogoProps) => {
  const svgHeight = size * 0.6;
  const svgWidth = svgHeight * (120 / 140);

  if (animated) {
    return (
      <div
        className={`rounded-full bg-foreground flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          width={svgWidth}
          height={svgHeight}
          viewBox="0 0 120 140"
          fill="none"
          aria-label="BULLETPROOFFIT"
        >
          <motion.path
            d="M0 0 H48 V100 C48 122 37 140 24 140 C11 140 0 122 0 100 Z"
            className="fill-background"
            initial={{ x: -15 }}
            animate={{ x: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.1 }}
          />
          <motion.path
            d="M72 0 H120 V100 C120 122 109 140 96 140 C83 140 72 122 72 100 Z"
            className="fill-background"
            initial={{ x: 15 }}
            animate={{ x: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.1 }}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`rounded-full bg-foreground flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 120 140"
        fill="none"
        aria-label="BULLETPROOFFIT"
      >
        <path
          d="M0 0 H48 V100 C48 122 37 140 24 140 C11 140 0 122 0 100 Z"
          className="fill-background"
        />
        <path
          d="M72 0 H120 V100 C120 122 109 140 96 140 C83 140 72 122 72 100 Z"
          className="fill-background"
        />
      </svg>
    </div>
  );
};

export default ULogo;
