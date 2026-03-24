import { useRef, useEffect, useState } from 'react';
import './StargramCard.css';

function AutoShrinkMessage({ text }) {
  const ref = useRef(null);
  const [fontSize, setFontSize] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset to default size to measure natural fit
    el.style.fontSize = '0.85rem';
    setFontSize(null);

    // Only shrink if content overflows
    if (el.scrollHeight <= el.clientHeight) return;

    let size = 0.85;
    const minSize = 0.5;
    while (el.scrollHeight > el.clientHeight && size > minSize) {
      size -= 0.05;
      el.style.fontSize = `${size}rem`;
    }
    setFontSize(size);
  }, [text]);

  return (
    <p
      ref={ref}
      className="card-message"
      style={fontSize ? { fontSize: `${fontSize}rem` } : undefined}
    >
      "{text}"
    </p>
  );
}

export default function StargramCard({ stargram }) {
  const { sender, recipient, show, treat, message, allergies } = stargram;

  return (
    <div className="stargram-card">
      <div className="card-left">
        <div className="card-fields">
          <div className="card-field">
            <span className="card-label">Show:</span>
            <span className="card-value">{show}</span>
          </div>
          <div className="card-field">
            <span className="card-label">Treat:</span>
            <span className="card-value">{treat}</span>
          </div>
          <div className="card-field">
            <span className="card-label">Allg:</span>
            <span className="card-value">{allergies || '—'}</span>
          </div>
        </div>
      </div>

      <div className="card-right-section">
        <div className="card-center">
          <svg className="star-svg" viewBox="0 0 474 463" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="473.486,182.079 310.615,157.952 235.904,11.23 162.628,158.675 0,184.389 117.584,299.641 91.786,462.257 237.732,386.042 384.416,460.829 357.032,298.473"
              fill="none"
              stroke="#222"
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="card-right">
          <div className="card-toFrom">
            <div className="card-field">
              <span className="card-label">To:</span>
              <span className="card-value card-name">{recipient}</span>
            </div>
            <div className="card-field">
              <span className="card-label">From:</span>
              <span className="card-value card-name">{sender}</span>
            </div>
          </div>
          {message && <AutoShrinkMessage text={message} />}
        </div>
      </div>
    </div>
  );
}
