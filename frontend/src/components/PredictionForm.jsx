import React, { useState } from 'react';

export default function PredictionForm({ onPredict, isLoading }) {
  // Sensible default values for a student project form
  const [formData, setFormData] = useState({
    Store: 1,
    DayOfWeek: 1,
    Open: 1,
    Promo: 0,
    StateHoliday: '0',
    SchoolHoliday: 0,
    StoreType: 'a',
    Assortment: 'a',
    CompetitionDistance: 1270,
    CompetitionOpenSinceMonth: 9,
    CompetitionOpenSinceYear: 2008,
    Promo2: 0,
    Promo2SinceWeek: 0,
    Promo2SinceYear: 0,
    PromoInterval: '',
    Customers: 500,
    Date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Cast numeric fields appropriately for the FastAPI backend model
    let parsedValue = value;
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    } else if (name === 'Store' || name === 'DayOfWeek' || name === 'Open' || name === 'Promo' || name === 'SchoolHoliday' || name === 'Promo2' || name === 'CompetitionOpenSinceMonth' || name === 'CompetitionOpenSinceYear' || name === 'Promo2SinceWeek' || name === 'Promo2SinceYear') {
      parsedValue = Number(value);
    } else if (name === 'CompetitionDistance') {
      parsedValue = parseFloat(value) || 0.0;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* SECTION 1: Core Parameters */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
          Core Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Expected Customers</label>
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
        </div>
      </div>

      {/* SECTION 2: Operations & Schedules */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
          Operations & Schedules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* SECTION 3: Store Specifications */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
          Store attributes & Competition
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Store Type</label>
            <select
              name="StoreType"
              value={formData.StoreType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="a">Type A (General)</option>
              <option value="b">Type B (Large/Multi)</option>
              <option value="c">Type C (Specialty)</option>
              <option value="d">Type D (Compact)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Assortment Level</label>
            <select
              name="Assortment"
              value={formData.Assortment}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="a">Basic Assortment</option>
              <option value="b">Extra Assortment</option>
              <option value="c">Extended Assortment</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Competition Distance (m)</label>
            <input
              type="number"
              step="any"
              name="CompetitionDistance"
              value={formData.CompetitionDistance}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">Comp Open Month</label>
              <input
                type="number"
                name="CompetitionOpenSinceMonth"
                value={formData.CompetitionOpenSinceMonth}
                onChange={handleChange}
                min="0"
                max="12"
                required
                className="w-full px-2 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">Comp Open Year</label>
              <input
                type="number"
                name="CompetitionOpenSinceYear"
                value={formData.CompetitionOpenSinceYear}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-2 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Secondary Promotion (Promo2) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
          Secondary Promotion (Promo2)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Promo2 Participation</label>
            <select
              name="Promo2"
              value={formData.Promo2}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="0">Not Participating</option>
              <option value="1">Participating</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Promo2 Start Week</label>
            <input
              type="number"
              name="Promo2SinceWeek"
              value={formData.Promo2SinceWeek}
              onChange={handleChange}
              min="0"
              max="53"
              disabled={formData.Promo2 === 0}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Promo2 Start Year</label>
            <input
              type="number"
              name="Promo2SinceYear"
              value={formData.Promo2SinceYear}
              onChange={handleChange}
              min="0"
              disabled={formData.Promo2 === 0}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Promo2 Interval</label>
            <select
              name="PromoInterval"
              value={formData.PromoInterval}
              onChange={handleChange}
              disabled={formData.Promo2 === 0}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            >
              <option value="">None</option>
              <option value="Jan,Apr,Jul,Oct">Jan, Apr, Jul, Oct</option>
              <option value="Feb,May,Aug,Nov">Feb, May, Aug, Nov</option>
              <option value="Mar,Jun,Sept,Dec">Mar, Jun, Sept, Dec</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-8 rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Forecasting...
            </>
          ) : (
            'Forecast Sales'
          )}
        </button>
      </div>
    </form>
  );
}
