import type { ProteinType } from "../types";

const STYLES: Record<ProteinType, string> = {
  tofu: "bg-accent-muted text-accent-emphasis",
  chicken: "bg-warm-muted text-warm",
  fish: "bg-danger/15 text-danger",
};

export default function Badge({ protein }: { protein: ProteinType }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide uppercase ${STYLES[protein]}`}
    >
      {protein}
    </span>
  );
}
