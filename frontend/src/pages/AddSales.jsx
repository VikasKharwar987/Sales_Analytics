import React, { useState } from 'react';
import SalesForm from '../components/SalesForm';
import { addSalesRecord } from '../services/api';

export default function AddSales() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddRecord = async (formData) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const data = await addSalesRecord(formData);
      setSuccessMessage(data.message || 'Sales record added successfully!');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.error || 
        'An error occurred while inserting the sales record. Please check database logs.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header section */}
      <div className="border border-slate-200 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Add Sales Record</h1>
        <p className="text-sm text-slate-600 mt-1.5">
          Insert a new retail transactional entry directly into the sales database. This updates the analytics KPIs and forecasting models immediately.
        </p>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="bg-green-50 border border-success text-success p-5 rounded-lg flex gap-3 shadow-sm">
          <div className="w-6 h-6 bg-success flex-shrink-0 rounded flex items-center justify-center text-white font-bold text-xs">
            ✓
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Record Inserted</h4>
            <p className="text-xs text-slate-600 mt-1">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-danger text-danger p-5 rounded-lg flex gap-3 shadow-sm">
          <div className="w-6 h-6 bg-danger flex-shrink-0 rounded flex items-center justify-center text-white font-bold text-xs">
            ✗
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Failed to Add Record</h4>
            <p className="text-xs text-slate-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Sales Record Form */}
      <SalesForm onAddRecord={handleAddRecord} isLoading={isLoading} />
    </div>
  );
}
