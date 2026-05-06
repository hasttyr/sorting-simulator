import { useState, useRef, useCallback } from 'react';
import { ALGORITHMS } from '../algorithms/algorithmData.js';
import { generateCountingSortSteps } from '../algorithms/countingSort.js';
import { generateBucketSortSteps } from '../algorithms/bucketSort.js';
import { generateRadixSortSteps } from '../algorithms/radixSort.js';
import ArrayBars from '../components/ArrayBars.jsx';
import BucketDisplay from '../components/BucketDisplay.jsx';
import CountDisplay from '../components/CountDisplay.jsx';
import './SimulatorView.css';

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
    <div className="sim-view" style={{ '--accent': algo.accent }}>
      {/* Nav */}
      <nav className="sim-nav">
        <button className="nav-btn" onClick={onBack}>← Explicación</button>
        <div className="nav-breadcrumb">
          <span className="nav-dim">SortLab</span>
          <span className="nav-sep">/</span>
          <span style={{ color: algo.accent }}>{algo.name}</span>
          <span className="nav-sep">/</span>
          <span className="nav-dim">Simulador</span>
        </div>
        <button className="nav-btn" onClick={onMenu}>Menú ⊞</button>
      </nav>

      <div className="sim-layout">
        {/* Left panel: input */}
        <aside className="sim-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">Arreglo de entrada</div>
            <textarea
              className="array-input"
              value={inputText}
              onChange={e => { setInputText(e.target.value); setStarted(false); }}
              placeholder="Ej: 5, 3, 8, 1, 9, 2"
              rows={3}
              style={{ borderColor: error ? '#f87171' : undefined }}
            />
            {error && <div className="input-error">{error}</div>}
            <div className="input-actions">
              <button className="btn-outline" onClick={handleRandom}>⟳ Aleatorio</button>
              <button className="btn-outline" onClick={() => fileInputRef.current?.click()}>
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
              className="btn-primary"
              onClick={handleStart}
              style={{ background: algo.accent }}
            >
              {started ? '↺ Reiniciar' : '▶ Iniciar'}
            </button>
          </div>

          {started && (
            <div className="sidebar-section">
              <div className="sidebar-label">Velocidad</div>
              <div className="speed-control">
                <span className="speed-label">Lento</span>
                <input
                  type="range"
                  min={150}
                  max={1500}
                  step={50}
                  value={1650 - playSpeed}
                  onChange={e => setPlaySpeed(1650 - Number(e.target.value))}
                  className="speed-slider"
                  style={{ accentColor: algo.accent }}
                />
                <span className="speed-label">Rápido</span>
              </div>
            </div>
          )}

          {started && (
            <div className="sidebar-section">
              <div className="sidebar-label">Info del paso</div>
              <div className="step-phase" style={{ color: algo.accent }}>
                {step?.phase?.toUpperCase().replace(/_/g, ' ')}
              </div>
              <div className="step-progress">
                Paso {stepIdx + 1} / {steps.length}
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((stepIdx + 1) / steps.length) * 100}%`, background: algo.accent }}
                />
              </div>
              {isDone && (
                <div className="done-badge" style={{ borderColor: algo.accent, color: algo.accent }}>
                  ✓ Ordenamiento completado
                </div>
              )}
            </div>
          )}

          {started && (
            <div className="sidebar-section">
              <div className="sidebar-label">Leyenda</div>
              <div className="legend">
                <div className="legend-item"><span className="legend-dot" style={{ background: algo.accent }} /> Elemento activo</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#22c55e' }} /> Ordenado</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#ff6b35' }} /> Comparando</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--bar-default)' }} /> Sin procesar</div>
              </div>
            </div>
          )}
        </aside>

        {/* Main area */}
        <main className="sim-main">
          {!started ? (
            <div className="sim-empty">
              <div className="sim-empty-icon" style={{ color: algo.accent }}>⊳</div>
              <div className="sim-empty-text">Configura el arreglo y presiona <strong>Iniciar</strong></div>
              <div className="sim-empty-sub">Puedes ingresar valores manualmente, generar uno aleatorio o cargar un archivo .csv</div>
            </div>
          ) : (
            <>
              {/* Description panel */}
              <div className="step-description" style={{ borderColor: algo.accent + '44' }}>
                <div className="step-desc-main">{step?.description}</div>
                {step?.subDescription && (
                  <div className="step-desc-sub">{step?.subDescription}</div>
                )}
              </div>

              {/* Main array visualization */}
              <div className="viz-section">
                <div className="viz-label">
                  {step?.phase === 'placing' || step?.phase === 'output_start' ? 'Arreglo original' : 'Arreglo'}
                </div>
                <div className="bars-container">
                  <ArrayBars
                    array={step?.array || []}
                    highlights={highlights}
                    sorted={sorted}
                    accent={algo.accent}
                    maxVal={maxVal}
                  />
                </div>
              </div>

              {/* Output array for counting sort */}
              {algorithmId === 'counting' && step?.output && (
                <div className="viz-section">
                  <div className="viz-label">Arreglo de salida</div>
                  <div className="bars-container" style={{ height: '120px' }}>
                    <ArrayBars
                      array={step.output.map(v => v === null ? 0 : v)}
                      highlights={step.outputHighlight !== undefined ? [step.outputHighlight] : []}
                      sorted={step.phase === 'done' ? step.output.map((_, i) => i) : []}
                      accent={algo.accent}
                      maxVal={maxVal}
                    />
                  </div>
                  <div className="output-raw">
                    {step.output.map((v, i) => (
                      <span key={i} className={`output-cell ${step.outputHighlight === i ? 'output-cell-active' : ''}`}
                        style={{ borderColor: step.outputHighlight === i ? algo.accent : undefined, color: step.outputHighlight === i ? algo.accent : undefined }}>
                        {v === null ? '_' : v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Count array for counting sort */}
              {algorithmId === 'counting' && step?.count && (
                <div className="viz-section">
                  <CountDisplay
                    count={step.count}
                    countOffset={step.countOffset}
                    countHighlight={step.countHighlight}
                    accent={algo.accent}
                  />
                </div>
              )}

              {/* Buckets for bucket sort */}
              {algorithmId === 'bucket' && step?.buckets && (
                <div className="viz-section">
                  <div className="viz-label">Cubetas</div>
                  <BucketDisplay
                    buckets={step.buckets}
                    activeBucket={step.activeBucket}
                    sortedBuckets={step.sortedBuckets}
                    accent={algo.accent}
                  />
                </div>
              )}

              {/* Buckets for radix sort */}
              {algorithmId === 'radix' && step?.buckets && (
                <div className="viz-section">
                  <div className="viz-label">
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

              {/* Digit indicator for radix */}
              {algorithmId === 'radix' && step?.digit && (
                <div className="digit-indicator">
                  {Array.from({ length: step.numDigits }, (_, i) => (
                    <div
                      key={i}
                      className={`digit-pip ${step.digit === i + 1 ? 'digit-pip-active' : step.digit > i + 1 ? 'digit-pip-done' : ''}`}
                      style={{ background: step.digit === i + 1 ? algo.accent : step.digit > i + 1 ? '#22c55e' : undefined }}
                    >
                      {['U', 'D', 'C', 'M'][i] || i + 1}
                    </div>
                  ))}
                </div>
              )}

              {/* Controls */}
              <div className="sim-controls">
                <button
                  className="ctrl-btn"
                  onClick={handleReset}
                  disabled={stepIdx === 0}
                  title="Inicio"
                >⏮</button>
                <button
                  className="ctrl-btn"
                  onClick={() => goTo(stepIdx - 1)}
                  disabled={stepIdx === 0}
                  title="Paso anterior"
                >◀</button>

                {isPlaying ? (
                  <button className="ctrl-btn ctrl-play" onClick={handlePause} style={{ background: algo.accent }}>
                    ⏸
                  </button>
                ) : (
                  <button
                    className="ctrl-btn ctrl-play"
                    onClick={handlePlay}
                    disabled={stepIdx >= steps.length - 1}
                    style={{ background: isDone ? '#22c55e' : algo.accent }}
                  >
                    ▶
                  </button>
                )}

                <button
                  className="ctrl-btn"
                  onClick={() => goTo(stepIdx + 1)}
                  disabled={stepIdx >= steps.length - 1}
                  title="Paso siguiente"
                >▶</button>
                <button
                  className="ctrl-btn"
                  onClick={() => goTo(steps.length - 1)}
                  disabled={stepIdx >= steps.length - 1}
                  title="Final"
                >⏭</button>
              </div>

              {/* Step scrubber */}
              <div className="step-scrubber">
                <input
                  type="range"
                  min={0}
                  max={steps.length - 1}
                  value={stepIdx}
                  onChange={e => { handlePause(); goTo(Number(e.target.value)); }}
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
