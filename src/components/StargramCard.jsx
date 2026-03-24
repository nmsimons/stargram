import './StargramCard.css';

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
          {allergies && allergies.toLowerCase() !== 'no' && allergies.toLowerCase() !== 'none' && (
            <div className="card-field card-allergy">
              <span className="card-label">Allergies:</span>
              <span className="card-value">{allergies}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card-center">
        <svg className="star-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="100,8 123,72 192,72 136,112 156,178 100,143 44,178 64,112 8,72 77,72"
            fill="none"
            stroke="#222"
            strokeWidth="1.5"
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
        {message && (
          <div className="card-message">
            <p>"{message}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
