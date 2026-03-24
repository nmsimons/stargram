export default function PrintableOutput({ data }) {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  const handlePrint = () => window.print();

  return (
    <div className="printable-section">
      <div className="print-controls no-print">
        <button onClick={handlePrint}>🖨️ Print</button>
      </div>

      <div className="print-content">
        <h2>Stargram Output</h2>
        <table>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {headers.map((h) => (
                  <td key={h}>{row[h]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
