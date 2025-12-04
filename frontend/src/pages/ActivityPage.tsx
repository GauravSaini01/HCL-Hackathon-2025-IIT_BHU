import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Moon, 
  Utensils, 
  Dumbbell, 
  Brain, 
  LogOut, 
  Sun, 
  Settings, 
  Bell, 
  MapPin, 
  Timer, 
  Flame, 
  TrendingUp,
  Calendar,
  ChevronRight,
  Play
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';


// --- Page Specific Components ---

const MetricCard = ({ title, value, unit, icon, trend, colorClass }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp size={14} className="text-green-500" />
          <span className="text-xs font-bold text-green-500">{trend}</span>
          <span className="text-xs text-gray-400 ml-1">vs last week</span>
        </div>
      )}
    </div>
    <div className={`p-4 rounded-2xl ${colorClass}`}>
      {icon}
    </div>
  </div>
);

const ActivityChart = () => {
  // Simple CSS bar chart representation
  const data = [45, 70, 30, 85, 55, 65, 40];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">Weekly Intensity</h3>
          <p className="text-gray-400 text-sm">Heart Points gathered</p>
        </div>
        <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">Weekly</button>
            <button className="px-3 py-1 bg-gray-50 text-gray-400 text-xs rounded-full">Monthly</button>
        </div>
      </div>
      
      <div className="flex items-end justify-between gap-4 h-48 px-2">
        {data.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-3 w-full group cursor-pointer">
             <div className="relative w-full flex justify-center">
                 {/* Tooltip on hover */}
                 <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded mb-2">
                    {h} pts
                 </div>
                <div className="w-10 bg-gray-100 rounded-t-xl h-40 relative overflow-hidden">
                    <div 
                        className="absolute bottom-0 w-full bg-blue-600 transition-all duration-500 rounded-t-xl group-hover:bg-blue-500" 
                        style={{ height: `${h}%` }}
                    ></div>
                </div>
             </div>
            <span className="text-xs text-gray-400 font-medium">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentActivityItem = ({ type, time, calories, date, icon, color }: any) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-gray-100">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-sm">{type}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <Calendar size={12} />
            <span>{date}</span>
            <span>•</span>
            <Timer size={12} />
            <span>{time}</span>
        </div>
      </div>
    </div>
    <div className="text-right">
       <span className="block font-bold text-gray-800 text-sm">{calories} Kcal</span>
       <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Details</span>
    </div>
  </div>
);

const RunningMapCard = () => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Last Route</h3>
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">5.2 km</span>
        </div>
        {/* Placeholder for Map - Using a styled div to simulate a map view */}
        <div className="flex-1 bg-gray-100 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
            {/* Simulation of a route path */}
            <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 100" fill="none">
                <path d="M 20 80 Q 40 60 50 50 T 80 20" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" />
                <circle cx="20" cy="80" r="4" fill="#3b82f6" />
                <circle cx="80" cy="20" r="4" fill="#ef4444" />
            </svg>
            <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-xl shadow-lg flex justify-between items-center">
                 <div>
                    <p className="text-xs text-gray-400">Total time</p>
                    <p className="text-sm font-bold">42m 30s</p>
                 </div>
                 <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Play size={12} fill="currentColor" />
                 </button>
            </div>
        </div>
    </div>
);

export default function ActivityPage() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex">
      <SideBar />
      
      <main className="flex-1 lg:ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Activity Tracker</h1>
            <p className="text-gray-400 text-sm mt-1">Keep track of your fitness journey</p>
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

        <div className="space-y-8">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                    title="Daily Steps" 
                    value="10,400" 
                    unit="steps" 
                    icon={<Activity size={24} className="text-white" />}
                    colorClass="bg-blue-500 shadow-lg shadow-blue-200"
                    trend="+12%"
                />
                <MetricCard 
                    title="Calories Burned" 
                    value="860" 
                    unit="kcal" 
                    icon={<Flame size={24} className="text-orange-500" />}
                    colorClass="bg-orange-100"
                    trend="+5%"
                />
                <MetricCard 
                    title="Distance" 
                    value="8.5" 
                    unit="km" 
                    icon={<MapPin size={24} className="text-teal-500" />}
                    colorClass="bg-teal-100"
                    trend="+20%"
                />
                <MetricCard 
                    title="Active Time" 
                    value="1h 20m" 
                    unit="" 
                    icon={<Timer size={24} className="text-purple-500" />}
                    colorClass="bg-purple-100"
                />
            </div>

            {/* Middle Section: Chart & Map */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-96">
                <div className="lg:col-span-2 h-full">
                    <ActivityChart />
                </div>
                <div className="lg:col-span-1 h-96 lg:h-full">
                    <RunningMapCard />
                </div>
            </div>

            {/* Bottom Section: Recent List & Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity List */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Recent Activities</h3>
                        <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-2">
                        <RecentActivityItem 
                            type="Running" 
                            time="45 min" 
                            calories="420" 
                            date="Today, 7:00 AM" 
                            icon={<Activity size={20} className="text-blue-600" />}
                            color="bg-blue-50"
                        />
                        <RecentActivityItem 
                            type="Cycling" 
                            time="1h 10m" 
                            calories="650" 
                            date="Yesterday, 6:30 PM" 
                            icon={<Activity size={20} className="text-orange-600" />}
                            color="bg-orange-50"
                        />
                         <RecentActivityItem 
                            type="Yoga" 
                            time="30 min" 
                            calories="120" 
                            date="Nov 14, 8:00 AM" 
                            icon={<Activity size={20} className="text-purple-600" />}
                            color="bg-purple-50"
                        />
                    </div>
                </div>

                {/* Goals Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl shadow-xl shadow-blue-200 text-white flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-xl mb-1">Weekly Goal</h3>
                            <p className="text-blue-100 text-sm">You are doing great!</p>
                        </div>
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <TrendingUp size={24} className="text-white" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between text-sm mb-2 font-medium">
                            <span>Progress</span>
                            <span>85%</span>
                        </div>
                        <div className="w-full bg-blue-900/50 rounded-full h-3">
                            <div className="bg-white h-3 rounded-full w-[85%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        </div>
                        <p className="mt-4 text-sm text-blue-100 leading-relaxed">
                            You've completed <strong>5 out of 6</strong> workouts this week. Keep up the momentum to reach your monthly badge!
                        </p>
                    </div>

                    <button className="mt-6 w-full py-3 bg-white text-blue-800 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                        Edit Goals
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}