import React, { useState } from 'react';
import { 
  Activity, Bell, Settings, Zap, Flame, Timer, MapPin, 
  TrendingUp, Calendar, ChevronRight, Play, Footprints, Clock,
  Moon, Heart, Info, Utensils, Droplets, Plus, Check, Brain,
  Smile, Meh, Frown, Wind
} from "lucide-react";
import SideBar from "../components/SideBar";

// --- Types ---
interface StatCardProps {
  title: string;
  value: string;
  subValue?: string;
  unit?: string;
  icon?: React.ReactNode;
  trend?: string;
  type?: 'default' | 'primary';
}

// --- Components (Shared across multiple patient pages) ---

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, icon, trend, type = 'default' }) => {
  if (type === 'primary') {
    return (
      <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-xl shadow-blue-200 relative overflow-hidden flex flex-col justify-between h-full">
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
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
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

const ChallengeRing = ({ percentage, label, subLabel }: { percentage: number, label: string, subLabel: string }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-14 h-14">
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

const FoodCard = ({ name, cal, img, active }: any) => (
  <div className={`p-4 rounded-2xl flex items-center gap-4 transition-all cursor-pointer ${active ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-white border border-gray-100'}`}>
     <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${active ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-100'}`}>
        <img src={img} alt={name} className="w-8 h-8 rounded-full object-cover" />
     </div>
     <div>
        <p className={`font-bold text-sm ${active ? 'text-white' : 'text-gray-800'}`}>{name}</p>
        <p className={`text-xs ${active ? 'text-blue-100' : 'text-gray-400'}`}>{cal}</p>
     </div>
  </div>
);

// --- Layout Wrapper ---
const PageLayout = ({ children, title, subtitle }: any) => (
  <div className="bg-gray-50 min-h-screen font-sans flex">
    <SideBar />
    <main className="flex-1 lg:ml-64 p-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-gray-400 text-sm font-medium mb-1">{subtitle}</h1>
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm"><Settings size={20} /></button>
          <button className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-blue-600 border-2 border-white rounded-full"></span>
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

// =======================
// === 1. DASHBOARD ===
// =======================

export const PatientDashboard = () => {
  return (
    <PageLayout title="Welcome to Wellness!" subtitle="Hi George,">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Heart Rate" value="80" type="primary" />
            <StatCard title="Sleep time" value="8 Hours" trend="+90%" />
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between mb-4">
                <span className="text-gray-400 text-sm">Water Statistic</span>
                <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">+90%</span>
              </div>
              <div className="flex items-end gap-4">
                <div className="h-12 w-4 bg-gray-100 rounded-full relative overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-blue-600 h-3/4"></div>
                </div>
                <div className="h-12 w-4 bg-gray-100 rounded-full relative overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-blue-600 h-1/2"></div>
                </div>
                <div>
                  <span className="text-xl font-bold block">2.1</span>
                  <span className="text-sm text-gray-400">litres</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-sm">Calories</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="relative w-12 h-12 flex items-center justify-center border-4 border-gray-100 rounded-full border-l-blue-600 border-t-blue-600 transform rotate-45">
                  <span className="transform -rotate-45 text-xs font-bold text-gray-800">+60%</span>
                </div>
                <div>
                  <span className="text-xl font-bold block">1486</span>
                  <span className="text-sm text-gray-400">Kcl</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 text-lg">Today Challenges</h3>
              <span className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">View all Tasks →</span>
            </div>
            <div className="space-y-6">
              <ChallengeRing percentage={60} label="15,000 steps" subLabel="9000 steps left" />
              <ChallengeRing percentage={40} label="Drink 10 glasses of water" subLabel="6 glasses left" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">Recommended food</h3>
              <span className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">View all Tasks →</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FoodCard name="Almonds" cal="1 Cup, 547 cal" img="https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=100&q=80" />
              <FoodCard name="Banana" cal="105 cal" img="https://images.unsplash.com/photo-1571771896612-da025cba654d?auto=format&fit=crop&w=100&q=80" active={true} />
              <FoodCard name="Cashews" cal="100g, 553 cal" img="https://images.unsplash.com/photo-1599599810769-bcde5a45dd03?auto=format&fit=crop&w=100&q=80" />
            </div>
          </div>
        </div>
        <div className="space-y-8 flex flex-col h-full">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col min-h-[300px]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Activity Tracking</h3>
                <p className="text-gray-400 text-sm">November, 2023</p>
              </div>
              <button className="text-gray-400 text-xs flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">Weekly <ChevronRight className="rotate-90" size={14}/></button>
            </div>
            <div className="flex-1 flex items-end justify-between gap-4 px-2">
              {[40, 30, 70, 50, 60, 45, 80].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-3 w-full">
                  {i === 2 && (
                    <div className="mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg -mt-10 animate-bounce">
                      8.5 KM
                    </div>
                  )}
                  <div className="w-3 bg-gray-100 rounded-full h-40 relative group">
                    <div
                      className={`absolute bottom-0 left-0 w-full rounded-full transition-all duration-500 ${i === 2 ? 'bg-blue-600' : 'bg-blue-600 opacity-80'}`}
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="bg-white p-5 rounded-3xl border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Footprints size={18} /></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Steps</p>
                <p className="text-xl font-bold text-gray-800">10400</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><MapPin size={18} /></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Distance</p>
                <p className="text-xl font-bold text-gray-800">8.5 Km</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Clock size={18} /></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Time</p>
                <p className="text-xl font-bold text-gray-800">47 min</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Zap size={18} /></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Speed</p>
                <p className="text-xl font-bold text-gray-800">3,5Km/h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// =======================
// === 2. ACTIVITY ===
// =======================

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
  const data = [45, 70, 30, 85, 55, 65, 40];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <div><h3 className="font-bold text-gray-800 text-lg">Weekly Intensity</h3><p className="text-gray-400 text-sm">Heart Points gathered</p></div>
        <div className="flex gap-2"><button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">Weekly</button><button className="px-3 py-1 bg-gray-50 text-gray-400 text-xs rounded-full">Monthly</button></div>
      </div>
      <div className="flex items-end justify-between gap-4 h-48 px-2">
        {data.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-3 w-full group cursor-pointer">
             <div className="relative w-full flex justify-center">
                 <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded mb-2">{h} pts</div>
                <div className="w-10 bg-gray-100 rounded-t-xl h-40 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-blue-600 transition-all duration-500 rounded-t-xl group-hover:bg-blue-500" style={{ height: `${h}%` }}></div>
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
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <h4 className="font-bold text-gray-800 text-sm">{type}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1"><Calendar size={12} /><span>{date}</span><span>•</span><Timer size={12} /><span>{time}</span></div>
      </div>
    </div>
    <div className="text-right"><span className="block font-bold text-gray-800 text-sm">{calories} Kcal</span><span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Details</span></div>
  </div>
);

const RunningMapCard = () => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-gray-800 text-lg">Last Route</h3><span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">5.2 km</span></div>
        <div className="flex-1 bg-gray-100 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
            <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 100" fill="none">
                <path d="M 20 80 Q 40 60 50 50 T 80 20" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" />
                <circle cx="20" cy="80" r="4" fill="#3b82f6" />
                <circle cx="80" cy="20" r="4" fill="#ef4444" />
            </svg>
            <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-xl shadow-lg flex justify-between items-center">
                 <div><p className="text-xs text-gray-400">Total time</p><p className="text-sm font-bold">42m 30s</p></div>
                 <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200"><Play size={12} fill="currentColor" /></button>
            </div>
        </div>
    </div>
);

export const ActivityPage = () => {
  return (
    <PageLayout title="Activity Tracker" subtitle="Keep track of your fitness journey">
       <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Daily Steps" value="10,400" unit="steps" icon={<Activity size={24} className="text-white" />} colorClass="bg-blue-500 shadow-lg shadow-blue-200" trend="+12%" />
                <MetricCard title="Calories Burned" value="860" unit="kcal" icon={<Flame size={24} className="text-orange-500" />} colorClass="bg-orange-100" trend="+5%" />
                <MetricCard title="Distance" value="8.5" unit="km" icon={<MapPin size={24} className="text-teal-500" />} colorClass="bg-teal-100" trend="+20%" />
                <MetricCard title="Active Time" value="1h 20m" unit="" icon={<Timer size={24} className="text-purple-500" />} colorClass="bg-purple-100" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-96">
                <div className="lg:col-span-2 h-full"><ActivityChart /></div>
                <div className="lg:col-span-1 h-96 lg:h-full"><RunningMapCard /></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-gray-800 text-lg">Recent Activities</h3><button className="text-blue-600 text-sm font-medium hover:underline flex items-center">View All <ChevronRight size={16} /></button></div>
                    <div className="space-y-2">
                        <RecentActivityItem type="Running" time="45 min" calories="420" date="Today, 7:00 AM" icon={<Activity size={20} className="text-blue-600" />} color="bg-blue-50" />
                        <RecentActivityItem type="Cycling" time="1h 10m" calories="650" date="Yesterday, 6:30 PM" icon={<Activity size={20} className="text-orange-600" />} color="bg-orange-50" />
                        <RecentActivityItem type="Yoga" time="30 min" calories="120" date="Nov 14, 8:00 AM" icon={<Activity size={20} className="text-purple-600" />} color="bg-purple-50" />
                    </div>
                </div>
            </div>
       </div>
    </PageLayout>
  );
};

// =======================
// === 3. SLEEP PAGE ===
// =======================

const SleepStatCard = ({ title, value, unit, icon, subtext, color }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 relative overflow-hidden group">
    <div className="flex justify-between items-start z-10">
      <span className="text-gray-400 text-sm font-medium">{title}</span>
      <div className={`p-2 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
    <div className="z-10">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <span className="text-sm text-gray-500 font-medium">{unit}</span>
      </div>
      {subtext && <p className="text-xs text-green-500 font-medium mt-1">{subtext}</p>}
    </div>
    <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 ${color.replace('bg-', 'bg-').replace('text-', 'text-opacity-0 bg-')}`}></div>
  </div>
);

const HypnogramChart = () => {
    const pathData = `M 0 60 L 10 60 L 10 85 L 30 85 L 30 60 L 40 35 L 50 35 L 50 60 L 70 60 L 70 85 L 100 85 L 100 60 L 110 35 L 130 35 L 130 10 L 140 10 L 140 60 L 160 60 L 160 85 L 190 85 L 190 60 L 200 35 L 220 35 L 220 60 L 250 60 L 250 35 L 280 35 L 280 10 L 300 10`;
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div><h3 className="font-bold text-gray-800 text-lg">Sleep Stages</h3><p className="text-gray-400 text-xs">Last Night • 11:30 PM - 07:30 AM</p></div>
                <div className="flex gap-4 text-xs font-medium">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"></span>Awake</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-300"></span>REM</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Light</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-700"></span>Deep</div>
                </div>
            </div>
            <div className="relative h-48 w-full">
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-300 font-medium py-2 pr-2 border-r border-gray-100"><span>Awake</span><span>REM</span><span>Light</span><span>Deep</span></div>
                <div className="ml-12 h-full relative">
                    <div className="absolute inset-0 flex flex-col justify-between py-3"><div className="border-b border-gray-50 border-dashed w-full h-0"></div><div className="border-b border-gray-50 border-dashed w-full h-0"></div><div className="border-b border-gray-50 border-dashed w-full h-0"></div><div className="border-b border-gray-50 border-dashed w-full h-0"></div></div>
                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none"><path d={`${pathData} V 100 H 0 Z`} fill="url(#gradient)" opacity="0.1" /><path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" /><defs><linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#ffffff" /></linearGradient></defs></svg>
                </div>
            </div>
            <div className="flex justify-between ml-12 mt-2 text-xs text-gray-400"><span>11 PM</span><span>1 AM</span><span>3 AM</span><span>5 AM</span><span>7 AM</span></div>
        </div>
    );
};

const QualityDonut = ({ score }: { score: number }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    return (
        <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-xl shadow-indigo-200 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="flex justify-between items-start z-10"><div><h3 className="font-bold text-lg">Sleep Quality</h3><p className="text-indigo-200 text-xs">Based on cycles</p></div><Info size={16} className="text-indigo-200" /></div>
            <div className="flex items-center gap-6 mt-4 z-10">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r={radius} stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="transparent" />
                        <circle cx="48" cy="48" r={radius} stroke="white" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-bold">{score}</span><span className="text-xs text-indigo-200">/100</span></div>
                </div>
                <div className="space-y-2"><p className="text-sm font-medium">Excellent</p><p className="text-xs text-indigo-200 leading-tight">You slept better than 85% of users.</p></div>
            </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full opacity-50 blur-2xl"></div>
        </div>
    );
};

const BreakdownBar = ({ label, time, color, percent }: any) => (
    <div className="mb-4 last:mb-0"><div className="flex justify-between text-sm mb-1"><span className="text-gray-600 font-medium">{label}</span><span className="text-gray-800 font-bold">{time}</span></div><div className="w-full bg-gray-100 rounded-full h-2"><div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }}></div></div></div>
);

export const SleepPage = () => {
  return (
    <PageLayout title="Sleep Monitor" subtitle="Good morning, George! You slept well.">
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SleepStatCard title="Time in Bed" value="8" unit="hrs 12m" icon={<Clock size={20} />} color="bg-blue-50 text-blue-600" subtext="On Schedule" />
                <SleepStatCard title="Deep Sleep" value="1" unit="hr 45m" icon={<Moon size={20} />} color="bg-indigo-50 text-indigo-600" subtext="+15m vs avg" />
                <SleepStatCard title="Avg. Heart Rate" value="58" unit="bpm" icon={<Heart size={20} />} color="bg-red-50 text-red-500" subtext="Resting phase" />
                <SleepStatCard title="Awakenings" value="2" unit="times" icon={<Zap size={20} />} color="bg-orange-50 text-orange-500" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2"><HypnogramChart /></div>
                <div className="lg:col-span-1"><QualityDonut score={88} /></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-lg mb-6">Stage Breakdown</h3>
                    <BreakdownBar label="Deep Sleep" time="1h 45m" color="bg-indigo-700" percent={20} />
                    <BreakdownBar label="Light Sleep" time="4h 12m" color="bg-blue-500" percent={55} />
                    <BreakdownBar label="REM Sleep" time="1h 55m" color="bg-blue-300" percent={22} />
                    <BreakdownBar label="Awake" time="20m" color="bg-orange-400" percent={3} />
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-gray-800 text-lg">Weekly Consistency</h3><div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold"><Clock size={12} /><span>Consistent</span></div></div>
                    <div className="flex-1 flex items-end justify-between px-2 gap-4">
                         {[7.5, 6, 8, 7.8, 8.2, 5, 8].map((val, i) => (
                             <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                 <div className="relative w-full flex justify-center h-32 items-end"><div className={`w-full rounded-lg transition-all ${val < 7 ? 'bg-orange-200' : 'bg-blue-200 group-hover:bg-blue-600'}`} style={{ height: `${(val/9)*100}%` }}></div></div>
                                 <span className="text-xs text-gray-400 font-medium">{['M','T','W','T','F','S','S'][i]}</span>
                             </div>
                         ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between text-xs text-gray-400"><span>Avg Bedtime: 11:15 PM</span><span>Avg Wake up: 7:20 AM</span></div>
                </div>
            </div>
        </div>
    </PageLayout>
  );
};

// =======================
// === 4. NUTRITION PAGE ===
// =======================

const MacroCard = ({ label, value, total, color, icon }: any) => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 flex flex-col justify-between h-36 shadow-sm">
    <div className="flex justify-between items-start">
      <span className="text-gray-400 text-sm font-medium">{label}</span>
      <div className={`p-2 rounded-full ${color.bg} ${color.text}`}>{icon}</div>
    </div>
    <div>
      <div className="flex justify-between items-end mb-2"><span className="text-2xl font-bold text-gray-800">{value}g</span><span className="text-xs text-gray-400 font-medium">/ {total}g</span></div>
      <div className="w-full bg-gray-100 rounded-full h-2"><div className={`h-2 rounded-full ${color.bar}`} style={{ width: `${(value/total)*100}%` }}></div></div>
    </div>
  </div>
);

const MealRow = ({ type, name, cals, time, img }: any) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 hover:shadow-md transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <img src={img} alt={name} className="w-14 h-14 rounded-xl object-cover group-hover:scale-105 transition-transform" />
      <div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{type}</span>
        <h4 className="font-bold text-gray-800 mt-1">{name}</h4>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
    <div className="text-right"><span className="font-bold text-gray-800 text-lg">{cals}</span><span className="text-xs text-gray-400 block">Kcal</span></div>
  </div>
);

export const NutritionPage = () => {
  return (
    <PageLayout title="Nutrition Plan" subtitle="Track your calories and macros">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between shadow-xl shadow-gray-200">
            <div className="z-10 text-center sm:text-left mb-6 sm:mb-0">
              <h2 className="text-4xl font-bold mb-1">1,240 <span className="text-lg font-normal text-gray-400">kcal left</span></h2>
              <p className="text-gray-400 text-sm mb-6">Daily Target: 2,500 kcal</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-900/50">Log Meal</button>
            </div>
            <div className="relative w-32 h-32 flex items-center justify-center z-10"><div className="absolute w-full h-full rounded-full border-8 border-gray-800"></div><div className="absolute w-full h-full rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500 transform -rotate-45"></div><div className="text-center"><span className="block text-xl font-bold">50%</span></div></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MacroCard label="Protein" value={110} total={180} color={{bg:'bg-orange-50', text:'text-orange-500', bar:'bg-orange-500'}} icon={<Flame size={18}/>} />
            <MacroCard label="Carbs" value={140} total={250} color={{bg:'bg-blue-50', text:'text-blue-500', bar:'bg-blue-500'}} icon={<Utensils size={18}/>} />
            <MacroCard label="Fat" value={45} total={80} color={{bg:'bg-yellow-50', text:'text-yellow-500', bar:'bg-yellow-500'}} icon={<Droplets size={18}/>} />
          </div>
          <div>
             <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-gray-800 text-lg">Today's Meals</h3><button className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors"><Plus size={20}/></button></div>
             <div className="space-y-4">
                <MealRow type="Breakfast" name="Oatmeal & Berries" cals={450} time="08:30 AM" img="https://images.unsplash.com/photo-1517093725432-a9391ff46066?auto=format&fit=crop&w=100&q=80" />
                <MealRow type="Lunch" name="Grilled Chicken Salad" cals={620} time="01:15 PM" img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80" />
                <MealRow type="Snack" name="Almonds & Apple" cals={180} time="04:00 PM" img="https://images.unsplash.com/photo-1563729768-6af584667808?auto=format&fit=crop&w=100&q=80" />
             </div>
          </div>
        </div>
        <div className="space-y-8">
           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 h-72 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="z-10"><h3 className="font-bold text-blue-900 text-lg mb-2">Hydration</h3><div className="flex items-baseline justify-center gap-1 mb-1"><span className="text-5xl font-bold text-blue-600">1.2</span><span className="text-xl font-medium text-blue-600">L</span></div><p className="text-blue-400 text-sm mb-6">Goal: 2.5L</p><button className="bg-white text-blue-600 p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all"><Plus size={24}/></button></div>
              <div className="absolute bottom-0 left-0 w-[200%] h-32 bg-blue-200 opacity-50 rounded-t-[100%] translate-y-10 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-[200%] h-24 bg-blue-300 opacity-50 rounded-t-[100%] translate-y-8 animate-pulse delay-75"></div>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Recommended</h3>
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
                 <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" alt="Recipe" />
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5"><p className="text-white font-bold text-lg">Avocado Toast</p><p className="text-gray-200 text-xs mt-1">350 Kcal • 10 min prep</p></div>
              </div>
           </div>
        </div>
      </div>
    </PageLayout>
  );
};

// =======================
// === 5. FITNESS PAGE ===
// =======================

const WorkoutCard = ({ title, time, level, img }: any) => (
  <div className="relative rounded-3xl overflow-hidden h-52 group cursor-pointer shadow-sm hover:shadow-2xl transition-all">
    <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-center">
      <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 border border-white/10">{level}</span>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="flex items-center gap-2 text-gray-200 text-sm mb-4"><Activity size={16} className="text-blue-400" /> <span className="font-medium">{time}</span></div>
      <button className="bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-lg"><Play size={18} fill="currentColor" className="ml-1" /></button>
    </div>
  </div>
);

const ExerciseItem = ({ name, sets, reps, done }: any) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl">
     <div><h4 className={`font-bold text-sm ${done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{name}</h4><p className="text-xs text-gray-400 mt-1">{sets} Sets x {reps} Reps</p></div>
     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${done ? 'bg-blue-600 border-blue-600' : 'border-gray-200 hover:border-blue-400'}`}>{done && <Check size={14} className="text-white" />}</div>
  </div>
);

export const FitnessPage = () => {
  return (
    <PageLayout title="Fitness Studio" subtitle="Your workout plan for today">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <div className="flex justify-between items-end"><h3 className="font-bold text-gray-800 text-xl">Recommended for you</h3><div className="flex gap-2"><button className="p-2 rounded-full bg-white border border-gray-100 hover:bg-gray-50 shadow-sm text-gray-400 hover:text-gray-600"><ChevronRight size={20} className="rotate-180"/></button><button className="p-2 rounded-full bg-white border border-gray-100 hover:bg-gray-50 shadow-sm text-gray-400 hover:text-gray-600"><ChevronRight size={20}/></button></div></div>
             <WorkoutCard title="Upper Body Power" time="45 min" level="Intermediate" img="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WorkoutCard title="Yoga Flow" time="20 min" level="Beginner" img="https://images.unsplash.com/photo-1544367563-121910aa642b?auto=format&fit=crop&w=400&q=80" />
                <WorkoutCard title="HIIT Cardio" time="30 min" level="Advanced" img="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=400&q=80" />
             </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 h-full flex flex-col shadow-sm">
             <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-gray-800 text-lg">Today's Plan</h3><span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">Leg Day</span></div>
             <div className="space-y-1 flex-1">
                <ExerciseItem name="Warm Up: Treadmill" sets={1} reps="5 mins" done={true} />
                <ExerciseItem name="Barbell Squats" sets={4} reps="12" done={true} />
                <ExerciseItem name="Leg Press" sets={3} reps="10" done={false} />
                <ExerciseItem name="Walking Lunges" sets={3} reps="20" done={false} />
                <ExerciseItem name="Calf Raises" sets={4} reps="15" done={false} />
             </div>
             <div className="mt-8 bg-gray-900 rounded-2xl p-6 text-white text-center shadow-xl shadow-gray-200"><p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Weekly Streak</p><div className="flex justify-center items-end gap-2 mb-4"><span className="text-4xl font-bold">4</span><span className="text-lg text-gray-400 font-medium">/ 5 days</span></div><div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden"><div className="bg-blue-500 h-2 rounded-full w-[80%] shadow-[0_0_10px_#3b82f6]"></div></div></div>
          </div>
       </div>
    </PageLayout>
  );
};

// =======================
// === 6. MENTAL HEALTH ===
// =======================

const MoodButton = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${
      active 
        ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200 scale-105' 
        : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200 hover:bg-purple-50'
    }`}
  >
    <div className={active ? 'animate-bounce' : ''}>{icon}</div>
    <span className="text-xs font-bold tracking-wide">{label}</span>
  </button>
);

const MeditationTrack = ({ title, author, time, color }: any) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 hover:shadow-md hover:border-gray-100 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        <Play size={18} className="ml-1" fill="currentColor" />
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-sm group-hover:text-purple-600 transition-colors">{title}</h4>
        <p className="text-xs text-gray-400 mt-0.5">{author}</p>
      </div>
    </div>
    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{time}</span>
  </div>
);

export const MentalHealthPage = () => {
  const [mood, setMood] = useState('Happy');

  return (
    <PageLayout title="Mental Well-being" subtitle="Take a moment for yourself">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8">
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6 text-gray-800">How are you feeling?</h3>
              <div className="grid grid-cols-3 gap-4">
                 <MoodButton icon={<Smile size={32}/>} label="Happy" active={mood === 'Happy'} onClick={() => setMood('Happy')} />
                 <MoodButton icon={<Meh size={32}/>} label="Neutral" active={mood === 'Neutral'} onClick={() => setMood('Neutral')} />
                 <MoodButton icon={<Frown size={32}/>} label="Sad" active={mood === 'Sad'} onClick={() => setMood('Sad')} />
              </div>
           </div>
           <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4 relative z-10"><h3 className="font-bold text-purple-900">Mindfulness</h3><div className="bg-white p-2 rounded-full shadow-sm"><Brain size={20} className="text-purple-500" /></div></div>
              <div className="relative z-10"><span className="text-5xl font-bold text-purple-700">145</span><span className="text-sm text-purple-400 font-medium ml-2">min / week</span></div>
              <div className="mt-8 flex gap-2 h-20 items-end relative z-10">{[40, 20, 60, 30, 80, 45, 10].map((h, i) => (<div key={i} className="flex-1 bg-purple-200 rounded-t-lg hover:bg-purple-400 transition-colors cursor-pointer" style={{height: `${h}%`}}></div>))}</div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
           </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-teal-700 text-white p-8 rounded-3xl flex items-center justify-between relative overflow-hidden shadow-xl shadow-teal-100">
              <div className="z-10 max-w-md">
                 <span className="bg-white/20 backdrop-blur-md text-teal-50 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block border border-teal-500/50">Daily Pick</span>
                 <h2 className="text-3xl font-bold mb-3">Breathing for Anxiety</h2>
                 <p className="text-teal-100 text-sm mb-8 leading-relaxed">A 5-minute session to help you ground yourself, clear your mind, and find calm in the chaos.</p>
                 <button className="bg-white text-teal-800 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-50 transition-colors shadow-lg"><Play size={18} fill="currentColor" /> Start Session</button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none"><Wind size={300} className="absolute -right-16 -top-16 text-white" /></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                 <h3 className="font-bold text-gray-800 text-lg mb-4">Sleep Stories</h3>
                 <div className="space-y-3">
                    <MeditationTrack title="The Blue Forest" author="Dr. Ali" time="25 min" color="bg-blue-100 text-blue-600" />
                    <MeditationTrack title="Ocean Waves" author="Sarah K." time="45 min" color="bg-blue-100 text-blue-600" />
                    <MeditationTrack title="Night Rain" author="Nature Sounds" time="60 min" color="bg-blue-100 text-blue-600" />
                 </div>
              </div>
              <div>
                 <h3 className="font-bold text-gray-800 text-lg mb-4">Focus & Clarity</h3>
                 <div className="space-y-3">
                    <MeditationTrack title="Morning Energy" author="Mike T." time="10 min" color="bg-orange-100 text-orange-600" />
                    <MeditationTrack title="Deep Focus" author="Mindful Co." time="30 min" color="bg-orange-100 text-orange-600" />
                    <MeditationTrack title="Pre-Work Reset" author="Emma W." time="5 min" color="bg-orange-100 text-orange-600" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </PageLayout>
  );
};