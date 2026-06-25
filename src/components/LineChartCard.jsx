import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function LineChartCard({ data }) {
  // Format dates and values for the line chart
  const chartData = (data || []).map((item) => {
    const monthStr = MONTH_NAMES[item.month - 1] || `M${item.month}`;
    const shortYear = item.year.toString().slice(-2);
    return {
      name: `${monthStr} '${shortYear}`,
      Sales: item.sales,
    };
  });

  // Custom tooltips for clean currency formatting
  const customTooltipFormatter = (value) => [
    `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    'Total Sales',
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2">
        {/* Black square icon placeholder */}
        <div className="w-5 h-5 bg-black flex-shrink-0"></div>
        <h3 className="font-semibold text-slate-800 text-sm">Monthly Sales Trend</h3>
      </div>

      <div className="h-72 w-full text-xs">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            No historical trend data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                tickLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                tickLine={false}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={customTooltipFormatter}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '6px', borderColor: '#e2e8f0' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Sales"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
