export default function BucketDisplay({ buckets, activeBucket, sortedBuckets = [], labels, accent }) {
  if (!buckets) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {buckets.map((bucket, i) => {
        const isActive = activeBucket === i;
        const isSorted = sortedBuckets.includes(i);
        const color = isSorted ? '#22c55e' : isActive ? accent : '#334155';

        return (
          <div
            key={i}
            className={`rounded-2xl border bg-slate-950/70 p-4 shadow-lg shadow-black/20 backdrop-blur transition-transform duration-300 ${isActive ? 'scale-[1.01]' : ''} ${isSorted ? 'ring-1 ring-emerald-400/40' : ''}`}
            style={{ borderColor: color }}
          >
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.24em]" style={{ color }}>
              {labels ? labels[i] : i}
            </div>
            <div className="min-h-[5rem] rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
              {bucket.length === 0 ? (
                <div className="flex min-h-[3rem] items-center justify-center text-sm text-slate-500">∅</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {bucket.map((val, j) => (
                    <div
                      key={j}
                      className={`min-w-[2.75rem] rounded-lg border px-3 py-1.5 text-center text-sm font-semibold text-slate-100 transition-all duration-300 ${isActive && j === bucket.length - 1 ? 'scale-105' : ''}`}
                      style={{ borderColor: isActive && j === bucket.length - 1 ? accent : '#334155' }}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
