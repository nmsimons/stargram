import StarShape from './StarShape';
import './StargramCard.css';

export default function StargramCard({ stargram }) {
  const { sender, recipient, show, treat, message, allergies } = stargram;

  return (
    <div className="stargram-card">
      <div className="card-left">
        <div className="card-field">
          <span className="card-label">Show</span>
          <span className="card-value">{show}</span>
        </div>
        <div className="card-field">
          <span className="card-label">Treat</span>
          <span className="card-value">{treat}</span>
        </div>
        {allergies && allergies.toLowerCase() !== 'no' && allergies.toLowerCase() !== 'none' && (
          <div className="card-field card-allergies">
            <span className="card-label">⚠ Allergies</span>
            <span className="card-value">{allergies}</span>
          </div>
        )}
      </div>

      <div className="card-right">
        <StarShape to={recipient} from={sender} />
      </div>

      <div className="card-message">
        <p>"{message}"</p>
      </div>
    </div>
  );
}
