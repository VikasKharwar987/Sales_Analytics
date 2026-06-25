import React, { useState } from 'react';

export default function UploadForm({ onUpload, isLoading }) {
  const [storeFile, setStoreFile] = useState(null);
  const [salesFile, setSalesFile] = useState(null);
  const [error, setError] = useState('');

  // Handle changes for the store file input
  const handleStoreChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.endsWith('.csv')) {
      setError('Please select a valid CSV file for Store details.');
      setStoreFile(null);
      return;
    }
    setError('');
    setStoreFile(file);
  };

  // Handle changes for the sales file input
  const handleSalesChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.endsWith('.csv')) {
      setError('Please select a valid CSV file for Sales records.');
      setSalesFile(null);
      return;
    }
    setError('');
    setSalesFile(file);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeFile || !salesFile) {
      setError('Both store.csv and train.csv files are required.');
      return;
    }
    setError('');
    onUpload(storeFile, salesFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-danger text-danger text-sm px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Store CSV Upload Section */}
        <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            {/* Black square placeholder */}
            <div className="w-5 h-5 bg-black flex-shrink-0"></div>
            <h3 className="font-semibold text-slate-800 text-base">Store Data (store.csv)</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Contains store attributes like StoreType, Assortment, and Competition details.
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleStoreChange}
            disabled={isLoading}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-slate-300 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 disabled:opacity-50 cursor-pointer"
          />
          {storeFile && (
            <div className="mt-3 text-xs text-success flex items-center gap-1.5">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Selected: {storeFile.name} ({(storeFile.size / 1024).toFixed(1)} KB)
            </div>
          )}
        </div>

        {/* Sales CSV Upload Section */}
        <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            {/* Black square placeholder */}
            <div className="w-5 h-5 bg-black flex-shrink-0"></div>
            <h3 className="font-semibold text-slate-800 text-base">Sales Data (train.csv / sales.csv)</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Contains historical transaction records including Sales figures, Customers, and Promo statuses.
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleSalesChange}
            disabled={isLoading}
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-slate-300 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 disabled:opacity-50 cursor-pointer"
          />
          {salesFile && (
            <div className="mt-3 text-xs text-success flex items-center gap-1.5">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Selected: {salesFile.name} ({(salesFile.size / (1024 * 1024)).toFixed(2)} MB)
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={isLoading || !storeFile || !salesFile}
          className="bg-primary hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-6 rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              {/* Spinner placeholder */}
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Uploading datasets...
            </>
          ) : (
            'Upload Datasets'
          )}
        </button>
      </div>
    </form>
  );
}
