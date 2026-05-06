import { ALGORITHMS } from '../algorithms/algorithmData.js';
import './ExplainView.css';

export default function ExplainView({ algorithmId, onBack, onSimulate }) {
  const algo = ALGORITHMS[algorithmId];
  if (!algo) return null;

  return (
    <div className="explain-view" style={{ '--accent': algo.accent }}>
      {/* Top nav */}
      <nav className="explain-nav">
        <button className="nav-btn" onClick={onBack}>
          ← Menú
        </button>
        <div className="nav-breadcrumb">
          <span className="nav-dim">SortLab</span>
          <span className="nav-sep">/</span>
          <span style={{ color: algo.accent }}>{algo.name}</span>
        </div>
        <button className="nav-btn primary" onClick={onSimulate} style={{ '--accent': algo.accent }}>
          Simular →
        </button>
      </nav>

      <div className="explain-content">
        {/* Hero */}
        <header className="explain-hero">
          <div className="explain-badge" style={{ borderColor: algo.accent, color: algo.accent }}>
            ALGORITMO
          </div>
          <h1 className="explain-title">{algo.name}</h1>
          <p className="explain-tagline">{algo.tagline}</p>
        </header>

        {/* Complexity cards */}
        <section className="complexity-grid">
          {[
            { label: 'Tiempo', value: algo.complexity.time },
            { label: 'Espacio', value: algo.complexity.space },
            { label: 'Mejor caso', value: algo.complexity.best },
            { label: 'Peor caso', value: algo.complexity.worst },
            { label: 'Estable', value: algo.complexity.stable ? 'Sí' : 'No' },
          ].map(item => (
            <div className="complexity-card" key={item.label}>
              <div className="complexity-label">{item.label}</div>
              <div className="complexity-value" style={{ color: algo.accent }}>{item.value}</div>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section className="explain-section">
          <h2 className="section-title">Cómo funciona</h2>
          <ol className="steps-list">
            {algo.howItWorks.map((step, i) => (
              <li key={i} className="steps-item">
                <span className="steps-num" style={{ color: algo.accent }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* History timeline */}
        <section className="explain-section">
          <h2 className="section-title">Historia</h2>
          <div className="timeline">
            {algo.history.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-year" style={{ color: algo.accent }}>{item.year}</div>
                <div className="timeline-dot" style={{ borderColor: algo.accent }} />
                <div className="timeline-body">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-text">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pros & cons */}
        <section className="explain-section pros-cons-grid">
          <div className="pros-cons-col">
            <h3 className="pros-cons-title pros">✓ Ventajas</h3>
            <ul className="pros-cons-list">
              {algo.pros.map((p, i) => (
                <li key={i} className="pros-cons-item">{p}</li>
              ))}
            </ul>
          </div>
          <div className="pros-cons-col">
            <h3 className="pros-cons-title cons">✗ Desventajas</h3>
            <ul className="pros-cons-list">
              {algo.cons.map((c, i) => (
                <li key={i} className="pros-cons-item">{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="explain-cta">
          <button className="cta-btn" onClick={onSimulate} style={{ '--accent': algo.accent }}>
            <span>Iniciar Simulador</span>
            <span className="cta-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
