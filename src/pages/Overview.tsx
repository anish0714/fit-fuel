import { STAPLES } from "../data/schedule";
import Timeline from "../components/Timeline";

export default function Overview() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h1 className="font-display text-3xl font-bold text-balance sm:text-4xl">Twelve to eight</h1>
        <p className="mt-3 max-w-2xl text-fg-muted">
          A rotating meal system built around a 12–8 eating window, a 4–7 PM gym block, and an air fryer —
          tofu-forward, chicken and fish in rotation, seasoned with salt and pepper first. Extra spice is
          optional, never required.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Daily rhythm</h2>
        <Timeline />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Current staples</h2>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {STAPLES.map((staple) => (
            <div key={staple.label} className="bg-canvas-subtle px-5 py-4">
              <div className="text-xs font-semibold tracking-wide text-fg-muted uppercase">{staple.label}</div>
              <div className="mt-1 text-sm">{staple.value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
