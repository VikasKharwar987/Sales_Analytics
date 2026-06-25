import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Prediction from './pages/Prediction';
import AddSales from './pages/AddSales';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-customBg text-slate-700 flex flex-col">
        {/* Top Navbar */}
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex flex-1 pt-16">
          {/* Collapsible Sidebar */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

          {/* Main Content Area */}
          <main className="flex-1 lg:pl-64 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-4rem)] w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/predict" element={<Prediction />} />
              <Route path="/add-sales" element={<AddSales />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
