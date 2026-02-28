interface ULogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const ULogo = ({ size = 32, animated: _animated = false, className = "" }: ULogoProps) => {
  return (
    <svg
      viewBox="0 0 120 134"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height: size, width: "auto", display: "inline-block", verticalAlign: "middle" }}
      aria-label="BULLETPROOFFIT"
    >
      <rect x="0" y="0" width="52" height="110" />
      <rect x="68" y="0" width="52" height="110" />
      <ellipse cx="26" cy="110" rx="26" ry="24" />
      <ellipse cx="94" cy="110" rx="26" ry="24" />
    </svg>
  );
};

export default ULogo;
