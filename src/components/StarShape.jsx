export default function StarShape({ to, from }) {
  return (
    <div className="star-container">
      <svg className="star-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="100,10 125,78 198,78 140,120 160,190 100,150 40,190 60,120 2,78 75,78"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="2"
        />
      </svg>
      <div className="star-text">
        <div className="star-to">
          <span className="star-label">To:</span> {to}
        </div>
        <div className="star-from">
          <span className="star-label">From:</span> {from}
        </div>
      </div>
    </div>
  );
}
