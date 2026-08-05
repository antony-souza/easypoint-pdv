type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span
      className={`brand-mark${compact ? " brand-mark--compact" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M9.25 7.5h13.5a2.75 2.75 0 0 1 2.75 2.75v11.5a2.75 2.75 0 0 1-2.75 2.75H9.25a2.75 2.75 0 0 1-2.75-2.75v-11.5A2.75 2.75 0 0 1 9.25 7.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M10.5 12h11M10.5 16h4.5M10.5 20h8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="m19.1 18.1 1.4 1.4 2.6-3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
