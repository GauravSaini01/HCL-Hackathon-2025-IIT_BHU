import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Activity, Moon, Utensils, Dumbbell, Brain, 
  LogOut, Sun, Users, ShieldCheck, BarChart2, MessageSquare, Settings,
  TrendingUp
} from 'lucide-react';

// --- Shared Widgets ---

export const StatCard = ({ title, value, unit, icon, trend, type = 'default' }: any) => {
  if (type === 'primary') {
    return (
      <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-xl shadow-blue-200 relative overflow-hidden flex flex-col justify-between h-full min-h-[160px]">
        <div className="flex justify-between items-start z-10">
          <div className="flex flex-col">
            <span className="text-blue-100 text-sm mb-1">{title}</span>
            <span className="text-sm font-light">Normal 70 bpm</span>
          </div>
        </div>
        <div className="flex items-end gap-2 mt-4 z-10">
           <Activity className="animate-pulse" />
           <span className="text-4xl font-bold">{value} <span className="text-lg font-normal">Bpm</span></span>
        </div>
        <svg className="absolute bottom-0 left-0 w-full opacity-30" viewBox="0 0 100 40">
           <path d="M0 20 Q 10 20, 15 10 T 30 20 T 45 30 T 60 20 T 75 10 T 90 20 T 100 20" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      </div>
    );
  }
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-full min-h-[160px]">
      <div className="flex justify-between items-start mb-4">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        {trend && <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">{trend}</span>}
      </div>
      <div className="flex items-end gap-2">
        {icon && <div className="mb-1 text-gray-800">{icon}</div>}
        <div className="flex items-baseline gap-1">
          {type === 'default' && !icon ? ( 
             <div className="w-full">
                <svg className="w-full h-10 text-blue-500" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M0 20 Q 25 5, 50 20 T 100 20" />
                </svg>
             </div>
          ) : null}
          {value && <span className="text-2xl font-bold text-gray-800">{value}</span>}
          {unit && <span className="text-sm text-gray-500 font-medium">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export const ChallengeRing = ({ percentage, label, subLabel }: { percentage: number, label: string, subLabel: string }) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
    return (
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="28" cy="28" r={radius} stroke="#E5E7EB" strokeWidth="4" fill="transparent" />
            <circle 
              cx="28" cy="28" r={radius} 
              stroke="#2563EB" strokeWidth="4" 
              fill="transparent" 
              strokeDasharray={circumference} 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-gray-700">
            {percentage}%
          </span>
        </div>
        <div>
           <p className="font-bold text-gray-800 text-sm">{label}</p>
           <p className="text-gray-400 text-xs">{subLabel}</p>
        </div>
      </div>
    );
};

// --- Patient Sidebar ---

export const PatientSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/patient" },
    { icon: <Activity size={20} />, label: "Activity", path: "/patient/activity" },
    { icon: <Moon size={20} />, label: "Sleep", path: "/patient/sleep" },
    { icon: <Utensils size={20} />, label: "Nutrition", path: "/patient/nutrition" },
    { icon: <Dumbbell size={20} />, label: "Fitness", path: "/patient/fitness" },
    { icon: <Brain size={20} />, label: "Mental Health", path: "/patient/mental" },
  ];

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col p-6 z-20 hidden lg:flex">
      <div className="flex items-center gap-3 mb-10 text-blue-600">
        <div className="p-2 bg-blue-100 rounded-full">
          <Activity size={24} className="text-blue-600" />
        </div>
        <span className="text-2xl font-bold text-gray-800">Wellness</span>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="space-y-6 mt-auto">
        <div 
            onClick={() => navigate('/provider')}
            className="flex items-center gap-4 px-4 py-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        >
          <LogOut size={20} />
          <span>Log out</span>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Sun size={20} />
            <span className="text-sm">Light mode</span>
          </div>
          <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
            <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

// --- Provider Sidebar ---

export const ProviderSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <Activity size={20} />, label: 'Dashboard', path: '/provider' },
    { icon: <Users size={20} />, label: 'Patients', path: '/provider/patients' },
    { icon: <ShieldCheck size={20} />, label: 'Compliance', path: '/provider/compliance' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', path: '/provider/analytics' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '/provider/messages' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/provider/settings' },
  ];

  return (
    <aside className="w-64 bg-blue-700 h-screen fixed left-0 top-0 flex flex-col p-6 z-10 hidden lg:flex text-white">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-1 rounded bg-blue-600 border border-blue-400">
           <Activity size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold">Provider Portal</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path || (item.path !== '/provider' && location.pathname.startsWith(item.path));
          return (
            <div 
              key={index} 
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-blue-600/50 border border-blue-500 shadow-sm' 
                  : 'text-blue-200 hover:bg-blue-600 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div 
          onClick={() => navigate('/patient')} 
          className="flex items-center gap-4 px-4 py-2 text-blue-200 hover:text-white cursor-pointer transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Log out</span>
        </div>
      </div>
    </aside>
  );
};