
import React, { useState } from 'react';

interface FeeManagementProps {
  students: any[];
}

const FeeManagement: React.FC<FeeManagementProps> = ({ students }) => {
  const [remindingId, setRemindingId] = useState<string | null>(null);

  const handleSendReminder = (id: string) => {
    setRemindingId(id);
    setTimeout(() => setRemindingId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[32px] shadow-sm overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-950/20">
            <div>
              <h3 className="font-black text-slate-800 dark:text-white text-base uppercase tracking-tight">Financial Receivable Logs</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Pending student dues - Semester 2</p>
            </div>
            <button className="px-5 py-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-100 transition-all">
              View Audit Trail
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                  <th className="px-8 py-5">Account Holder</th>
                  <th className="px-8 py-5">Balance (PKR)</th>
                  <th className="px-8 py-5">Due Date</th>
                  <th className="px-8 py-5">Tier</th>
                  <th className="px-8 py-5 text-center">Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {students.filter(s => s.feesStatus !== 'Paid').map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <img src={student.photo} className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 object-cover" alt="" />
                        <div>
                          <div className="font-black text-slate-800 dark:text-slate-100 text-sm tracking-tight">{student.name}</div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{student.class} • {student.rollNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-700 dark:text-slate-300 tracking-tighter text-sm">Rs. 12,500.00</td>
                    <td className="px-8 py-6 text-[11px] font-bold text-slate-500 tracking-tight">Nov 05, 2023</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest ${
                        student.feesStatus === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {student.feesStatus}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button 
                        onClick={() => handleSendReminder(student.id)}
                        disabled={remindingId === student.id}
                        className={`min-w-[140px] py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all active:scale-95 ${
                          remindingId === student.id 
                          ? 'bg-emerald-500 text-white' 
                          : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800'
                        }`}
                      >
                        {remindingId === student.id ? 'SMS Dispatched' : 'Dispatch Reminder'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-slate-950 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800 group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>

          <div className="relative z-10 space-y-10">
            <div>
              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-indigo-400 mb-6">Strategic Revenue Overview</h3>
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Campus-Wide Collection</span>
                <p className="text-5xl font-black tracking-tighter italic">Rs. 850k</p>
                
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Current Progress</span>
                    <span className="text-emerald-400">84%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Academic Tuition', val: 'Rs. 620k', color: 'bg-indigo-500' },
                { label: 'Transit Services', val: 'Rs. 130k', color: 'bg-emerald-500' },
                { label: 'Board Examination', val: 'Rs. 100k', color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${item.color} group-hover:scale-125 transition-transform`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{item.label}</span>
                  </div>
                  <span className="text-xs font-black tracking-tight">{item.val}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-5 bg-white text-slate-900 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17v-2m3 2v-4m3 2v-6m-9-9H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.414A1 1 0 0017.414 6.707L13.293 2.586A1 1 0 0012.586 2.293H9z" />
              </svg>
              Export Global Ledger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;
