import React from 'react';

export default function KPICard({ title, value, type, description }) {
  // Format numeric values based on KPI category
  const formatValue = (val) => {
    if (val === undefined || val === null) return 'N/A';
    
    switch (type) {
      case 'currency':
        return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'percentage':
        return `${val.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
      case 'integer':
        return val.toLocaleString('en-US');
      default:
        return val.toString();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {/* Black square icon placeholder */}
        <div className="w-6 h-6 border-2 border-black flex-shrink-0 bg-slate-50"></div>
      </div>
      
      <div className="flex flex-col min-w-0">
        <span className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight break-all">
          {formatValue(value)}
        </span>
        {description && (
          <span className="text-[11px] text-slate-400 mt-1">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
