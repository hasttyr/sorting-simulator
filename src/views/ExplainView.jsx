import { ALGORITHMS } from '../algorithms/algorithmData.js';

export default function ExplainView({ algorithmId, onBack, onSimulate }) {
  const algo = ALGORITHMS[algorithmId];
  if (!algo) return null;

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <nav className="sticky top-4 z-20 mb-8 rounded-2xl border border-slate-800/80 bg-slate-950/80 px-4 py-3 shadow-glow backdrop-blur sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800" onClick={onBack}>
            ← Menú
          </button>
          <div className="text-sm font-medium text-slate-400">
            <span className="text-slate-500">SortLab</span>
            <span className="px-2 text-slate-600">/</span>
            <span style={{ color: algo.accent }}>{algo.name}</span>
          </div>
          <button className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.01]" onClick={onSimulate} style={{ backgroundColor: algo.accent }}>
            Simular →
          </button>
        </div>
      </nav>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-8">
          <header className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow backdrop-blur sm:p-8">
            <div className="inline-flex rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em]" style={{ borderColor: algo.accent, color: algo.accent }}>
              Algoritmo
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">{algo.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{algo.tagline}</p>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: 'Tiempo', value: algo.complexity.time },
              { label: 'Espacio', value: algo.complexity.space },
              { label: 'Mejor caso', value: algo.complexity.best },
              { label: 'Peor caso', value: algo.complexity.worst },
              { label: 'Estable', value: algo.complexity.stable ? 'Sí' : 'No' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-lg shadow-black/20">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{item.label}</div>
                <div className="mt-3 text-xl font-bold text-slate-50" style={{ color: algo.accent }}>{item.value}</div>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow backdrop-blur sm:p-8">
            <h2 className="text-lg font-bold text-slate-50 sm:text-xl">Cómo funciona</h2>
            <ol className="mt-6 space-y-4">
              {algo.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-4 rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4">
                  <span className="shrink-0 text-sm font-black tracking-[0.24em]" style={{ color: algo.accent }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm leading-6 text-slate-300 sm:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow backdrop-blur sm:p-8">
            <h2 className="text-lg font-bold text-slate-50 sm:text-xl">Historia</h2>
            <div className="mt-6 space-y-5 border-l border-slate-800 pl-5">
              {algo.history.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 bg-slate-950" style={{ borderColor: algo.accent }} />
                  <div className="text-sm font-bold" style={{ color: algo.accent }}>{item.year}</div>
                  <h3 className="mt-1 text-base font-semibold text-slate-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 shadow-lg shadow-black/20">
              <h3 className="text-lg font-bold text-emerald-200">✓ Ventajas</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                {algo.pros.map((p, i) => (
                  <li key={i} className="rounded-xl border border-emerald-400/10 bg-slate-950/40 px-4 py-3">{p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-rose-400/20 bg-rose-400/5 p-6 shadow-lg shadow-black/20">
              <h3 className="text-lg font-bold text-rose-200">✗ Desventajas</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
                {algo.cons.map((c, i) => (
                  <li key={i} className="rounded-xl border border-rose-400/10 bg-slate-950/40 px-4 py-3">{c}</li>
                ))}
              </ul>
            </div>
          </section>

          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 shadow-glow backdrop-blur">
            <button className="inline-flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 text-base font-bold text-slate-950 transition-transform hover:scale-[1.01]" onClick={onSimulate} style={{ backgroundColor: algo.accent }}>
              <span>Iniciar Simulador</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
