export default function DataPreview({ data }) {
  if (!data || data.length === 0) {
    return <p className="empty-state">No data loaded yet.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="data-preview">
      <h2>Data Preview</h2>
      <div className="table-wrapper">
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
