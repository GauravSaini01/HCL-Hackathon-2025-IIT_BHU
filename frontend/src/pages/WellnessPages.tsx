import React, { useState } from 'react';
import { 
  LayoutDashboard, Activity, Moon, Utensils, Dumbbell, Brain, 
  LogOut, Settings, Bell, Search, Plus, ChevronRight, Play, 
  Flame, Droplets, Smile, Frown, Meh, Wind, Calendar
} from 'lucide-react';

// --- 1. Shared Layout Component ---
// This handles the Sidebar and Header for all pages to keep code DRY.

const Layout = ({ children, activePage, title, subtitle }: any) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Activity size={20} />, label: 'Activity', id: 'activity' },
    { icon: <Moon size={20} />, label: 'Sleep', id: 'sleep' },
    { icon: <Utensils size={20} />, label: 'Nutrition', id: 'nutrition' },
    { icon: <Dumbbell size={20} />, label: 'Fitness', id: 'fitness' },
    { icon: <Brain size={20} />, label: 'Mental Health', id: 'mental' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col p-6 z-10 hidden lg:flex">
        <div className="flex items-center gap-3 mb-10 text-blue-600">
          <div className="p-2 bg-blue-100 rounded-full"><Activity size={24} /></div>
          <span className="text-2xl font-bold text-gray-800">Wellness</span>
        </div>
        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => (
            <div key={item.id} className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
              activePage === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400 hover:bg-gray-50'
            }`}>
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-4 px-4 py-2 text-gray-400 mt-auto cursor-pointer"><LogOut size={20} /><span>Log out</span></div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="p-2 bg-white rounded-full text-gray-400 shadow-sm"><Settings size={20} /></button>
            <button className="p-2 bg-white rounded-full text-gray-400 shadow-sm relative">
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

// --- 2. Nutrition Page ---

const MacroCard = ({ label, value, total, color, icon }: any) => (
  <div className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <span className="text-gray-400 text-sm font-medium">{label}</span>
      <div className={`p-2 rounded-full ${color.bg} ${color.text}`}>{icon}</div>
    </div>
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-xl font-bold">{value}g</span>
        <span className="text-xs text-gray-400">/ {total}g</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className={`h-2 rounded-full ${color.bar}`} style={{ width: `${(value/total)*100}%` }}></div>
      </div>
    </div>
  </div>
);

const MealRow = ({ type, name, cals, time, img }: any) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-center gap-4">
      <img src={img} alt={name} className="w-14 h-14 rounded-xl object-cover" />
      <div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{type}</span>
        <h4 className="font-bold text-gray-800 mt-1">{name}</h4>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
    <div className="text-right">
      <span className="font-bold text-gray-800">{cals}</span>
      <span className="text-xs text-gray-400 block">Kcal</span>
    </div>
  </div>
);

export const NutritionPage = () => {
  return (
    <Layout activePage="nutrition" title="Nutrition Plan" subtitle="Track your calories and macros">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Tracker */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Calories */}
          <div className="bg-gray-900 text-white p-8 rounded-3xl relative overflow-hidden flex items-center justify-between">
            <div className="z-10">
              <h2 className="text-3xl font-bold mb-2">1,240 <span className="text-lg font-normal text-gray-400">kcal left</span></h2>
              <p className="text-gray-400 text-sm mb-6">Target: 2,500 kcal</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-bold transition-colors">Log Meal</button>
            </div>
            {/* Simple Circle Chart Representation */}
            <div className="relative w-32 h-32 flex items-center justify-center z-10 border-8 border-gray-800 rounded-full border-t-blue-500 border-r-blue-500 transform -rotate-45">
              <div className="text-center transform rotate-45">
                <span className="block text-2xl font-bold">50%</span>
              </div>
            </div>
            {/* Background Pattern */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MacroCard label="Protein" value={110} total={180} color={{bg:'bg-orange-50', text:'text-orange-500', bar:'bg-orange-500'}} icon={<Flame size={18}/>} />
            <MacroCard label="Carbs" value={140} total={250} color={{bg:'bg-blue-50', text:'text-blue-500', bar:'bg-blue-500'}} icon={<Utensils size={18}/>} />
            <MacroCard label="Fat" value={45} total={80} color={{bg:'bg-yellow-50', text:'text-yellow-500', bar:'bg-yellow-500'}} icon={<Droplets size={18}/>} />
          </div>

          <div>
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Today's Meals</h3>
                <button className="text-blue-600 text-sm font-bold"><Plus size={20}/></button>
             </div>
             <div className="space-y-4">
                <MealRow type="Breakfast" name="Oatmeal & Berries" cals={450} time="08:30 AM" img="https://images.unsplash.com/photo-1517093725432-a9391ff46066?auto=format&fit=crop&w=100&q=80" />
                <MealRow type="Lunch" name="Grilled Chicken Salad" cals={620} time="01:15 PM" img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80" />
                <MealRow type="Snack" name="Almonds & Apple" cals={180} time="04:00 PM" img="https://images.unsplash.com/photo-1563729768-6af584667808?auto=format&fit=crop&w=100&q=80" />
             </div>
          </div>
        </div>

        {/* Right Col: Water & Suggestions */}
        <div className="space-y-8">
           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 h-64 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="z-10">
                 <h3 className="font-bold text-blue-900 text-lg mb-2">Hydration</h3>
                 <span className="text-4xl font-bold text-blue-600">1.2L</span>
                 <p className="text-blue-400 text-sm mb-6">/ 2.5L Goal</p>
                 <button className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:scale-110 transition-transform"><Plus size={24}/></button>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-200 opacity-50 wave-animation"></div>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-blue-300 opacity-50 wave-animation delay-75"></div>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Recommended</h3>
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" className="w-full h-40 object-cover" alt="Recipe" />
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-bold">Avocado Toast</p>
                    <p className="text-gray-200 text-xs">350 Kcal • 10 min</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};

// --- 3. Fitness Page ---

const WorkoutCard = ({ title, time, level, img }: any) => (
  <div className="relative rounded-3xl overflow-hidden h-48 group cursor-pointer shadow-sm hover:shadow-xl transition-all">
    <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-6 flex flex-col justify-center">
      <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">{level}</span>
      <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
      <div className="flex items-center gap-2 text-gray-200 text-sm">
        <Activity size={14} /> <span>{time}</span>
      </div>
      <button className="mt-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
        <Play size={16} fill="currentColor" />
      </button>
    </div>
  </div>
);

const ExerciseItem = ({ name, sets, reps, done }: any) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0">
     <div>
       <h4 className={`font-bold text-sm ${done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{name}</h4>
       <p className="text-xs text-gray-400">{sets} Sets x {reps} Reps</p>
     </div>
     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${done ? 'bg-blue-600 border-blue-600' : 'border-gray-200'}`}>
        {done && <Check size={14} className="text-white" />}
     </div>
  </div>
);

import { Check } from 'lucide-react'; // Added import

export const FitnessPage = () => {
  return (
    <Layout activePage="fitness" title="Fitness Studio" subtitle="Your workout plan for today">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             {/* Banner */}
             <div className="flex justify-between items-end mb-4">
                <h3 className="font-bold text-xl">Recommended for you</h3>
                <div className="flex gap-2">
                   <button className="p-2 rounded-full bg-white border border-gray-100 hover:bg-gray-50"><ChevronRight size={20} className="rotate-180"/></button>
                   <button className="p-2 rounded-full bg-white border border-gray-100 hover:bg-gray-50"><ChevronRight size={20}/></button>
                </div>
             </div>
             <WorkoutCard title="Upper Body Power" time="45 min" level="Intermediate" img="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80" />
             
             <div className="grid grid-cols-2 gap-6">
                <WorkoutCard title="Yoga Flow" time="20 min" level="Beginner" img="https://images.unsplash.com/photo-1544367563-121910aa642b?auto=format&fit=crop&w=400&q=80" />
                <WorkoutCard title="HIIT Cardio" time="30 min" level="Advanced" img="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=400&q=80" />
             </div>
          </div>

          {/* Right Col: Schedule */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 h-full">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Today's Plan</h3>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">Leg Day</span>
             </div>
             
             <div className="space-y-2">
                <ExerciseItem name="Warm Up: Treadmill" sets={1} reps="5 mins" done={true} />
                <ExerciseItem name="Barbell Squats" sets={4} reps="12" done={true} />
                <ExerciseItem name="Leg Press" sets={3} reps="10" done={false} />
                <ExerciseItem name="Walking Lunges" sets={3} reps="20" done={false} />
                <ExerciseItem name="Calf Raises" sets={4} reps="15" done={false} />
             </div>

             <div className="mt-8 bg-gray-900 rounded-2xl p-6 text-white text-center">
                <p className="text-gray-400 text-sm mb-2">Weekly Goal</p>
                <div className="flex justify-center items-end gap-2 mb-4">
                   <span className="text-4xl font-bold">4</span>
                   <span className="text-lg text-gray-400">/ 5 days</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                   <div className="bg-blue-500 h-2 w-[80%]"></div>
                </div>
             </div>
          </div>
       </div>
    </Layout>
  );
};

// --- 4. Mental Health Page ---

const MoodButton = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${active ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200 hover:bg-purple-50'}`}
  >
    {icon}
    <span className="text-xs font-bold">{label}</span>
  </button>
);

