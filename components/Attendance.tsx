
import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../constants';

const Attendance: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10A');
  const [records, setRecords] = useState(
    MOCK_STUDENTS.reduce((acc, student) => ({ ...acc, [student.id]: 'Present' }), {})
  );

  const toggleStatus = (id: string) => {
    setRecords(prev => ({
      ...prev,
      [id]: prev[id] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-500 font-bold uppercase">Present</p>
            <p className="text-lg font-bold text-green-600">{Object.values(records).filter(v => v === 'Present').length}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-bold uppercase">Absent</p>
            <p className="text-lg font-bold text-red-500">{Object.values(records).filter(v => v === 'Absent').length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-x divide-y divide-slate-100 border-b border-slate-100">
        {MOCK_STUDENTS.map((student) => (
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
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                records[student.id] === 'Present' 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {records[student.id]}
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-50 flex justify-end">
        <button className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
          Save Attendance Report
        </button>
      </div>
    </div>
  );
};

export default Attendance;
