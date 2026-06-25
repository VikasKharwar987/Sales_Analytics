import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function WeekdayChartCard({ averageSales }) {
  // Typical retail day-of-week sales weights (German retail pattern: closed/low on Sundays)
  const weekdays = [
    { name: 'Mon', weight: 1.05 },
    { name: 'Tue', weight: 0.98 },
    { name: 'Wed', weight: 0.95 },
    { name: 'Thu', weight: 1.02 },
    { name: 'Fri', weight: 1.18 },
    { name: 'Sat', weight: 1.25 },
    { name: 'Sun', weight: 0.12 }, // Rossmann stores mostly closed on Sunday
  ];

  const avg = averageSales || 5500;
  
  // Map weights to actual dollar sales values
  const chartData = weekdays.map((day) => ({
    Day: day.name,
    Sales: Math.round(avg * day.weight),
  }));

  const customTooltipFormatter = (value) => [
    `$${value.toLocaleString('en-US')}`,
    'Estimated Average Sales',
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2">
        {/* Black square icon placeholder */}
        <div className="w-5 h-5 bg-black flex-shrink-0"></div>
        <h3 className="font-semibold text-slate-800 text-sm">Weekday Sales Analysis</h3>
      </div>

      <div className="h-72 w-full text-xs">
        {!averageSales ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            Awaiting sales records upload...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="Day" 
                stroke="#64748b" 
                tickLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                tickLine={false}
                tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
              />
              <Tooltip 
                formatter={customTooltipFormatter}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '6px', borderColor: '#e2e8f0' }}
              />
              <Legend />
              <Bar 
                dataKey="Sales" 
                fill="#2563EB" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
