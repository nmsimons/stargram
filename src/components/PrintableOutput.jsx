import StargramCard from './StargramCard';

export default function PrintableOutput({ stargrams }) {
  if (!stargrams || stargrams.length === 0) return null;

  const handlePrint = () => window.print();

  return (
    <div className="printable-section">
      <div className="print-controls no-print">
        <button onClick={handlePrint}>🖨️ Print Stargrams</button>
      </div>

      <div className="print-content cards-grid">
        {stargrams.map((sg, i) => (
          <StargramCard key={i} stargram={sg} />
        ))}
      </div>
    </div>
  );
}
