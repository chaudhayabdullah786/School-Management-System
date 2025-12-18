
import React from 'react';
import { MOCK_TIMETABLE } from '../constants';

const Timetable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Weekly Class Schedule</h3>
          <p className="text-sm text-slate-500">Grade 10 - Section A (2023-24)</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Edit Schedule
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100">Time</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-800 uppercase tracking-widest">Monday</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-800 uppercase tracking-widest">Tuesday</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-800 uppercase tracking-widest">Wednesday</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-800 uppercase tracking-widest">Thursday</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-800 uppercase tracking-widest">Friday</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_TIMETABLE.map((slot, i) => (
              <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-6 text-sm font-bold text-slate-500 border-r border-slate-100 bg-slate-50/30">
                  {slot.time}
                </td>
                {[slot.mon, slot.tue, slot.wed, slot.thu, slot.fri].map((subject, idx) => (
                  <td key={idx} className="px-6 py-6">
                    {subject === 'Break' ? (
                      <div className="bg-slate-100 text-slate-400 py-1.5 px-3 rounded-lg text-[10px] font-black uppercase text-center tracking-widest">
                        Short Interval
                      </div>
                    ) : (
                      <div className={`p-3 rounded-xl border-l-4 shadow-sm ${
                        subject === 'Mathematics' ? 'bg-blue-50 border-blue-500 text-blue-700' :
                        subject === 'Physics' ? 'bg-purple-50 border-purple-500 text-purple-700' :
                        subject === 'History' ? 'bg-orange-50 border-orange-500 text-orange-700' :
                        subject === 'English' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' :
                        'bg-slate-50 border-slate-400 text-slate-700'
                      }`}>
                        <div className="font-bold text-xs mb-1">{subject}</div>
                        <div className="text-[10px] opacity-70 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Room 302
                        </div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-slate-50 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500 italic">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Conflicts detected: None. Schedule is optimized for classroom occupancy.
        </div>
      </div>
    </div>
  );
};

export default Timetable;
