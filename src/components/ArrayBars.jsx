import { useEffect, useRef } from 'react';
import './ArrayBars.css';

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
    <div className="array-bars">
      {array.map((val, i) => {
        const heightPct = max > 0 ? (val / max) * 100 : 0;
        const color = getColor(i);
        const active = isActive(i);

        return (
          <div
            key={i}
            className={`bar-wrapper ${active ? 'active' : ''}`}
            style={{ flex: 1, minWidth: 0 }}
          >
            <div
              className="bar-value"
              style={{ color: active ? color : 'var(--text-muted)', opacity: active ? 1 : 0.6 }}
            >
              {array.length <= 20 ? val : ''}
            </div>
            <div className="bar-container">
              <div
                className={`bar ${active ? 'bar-active-anim' : ''}`}
                style={{
                  height: `${Math.max(heightPct, 2)}%`,
                  background: active
                    ? `linear-gradient(to top, ${color}, ${color}cc)`
                    : 'var(--bar-default)',
                  boxShadow: active ? `0 0 16px ${color}66, 0 0 4px ${color}` : 'none',
                  borderColor: active ? color : 'transparent',
                }}
              />
            </div>
            <div className="bar-index" style={{ color: active ? color : 'var(--text-muted)', opacity: 0.5 }}>
              {array.length <= 24 ? i : ''}
            </div>
          </div>
        );
      })}
    </div>
  );
}
