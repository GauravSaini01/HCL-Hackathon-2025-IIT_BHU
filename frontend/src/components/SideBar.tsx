import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Activity, Moon, Utensils, Dumbbell, Brain, 
  LogOut, Sun 
} from 'lucide-react';

const SideBar = () => {
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

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 flex flex-col p-6 z-20 hidden lg:flex">
      {/* Logo Section - Ensures Wellness Logo is always visible */}
      <div className="flex items-center gap-3 mb-10 text-blue-600">
        <div className="p-2 bg-blue-100 rounded-full">
          <Activity size={24} className="text-blue-600" />
        </div>
        <span className="text-2xl font-bold text-gray-800">Wellness</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              onClick={() => handleClick(item.path)}
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

      {/* Footer Actions */}
      <div className="space-y-6 mt-auto">
        <div 
            onClick={() => navigate('/provider')}
            className="flex items-center gap-4 px-4 py-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        >
          <LogOut size={20} />
          <span>Switch to Provider</span>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Sun size={20} />
            <span className="text-sm">Light mode</span>
          </div>
          {/* Mock Toggle Switch */}
          <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
            <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;