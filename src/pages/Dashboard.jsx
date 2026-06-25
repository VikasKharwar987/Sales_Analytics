import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import KPICard from '../components/KPICard';
import LineChartCard from '../components/LineChartCard';
import BarChartCard from '../components/BarChartCard';
import PromoChartCard from '../components/PromoChartCard';
import WeekdayChartCard from '../components/WeekdayChartCard';
import InsightCard from '../components/InsightCard';
import { getDashboardData } from '../services/api';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch dashboard stats on mount
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (err) {
      console.error('Error fetching dashboard statistics:', err);
      // Detailed error description, handling potential backend empty-db crash (TypeError NoneType)
      setError(
        err.response?.status === 500 
          ? 'The database appears to be unpopulated or empty. Please proceed to the Upload Dataset page to initialize records.' 
          : 'Unable to connect to the analytics server. Make sure the backend server is active and running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        {/* Loading Spinner */}
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-slate-500 font-semibold text-sm">Querying database metrics...</div>
      </div>
    );
  }

  // Handle empty or error states (e.g. database not populated)
  if (error || !dashboardData || !dashboardData.kpis || dashboardData.kpis.total_records === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-8 border border-slate-200 bg-white p-8 rounded-lg shadow-sm text-center space-y-6">
        {/* Large icon placeholder */}
        <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto border-2 border-black flex items-center justify-center text-xl font-bold">
          !
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-800">Database Setup Required</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            {error || 'No sales transactions or store records were found in the database. You must upload store and sales datasets to view analytics.'}
          </p>
        </div>
        <div>
          <Link
            to="/upload"
            className="inline-block bg-primary hover:bg-blue-700 text-white font-semibold text-sm py-2.5 px-6 rounded-md shadow-sm transition-colors"
          >
            Upload Datasets Now
          </Link>
        </div>
      </div>
    );
  }

  const { kpis, sales_trend } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Welcome / Header */}
      <div className="border border-slate-200 bg-white p-6 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Executive Analytics Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1.5">
            Monitor real-time retail KPIs, explore monthly revenue trends, and evaluate store promotion efficiency.
          </p>
        </div>
        <button
          onClick={fetchDashboardStats}
          className="text-xs text-primary border border-primary hover:bg-blue-50 font-semibold py-2 px-4 rounded transition-colors self-start sm:self-auto"
        >
          Refresh Data
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Sales"
          value={kpis.total_sales}
          type="currency"
          description="Cumulative net revenue"
        />
        <KPICard
          title="Average Sales"
          value={kpis.average_sales}
          type="currency"
          description="Average daily revenue"
        />
        <KPICard
          title="Total Stores"
          value={kpis.total_stores}
          type="integer"
          description="Active store profiles"
        />
        <KPICard
          title="Total Records"
          value={kpis.total_records}
          type="integer"
          description="Total database records"
        />
        <KPICard
          title="Avg Customers"
          value={kpis.average_customers}
          type="integer"
          description="Daily shopper traffic"
        />
        <KPICard
          title="Promotion Rate"
          value={kpis.promotion_rate}
          type="percentage"
          description="Promo days proportion"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartCard data={sales_trend} />
        <BarChartCard averageSales={kpis.average_sales} />
        <PromoChartCard averageSales={kpis.average_sales} promotionRate={kpis.promotion_rate} />
        <WeekdayChartCard averageSales={kpis.average_sales} />
      </div>

      {/* Automated Business Insights */}
      <InsightCard kpis={kpis} salesTrend={sales_trend} />
    </div>
  );
}
