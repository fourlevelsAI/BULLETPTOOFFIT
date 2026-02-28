import { motion } from "framer-motion";

interface ULogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const ULogo = ({ size = 32, animated = false, className = "" }: ULogoProps) => {
  const height = size;
  const width = size * (120 / 140);

  if (animated) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 140"
        fill="none"
        className={className}
        aria-label="BULLETPROOFFIT"
      >
        {/* Left leg of the U */}
        <motion.path
          d="M0 0 H48 V100 C48 122 37 140 24 140 C11 140 0 122 0 100 Z"
          className="fill-foreground"
          initial={{ x: -15 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.1 }}
        />
        {/* Right leg of the U */}
        <motion.path
          d="M72 0 H120 V100 C120 122 109 140 96 140 C83 140 72 122 72 100 Z"
          className="fill-foreground"
          initial={{ x: 15 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: 0.1 }}
        />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 140"
      fill="none"
      className={className}
      aria-label="BULLETPROOFFIT"
    >
      {/* Left leg */}
      <path
        d="M0 0 H48 V100 C48 122 37 140 24 140 C11 140 0 122 0 100 Z"
        className="fill-foreground"
      />
      {/* Right leg */}
      <path
        d="M72 0 H120 V100 C120 122 109 140 96 140 C83 140 72 122 72 100 Z"
        className="fill-foreground"
      />
    </svg>
  );
};

export default ULogo;
