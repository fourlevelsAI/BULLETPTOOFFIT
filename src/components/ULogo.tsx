import { motion } from "framer-motion";

interface ULogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const ULogo = ({ size = 32, animated = false, className = "" }: ULogoProps) => {
  // Scale factor based on size (design is 172x340 base)
  const scale = size / 340;
  const legWidth = 80 * scale;
  const legHeight = 340 * scale;
  const gap = 12 * scale;
  const radius = 40 * scale;
  const totalWidth = legWidth * 2 + gap;

  if (animated) {
    return (
      <svg
        width={totalWidth}
        height={legHeight}
        viewBox={`0 0 ${totalWidth} ${legHeight}`}
        fill="none"
        className={className}
        aria-label="BULLETPROOFFIT"
      >
        <motion.rect
          initial={{ x: -legWidth * 0.3 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          x={0}
          y={0}
          width={legWidth}
          height={legHeight}
          rx={`0 0 ${radius} ${radius}`}
          className="fill-foreground"
          style={{ borderRadius: `0 0 ${radius}px ${radius}px` }}
        />
        <motion.rect
          initial={{ x: legWidth * 0.3 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          x={legWidth + gap}
          y={0}
          width={legWidth}
          height={legHeight}
          rx={`0 0 ${radius} ${radius}`}
          className="fill-foreground"
          style={{ borderRadius: `0 0 ${radius}px ${radius}px` }}
        />
      </svg>
    );
  }

  return (
    <svg
      width={totalWidth}
      height={legHeight}
      viewBox={`0 0 172 340`}
      fill="none"
      className={className}
      aria-label="BULLETPROOFFIT"
    >
      <rect x="0" y="0" width="80" height="340" rx="0" ry="0" className="fill-foreground" />
      <path d="M0 300 L0 0 L80 0 L80 300 A40 40 0 0 1 0 300Z" className="fill-foreground" />
      <path d="M92 300 L92 0 L172 0 L172 300 A40 40 0 0 1 92 300Z" className="fill-foreground" />
    </svg>
  );
};

export default ULogo;