const MeditationTrack = ({ title, author, time, color }: any) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 hover:shadow-md transition-shadow cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        <Play size={16} className="ml-1" fill="currentColor" />
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-sm group-hover:text-purple-600 transition-colors">{title}</h4>
        <p className="text-xs text-gray-400">{author}</p>
      </div>
    </div>
    <span className="text-xs font-bold text-gray-400">{time}</span>
  </div>
);

export const MentalHealthPage = () => {
  const [mood, setMood] = useState('Happy');

  return (
    <Layout activePage="mental" title="Mental Well-being" subtitle="Take a moment for yourself">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Mood & Stats */}
        <div className="space-y-8">
           <div className="bg-white p-6 rounded-3xl border border-gray-100">
              <h3 className="font-bold text-lg mb-6">How are you feeling?</h3>
              <div className="grid grid-cols-3 gap-4">
                 <MoodButton icon={<Smile size={28}/>} label="Happy" active={mood === 'Happy'} onClick={() => setMood('Happy')} />
                 <MoodButton icon={<Meh size={28}/>} label="Neutral" active={mood === 'Neutral'} onClick={() => setMood('Neutral')} />
                 <MoodButton icon={<Frown size={28}/>} label="Sad" active={mood === 'Sad'} onClick={() => setMood('Sad')} />
              </div>
           </div>

           <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="font-bold text-purple-900">Mindfulness Minutes</h3>
                 <Brain size={20} className="text-purple-400" />
              </div>
              <span className="text-4xl font-bold text-purple-700">145</span>
              <span className="text-sm text-purple-400 ml-2">min this week</span>
              <div className="mt-4 flex gap-1 h-16 items-end">
                 {[40, 20, 60, 30, 80, 45, 10].map((h, i) => (
                    <div key={i} className="flex-1 bg-purple-200 rounded-t-md hover:bg-purple-400 transition-colors" style={{height: `${h}%`}}></div>
                 ))}
              </div>
           </div>
        </div>

        {/* Center & Right: Content */}
        <div className="lg:col-span-2 space-y-8">
           {/* Featured */}
           <div className="bg-teal-700 text-white p-8 rounded-3xl flex items-center justify-between relative overflow-hidden">
              <div className="z-10 max-w-md">
                 <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">Daily Pick</span>
                 <h2 className="text-2xl font-bold mb-2">Breathing for Anxiety</h2>
                 <p className="text-teal-100 text-sm mb-6">A 5-minute session to help you ground yourself and find calm in chaos.</p>
                 <button className="bg-white text-teal-800 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-50 transition-colors">
                    <Play size={18} fill="currentColor" /> Start Session
                 </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
                 <Wind size={200} className="absolute -right-10 -top-10" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                 <h3 className="font-bold text-lg mb-4">Sleep Stories</h3>
                 <div className="space-y-3">
                    <MeditationTrack title="The Blue Forest" author="Dr. Ali" time="25 min" color="bg-blue-100 text-blue-600" />
                    <MeditationTrack title="Ocean Waves" author="Sarah K." time="45 min" color="bg-blue-100 text-blue-600" />
                    <MeditationTrack title="Night Rain" author="Nature Sounds" time="60 min" color="bg-blue-100 text-blue-600" />
                 </div>
              </div>
              <div>
                 <h3 className="font-bold text-lg mb-4">Focus & Clarity</h3>
                 <div className="space-y-3">
                    <MeditationTrack title="Morning Energy" author="Mike T." time="10 min" color="bg-orange-100 text-orange-600" />
                    <MeditationTrack title="Deep Focus" author="Mindful Co." time="30 min" color="bg-orange-100 text-orange-600" />
                    <MeditationTrack title="Pre-Work Reset" author="Emma W." time="5 min" color="bg-orange-100 text-orange-600" />
                 </div>
              </div>
           </div>
        </div>

      </div>
    </Layout>
  );
};