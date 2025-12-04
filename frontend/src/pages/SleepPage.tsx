import React from 'react';
import Layout from './Layout'; // Import the shared, working Layout
import { Clock, Moon, Heart, Zap, Info } from 'lucide-react';

// --- Page Specific Components ---

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
    
    {/* Decorative background glow */}
    <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10 ${color.replace('bg-', 'bg-').replace('text-', 'text-opacity-0 bg-')}`}></div>
  </div>
);

const HypnogramChart = () => {
    const pathData = `
      M 0 60 L 10 60 L 10 85 L 30 85 L 30 60 L 40 35 L 50 35 L 50 60 
      L 70 60 L 70 85 L 100 85 L 100 60 L 110 35 L 130 35 L 130 10 
      L 140 10 L 140 60 L 160 60 L 160 85 L 190 85 L 190 60 L 200 35 
      L 220 35 L 220 60 L 250 60 L 250 35 L 280 35 L 280 10 L 300 10
    `;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">Sleep Stages</h3>
                    <p className="text-gray-400 text-xs">Last Night • 11:30 PM - 07:30 AM</p>
                </div>
                <div className="flex gap-4 text-xs font-medium">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"></span>Awake</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-300"></span>REM</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Light</div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-700"></span>Deep</div>
                </div>
            </div>

            <div className="relative h-48 w-full">
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-300 font-medium py-2 pr-2 border-r border-gray-100">
                    <span>Awake</span>
                    <span>REM</span>
                    <span>Light</span>
                    <span>Deep</span>
                </div>
                
                <div className="ml-12 h-full relative">
                    <div className="absolute inset-0 flex flex-col justify-between py-3">
                        <div className="border-b border-gray-50 border-dashed w-full h-0"></div>
                        <div className="border-b border-gray-50 border-dashed w-full h-0"></div>
                        <div className="border-b border-gray-50 border-dashed w-full h-0"></div>
                        <div className="border-b border-gray-50 border-dashed w-full h-0"></div>
                    </div>

                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <path d={`${pathData} V 100 H 0 Z`} fill="url(#gradient)" opacity="0.1" />
                        <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#ffffff" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            
            <div className="flex justify-between ml-12 mt-2 text-xs text-gray-400">
                <span>11 PM</span>
                <span>1 AM</span>
                <span>3 AM</span>
                <span>5 AM</span>
                <span>7 AM</span>
            </div>
        </div>
    );
};

const QualityDonut = ({ score }: { score: number }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-xl shadow-indigo-200 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="flex justify-between items-start z-10">
                <div>
                    <h3 className="font-bold text-lg">Sleep Quality</h3>
                    <p className="text-indigo-200 text-xs">Based on cycles & duration</p>
                </div>
                <Info size={16} className="text-indigo-200" />
            </div>

            <div className="flex items-center gap-6 mt-4 z-10">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r={radius} stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="transparent" />
                        <circle 
                            cx="48" cy="48" r={radius} 
                            stroke="white" strokeWidth="8" 
                            fill="transparent" 
                            strokeDasharray={circumference} 
                            strokeDashoffset={strokeDashoffset} 
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">{score}</span>
                        <span className="text-xs text-indigo-200">/100</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium">Excellent</p>
                    <p className="text-xs text-indigo-200 leading-tight">You slept better than 85% of users today.</p>
                </div>
            </div>

             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full opacity-50 blur-2xl"></div>
        </div>
    );
};

const BreakdownBar = ({ label, time, color, percent }: any) => (
    <div className="mb-4 last:mb-0">
        <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-800 font-bold">{time}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
            <div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);

// --- Main Layout ---

export default function SleepPage() {
  return (
    // Replaced local Sidebar with shared Layout component
    <Layout activePage="/patient/sleep" title="Sleep Monitor" subtitle="Good morning, George! You slept well.">
        <div className="space-y-8">
            
            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SleepStatCard 
                    title="Time in Bed" 
                    value="8" 
                    unit="hrs 12m" 
                    icon={<Clock size={20} />} 
                    color="bg-blue-50 text-blue-600"
                    subtext="On Schedule"
                />
                <SleepStatCard 
                    title="Deep Sleep" 
                    value="1" 
                    unit="hr 45m" 
                    icon={<Moon size={20} />} 
                    color="bg-indigo-50 text-indigo-600"
                    subtext="+15m vs avg"
                />
                <SleepStatCard 
                    title="Avg. Heart Rate" 
                    value="58" 
                    unit="bpm" 
                    icon={<Heart size={20} />} 
                    color="bg-red-50 text-red-500"
                    subtext="Resting phase"
                />
                <SleepStatCard 
                    title="Awakenings" 
                    value="2" 
                    unit="times" 
                    icon={<Zap size={20} />} 
                    color="bg-orange-50 text-orange-500"
                />
            </div>

            {/* Main Visuals: Hypnogram & Quality */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <HypnogramChart />
                </div>
                <div className="lg:col-span-1">
                    <QualityDonut score={88} />
                </div>
            </div>

            {/* Bottom Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Stage Breakdown */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-lg mb-6">Stage Breakdown</h3>
                    <BreakdownBar label="Deep Sleep" time="1h 45m" color="bg-indigo-700" percent={20} />
                    <BreakdownBar label="Light Sleep" time="4h 12m" color="bg-blue-500" percent={55} />
                    <BreakdownBar label="REM Sleep" time="1h 55m" color="bg-blue-300" percent={22} />
                    <BreakdownBar label="Awake" time="20m" color="bg-orange-400" percent={3} />
                </div>

                {/* Weekly Consistency */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Weekly Consistency</h3>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">
                            <Clock size={12} />
                            <span>Consistent</span>
                        </div>
                    </div>
                    
                    {/* Simple Bar Chart for consistency */}
                    <div className="flex-1 flex items-end justify-between px-2 gap-4">
                         {[7.5, 6, 8, 7.8, 8.2, 5, 8].map((val, i) => (
                             <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                 <div className="relative w-full flex justify-center h-32 items-end">
                                     <div 
                                        className={`w-full rounded-lg transition-all ${val < 7 ? 'bg-orange-200' : 'bg-blue-200 group-hover:bg-blue-600'}`}
                                        style={{ height: `${(val/9)*100}%` }}
                                     ></div>
                                 </div>
                                 <span className="text-xs text-gray-400 font-medium">
                                    {['M','T','W','T','F','S','S'][i]}
                                 </span>
                             </div>
                         ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between text-xs text-gray-400">
                        <span>Avg Bedtime: 11:15 PM</span>
                        <span>Avg Wake up: 7:20 AM</span>
                    </div>
                </div>

            </div>

        </div>
    </Layout>
  );
}