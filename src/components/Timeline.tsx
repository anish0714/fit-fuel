import { TIMELINE } from "../data/schedule";

export default function Timeline() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
      {TIMELINE.map((stop) => (
        <div key={stop.label} className="relative bg-canvas-subtle p-4">
          <span className="absolute top-0 left-4 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent" />
          <div className="font-mono text-xs font-semibold text-accent-emphasis">{stop.time}</div>
          <div className="mt-1.5 mb-1 text-sm font-bold text-fg">{stop.label}</div>
          <div className="text-xs leading-relaxed text-fg-muted">{stop.detail}</div>
        </div>
      ))}
    </div>
  );
}
