import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [currencies, setCurrencies] = useState({});
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('https://api.vatcomply.com/rates')
      .then(res => res.json())
      .then(data => setCurrencies(data.rates));
  }, []);

  const convert = () => {
    fetch(`https://api.vatcomply.com/rates?base=${from}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[to];
        setResult({
          base: data.base,
          date: data.date,
          converted: (rate * amount).toFixed(2)
        });
      });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 text-center">
          Konversi Mata Uang
        </h2>

        <p className="text-center text-sm text-blue-500">
          Powered by{' '}
          <a
            href="https://api.vatcomply.com/"
            className="underline hover:text-blue-600"
            target="_blank"
            rel="noreferrer"
          >
            VAT Comply API
          </a>
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-blue-600 font-medium mb-1">Dari</label>
            <select
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="w-full border border-blue-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            >
              {Object.keys(currencies).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-blue-600 font-medium mb-1">Jumlah</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full border border-blue-300 rounded-md p-2 focus:ring focus:ring-blue-200"
              placeholder="Masukkan jumlah"
            />
          </div>

          <div>
            <label className="block text-blue-600 font-medium mb-1">Ke</label>
            <select
              value={to}
              onChange={e => setTo(e.target.value)}
              className="w-full border border-blue-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            >
              {Object.keys(currencies).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          <button
            onClick={convert}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Konversi Sekarang
          </button>
        </div>

        {result && (
          <div className="bg-blue-100 text-blue-800 p-4 rounded-md mt-4 space-y-1 text-sm">
            <p><strong>Base:</strong> {result.base}</p>
            <p><strong>Tanggal:</strong> {result.date}</p>
            <p><strong>Hasil:</strong> {result.converted} {to}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
