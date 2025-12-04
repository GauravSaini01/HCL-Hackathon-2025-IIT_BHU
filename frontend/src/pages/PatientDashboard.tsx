import { Activity, Bell, Clock, Footprints, MapPin, Settings, Sidebar, Zap } from "lucide-react";
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

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}


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

        {/* Mock Heartbeat Graph Line */}
        <div className="flex items-end gap-2 mt-4 z-10">
          <Activity className="animate-pulse" />
          <span className="text-4xl font-bold">{value} <span className="text-lg font-normal">Bpm</span></span>
        </div>

        {/* Decorative background SVG */}
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
            // Specifically for the graph cards like Sleep
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

const ActivityChart = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [40, 30, 70, 50, 60, 45, 80]; // percentages

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">Activity Tracking</h3>
          <p className="text-gray-400 text-sm">November, 2023</p>
        </div>
        <select className="bg-gray-50 text-gray-400 text-sm rounded-lg px-3 py-1 border-none outline-none">
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>

      <div className="flex-1 flex items-end justify-between gap-4 px-2">
        {values.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-3 w-full">
            {/* Tooltip style popup for Wednesday */}
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
            <span className="text-xs text-gray-400 font-medium">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChallengeRing = ({ percentage, label, subLabel }: { percentage: number, label: string, subLabel: string }) => {
  // Simple SVG circle math
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

// --- Main Page Layout ---

export default function PatientDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex">
      <SideBar />

      <main className="flex-1 lg:ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-gray-400 text-sm font-medium mb-1">Hi George,</h1>
            <h2 className="text-3xl font-bold text-gray-900">Welcome to Wellness!</h2>
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

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (Stats & Challenges) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Heart Rate" value="80" type="primary" />
              <StatCard title="Sleep time" value="8 Hours" trend="+90%" />

              {/* Water */}
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

              {/* Calories */}
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

            {/* Challenges Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Today Challenges</h3>
                <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View all Tasks →</a>
              </div>

              <div className="space-y-6">
                <ChallengeRing percentage={60} label="15,000 steps" subLabel="9000 steps left" />
                <ChallengeRing percentage={40} label="Drink 10 glasses of water" subLabel="6 glasses left" />
              </div>
            </div>

            {/* Recommended Food Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-lg">Recommended food</h3>
                <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View all Tasks →</a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Food Card 1 */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1508061253366-f7da158b6d46?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" className="w-8 h-8 rounded-full object-cover" alt="Almonds" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Almonds</p>
                    <p className="text-gray-400 text-xs">1 Cup, 547 cal</p>
                  </div>
                </div>

                {/* Food Card 2 (Active) */}
                <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <img src="https://images.unsplash.com/photo-1571771896612-da025cba654d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" className="w-8 h-8 rounded-full object-cover" alt="Banana" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Banana</p>
                    <p className="text-blue-100 text-xs">105 cal</p>
                  </div>
                </div>

                {/* Food Card 3 */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1599599810769-bcde5a45dd03?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" className="w-8 h-8 rounded-full object-cover" alt="Cashews" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Cashews</p>
                    <p className="text-gray-400 text-xs">100g, 553 cal</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Activity & Details) */}
          <div className="space-y-8 flex flex-col h-full">
            <div className="h-80 lg:h-96">
              <ActivityChart />
            </div>

            {/* Bottom 2x2 Stats Grid */}
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
      </main>
    </div>
  );
}