export default function CountDisplay({ count, countOffset = 0, countHighlight, accent }) {
  if (!count) return null;

  return (
    <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur">
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Arreglo de conteo</div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {count.map((val, i) => {
          const isActive = countHighlight === i;
          return (
            <div key={i} className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-3 text-center transition-transform duration-300 hover:-translate-y-0.5" style={{ borderColor: isActive ? accent : undefined }}>
              <div className="text-xl font-bold tabular-nums" style={{ color: isActive ? accent : '#e2e8f0' }}>
                {val}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" style={{ color: isActive ? accent : undefined }}>
                {i + countOffset}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
