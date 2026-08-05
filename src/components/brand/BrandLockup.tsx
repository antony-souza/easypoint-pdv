import { BrandMark } from "./BrandMark";

type BrandLockupProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLockup({
  compact = false,
  className = "",
}: BrandLockupProps) {
  return (
    <div className={`brand-lockup ${className}`.trim()}>
      <BrandMark compact={compact} />
      <span className="brand-name">Ponto Fácil</span>
    </div>
  );
}
