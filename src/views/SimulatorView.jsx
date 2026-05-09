import { useState, useRef, useCallback } from 'react';
import { ALGORITHMS } from '../algorithms/algorithmData.js';
import { generateCountingSortSteps } from '../algorithms/countingSort.js';
import { generateBucketSortSteps } from '../algorithms/bucketSort.js';
import { generateRadixSortSteps } from '../algorithms/radixSort.js';
import ArrayBars from '../components/ArrayBars.jsx';
import BucketDisplay from '../components/BucketDisplay.jsx';
import CountDisplay from '../components/CountDisplay.jsx';

const DEFAULT_ARRAYS = {
  counting: [4, 2, 7, 1, 5, 3, 8, 6, 2, 4],
  bucket: [29, 45, 8, 62, 17, 38, 55, 3, 71, 24],
  radix: [170, 45, 75, 90, 2, 802, 24, 66],
};

function generateSteps(algorithmId, array) {
  if (algorithmId === 'counting') return generateCountingSortSteps(array);
  if (algorithmId === 'bucket') return generateBucketSortSteps(array);
  if (algorithmId === 'radix') return generateRadixSortSteps(array);
  return [];
}

export default function SimulatorView({ algorithmId, onBack, onMenu }) {
  const algo = ALGORITHMS[algorithmId];

  const [inputText, setInputText] = useState(DEFAULT_ARRAYS[algorithmId]?.join(', ') || '');
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(700);
  const intervalRef = useRef(null);
  const fileInputRef = useRef(null);

  const parseInput = (text) => {
    const parts = text.split(/[,\s]+/).map(s => s.trim()).filter(Boolean);
    const nums = parts.map(Number);
    if (nums.some(isNaN)) throw new Error('Valores inválidos. Usa solo números separados por comas.');
    if (nums.some(n => n < 0)) throw new Error('Solo se permiten enteros no negativos.');
    if (nums.length < 2) throw new Error('Ingresa al menos 2 números.');
    if (nums.length > 50) throw new Error('Máximo 50 elementos.');
    return nums;
  };

  const handleStart = useCallback(() => {
    try {
      const arr = parseInput(inputText);
      setError('');
      const s = generateSteps(algorithmId, arr);
      setSteps(s);
      setStepIdx(0);
      setStarted(true);
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    } catch (e) {
      setError(e.message);
    }
  }, [inputText, algorithmId]);

  const handleRandom = () => {
    const n = Math.floor(Math.random() * 8) + 6;
    const max = algorithmId === 'radix' ? 999 : algorithmId === 'bucket' ? 100 : 20;
    const arr = Array.from({ length: n }, () => Math.floor(Math.random() * max) + 1);
    setInputText(arr.join(', '));
    setStarted(false);
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const handleFileLoad = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInputText(ev.target.result.trim());
      setStarted(false);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const goTo = useCallback((idx) => {
    setStepIdx(Math.max(0, Math.min(idx, steps.length - 1)));
  }, [steps.length]);

  const handlePlay = () => {
    if (stepIdx >= steps.length - 1) {
      setStepIdx(0);
    }
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, playSpeed);
  };

  const handlePause = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setStepIdx(0);
  };

  const step = steps[stepIdx];
  const isDone = step?.phase === 'done';
  const maxVal = step ? Math.max(...step.array, step.output ? Math.max(...step.output.filter(v => v !== null), 0) : 0) : 1;

  const getHighlightProps = () => {
    if (!step) return { highlights: [], sorted: [] };
    const highlights = step.highlights || [];
    const sorted = isDone ? step.array.map((_, i) => i) : [];
    return { highlights, sorted };
  };

  const { highlights, sorted } = getHighlightProps();

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <nav className="mb-6 rounded-2xl border border-slate-800/80 bg-slate-950/80 px-4 py-3 shadow-glow backdrop-blur sm:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <button className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800" onClick={onBack}>← Explicación</button>
          <div className="text-sm font-medium text-slate-400">
            <span className="text-slate-500">SortLab</span>
            <span className="px-2 text-slate-600">/</span>
            <span style={{ color: algo.accent }}>{algo.name}</span>
            <span className="px-2 text-slate-600">/</span>
            <span className="text-slate-500">Simulador</span>
          </div>
          <button className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800" onClick={onMenu}>Menú ⊞</button>
        </div>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-glow backdrop-blur sm:p-6">
          <div className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Arreglo de entrada</div>
            <textarea
              className="min-h-[96px] w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-slate-500"
              value={inputText}
              onChange={e => { setInputText(e.target.value); setStarted(false); }}
              placeholder="Ej: 5, 3, 8, 1, 9, 2"
              rows={3}
              style={{ borderColor: error ? '#f87171' : undefined }}
            />
            {error && <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <button className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800" onClick={handleRandom}>⟳ Aleatorio</button>
              <button className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800" onClick={() => fileInputRef.current?.click()}>
                ↑ Cargar CSV
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt"
                style={{ display: 'none' }}
                onChange={handleFileLoad}
              />
            </div>
            <button
              className="w-full rounded-2xl px-5 py-3 text-sm font-bold text-slate-950 transition-transform hover:scale-[1.01]"
              onClick={handleStart}
              style={{ background: algo.accent }}
            >
              {started ? '↺ Reiniciar' : '▶ Iniciar'}
            </button>
          </div>

          {started && (
            <div className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Velocidad</div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Lento</span>
                <input
                  type="range"
                  min={150}
                  max={1500}
                  step={50}
                  value={1650 - playSpeed}
                  onChange={e => setPlaySpeed(1650 - Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-current"
                  style={{ accentColor: algo.accent }}
                />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Rápido</span>
              </div>
            </div>
          )}

          {started && (
            <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Info del paso</div>
              <div className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: algo.accent }}>
                {step?.phase?.toUpperCase().replace(/_/g, ' ')}
              </div>
              <div className="text-sm text-slate-300">
                Paso {stepIdx + 1} / {steps.length}
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full" style={{ width: `${((stepIdx + 1) / steps.length) * 100}%`, background: algo.accent }} />
              </div>
              {isDone && (
                <div className="rounded-xl border px-3 py-2 text-sm font-semibold" style={{ borderColor: algo.accent, color: algo.accent }}>
                  ✓ Ordenamiento completado
                </div>
              )}
            </div>
          )}

          {started && (
            <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Leyenda</div>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ background: algo.accent }} /> Elemento activo</div>
                <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-emerald-400" /> Ordenado</div>
                <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-orange-400" /> Comparando</div>
                <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-slate-500" /> Sin procesar</div>
              </div>
            </div>
          )}
        </aside>

        <main className="space-y-6 rounded-3xl border border-slate-800/80 bg-slate-950/70 p-5 shadow-glow backdrop-blur sm:p-6">
          {!started ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/50 px-6 py-16 text-center">
              <div className="text-5xl font-black" style={{ color: algo.accent }}>⊳</div>
              <div className="mt-4 text-xl font-bold text-slate-50">Configura el arreglo y presiona Iniciar</div>
              <div className="mt-3 max-w-xl text-sm leading-7 text-slate-400">Puedes ingresar valores manualmente, generar uno aleatorio o cargar un archivo .csv.</div>
            </div>
          ) : (
            <>
              <div className="rounded-2xl border bg-slate-950/70 p-4" style={{ borderColor: `${algo.accent}44` }}>
                <div className="text-base font-semibold text-slate-100">{step?.description}</div>
                {step?.subDescription && (
                  <div className="mt-2 text-sm leading-6 text-slate-400">{step?.subDescription}</div>
                )}
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {step?.phase === 'placing' || step?.phase === 'output_start' ? 'Arreglo original' : 'Arreglo'}
                </div>
                <div className="h-[320px] w-full rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3 sm:h-[380px]">
                  <ArrayBars
                    array={step?.array || []}
                    highlights={highlights}
                    sorted={sorted}
                    accent={algo.accent}
                    maxVal={maxVal}
                  />
                </div>
              </div>

              {algorithmId === 'counting' && step?.output && (
                <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Arreglo de salida</div>
                  <div className="h-[140px] rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
                    <ArrayBars
                      array={step.output.map(v => v === null ? 0 : v)}
                      highlights={step.outputHighlight !== undefined ? [step.outputHighlight] : []}
                      sorted={step.phase === 'done' ? step.output.map((_, i) => i) : []}
                      accent={algo.accent}
                      maxVal={maxVal}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.output.map((v, i) => (
                      <span
                        key={i}
                        className={`min-w-[2.75rem] rounded-xl border px-3 py-2 text-center text-sm font-semibold ${step.outputHighlight === i ? 'scale-105' : ''}`}
                        style={{ borderColor: step.outputHighlight === i ? algo.accent : '#334155', color: step.outputHighlight === i ? algo.accent : '#e2e8f0' }}
                      >
                        {v === null ? '_' : v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {algorithmId === 'counting' && step?.count && (
                <div>
                  <CountDisplay
                    count={step.count}
                    countOffset={step.countOffset}
                    countHighlight={step.countHighlight}
                    accent={algo.accent}
                  />
                </div>
              )}

              {algorithmId === 'bucket' && step?.buckets && (
                <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Cubetas</div>
                  <BucketDisplay
                    buckets={step.buckets}
                    activeBucket={step.activeBucket}
                    sortedBuckets={step.sortedBuckets}
                    accent={algo.accent}
                  />
                </div>
              )}

              {algorithmId === 'radix' && step?.buckets && (
                <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Cubetas (dígito {step.digit} — divisor: {step.currentExp})
                  </div>
                  <BucketDisplay
                    buckets={step.buckets}
                    activeBucket={step.activeBucket}
                    labels={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                    accent={algo.accent}
                  />
                </div>
              )}

              {algorithmId === 'radix' && step?.digit && (
                <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                  {Array.from({ length: step.numDigits }, (_, i) => (
                    <div
                      key={i}
                      className="flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-bold"
                      style={{ background: step.digit === i + 1 ? algo.accent : step.digit > i + 1 ? '#22c55e' : '#0f172a', borderColor: step.digit === i + 1 ? algo.accent : step.digit > i + 1 ? '#22c55e' : '#334155' }}
                    >
                      {['U', 'D', 'C', 'M'][i] || i + 1}
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-lg font-bold text-slate-100 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={handleReset}
                  disabled={stepIdx === 0}
                  title="Inicio"
                >⏮</button>
                <button
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-lg font-bold text-slate-100 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => goTo(stepIdx - 1)}
                  disabled={stepIdx === 0}
                  title="Paso anterior"
                >◀</button>

                {isPlaying ? (
                  <button className="rounded-xl border border-slate-700 px-4 py-3 text-lg font-bold text-slate-950 transition-colors" onClick={handlePause} style={{ background: algo.accent }}>
                    ⏸
                  </button>
                ) : (
                  <button
                    className="rounded-xl border border-slate-700 px-4 py-3 text-lg font-bold text-slate-950 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={handlePlay}
                    disabled={stepIdx >= steps.length - 1}
                    style={{ background: isDone ? '#22c55e' : algo.accent }}
                  >
                    ▶
                  </button>
                )}

                <button
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-lg font-bold text-slate-100 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => goTo(stepIdx + 1)}
                  disabled={stepIdx >= steps.length - 1}
                  title="Paso siguiente"
                >▶</button>
                <button
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-lg font-bold text-slate-100 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => goTo(steps.length - 1)}
                  disabled={stepIdx >= steps.length - 1}
                  title="Final"
                >⏭</button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
                <input
                  type="range"
                  min={0}
                  max={steps.length - 1}
                  value={stepIdx}
                  onChange={e => { handlePause(); goTo(Number(e.target.value)); }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-current"
                  style={{ accentColor: algo.accent }}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
