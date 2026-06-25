import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import { uploadDataset } from '../services/api';

export default function Upload() {
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  // Handle uploading files using the API client
  const handleUpload = async (storeFile, salesFile) => {
    setIsLoading(true);
    setError('');
    setSuccessData(null);

    try {
      const data = await uploadDataset(storeFile, salesFile);
      
      // The backend returns { error: '...' } in some cases instead of throwing an error
      if (data.error) {
        setError(data.error);
      } else {
        setSuccessData({
          message: data.message || 'Dataset uploaded successfully!',
          stores: data.stores,
          salesRecords: data.sales_records,
        });
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.error || 
        'An error occurred during dataset upload. Please ensure files match requirements.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border border-slate-200 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Upload Dataset</h1>
        <p className="text-sm text-slate-600 mt-1.5">
          Populate the analytics database by importing store metadata and transaction datasets.
          Uploading new datasets will overwrite existing data.
        </p>
      </div>

      {successData && (
        <div className="bg-green-50 border border-success text-success p-5 rounded-lg flex gap-3 shadow-sm">
          {/* Success Box Indicator */}
          <div className="w-6 h-6 bg-success flex-shrink-0 rounded flex items-center justify-center text-white font-bold text-xs">
            ✓
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Upload Successful</h4>
            <p className="text-xs text-slate-600 mt-1">{successData.message}</p>
            <ul className="text-xs text-slate-500 list-disc pl-5 mt-2 space-y-1">
              <li>Stores imported: <span className="font-semibold text-slate-700">{successData.stores}</span></li>
              <li>Sales records imported: <span className="font-semibold text-slate-700">{successData.salesRecords?.toLocaleString()}</span></li>
            </ul>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-danger text-danger p-5 rounded-lg flex gap-3 shadow-sm">
          {/* Error Box Indicator */}
          <div className="w-6 h-6 bg-danger flex-shrink-0 rounded flex items-center justify-center text-white font-bold text-xs">
            ✗
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Upload Failed</h4>
            <p className="text-xs text-slate-700 mt-1">{error}</p>
            <p className="text-xs text-slate-500 mt-2">
              Verify your CSV headers match the model expectations (e.g. "Store" in store.csv, "Sales" in train.csv).
            </p>
          </div>
        </div>
      )}

      <UploadForm onUpload={handleUpload} isLoading={isLoading} />
    </div>
  );
}
