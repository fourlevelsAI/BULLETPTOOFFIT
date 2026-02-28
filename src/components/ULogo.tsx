import logoImg from "@/assets/u-logo.png";

interface ULogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const ULogo = ({ size = 32, animated: _animated = false, className = "" }: ULogoProps) => {
  return (
    <img
      src={logoImg}
      alt="BULLETPROOFFIT"
      className={`dark:invert ${className}`}
      style={{ width: size, height: "auto" }}
    />
  );
};

export default ULogo;
