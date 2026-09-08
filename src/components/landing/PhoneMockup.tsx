interface PhoneMockupProps {
  src: string;
  alt: string;
  width?: number;
  className?: string;
}

/** Matte titanium iPhone frame — thin uniform bezel, dynamic island, flush side buttons. */
const PhoneMockup = ({ src, alt, width = 300, className = "" }: PhoneMockupProps) => {
  const height = Math.round(width * 2.06);
  const radius = width * 0.18;

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* soft floor shadow */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[40px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* titanium frame */}
      <div
        className="relative w-full h-full"
        style={{
          borderRadius: radius,
          background: "linear-gradient(150deg, #6b6b70 0%, #3a3a3e 22%, #2a2a2d 50%, #3d3d41 78%, #6a6a6f 100%)",
          padding: 3,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.9), 0 30px 70px rgba(0,0,0,0.55)",
        }}
      >
        {/* side buttons — flush thin bars */}
        <div className="absolute left-[-2px] top-[16%] w-[2px] h-[4%] rounded-l-full" style={{ background: "#4a4a4e" }} />
        <div className="absolute left-[-2px] top-[24%] w-[2px] h-[6%] rounded-l-full" style={{ background: "#4a4a4e" }} />
        <div className="absolute left-[-2px] top-[32%] w-[2px] h-[6%] rounded-l-full" style={{ background: "#4a4a4e" }} />
        <div className="absolute right-[-2px] top-[26%] w-[2px] h-[9%] rounded-r-full" style={{ background: "#4a4a4e" }} />

        {/* screen */}
        <div
          className="relative w-full h-full overflow-hidden bg-black"
          style={{ borderRadius: radius - 3 }}
        >
          <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-top" />

          {/* dynamic island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black z-20"
            style={{ top: width * 0.035, width: width * 0.29, height: width * 0.085 }}
          />

          {/* glare */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ background: "linear-gradient(200deg, rgba(255,255,255,0.05) 0%, transparent 38%)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
