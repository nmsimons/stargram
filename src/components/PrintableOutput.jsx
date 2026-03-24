import StargramCard from './StargramCard';

export default function PrintableOutput({ stargrams }) {
  if (!stargrams || stargrams.length === 0) return null;

  const handlePrint = () => window.print();

  return (
    <div className="printable-section">
      <div className="print-controls no-print">
        <button onClick={handlePrint}>🖨️ Print Stargrams</button>
        <span className="print-count">{stargrams.length} stargram{stargrams.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="print-content cards-grid">
        {stargrams.map((sg, i) => (
          <StargramCard key={i} stargram={sg} />
        ))}
      </div>
    </div>
  );
}
