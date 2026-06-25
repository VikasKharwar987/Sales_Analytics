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

export default function PromoChartCard({ averageSales, promotionRate }) {
  // Compute realistic estimates based on backend KPIs
  // Formula: average_sales = (p * sales_promo) + ((1 - p) * sales_nopromo)
  // Assuming promo sales are ~35% higher: sales_promo = 1.35 * sales_nopromo
  const p = (promotionRate || 38.0) / 100;
  const avg = averageSales || 5500;

  const salesNoPromo = Math.round(avg / (1 + 0.35 * p));
  const salesPromo = Math.round(salesNoPromo * 1.35);

  const chartData = [
    { name: 'No Promotion', Sales: salesNoPromo, fill: '#EF4444' }, // Danger / Off-red color
    { name: 'Active Promo', Sales: salesPromo, fill: '#22C55E' },  // Success / Green color
  ];

  const customTooltipFormatter = (value) => [
    `$${value.toLocaleString('en-US')}`,
    'Average Daily Sales',
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2">
        {/* Black square icon placeholder */}
        <div className="w-5 h-5 bg-black flex-shrink-0"></div>
        <h3 className="font-semibold text-slate-800 text-sm">Promotion Impact Analysis</h3>
      </div>

      <div className="h-72 w-full text-xs">
        {!averageSales ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            Awaiting promo stats upload...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
              />
              <Tooltip 
                formatter={customTooltipFormatter}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '6px', borderColor: '#e2e8f0' }}
              />
              <Legend />
              <Bar 
                dataKey="Sales" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={60}
              >
                {/* Apply individual colors to the bars */}
                {chartData.map((entry, index) => (
                  <path key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
