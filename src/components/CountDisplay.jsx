import './CountDisplay.css';

export default function CountDisplay({ count, countOffset = 0, countHighlight, accent }) {
  if (!count) return null;

  return (
    <div className="count-display-wrap">
      <div className="count-display-label">Arreglo de conteo</div>
      <div className="count-display">
        {count.map((val, i) => {
          const isActive = countHighlight === i;
          return (
            <div key={i} className={`count-cell ${isActive ? 'count-cell-active' : ''}`} style={{ '--accent': accent }}>
              <div className="count-cell-val" style={{ color: isActive ? accent : undefined }}>
                {val}
              </div>
              <div className="count-cell-idx" style={{ color: isActive ? accent : undefined }}>
                {i + countOffset}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
