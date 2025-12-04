import React, { useState } from 'react';
import Layout from './Layout'; 
import { Smile, Meh, Frown, Brain, Play, Wind } from 'lucide-react';

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

export default function MentalHealthPage() {
  const [mood, setMood] = useState('Happy');

  return (
    <Layout activePage="mental" title="Mental Well-being" subtitle="Take a moment for yourself">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Mood & Stats */}
        <div className="space-y-8">
           
           {/* Mood Tracker */}
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6 text-gray-800">How are you feeling?</h3>
              <div className="grid grid-cols-3 gap-4">
                 <MoodButton icon={<Smile size={32}/>} label="Happy" active={mood === 'Happy'} onClick={() => setMood('Happy')} />
                 <MoodButton icon={<Meh size={32}/>} label="Neutral" active={mood === 'Neutral'} onClick={() => setMood('Neutral')} />
                 <MoodButton icon={<Frown size={32}/>} label="Sad" active={mood === 'Sad'} onClick={() => setMood('Sad')} />
              </div>
           </div>

           {/* Mindfulness Stats */}
           <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4 relative z-10">
                 <h3 className="font-bold text-purple-900">Mindfulness</h3>
                 <div className="bg-white p-2 rounded-full shadow-sm">
                    <Brain size={20} className="text-purple-500" />
                 </div>
              </div>
              <div className="relative z-10">
                  <span className="text-5xl font-bold text-purple-700">145</span>
                  <span className="text-sm text-purple-400 font-medium ml-2">min / week</span>
              </div>
              
              {/* Simple Bar Graph */}
              <div className="mt-8 flex gap-2 h-20 items-end relative z-10">
                 {[40, 20, 60, 30, 80, 45, 10].map((h, i) => (
                    <div 
                        key={i} 
                        className="flex-1 bg-purple-200 rounded-t-lg hover:bg-purple-400 transition-colors cursor-pointer" 
                        style={{height: `${h}%`}}
                    ></div>
                 ))}
              </div>
              
              {/* Decorative Blob */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
           </div>
        </div>

        {/* Center & Right Columns: Content */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Featured Session (Banner) */}
           <div className="bg-teal-700 text-white p-8 rounded-3xl flex items-center justify-between relative overflow-hidden shadow-xl shadow-teal-100">
              <div className="z-10 max-w-md">
                 <span className="bg-white/20 backdrop-blur-md text-teal-50 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block border border-teal-500/50">Daily Pick</span>
                 <h2 className="text-3xl font-bold mb-3">Breathing for Anxiety</h2>
                 <p className="text-teal-100 text-sm mb-8 leading-relaxed">A 5-minute session to help you ground yourself, clear your mind, and find calm in the chaos.</p>
                 <button className="bg-white text-teal-800 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-50 transition-colors shadow-lg">
                    <Play size={18} fill="currentColor" /> Start Session
                 </button>
              </div>
              {/* Decorative Icon */}
              <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none">
                 <Wind size={300} className="absolute -right-16 -top-16 text-white" />
              </div>
           </div>

           {/* Track Lists */}
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
    </Layout>
  );
}