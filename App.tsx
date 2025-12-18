
import React, { useState } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import FeeManagement from './components/FeeManagement';
import Attendance from './components/Attendance';
import AIInsights from './components/AIInsights';
import Timetable from './components/Timetable';
import Exams from './components/Exams';
import Communication from './components/Communication';
import Reports from './components/Reports';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentList />;
      case 'teachers':
        return <TeacherList />;
      case 'attendance':
        return <Attendance />;
      case 'fees':
        return <FeeManagement />;
      case 'timetable':
        return <Timetable />;
      case 'exams':
        return <Exams />;
      case 'communication':
        return <Communication />;
      case 'reports':
        return <Reports />;
      case 'ai-insights':
        return <AIInsights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 capitalize">
              {activeTab.split('-').join(' ')}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden sm:block">
              <input 
                type="text" 
                placeholder="Global search..." 
                className="pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-xs focus:ring-2 focus:ring-indigo-500 w-48 md:w-64 transition-all"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3.5 top-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-semibold text-slate-700 leading-none mb-1">Admin User</span>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{role}</span>
              </div>
              <img 
                src="https://picsum.photos/seed/admin/40" 
                className="w-10 h-10 rounded-xl border border-slate-200 ring-2 ring-slate-100"
                alt="Avatar"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-[1600px] mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
