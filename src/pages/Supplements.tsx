import { SUPPLEMENTS } from "../data/supplements";

export default function Supplements() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Supplement timing</h1>
      <p className="mt-2 mb-6 max-w-2xl text-fg-muted">
        Fat-soluble vitamins ride the fattiest meals; water-soluble ones go down with the first bite after
        the fast.
      </p>

      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-canvas-inset text-left">
              {["Time", "Supplement", "Paired with", "Why"].map((h) => (
                <th key={h} className="border-b border-line px-4 py-3 text-xs font-semibold tracking-wide text-fg-muted uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SUPPLEMENTS.map((row) => (
              <tr key={row.supplement} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-mono text-xs">{row.time}</td>
                <td className="px-4 py-3 font-semibold">{row.supplement}</td>
                <td className="px-4 py-3">{row.paired}</td>
                <td className="px-4 py-3 text-fg-muted">{row.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 border-l-2 border-line pl-3 text-xs text-fg-muted">
        General timing guidance, not medical advice — check with a doctor or dietitian if adjusting doses or
        combining with other medication.
      </p>
    </div>
  );
}
