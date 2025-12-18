
import React, { useState } from 'react';

interface AttendanceProps {
  students: any[];
}

const Attendance: React.FC<AttendanceProps> = ({ students }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const classList = ['Nursery', 'KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];

  const [records, setRecords] = useState(
    students.reduce((acc, student) => ({ ...acc, [student.id]: 'Present' }), {})
  );

  const toggleStatus = (id: string) => {
    setRecords(prev => ({
      ...prev,
      [id]: prev[id] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const saveAttendance = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToastMessage('Attendance Register Sync Completed!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const exportToExcel = () => {
    const headers = ['Student ID', 'Name', 'Status', 'Date'];
    const rows = students.map(s => [
      s.rollNumber,
      s.name,
      records[s.id] || 'Present',
      date
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `attendance_${selectedClass}_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('CSV Ledger Downloaded Successfully');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm overflow-hidden relative border border-slate-200 dark:border-slate-800 animate-in fade-in duration-500">
      {showToast && (
        <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {toastMessage}
          </div>
        </div>
      )}

      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="flex flex-wrap gap-4 items-center">
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold dark:text-white shadow-sm" 
          />
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold dark:text-white shadow-sm cursor-pointer"
          >
            {classList.map(cls => <option key={cls} value={cls}>{cls}</option>)}
          </select>
          <button 
            onClick={exportToExcel}
            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Excel Export
          </button>
        </div>
        <div className="flex gap-10">
          <div className="text-right">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Present Capacity</p>
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-500 tracking-tighter leading-none">
              {Object.entries(records).filter(([id, val]) => val === 'Present').length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Total Absentees</p>
            <p className="text-3xl font-black text-red-500 dark:text-red-400 tracking-tighter leading-none">
              {Object.entries(records).filter(([id, val]) => val === 'Absent').length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 dark:bg-slate-800">
        {students.map((student) => (
          <div key={student.id} className="p-8 flex items-center justify-between bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={student.photo} className="w-14 h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 object-cover shadow-sm transition-transform group-hover:scale-105" alt="" />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 ${records[student.id] === 'Present' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
              </div>
              <div>
                <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm tracking-tight leading-tight">{student.name}</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Roll: {student.rollNumber}</p>
              </div>
            </div>
            <button
              onClick={() => toggleStatus(student.id)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all shadow-xl active:scale-90 hover:-translate-y-1 ${
                records[student.id] === 'Present' 
                ? 'bg-emerald-600 text-white shadow-emerald-600/20' 
                : 'bg-red-600 text-white shadow-red-600/20'
              }`}
            >
              {records[student.id] || 'Present'}
            </button>
          </div>
        ))}
      </div>

      <div className="p-10 bg-slate-50 dark:bg-slate-950 flex justify-end border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={saveAttendance}
          disabled={isSaving}
          className="px-12 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[24px] hover:bg-indigo-700 shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-4"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Finalizing Ledger...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Confirm Daily Register
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Attendance;
