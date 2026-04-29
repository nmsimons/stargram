import { useMemo } from 'react';
import StargramCard from './StargramCard';

const MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function showSortKey(show) {
  if (!show) return Number.POSITIVE_INFINITY;
  const m = show.match(/([A-Za-z]{3,})\s+(\d{1,2}).*?(\d{1,2})\s*(am|pm)/i);
  if (!m) return Number.POSITIVE_INFINITY;
  const month = MONTHS[m[1].slice(0, 3).toLowerCase()];
  if (month === undefined) return Number.POSITIVE_INFINITY;
  const day = Number(m[2]);
  let hour = Number(m[3]) % 12;
  if (m[4].toLowerCase() === 'pm') hour += 12;
  return new Date(2000, month, day, hour).getTime();
}

export default function PrintableOutput({ stargrams }) {
  const sorted = useMemo(
    () => (stargrams ? [...stargrams].sort((a, b) => showSortKey(a.show) - showSortKey(b.show)) : []),
    [stargrams]
  );

  if (sorted.length === 0) return null;

  const handlePrint = () => window.print();

  return (
    <div className="printable-section">
      <div className="print-controls no-print">
        <button onClick={handlePrint}>🖨️ Print Stargrams</button>
      </div>

      <div className="print-content cards-grid">
        {sorted.map((sg, i) => (
          <StargramCard key={i} stargram={sg} />
        ))}
      </div>
    </div>
  );
}
