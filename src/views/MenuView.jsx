import { useState } from 'react';
import { ALGORITHMS } from '../algorithms/algorithmData.js';

const ALGO_ICONS = {
  counting: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="40" width="8" height="12" fill="currentColor" opacity="0.9"/>
      <rect x="20" y="28" width="8" height="24" fill="currentColor" opacity="0.9"/>
      <rect x="32" y="18" width="8" height="34" fill="currentColor" opacity="0.9"/>
      <rect x="44" y="8" width="8" height="44" fill="currentColor" opacity="0.9"/>
      <line x1="8" y1="6" x2="52" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4"/>
    </svg>
  ),
  bucket: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="20" width="14" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"/>
      <rect x="23" y="20" width="14" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"/>
      <rect x="41" y="20" width="14" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="12" cy="38" r="3" fill="currentColor"/>
      <circle cx="12" cy="44" r="3" fill="currentColor"/>
      <circle cx="30" cy="32" r="3" fill="currentColor"/>
      <circle cx="30" cy="44" r="3" fill="currentColor"/>
      <circle cx="48" cy="26" r="3" fill="currentColor"/>
      <circle cx="48" cy="38" r="3" fill="currentColor"/>
      <path d="M8 14 L30 8 L52 14" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  ),
  radix: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="8" y="22" fontFamily="monospace" fontSize="11" fill="currentColor" opacity="0.5">4 2 7</text>
      <text x="8" y="36" fontFamily="monospace" fontSize="11" fill="currentColor" opacity="0.8">4 2 7</text>
      <text x="8" y="50" fontFamily="monospace" fontSize="11" fill="currentColor">4 2 7</text>
      <rect x="38" y="12" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1"/>
      <rect x="38" y="26" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
      <rect x="38" y="40" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1"/>
      <line x1="36" y1="18" x2="38" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <line x1="36" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="36" y1="46" x2="38" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
};

export default function MenuView({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const algos = Object.values(ALGORITHMS);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <header className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <div className="mb-4 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.34em] text-sky-200">
          Visualizador
        </div>
        <h1 className="text-5xl font-black tracking-tight text-slate-50 sm:text-6xl lg:text-7xl">
          Sort<span className="text-sky-300">Lab</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Algoritmos de ordenamiento no comparativos, presentados con una interfaz clara, adaptable y pensada para exploración rápida.
        </p>
        <div className="mt-8 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {algos.map((algo, i) => (
          <button
            key={algo.id}
            className={`group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 text-left shadow-glow backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 ${hovered === algo.id ? 'ring-1 ring-white/10' : ''}`}
            style={{ animationDelay: `${i * 80}ms` }}
            onMouseEnter={() => setHovered(algo.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(algo.id)}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">0{i + 1}</div>
                <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-50 transition-transform duration-300 group-hover:scale-105" style={{ color: algo.accent }}>
                  <div className="h-10 w-10">{ALGO_ICONS[algo.id]}</div>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-400 transition-transform duration-300 group-hover:-translate-x-1" style={{ color: algo.accent }}>
                →
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-slate-50">{algo.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{algo.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-200">Time: {algo.complexity.time}</span>
                <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-200">Space: {algo.complexity.space}</span>
                {algo.complexity.stable && <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">Estable</span>}
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `radial-gradient(circle at top right, ${algo.accent}22, transparent 42%)` }}
            />
          </button>
        ))}
      </div>

      <footer className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400">
        <span className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1">Counting Sort</span>
        <span className="text-slate-600">·</span>
        <span className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1">Bucket Sort</span>
        <span className="text-slate-600">·</span>
        <span className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1">Radix Sort</span>
      </footer>
    </div>
  );
}
