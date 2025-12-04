import React from 'react';
import Layout from './Layout'; // Adjust path as needed
import { Activity, Play, Check, ChevronRight } from 'lucide-react';

const WorkoutCard = ({ title, time, level, img }: any) => (
  <div className="relative rounded-3xl overflow-hidden h-52 group cursor-pointer shadow-sm hover:shadow-2xl transition-all">
    <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-center">
      <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 border border-white/10">{level}</span>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="flex items-center gap-2 text-gray-200 text-sm mb-4">
        <Activity size={16} className="text-blue-400" /> 
        <span className="font-medium">{time}</span>
      </div>
      <button className="bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-lg">
        <Play size={18} fill="currentColor" className="ml-1" />
      </button>
    </div>
  </div>
);

const ExerciseItem = ({ name, sets, reps, done }: any) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl">
     <div>
       <h4 className={`font-bold text-sm ${done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{name}</h4>
       <p className="text-xs text-gray-400 mt-1">{sets} Sets x {reps} Reps</p>
     </div>
     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${done ? 'bg-blue-600 border-blue-600' : 'border-gray-200 hover:border-blue-400'}`}>
        {done && <Check size={14} className="text-white" />}
     </div>
  </div>
);

export default function FitnessPage() {
  return (
    <Layout activePage="fitness" title="Fitness Studio" subtitle="Your workout plan for today">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Recommendations */}
          <div className="lg:col-span-2 space-y-8">
             <div className="flex justify-between items-end">
                <h3 className="font-bold text-gray-800 text-xl">Recommended for you</h3>
                <div className="flex gap-2">
                   <button className="p-2 rounded-full bg-white border border-gray-100 hover:bg-gray-50 shadow-sm text-gray-400 hover:text-gray-600"><ChevronRight size={20} className="rotate-180"/></button>
                   <button className="p-2 rounded-full bg-white border border-gray-100 hover:bg-gray-50 shadow-sm text-gray-400 hover:text-gray-600"><ChevronRight size={20}/></button>
                </div>
             </div>
             
             {/* Main Featured Workout */}
             <WorkoutCard title="Upper Body Power" time="45 min" level="Intermediate" img="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80" />
             
             {/* Secondary Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WorkoutCard title="Yoga Flow" time="20 min" level="Beginner" img="https://images.unsplash.com/photo-1544367563-121910aa642b?auto=format&fit=crop&w=400&q=80" />
                <WorkoutCard title="HIIT Cardio" time="30 min" level="Advanced" img="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=400&q=80" />
             </div>
          </div>

          {/* Right Column: Today's Schedule */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 h-full flex flex-col shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Today's Plan</h3>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">Leg Day</span>
             </div>
             
             <div className="space-y-1 flex-1">
                <ExerciseItem name="Warm Up: Treadmill" sets={1} reps="5 mins" done={true} />
                <ExerciseItem name="Barbell Squats" sets={4} reps="12" done={true} />
                <ExerciseItem name="Leg Press" sets={3} reps="10" done={false} />
                <ExerciseItem name="Walking Lunges" sets={3} reps="20" done={false} />
                <ExerciseItem name="Calf Raises" sets={4} reps="15" done={false} />
             </div>

             {/* Weekly Progress Mini Widget */}
             <div className="mt-8 bg-gray-900 rounded-2xl p-6 text-white text-center shadow-xl shadow-gray-200">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Weekly Streak</p>
                <div className="flex justify-center items-end gap-2 mb-4">
                   <span className="text-4xl font-bold">4</span>
                   <span className="text-lg text-gray-400 font-medium">/ 5 days</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                   <div className="bg-blue-500 h-2 rounded-full w-[80%] shadow-[0_0_10px_#3b82f6]"></div>
                </div>
             </div>
          </div>
       </div>
    </Layout>
  );
}
