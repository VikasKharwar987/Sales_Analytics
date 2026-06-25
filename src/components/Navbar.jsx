import React from 'react';

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <nav className="bg-white border-b border-slate-200 h-16 fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle Sidebar"
        >
          {/* Black square placeholder for icon */}
          <div className="w-6 h-6 border-2 border-black flex flex-col justify-center items-center gap-1 p-0.5">
            <div className="w-full h-0.5 bg-black"></div>
            <div className="w-full h-0.5 bg-black"></div>
            <div className="w-full h-0.5 bg-black"></div>
          </div>
        </button>

        {/* Application Logo & Title */}
        <div className="flex items-center gap-2">
          {/* Icon Placeholder */}
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">
            SalesAnalysis
          </span>
          <span className="hidden sm:inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium">
            Retail Platform
          </span>
        </div>
      </div>
    </nav>
  );
}
