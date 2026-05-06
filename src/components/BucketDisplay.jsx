import './BucketDisplay.css';

export default function BucketDisplay({ buckets, activeBucket, sortedBuckets = [], labels, accent }) {
  if (!buckets) return null;

  return (
    <div className="bucket-display">
      {buckets.map((bucket, i) => {
        const isActive = activeBucket === i;
        const isSorted = sortedBuckets.includes(i);
        const color = isSorted ? '#22c55e' : isActive ? accent : 'var(--border)';

        return (
          <div
            key={i}
            className={`bucket ${isActive ? 'bucket-active' : ''} ${isSorted ? 'bucket-sorted' : ''}`}
            style={{ '--bcolor': color }}
          >
            <div className="bucket-label" style={{ color }}>
              {labels ? labels[i] : i}
            </div>
            <div className="bucket-body">
              {bucket.length === 0 ? (
                <div className="bucket-empty">∅</div>
              ) : (
                <div className="bucket-items">
                  {bucket.map((val, j) => (
                    <div
                      key={j}
                      className={`bucket-item ${isActive && j === bucket.length - 1 ? 'bucket-item-new' : ''}`}
                      style={{ borderColor: isActive && j === bucket.length - 1 ? accent : 'var(--border)' }}
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
