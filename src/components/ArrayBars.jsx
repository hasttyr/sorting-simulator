export default function ArrayBars({ array, highlights = [], sorted = [], comparing = [], special = [], accent = 'var(--accent-counting)', maxVal }) {
  const max = maxVal || Math.max(...array, 1);

  const getColor = (index) => {
    if (sorted.includes(index)) return '#22c55e';
    if (special.includes(index)) return '#a855f7';
    if (highlights.includes(index)) return accent;
    if (comparing.includes(index)) return '#ff6b35';
    return 'var(--bar-default)';
  };

  const isActive = (index) => {
    return highlights.includes(index) || sorted.includes(index) || comparing.includes(index) || special.includes(index);
  };

  return (
    <div className="flex h-full items-end gap-2 overflow-x-auto pb-1 sm:gap-3">
      {array.map((val, i) => {
        const heightPct = max > 0 ? (val / max) * 100 : 0;
        const color = getColor(i);
        const active = isActive(i);

        return (
          <div
            key={i}
            className="flex min-w-[2.5rem] flex-1 flex-col items-center justify-end"
          >
            <div
              className="mb-2 min-h-[1.25rem] text-xs font-semibold tabular-nums sm:text-sm"
              style={{ color: active ? color : '#94a3b8', opacity: active ? 1 : 0.7 }}
            >
              {array.length <= 20 ? val : ''}
            </div>
            <div className="relative flex w-full flex-1 items-end">
              <div
                className={`w-full rounded-t-2xl border border-transparent transition-all duration-300 ease-out ${active ? 'shadow-[0_0_18px_rgba(255,255,255,0.14)]' : ''}`}
                style={{
                  height: `${Math.max(heightPct, 2)}%`,
                  background: active
                    ? `linear-gradient(to top, ${color}, ${color}cc)`
                    : 'linear-gradient(to top, #334155, #1e293b)',
                  boxShadow: active ? `0 0 16px ${color}66, 0 0 4px ${color}` : 'none',
                  borderColor: active ? color : 'transparent',
                }}
              />
            </div>
            <div className="mt-2 text-[11px] font-medium tabular-nums text-slate-500 sm:text-xs" style={{ color: active ? color : '#64748b', opacity: 0.7 }}>
              {array.length <= 24 ? i : ''}
            </div>
          </div>
        );
      })}
    </div>
  );
}
