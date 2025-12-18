
import React, { useState, useEffect } from 'react';
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
import Login from './components/Login';
import { MOCK_STUDENTS, MOCK_TEACHERS, MOCK_ANNOUNCEMENTS, MOCK_TIMETABLE } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Centralized State
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [teachers, setTeachers] = useState(MOCK_TEACHERS);
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);
  const [timetable, setTimetable] = useState(MOCK_TIMETABLE);
  const [globalSearch, setGlobalSearch] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Handle Login/Logout
  const handleLogin = (user: any, userRole: UserRole) => {
    setCurrentUser(user);
    setRole(userRole);
    setIsLoggedIn(true);
  };

  const handleSignup = (newTeacher: any) => {
    setTeachers(prev => [newTeacher, ...prev]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} onSignup={handleSignup} teachers={teachers} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard students={students} teachers={teachers} theme={theme} />;
      case 'students':
        return <StudentList students={students} setStudents={setStudents} />;
      case 'teachers':
        return <TeacherList teachers={teachers} setTeachers={setTeachers} />;
      case 'attendance':
        return <Attendance students={students} />;
      case 'fees':
        return <FeeManagement students={students} />;
      case 'timetable':
        return <Timetable timetable={timetable} setTimetable={setTimetable} />;
      case 'exams':
        return <Exams students={students} setStudents={setStudents} />;
      case 'communication':
        return <Communication announcements={announcements} setAnnouncements={setAnnouncements} students={students} />;
      case 'reports':
        return <Reports />;
      case 'ai-insights':
        return <AIInsights students={students} />;
      default:
        return <Dashboard students={students} teachers={teachers} theme={theme} />;
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} selection:bg-indigo-500 selection:text-white`}>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-500">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-8 sticky top-0 z-10 transition-all">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-black text-slate-800 dark:text-white capitalize tracking-tight">
                {activeTab.split('-').join(' ')}
              </h2>
              <div className="hidden lg:flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">EduPulse Excellence</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative group hidden sm:block">
                <input 
                  type="text" 
                  placeholder="Global search..." 
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-[11px] font-bold focus:ring-2 focus:ring-indigo-500 w-48 md:w-64 transition-all dark:text-slate-200 outline-none"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3.5 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-6 h-8">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 leading-none mb-1">
                    {currentUser?.name || 'Admin'}
                  </span>
                  <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">{role}</span>
                </div>
                <div className="relative group">
                  <img 
                    src={currentUser?.photo || "https://picsum.photos/seed/admin/40"} 
                    className="w-10 h-10 rounded-2xl border border-slate-200 dark:border-slate-700 ring-4 ring-slate-100 dark:ring-slate-800 cursor-pointer group-hover:scale-105 transition-transform"
                    alt="Avatar"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50 dark:bg-slate-950/50 scroll-smooth">
            <div key={activeTab} className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
