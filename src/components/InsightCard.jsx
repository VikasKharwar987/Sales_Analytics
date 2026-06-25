import React from 'react';

export default function InsightCard({ kpis, salesTrend }) {
  // Generate dynamic business insights based on the loaded API KPIs
  const generateInsights = () => {
    const insights = [];
    if (!kpis) return insights;

    const { total_sales, average_sales, promotion_rate, average_customers, total_stores } = kpis;

    // Insight 1: Store & Customer Ticket Value
    if (average_sales && average_customers) {
      const spendPerCustomer = average_sales / average_customers;
      insights.push({
        title: 'Customer Ticket Value',
        text: `On average, stores serve ${Math.round(average_customers)} customers daily, with an estimated spend of $${spendPerCustomer.toFixed(2)} per customer. Focus on cross-selling to increase this average ticket size.`,
        type: 'info',
      });
    }

    // Insight 2: Promotional Strategy
    if (promotion_rate !== undefined) {
      if (promotion_rate > 40) {
        insights.push({
          title: 'High Promotion Penetration',
          text: `Promotions are active on ${promotion_rate.toFixed(1)}% of recorded days. While this boosts short-term sales volume, monitor gross margins to prevent margin erosion.`,
          type: 'warning',
        });
      } else {
        insights.push({
          title: 'Promotional Opportunities',
          text: `Current promotional coverage is at ${promotion_rate.toFixed(1)}%. Since promotion periods generally boost sales, there is room to run targeted campaigns for underperforming stores.`,
          type: 'success',
        });
      }
    }

    // Insight 3: Trend Analysis
    if (salesTrend && salesTrend.length >= 2) {
      const last = salesTrend[salesTrend.length - 1];
      const prev = salesTrend[salesTrend.length - 2];
      const diff = last.sales - prev.sales;
      const pct = (diff / prev.sales) * 100;

      if (diff > 0) {
        insights.push({
          title: 'Upward Sales Momentum',
          text: `Sales increased by ${pct.toFixed(1)}% in the latest month compared to the preceding month, showing solid short-term momentum.`,
          type: 'success',
        });
      } else {
        insights.push({
          title: 'Revenue Contraction Watch',
          text: `Sales declined by ${Math.abs(pct).toFixed(1)}% in the latest month. Investigate if local competition distance or holiday schedules contributed to this dip.`,
          type: 'danger',
        });
      }
    }

    // Default insight if data is sparse
    if (insights.length === 0 && total_stores) {
      insights.push({
        title: 'Network Overview',
        text: `Analyzing active performance metrics across a network of ${total_stores} stores. Upload more sales records to unlock deeper transactional analytics.`,
        type: 'info',
      });
    }

    return insights;
  };

  const insightsList = generateInsights();

  // Helper styles based on alert categories
  const getStyle = (type) => {
    switch (type) {
      case 'success':
        return { border: 'border-success', text: 'text-success', bg: 'bg-green-50' };
      case 'warning':
        return { border: 'border-warning', text: 'text-warning', bg: 'bg-amber-50' };
      case 'danger':
        return { border: 'border-danger', text: 'text-danger', bg: 'bg-red-50' };
      default:
        return { border: 'border-primary', text: 'text-primary', bg: 'bg-blue-50' };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        {/* Black square icon placeholder */}
        <div className="w-5 h-5 bg-black flex-shrink-0"></div>
        <h3 className="font-semibold text-slate-800 text-sm">Automated Business Insights</h3>
      </div>

      {insightsList.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-4">
          Awaiting database metrics to extract analytics.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insightsList.map((ins, idx) => {
            const style = getStyle(ins.type);
            return (
              <div
                key={idx}
                className={`border ${style.border} ${style.bg} p-4 rounded-md flex flex-col space-y-1.5`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${ins.type === 'success' ? 'bg-success' : ins.type === 'warning' ? 'bg-warning' : ins.type === 'danger' ? 'bg-danger' : 'bg-primary'}`}></div>
                  <span className="text-xs font-bold text-slate-800">{ins.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ins.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
