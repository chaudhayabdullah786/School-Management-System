
import React, { useState } from 'react';
import Modal from './Modal';

interface TimetableProps {
  timetable: any[];
  setTimetable: React.Dispatch<React.SetStateAction<any[]>>;
}

const Timetable: React.FC<TimetableProps> = ({ timetable, setTimetable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<{rowIndex: number, day: string, value: string} | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleEditSlot = (rowIndex: number, day: string, value: string) => {
    setEditingSlot({ rowIndex, day, value });
    setIsModalOpen(true);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;
    
    const newTimetable = [...timetable];
    // @ts-ignore - dynamic key access
    newTimetable[editingSlot.rowIndex][editingSlot.day] = editingSlot.value;
    
    setTimetable(newTimetable);
    setIsModalOpen(false);
  };

  const days = ['mon', 'tue', 'wed', 'thu', 'fri'];

  const getSubjectStyles = (subject: string) => {
    switch(subject) {
      case 'Mathematics': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300';
      case 'Physics': return 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-300';
      case 'History': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-700 dark:text-orange-300';
      case 'English': return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-300';
      case 'Urdu': return 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-300';
      case 'Islamiat': return 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300';
      case 'Chemistry': return 'bg-pink-50 dark:bg-pink-900/20 border-pink-500 text-pink-700 dark:text-pink-300';
      case 'Biology': return 'bg-teal-50 dark:bg-teal-900/20 border-teal-500 text-teal-700 dark:text-teal-300';
      default: return 'bg-slate-50 dark:bg-slate-800 border-slate-400 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden printable transition-all animate-in fade-in duration-500">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 no-print bg-slate-50/50 dark:bg-slate-950/20">
        <div>
          <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight">Institutional Calendar</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Grade 10 • Section Alpha • Session 2023-24</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print PDF
          </button>
          <button 
            onClick={() => handleEditSlot(0, 'mon', timetable[0].mon)}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 hover:-translate-y-0.5"
          >
            Modify Slots
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-950/40">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-r border-slate-100 dark:border-slate-800 text-center">Interval</th>
              {days.map(day => (
                <th key={day} className="px-8 py-5 text-[10px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-[0.2em] text-center border-r border-slate-100 dark:border-slate-800 last:border-0">{day}day</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {timetable.map((slot, i) => (
              <tr key={i} className="group transition-colors">
                <td className="px-8 py-8 text-[11px] font-black text-slate-500 dark:text-slate-400 border-r border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20 text-center">
                  {slot.time}
                </td>
                {days.map((day) => {
                  // @ts-ignore
                  const subject = slot[day];
                  return (
                    <td 
                      key={day} 
                      className="px-4 py-4 border-r border-slate-100 dark:border-slate-800 last:border-0 align-top"
                    >
                      {subject === 'Break' ? (
                        <div className="h-full min-h-[80px] flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 animate-pulse-slow">
                           <span className="text-[9px] font-black uppercase tracking-[0.3em] rotate-90 md:rotate-0">Rest Period</span>
                        </div>
                      ) : (
                        <div 
                          onClick={() => handleEditSlot(i, day, subject)}
                          className={`h-full min-h-[80px] p-4 rounded-2xl border-l-4 shadow-sm group-hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 active:scale-[0.98] flex flex-col justify-between ${getSubjectStyles(subject)}`}
                        >
                          <div>
                            <div className="font-black text-xs mb-1 tracking-tight leading-none">{subject}</div>
                            <div className="text-[9px] font-bold opacity-60 uppercase tracking-widest">Professor assigned</div>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-white/40 dark:bg-black/20">RM-302</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-30 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 no-print flex items-center justify-center">
        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Interactive Node: Click any active slot to update the curriculum allocation.
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Allocation Control Center">
        {editingSlot && (
          <form onSubmit={saveEdit} className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Slot Details</p>
              <p className="text-sm font-bold dark:text-white">
                <span className="text-indigo-600 dark:text-indigo-400 uppercase">{editingSlot.day}</span> at {timetable[editingSlot.rowIndex].time}
              </p>
            </div>
            
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2.5 block tracking-widest">Select Course Module</label>
              <select 
                value={editingSlot.value}
                onChange={(e) => setEditingSlot({...editingSlot, value: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold dark:text-white"
              >
                <option>Mathematics</option>
                <option>Physics</option>
                <option>History</option>
                <option>English</option>
                <option>Biology</option>
                <option>Chemistry</option>
                <option>Computer Science</option>
                <option>Urdu</option>
                <option>Islamiat</option>
                <option>Break</option>
              </select>
            </div>
            <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95">
              Sync Schedule to Cloud
            </button>
          </form>
        )}
      </Modal>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .printable { border: none !important; shadow: none !important; margin: 0 !important; width: 100% !important; }
          .dark body { background-color: white !important; }
          .dark .printable { background-color: white !important; color: black !important; }
        }
      `}</style>
    </div>
  );
};

export default Timetable;
