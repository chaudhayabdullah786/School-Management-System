
import React from 'react';
import { Icons } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, theme, toggleTheme }) => {
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
    <aside className="w-20 md:w-72 bg-slate-900 dark:bg-slate-950 text-white flex flex-col h-full transition-all duration-500 shadow-2xl overflow-hidden shrink-0 border-r border-slate-800 dark:border-slate-900">
      <div className="p-8 flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[18px] flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-500/20 rotate-3 transition-transform hover:rotate-0">
          P
        </div>
        <div className="hidden md:block">
          <h1 className="text-xl font-black tracking-tighter italic bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">EduPulse</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500 leading-none">Pakistan Int.</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-[20px] transition-all duration-300 relative group ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 translate-x-1' 
                : 'text-slate-400 hover:bg-slate-800 dark:hover:bg-slate-900/50 hover:text-white hover:translate-x-1'
            }`}
          >
            {activeTab === item.id && (
              <span className="absolute left-2 w-1.5 h-6 bg-white rounded-full animate-in fade-in zoom-in duration-300"></span>
            )}
            <span className={`flex-shrink-0 transition-transform group-hover:scale-110 duration-300 ${activeTab === item.id ? 'scale-110' : ''}`}>
              {item.icon}
            </span>
            <span className="hidden md:block font-black text-[11px] uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 dark:border-slate-900 space-y-3 shrink-0 bg-slate-950/20">
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-[20px] transition-all font-black text-[10px] uppercase tracking-widest"
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707-.707M7.05 7.05l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          )}
          <span className="hidden md:block">{theme === 'light' ? 'Night Shift' : 'Day View'}</span>
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-[20px] transition-all font-black text-[10px] uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden md:block">Exit Terminal</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
