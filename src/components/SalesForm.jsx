import React, { useState } from 'react';

export default function SalesForm({ onAddRecord, isLoading }) {
  // Sensible default values for adding a sales record
  const [formData, setFormData] = useState({
    Store: 1,
    DayOfWeek: 1,
    Date: new Date().toISOString().split('T')[0],
    Sales: 5200,
    Customers: 580,
    Open: 1,
    Promo: 0,
    StateHoliday: '0',
    SchoolHoliday: 0,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Cast numeric fields appropriately for the FastAPI backend model
    let parsedValue = value;
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    } else if (name === 'Store' || name === 'DayOfWeek' || name === 'Open' || name === 'Promo' || name === 'SchoolHoliday' || name === 'Sales' || name === 'Customers') {
      parsedValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.Sales < 0 || formData.Customers < 0) {
      setError('Sales and Customers cannot be negative.');
      return;
    }
    setError('');
    onAddRecord(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-danger text-danger text-xs px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Grid container for input sections */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Store Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Store Number</label>
            <input
              type="number"
              name="Store"
              value={formData.Store}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
            <input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Day of Week */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Day of Week</label>
            <select
              name="DayOfWeek"
              value={formData.DayOfWeek}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
              <option value="7">Sunday</option>
            </select>
          </div>

          {/* Sales Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Total Sales ($)</label>
            <input
              type="number"
              name="Sales"
              value={formData.Sales}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Customers Count */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Customers Count</label>
            <input
              type="number"
              name="Customers"
              value={formData.Customers}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Store Status (Open / Closed) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Store Status</label>
            <select
              name="Open"
              value={formData.Open}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="1">Open</option>
              <option value="0">Closed</option>
            </select>
          </div>

          {/* Active Promo */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Active Promotion (Promo)</label>
            <select
              name="Promo"
              value={formData.Promo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="0">No Promotion</option>
              <option value="1">Promo Active</option>
            </select>
          </div>

          {/* State Holiday */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">State Holiday</label>
            <select
              name="StateHoliday"
              value={formData.StateHoliday}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="0">None</option>
              <option value="a">Public Holiday</option>
              <option value="b">Easter Holiday</option>
              <option value="c">Christmas</option>
            </select>
          </div>

          {/* School Holiday */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">School Holiday</label>
            <select
              name="SchoolHoliday"
              value={formData.SchoolHoliday}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="0">No</option>
              <option value="1">Yes (School Holiday)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Form Submission Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-8 rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding Record...
            </>
          ) : (
            'Add Sales Record'
          )}
        </button>
      </div>
    </form>
  );
}
