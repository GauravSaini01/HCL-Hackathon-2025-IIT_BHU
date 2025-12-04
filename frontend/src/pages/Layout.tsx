import React from 'react';
import { 
  LayoutDashboard, Activity, Moon, Utensils, Dumbbell, Brain, 
  LogOut, Settings, Bell 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Import hooks

interface LayoutProps {
  children: React.ReactNode;
  activePage: string; 
  title: string;
  subtitle: string;
}

export default function Layout({ children, activePage, title, subtitle }: LayoutProps) {
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/patient' },
    { icon: <Activity size={20} />, label: 'Activity', path: '/patient/activity' },
    { icon: <Moon size={20} />, label: 'Sleep', path: '/patient/sleep' },
    { icon: <Utensils size={20} />, label: 'Nutrition', path: '/patient/nutrition' },
    { icon: <Dumbbell size={20} />, label: 'Fitness', path: '/patient/fitness' },
    { icon: <Brain size={20} />, label: 'Mental Health', path: '/patient/mental' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col p-6 z-10 hidden lg:flex">
        <div className="flex items-center gap-3 mb-10 text-blue-600">
          <div className="p-2 bg-blue-100 rounded-full">
            <Activity size={24} className="text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-gray-800">Wellness</span>
        </div>

        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => {
            // Check if this item matches the current URL
            const isActive = location.pathname === item.path; 
            
            return (
              <div 
                key={item.path} 
                onClick={() => navigate(item.path)} // 4. Add Click Handler
                className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="space-y-4 mt-auto">
          <div 
            onClick={() => navigate('/')} // Added navigation to logout
            className="flex items-center gap-4 px-4 py-2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <LogOut size={20} />
            <span>Log out</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm border border-transparent hover:border-gray-100 transition-all">
              <Settings size={20} />
            </button>
            <button className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm relative border border-transparent hover:border-gray-100 transition-all">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border-2 border-white shadow-sm cursor-pointer">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Profile" />
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}