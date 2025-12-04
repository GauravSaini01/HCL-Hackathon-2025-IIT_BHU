import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, ShieldCheck, Bell, MessageSquare, ChevronRight, ChevronLeft, Search, Filter, Plus,
  Activity, LayoutDashboard, LogOut, MoreHorizontal
} from 'lucide-react';

// --- Shared Components (Inlined for stability) ---

const StatCard = ({ title, value, icon }: any) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-end justify-between mt-2">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <div className="text-gray-400 mb-1">{icon}</div>
      </div>
    </div>
  );
};

const ProviderSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/provider' },
    { icon: <Users size={20} />, label: 'Patients', path: '/provider/patients' },
  ];

  return (
    <aside className="w-64 bg-blue-600 h-screen fixed left-0 top-0 flex flex-col p-6 z-10 hidden lg:flex text-white">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-1.5 rounded-lg border-2 border-white/20">
           <Activity size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold">Provider Portal</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div 
              key={index} 
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${
                isActive 
                  ? 'bg-white/20 border border-white/10 shadow-sm' 
                  : 'hover:bg-white/10 text-blue-100'
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
          className="flex items-center gap-4 px-4 py-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Log out</span>
        </div>
      </div>
    </aside>
  );
};

const ProviderLayout = ({ children, title, subtitle }: any) => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex text-gray-800">
      <ProviderSidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
             <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
             {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-white rounded-full text-gray-400 hover:text-blue-600 shadow-sm border border-gray-100 transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border-2 border-white shadow-sm cursor-pointer">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Dr Profile" />
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

// --- Mock Data ---
const patients = [
  { id: 'p1', name: 'Akash Kumar', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80', condition: 'Hypertension', status: 'Good', lastVisit: '1 hour ago', heartRate: 78, steps: 10400 },
  { id: 'p2', name: 'Riya Verma', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', condition: 'Anxiety', status: 'Medium', lastVisit: '3 hours ago', heartRate: 85, steps: 6000 },
  { id: 'p3', name: 'Suman Gupta', img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80', condition: 'Diabetes', status: 'Poor', lastVisit: '6 hours ago', heartRate: 92, steps: 3200 },
  { id: 'p4', name: 'Karan Singh', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80', condition: 'Obesity', status: 'Medium', lastVisit: '1 day ago', heartRate: 80, steps: 5500 },
];

const PatientRow = ({ patient, onClick }: { patient: any, onClick: () => void }) => {
  const getStatusColor = (s: string) => {
    switch(s) {
      case 'Good': return 'text-green-500';
      case 'Medium': return 'text-orange-400';
      case 'Poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  const getStatusDot = (s: string) => {
    switch(s) {
      case 'Good': return 'bg-green-500';
      case 'Medium': return 'bg-orange-400';
      case 'Poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div onClick={onClick} className="grid grid-cols-12 items-center py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-6 cursor-pointer group">
      <div className="col-span-5 flex items-center gap-4">
        <img src={patient.img} alt={patient.name} className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" />
        <div>
            <span className="font-bold text-gray-800 text-sm block">{patient.name}</span>
            <span className="text-xs text-gray-400">{patient.condition}</span>
        </div>
      </div>
      <div className="col-span-3 text-gray-500 text-sm">{patient.lastVisit}</div>
      <div className="col-span-3 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${getStatusDot(patient.status)}`}></span>
        <span className={`text-sm font-medium ${getStatusColor(patient.status)}`}>{patient.status}</span>
      </div>
      <div className="col-span-1 flex justify-end">
         <button className="text-gray-400 hover:text-blue-600 transition-colors">
            <MoreHorizontal size={18} />
         </button>
      </div>
    </div>
  );
};

// --- Page 1: Dashboard ---

export const ProviderDashboard = () => {
  const navigate = useNavigate();

  return (
    <ProviderLayout title="Provider Portal" subtitle="Welcome back, Dr. Smith">
      <div className="space-y-8">
        
        {/* 1. Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Patients" value="4" icon={<Users size={24} />} />
            <StatCard title="Compliance Rate" value="78%" icon={<ShieldCheck size={24} className="text-green-500" />} />
            <StatCard title="Critical Alerts" value="3" icon={<Bell size={24} className="text-red-500" />} />
            <StatCard title="New Requests" value="5" icon={<MessageSquare size={24} className="text-blue-500" />} />
        </div>

        {/* 2. Patient List Preview */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">Patient List</h3>
                <button 
                  onClick={() => navigate('/provider/patients')}
                  className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                >
                  View All
                </button>
            </div>
            
            <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 px-6 py-3 bg-gray-50/50 uppercase tracking-wide">
                <div className="col-span-5">Patient Details</div>
                <div className="col-span-3">Last Update</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-1 text-right">Action</div>
            </div>

            <div>
                {patients.map((patient) => (
                    <PatientRow 
                        key={patient.id} 
                        patient={patient} 
                        onClick={() => navigate('/provider/patients')} 
                    />
                ))}
            </div>
        </div>

      </div>
    </ProviderLayout>
  );
};

// --- Page 2: Patients ---

export const ProviderPatients = () => {
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  if (selectedPatient) {
      return (
        <ProviderLayout title="Patient Details" subtitle={`Viewing record for ${selectedPatient.name}`}>
            <button 
                onClick={() => setSelectedPatient(null)}
                className="mb-6 text-sm text-gray-500 hover:text-blue-600 font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white transition-colors"
            >
                <ChevronLeft size={16} /> Back to Patient List
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Patient Header */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <img src={selectedPatient.img} className="w-24 h-24 rounded-full object-cover border-4 border-blue-50" alt={selectedPatient.name} />
                        <div className="text-center sm:text-left flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                            <p className="text-gray-500 text-sm mt-1 mb-3">ID: #{selectedPatient.id.toUpperCase()}</p>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{selectedPatient.condition}</span>
                                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Stable</span>
                            </div>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            Contact
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-red-50 text-red-500 rounded-full"><Activity size={18} /></div>
                                <span className="text-gray-500 text-sm font-medium">Heart Rate</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">{selectedPatient.heartRate} bpm</span>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-50 text-blue-500 rounded-full"><Users size={18} /></div>
                                <span className="text-gray-500 text-sm font-medium">Daily Steps</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">{selectedPatient.steps}</span>
                        </div>
                    </div>

                    {/* Notes Area */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">Doctor's Notes</h3>
                        <textarea className="w-full h-32 p-4 bg-gray-50 rounded-xl border border-gray-200 resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm" placeholder="Add clinical notes for this patient..."></textarea>
                        <div className="flex justify-end mt-4">
                            <button className="bg-gray-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">Save Note</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Action Panel */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 text-lg mb-4">Actions</h3>
                        <div className="space-y-2">
                            <button className="w-full py-3 px-4 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-100 text-left flex justify-between items-center group">
                                View Full History <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                            </button>
                            <button className="w-full py-3 px-4 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-100 text-left flex justify-between items-center group">
                                Edit Care Plan <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                            </button>
                            <button className="w-full py-3 px-4 bg-gray-50 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-100 text-left flex justify-between items-center group">
                                Assign Challenge <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ProviderLayout>
      )
  }

  return (
    <ProviderLayout title="Patients" subtitle="Manage your patient records">
      <div className="bg-white p-1 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96 group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Search patients by name or ID..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
                <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors text-gray-600"><Filter size={20} /></button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    <Plus size={20} /> <span className="text-sm">Add Patient</span>
                </button>
            </div>
        </div>

        {/* Header */}
        <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 px-6 py-4 bg-gray-50/50 uppercase tracking-wide border-b border-gray-50">
            <div className="col-span-5">Patient Name</div>
            <div className="col-span-3">Last Visit</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-1 text-right">Action</div>
        </div>

        {/* List */}
        <div>
            {patients.map((patient) => (
                <PatientRow 
                    key={patient.id} 
                    patient={patient} 
                    onClick={() => setSelectedPatient(patient)} 
                />
            ))}
        </div>
      </div>
    </ProviderLayout>
  );
};