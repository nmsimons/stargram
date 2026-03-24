import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { parseStargrams } from './utils/parseStargrams';
import FileUpload from './components/FileUpload';
import PrintableOutput from './components/PrintableOutput';
import './App.css';

const isDev = import.meta.env.DEV;

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

  const loadTestData = useCallback(async () => {
    const { testStargrams } = await import('./utils/testData');
    setStargrams(testStargrams);
    setFileName('test data');
  }, []);

  const handleClear = () => {
    setStargrams(null);
    setFileName('');
  };

  return (
    <div className="app">
      <header className="no-print">
        <div className="header-logo">
          <svg className="header-star" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="100,8 123,72 192,72 136,112 156,178 100,143 44,178 64,112 8,72 77,72"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <h1>STARGRAM</h1>
        </div>
      </header>

      <main>
        {!stargrams && (
          <section className="upload-section no-print">
            <FileUpload onFileLoaded={handleFile} />
            {isDev && (
              <button className="test-data-btn" onClick={loadTestData}>
                Load test data
              </button>
            )}
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
