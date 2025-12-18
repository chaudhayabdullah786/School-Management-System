
import React from 'react';
import { Icons } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'students', label: 'Students', icon: Icons.Students },
    { id: 'teachers', label: 'Teachers', icon: Icons.Teachers },
    { id: 'attendance', label: 'Attendance', icon: Icons.Attendance },
    { id: 'timetable', label: 'Timetable', icon: Icons.Timetable },
    { id: 'exams', label: 'Exams & Results', icon: Icons.Exams },
    { id: 'fees', label: 'Fee Mgmt', icon: Icons.Fees },
    { id: 'communication', label: 'Communication', icon: Icons.Communication },
    { id: 'reports', label: 'Reports', icon: Icons.Reports },
    { id: 'ai-insights', label: 'AI Analytics', icon: Icons.AI },
  ];

  return (
    <aside className="w-20 md:w-64 bg-slate-900 text-white flex flex-col h-full transition-all duration-300 shadow-xl overflow-hidden shrink-0">
      <div className="p-6 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30">
          E
        </div>
        <h1 className="hidden md:block text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">EduPulse</h1>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 translate-x-1' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="hidden md:block font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 shrink-0">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-medium text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden md:block">Logout System</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
