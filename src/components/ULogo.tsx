interface ULogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const ULogo = ({ size = 32, animated: _animated = false, className = "" }: ULogoProps) => {
  return (
    <svg
      viewBox="0 0 100 140"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: size, width: "auto", display: "inline-block", verticalAlign: "middle" }}
      aria-label="BULLETPROOFFIT"
    >
      {/* U shape: two legs, rounded bottom, thin center gap */}
      <path d="M8,0 L8,90 C8,120 50,140 50,140 C50,140 92,120 92,90 L92,0 L56,0 L56,90 C56,104 50,108 50,108 C50,108 44,104 44,90 L44,0 Z" />
    </svg>
  );
};

export default ULogo;
