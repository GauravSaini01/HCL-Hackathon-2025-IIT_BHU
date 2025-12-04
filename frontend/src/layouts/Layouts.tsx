import React from 'react';
import { PatientSidebar, ProviderSidebar } from '../components/Shared';
import { Bell, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const PatientLayout = ({ children, title, subtitle }: LayoutProps) => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex text-gray-800">
      <PatientSidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm"><Settings size={20} /></button>
            <button className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border-2 border-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Profile" />
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export const ProviderLayout = ({ children, title, subtitle }: LayoutProps) => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex text-gray-800">
      <ProviderSidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
             <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
             {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white rounded-full text-gray-400 hover:text-blue-600 shadow-sm border border-gray-100">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border border-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Dr Profile" />
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};