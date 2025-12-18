
import React, { useState } from 'react';

interface AttendanceProps {
  students: any[];
}

const Attendance: React.FC<AttendanceProps> = ({ students }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10A');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
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
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden relative">
      {showToast && (
        <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Attendance Saved Successfully!
          </div>
        </div>
      )}

      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex gap-4 items-center">
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
          />
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="10A">Grade 10-A</option>
            <option value="10B">Grade 10-B</option>
            <option value="11A">Grade 11-A</option>
          </select>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Present</p>
            <p className="text-2xl font-black text-green-600 leading-none">
              {Object.entries(records).filter(([id, val]) => students.some(s => s.id === id) && val === 'Present').length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Absent</p>
            <p className="text-2xl font-black text-red-500 leading-none">
              {Object.entries(records).filter(([id, val]) => students.some(s => s.id === id) && val === 'Absent').length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-y divide-slate-100 border-b border-slate-100">
        {students.map((student) => (
          <div key={student.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <img src={student.photo} className="w-10 h-10 rounded-full border border-slate-100" alt="" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                <p className="text-xs text-slate-500">Roll: {student.rollNumber}</p>
              </div>
            </div>
            <button
              onClick={() => toggleStatus(student.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all shadow-sm ${
                records[student.id] === 'Present' 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {records[student.id] || 'Present'}
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-50 flex justify-end">
        <button 
          onClick={saveAttendance}
          disabled={isSaving}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : 'Finalize Attendance Record'}
        </button>
      </div>
    </div>
  );
};

export default Attendance;
