import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, setIsOpen }) {
  // Navigation links
  const links = [
    { to: '/', label: 'Dashboard', iconLabel: 'D' },
    { to: '/upload', label: 'Upload Dataset', iconLabel: 'U' },
    { to: '/predict', label: 'Predict Sales', iconLabel: 'P' },
    { to: '/add-sales', label: 'Add Sales Record', iconLabel: 'A' },
  ];

  const baseLinkClass = "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors";
  const activeLinkClass = "bg-blue-50 text-primary border-l-4 border-primary";
  const inactiveLinkClass = "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent";

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-none z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-20 w-64 bg-white border-r border-slate-200 pt-5 px-4 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-1.5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)} // Close sidebar on mobile navigation
              className={({ isActive }) =>
                `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              {/* Icon Placeholder (empty black square container) */}
              <div className="w-5 h-5 border border-black flex items-center justify-center text-[10px] font-bold text-black flex-shrink-0">
                {link.iconLabel}
              </div>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
