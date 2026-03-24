import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { parseStargrams } from './utils/parseStargrams';
import FileUpload from './components/FileUpload';
import PrintableOutput from './components/PrintableOutput';
import './App.css';

function App() {
  const [stargrams, setStargrams] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFile = useCallback((file) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(sheet);
      setStargrams(parseStargrams(rawData));
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleClear = () => {
    setStargrams(null);
    setFileName('');
  };

  return (
    <div className="app">
      <header className="no-print">
        <h1>⭐ Stargram</h1>
        <p>Upload an Excel file to generate printable stargrams</p>
      </header>

      <main>
        {!stargrams && (
          <section className="upload-section no-print">
            <FileUpload onFileLoaded={handleFile} />
          </section>
        )}

        {stargrams && (
          <>
            <div className="file-info no-print">
              <span>📄 {fileName}</span>
              <span>{stargrams.length} stargram{stargrams.length !== 1 ? 's' : ''}</span>
              <button onClick={handleClear}>✕ Clear</button>
            </div>
            <PrintableOutput stargrams={stargrams} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
