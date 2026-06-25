import React, { useState, useEffect } from 'react';
import PredictionForm from '../components/PredictionForm';
import { predictSales } from '../services/api';

export default function Prediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // Load prediction history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('insightflow_prediction_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error parsing prediction history:', e);
      }
    }
  }, []);

  const handlePredict = async (formData) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await predictSales(formData);
      
      const predictionVal = data.predicted_sales;
      const newResult = {
        store: formData.Store,
        date: formData.Date,
        predictedSales: predictionVal,
        customers: formData.Customers,
        promo: formData.Promo === 1,
      };

      setResult(newResult);

      // Append to local history logs
      const updatedHistory = [
        {
          id: Date.now(),
          store: formData.Store,
          date: formData.Date,
          predictedSales: predictionVal,
          timestamp: new Date().toLocaleTimeString(),
        },
        ...history,
      ].slice(0, 10); // Limit to last 10 entries for UI cleanliness

      setHistory(updatedHistory);
      localStorage.setItem('insightflow_prediction_history', JSON.stringify(updatedHistory));
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.error || 
        'Failed to compute sales prediction. Please check form values.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('insightflow_prediction_history');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header section */}
      <div className="border border-slate-200 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Sales Forecasting (ML Predictor)</h1>
        <p className="text-sm text-slate-600 mt-1.5">
          Run machine learning predictions using the trained XGBoost/Random Forest model. Enter store parameters to forecast prospective retail revenues.
        </p>
      </div>

      {/* Main Grid: Form on Left/Full, Results Card */}
      <div className="grid grid-cols-1 gap-6">
        {/* Results Card */}
        {result && (
          <div className="border border-blue-200 bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Forecast Output
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Store {result.store} - Projected Sales
              </h2>
              <p className="text-xs text-slate-500">
                Target Date: <strong className="text-slate-700">{result.date}</strong> | Expected Customers: <strong className="text-slate-700">{result.customers}</strong> | Promo: <strong className="text-slate-700">{result.promo ? 'Active' : 'Inactive'}</strong>
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 py-3 px-6 rounded-lg text-center md:text-right">
              <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Projected Daily Revenue</div>
              <div className="text-3xl font-extrabold text-primary">
                ${result.predictedSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-danger text-danger p-4 rounded-lg flex gap-3 shadow-sm">
            <div className="w-5 h-5 bg-danger flex-shrink-0 rounded flex items-center justify-center text-white font-bold text-xs">✗</div>
            <div className="text-xs font-medium">{error}</div>
          </div>
        )}

        {/* Prediction Form */}
        <PredictionForm onPredict={handlePredict} isLoading={isLoading} />

        {/* Local Prediction History logs */}
        <div className="border border-slate-200 bg-white rounded-lg shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Black square placeholder */}
              <div className="w-5 h-5 bg-black flex-shrink-0"></div>
              <h3 className="font-semibold text-slate-800 text-sm">Prediction History Logs</h3>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Clear History
              </button>
            )}
          </div>
          
          <div className="p-5">
            {history.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">
                No recent predictions found in this session. Perform a forecast to log values.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                      <th className="py-2.5 px-3">Forecast Date</th>
                      <th className="py-2.5 px-3">Store</th>
                      <th className="py-2.5 px-3">Projected Sales</th>
                      <th className="py-2.5 px-3 text-right">Run Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 text-slate-700">
                        <td className="py-2.5 px-3 font-medium">{item.date}</td>
                        <td className="py-2.5 px-3">Store #{item.store}</td>
                        <td className="py-2.5 px-3 font-semibold text-primary">
                          ${item.predictedSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-400">{item.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
