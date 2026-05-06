import { useState } from 'react';
import { ALGORITHMS } from '../algorithms/algorithmData.js';
import './MenuView.css';

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
    <div className="menu-view">
      <header className="menu-header">
        <div className="menu-badge">VISUALIZADOR</div>
        <h1 className="menu-title">Sort<span className="menu-title-accent">Lab</span></h1>
        <p className="menu-subtitle">Algoritmos de ordenamiento no comparativos — visualizados paso a paso</p>
        <div className="menu-divider" />
      </header>

      <div className="menu-grid">
        {algos.map((algo, i) => (
          <button
            key={algo.id}
            className={`algo-card ${hovered === algo.id ? 'hovered' : ''}`}
            style={{ '--accent': algo.accent, animationDelay: `${i * 0.12}s` }}
            onMouseEnter={() => setHovered(algo.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(algo.id)}
          >
            <div className="algo-card-number">0{i + 1}</div>
            <div className="algo-card-icon" style={{ color: algo.accent }}>
              {ALGO_ICONS[algo.id]}
            </div>
            <div className="algo-card-content">
              <h2 className="algo-card-name">{algo.name}</h2>
              <p className="algo-card-tagline">{algo.tagline}</p>
              <div className="algo-card-meta">
                <span className="algo-badge">Time: {algo.complexity.time}</span>
                <span className="algo-badge">Space: {algo.complexity.space}</span>
                {algo.complexity.stable && <span className="algo-badge stable">Estable</span>}
              </div>
            </div>
            <div className="algo-card-arrow">→</div>
            <div className="algo-card-glow" />
          </button>
        ))}
      </div>

      <footer className="menu-footer">
        <span>Counting Sort</span>
        <span className="dot">·</span>
        <span>Bucket Sort</span>
        <span className="dot">·</span>
        <span>Radix Sort</span>
      </footer>
    </div>
  );
}
