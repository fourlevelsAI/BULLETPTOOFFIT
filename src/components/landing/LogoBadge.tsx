interface LogoBadgeProps {
  size?: number;
  className?: string;
}

/** Circular dark badge with thin border containing the two-vertical-bar glyph. */
const LogoBadge = ({ size = 36, className = "" }: LogoBadgeProps) => (
  <span
    className={`inline-flex items-center justify-center rounded-full shrink-0 ${className}`}
    style={{
      width: size,
      height: size,
      background: "#141416",
      border: "1px solid rgba(244,243,238,0.22)",
    }}
    aria-hidden="true"
  >
    <span className="flex items-end" style={{ gap: size * 0.1 }}>
      <span style={{ width: size * 0.1, height: size * 0.4, background: "#f4f3ee", borderRadius: size * 0.05 }} />
      <span style={{ width: size * 0.1, height: size * 0.4, background: "#f4f3ee", borderRadius: size * 0.05 }} />
    </span>
  </span>
);

export default LogoBadge;
