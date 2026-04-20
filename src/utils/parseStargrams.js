/**
 * Parse raw Excel rows into flat stargram records.
 * Each row may contain multiple stargrams (primary + "Stargram 2", "Stargram 3", etc.)
 */
const normalizeKey = (s) => s.replace(/\s+/g, ' ').trim();

function normalizeRow(row) {
  const out = {};
  for (const k of Object.keys(row)) out[normalizeKey(k)] = row[k];
  return out;
}

export function parseStargrams(rawRows) {
  const stargrams = [];

  const SKIP_SUFFIX = ' (SKIP if you only want to buy one Stargram for this student)';

  for (const raw of rawRows) {
    const row = normalizeRow(raw);
    const sender = row['Your full name'] || '';
    const recipient =
      row['Stargram recipient (MUST be a student in the cast, crew or orchestra of Footloose)'] || '';
    const allergies = row['Do they have any allergies?'] || '';

    // Primary stargram
    stargrams.push({
      sender,
      recipient,
      show: row['Pick a show'] || '',
      treat: row['Pick your Stargram treat'] || '',
      message: row['Stargram message'] || '',
      allergies,
    });

    // Look for additional stargrams (Stargram 2, 3, …)
    for (let n = 2; n <= 10; n++) {
      const suffix = n === 2 ? SKIP_SUFFIX : '';
      const message = row[`Stargram ${n} - Message${suffix}`];
      if (!message) continue;

      stargrams.push({
        sender,
        recipient,
        show: row[`Stargram ${n} - Show Date${suffix}`] || row['Pick a show'] || '',
        treat: row[`Stargram ${n} - Treat Option${suffix}`] || '',
        message,
        allergies,
      });
    }
  }

  return stargrams;
}
