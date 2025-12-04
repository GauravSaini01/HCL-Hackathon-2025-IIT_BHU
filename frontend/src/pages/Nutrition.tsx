import React from 'react';
import Layout from './Layout'; // Adjust path as needed
import { Flame, Utensils, Droplets, Plus } from 'lucide-react';

const MacroCard = ({ label, value, total, color, icon }: any) => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 flex flex-col justify-between h-36 shadow-sm">
    <div className="flex justify-between items-start">
      <span className="text-gray-400 text-sm font-medium">{label}</span>
      <div className={`p-2 rounded-full ${color.bg} ${color.text}`}>{icon}</div>
    </div>
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-2xl font-bold text-gray-800">{value}g</span>
        <span className="text-xs text-gray-400 font-medium">/ {total}g</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className={`h-2 rounded-full ${color.bar}`} style={{ width: `${(value/total)*100}%` }}></div>
      </div>
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
    <div className="text-right">
      <span className="font-bold text-gray-800 text-lg">{cals}</span>
      <span className="text-xs text-gray-400 block">Kcal</span>
    </div>
  </div>
);

export default function NutritionPage() {
  return (
    <Layout activePage="nutrition" title="Nutrition Plan" subtitle="Track your calories and macros">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Calorie Tracker & Meals */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Hero Calorie Card */}
          <div className="bg-gray-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between shadow-xl shadow-gray-200">
            <div className="z-10 text-center sm:text-left mb-6 sm:mb-0">
              <h2 className="text-4xl font-bold mb-1">1,240 <span className="text-lg font-normal text-gray-400">kcal left</span></h2>
              <p className="text-gray-400 text-sm mb-6">Daily Target: 2,500 kcal</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-900/50">
                Log Meal
              </button>
            </div>
            
            {/* Visual Chart Representation */}
            <div className="relative w-32 h-32 flex items-center justify-center z-10">
               <div className="absolute w-full h-full rounded-full border-8 border-gray-800"></div>
               <div className="absolute w-full h-full rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500 transform -rotate-45"></div>
               <div className="text-center">
                <span className="block text-xl font-bold">50%</span>
              </div>
            </div>
            
            {/* Decorative Background Blur */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Macros Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MacroCard 
                label="Protein" value={110} total={180} 
                color={{bg:'bg-orange-50', text:'text-orange-500', bar:'bg-orange-500'}} 
                icon={<Flame size={18}/>} 
            />
            <MacroCard 
                label="Carbs" value={140} total={250} 
                color={{bg:'bg-blue-50', text:'text-blue-500', bar:'bg-blue-500'}} 
                icon={<Utensils size={18}/>} 
            />
            <MacroCard 
                label="Fat" value={45} total={80} 
                color={{bg:'bg-yellow-50', text:'text-yellow-500', bar:'bg-yellow-500'}} 
                icon={<Droplets size={18}/>} 
            />
          </div>

          {/* Meal List */}
          <div>
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Today's Meals</h3>
                <button className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors">
                    <Plus size={20}/>
                </button>
             </div>
             <div className="space-y-4">
                <MealRow type="Breakfast" name="Oatmeal & Berries" cals={450} time="08:30 AM" img="https://images.unsplash.com/photo-1517093725432-a9391ff46066?auto=format&fit=crop&w=100&q=80" />
                <MealRow type="Lunch" name="Grilled Chicken Salad" cals={620} time="01:15 PM" img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80" />
                <MealRow type="Snack" name="Almonds & Apple" cals={180} time="04:00 PM" img="https://images.unsplash.com/photo-1563729768-6af584667808?auto=format&fit=crop&w=100&q=80" />
             </div>
          </div>
        </div>

        {/* Right Column: Hydration & Suggestions */}
        <div className="space-y-8">
           {/* Hydration Widget */}
           <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 h-72 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="z-10">
                 <h3 className="font-bold text-blue-900 text-lg mb-2">Hydration</h3>
                 <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-5xl font-bold text-blue-600">1.2</span>
                    <span className="text-xl font-medium text-blue-600">L</span>
                 </div>
                 <p className="text-blue-400 text-sm mb-6">Goal: 2.5L</p>
                 <button className="bg-white text-blue-600 p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all">
                    <Plus size={24}/>
                 </button>
              </div>
              {/* Water Wave Animation Simulation */}
              <div className="absolute bottom-0 left-0 w-[200%] h-32 bg-blue-200 opacity-50 rounded-t-[100%] translate-y-10 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-[200%] h-24 bg-blue-300 opacity-50 rounded-t-[100%] translate-y-8 animate-pulse delay-75"></div>
           </div>

           {/* Recipe Card */}
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Recommended</h3>
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
                 <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" alt="Recipe" />
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                    <p className="text-white font-bold text-lg">Avocado Toast</p>
                    <p className="text-gray-200 text-xs mt-1">350 Kcal • 10 min prep</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
}