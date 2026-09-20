/** Original hero artwork: a storefront browser + a POS dashboard, drawn with CSS only. Decorative. */
export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[1/0.95] w-full max-w-[560px]" aria-hidden>
      <div className="absolute inset-8 rounded-full bg-brand opacity-[0.14] blur-[90px]" />

      {/* Storefront window */}
      <div className="float absolute left-0 top-0 w-[78%] overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
        <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3 py-2.5">
          <i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-3 rounded-full bg-bg px-3 py-0.5 text-[10px] text-muted">yourstore.com</span>
        </div>
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="h-2.5 w-16 rounded bg-white/70" />
            <span className="flex gap-2"><i className="h-2 w-6 rounded bg-white/20" /><i className="h-2 w-6 rounded bg-white/20" /><i className="h-2 w-6 rounded bg-white/20" /></span>
          </div>
          <div className="mb-3 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] p-4">
            <span className="block h-3 w-3/5 rounded bg-white/80" />
            <span className="mt-2 block h-2 w-2/5 rounded bg-white/30" />
            <span className="mt-4 inline-block rounded-full bg-brand px-4 py-1.5 text-[9px] font-bold text-on-brand">Shop now</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-line p-1.5">
                <div className="mb-1.5 aspect-square rounded-md bg-gradient-to-br from-white/15 to-white/[0.03]" />
                <span className="block h-1.5 w-4/5 rounded bg-white/40" />
                <span className="mt-1 block h-1.5 w-2/5 rounded bg-brand/80" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POS dashboard */}
      <div className="float-slow absolute bottom-0 right-0 w-[72%] overflow-hidden rounded-2xl border border-brand-line bg-bg shadow-glow">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[10px] text-muted">
          <span className="font-semibold text-ink">POS · Counter 1</span><span className="text-brand">● Online</span>
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-3">
          <div className="space-y-1.5">
            {["Paracetamol 500mg", "Vitamin C 1000", "ORS Sachet"].map((n, i) => (
              <div key={n} className="flex items-center justify-between rounded-md bg-surface px-2.5 py-1.5 text-[9px]">
                <span className="text-ink/90">{n}</span><span className="text-muted">×{i + 1}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-md border border-dashed border-line px-2.5 py-1.5 text-[9px] text-muted">
              <span>Expiry alert: 2 batches</span><span className="text-brand">!</span>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg bg-surface p-2.5">
            <div className="text-[9px] text-muted">Total</div>
            <div className="h-display text-xl text-brand">Rs 1,240</div>
            <div className="rounded-md bg-brand py-1.5 text-center text-[9px] font-bold text-on-brand">Charge</div>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="float absolute -right-1 top-[10%] w-[24%] rounded-[1.3rem] border border-line bg-surface-2 p-1.5 shadow-card sm:right-2" style={{ animationDelay: "-3s" }}>
        <div className="rounded-[1rem] bg-bg p-2">
          <span className="mx-auto mb-2 block h-1 w-6 rounded-full bg-white/20" />
          <div className="mb-1.5 aspect-[4/5] rounded-md bg-gradient-to-br from-brand/30 to-white/[0.03]" />
          <span className="block h-1.5 w-3/4 rounded bg-white/40" />
          <span className="mt-2 block rounded bg-brand py-1 text-center text-[7px] font-bold text-on-brand">Add to cart</span>
        </div>
      </div>
    </div>
  );
}
