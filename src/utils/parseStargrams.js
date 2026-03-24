/**
 * Parse raw Excel rows into flat stargram records.
 * Each row may contain multiple stargrams (primary + "Stargram 2", "Stargram 3", etc.)
 */
export function parseStargrams(rows) {
  const stargrams = [];

  for (const row of rows) {
    const sender = row['Your name'] || '';
    const allergies = row['Do they have any allergies?'] || '';

    // Primary stargram
    stargrams.push({
      sender,
      recipient: row['Stargram Recipient'] || '',
      show: row['Pick a show'] || '',
      treat: row['Pick your Stargram treat'] || '',
      message: row['Stargram message'] || '',
      allergies,
    });

    // Look for additional stargrams (Stargram 2, 3, …)
    for (let n = 2; n <= 10; n++) {
      const message = row[`Stargram ${n} - Message`];
      if (!message) continue;

      stargrams.push({
        sender,
        recipient: row['Stargram Recipient'] || '',
        show: row[`Stargram ${n} - Show Date`] || row['Pick a show'] || '',
        treat: row[`Stargram ${n} - Treat Option`] || '',
        message,
        allergies,
      });
    }
  }

  return stargrams;
}
