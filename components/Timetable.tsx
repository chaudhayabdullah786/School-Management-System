
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden printable">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Weekly Class Schedule</h3>
          <p className="text-sm text-slate-500">Grade 10 - Section A (2023-24)</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
          <button 
            onClick={() => handleEditSlot(0, 'mon', timetable[0].mon)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Manage Schedule
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100">Time</th>
              {days.map(day => (
                <th key={day} className="px-6 py-4 text-xs font-bold text-slate-800 uppercase tracking-widest capitalize">{day}day</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {timetable.map((slot, i) => (
              <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-6 text-sm font-bold text-slate-500 border-r border-slate-100 bg-slate-50/30">
                  {slot.time}
                </td>
                {days.map((day) => {
                  // @ts-ignore
                  const subject = slot[day];
                  return (
                    <td 
                      key={day} 
                      className="px-6 py-6 cursor-pointer"
                      onClick={() => handleEditSlot(i, day, subject)}
                    >
                      {subject === 'Break' ? (
                        <div className="bg-slate-100 text-slate-400 py-1.5 px-3 rounded-lg text-[10px] font-black uppercase text-center tracking-widest">
                          Short Interval
                        </div>
                      ) : (
                        <div className={`p-3 rounded-xl border-l-4 shadow-sm group-hover:shadow-md transition-all ${
                          subject === 'Mathematics' ? 'bg-blue-50 border-blue-500 text-blue-700' :
                          subject === 'Physics' ? 'bg-purple-50 border-purple-500 text-purple-700' :
                          subject === 'History' ? 'bg-orange-50 border-orange-500 text-orange-700' :
                          subject === 'English' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' :
                          'bg-slate-50 border-slate-400 text-slate-700'
                        }`}>
                          <div className="font-bold text-xs mb-1">{subject}</div>
                          <div className="text-[10px] opacity-70 flex items-center gap-1">
                            Room 302
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
      
      <div className="p-6 bg-slate-50 border-t border-slate-100 no-print">
        <div className="flex items-center gap-2 text-xs text-slate-500 italic">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tip: Click any cell to edit the subject for that time slot.
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Timetable Slot">
        {editingSlot && (
          <form onSubmit={saveEdit} className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-4 font-medium">Editing <b>{editingSlot.day.toUpperCase()}</b> slot at <b>{timetable[editingSlot.rowIndex].time}</b></p>
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Subject Name</label>
              <select 
                value={editingSlot.value}
                onChange={(e) => setEditingSlot({...editingSlot, value: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Mathematics</option>
                <option>Physics</option>
                <option>History</option>
                <option>English</option>
                <option>Biology</option>
                <option>Chemistry</option>
                <option>Computer Science</option>
                <option>Break</option>
              </select>
            </div>
            <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Save Slot Changes
            </button>
          </form>
        )}
      </Modal>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .printable { border: none !important; shadow: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Timetable;
