interface ULogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const ULogo = ({ size = 32, animated: _animated = false, className = "" }: ULogoProps) => {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: size, width: "auto", display: "inline-block", verticalAlign: "middle" }}
      aria-label="BULLETPROOFFIT"
    >
      <path d="M0,0 L0,85 Q0,110 25,110 Q50,110 50,85 L50,85 Q50,110 75,110 Q100,110 100,85 L100,0 L78,0 L78,82 Q78,88 72,88 Q66,88 66,82 L66,0 L34,0 L34,82 Q34,88 28,88 Q22,88 22,82 L22,0 Z" />
    </svg>
  );
};

export default ULogo;
