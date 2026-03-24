import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import FileUpload from './components/FileUpload';
import DataPreview from './components/DataPreview';
import PrintableOutput from './components/PrintableOutput';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFile = useCallback((file) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleClear = () => {
    setData(null);
    setFileName('');
  };

  return (
    <div className="app">
      <header className="no-print">
        <h1>⭐ Stargram</h1>
        <p>Upload an Excel file to generate printable output</p>
      </header>

      <main>
        {!data && (
          <section className="upload-section no-print">
            <FileUpload onFileLoaded={handleFile} />
          </section>
        )}

        {data && (
          <>
            <div className="file-info no-print">
              <span>📄 {fileName}</span>
              <span>{data.length} row{data.length !== 1 ? 's' : ''}</span>
              <button onClick={handleClear}>✕ Clear</button>
            </div>
            <DataPreview data={data} />
            <PrintableOutput data={data} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
