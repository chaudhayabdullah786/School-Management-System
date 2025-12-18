
import React from 'react';

const exams = [
  { id: 1, name: 'Final Term Assessment', subject: 'Calculus III', date: '2023-11-15', duration: '3 Hours', status: 'Scheduled', room: 'Hall A' },
  { id: 2, name: 'Mid-Term Review', subject: 'Advanced Physics', date: '2023-11-18', duration: '2 Hours', status: 'Pending Approval', room: 'Lab 2' },
  { id: 3, name: 'Unit Test 4', subject: 'English Literature', date: '2023-11-20', duration: '1.5 Hours', status: 'Scheduled', room: 'Room 101' },
  { id: 4, name: 'Practicals', subject: 'Inorganic Chemistry', date: '2023-11-25', duration: '4 Hours', status: 'Scheduled', room: 'Chemistry Lab' },
];

const Exams: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Exam Calendar</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Icons.AI /></button>
            </div>
          </div>
          <div className="p-6 divide-y divide-slate-100">
            {exams.map((exam) => (
              <div key={exam.id} className="py-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex flex-col items-center justify-center text-indigo-600">
                    <span className="text-[10px] font-black uppercase">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-bold leading-none">{new Date(exam.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{exam.name}</h4>
                    <p className="text-xs text-slate-500">{exam.subject} • {exam.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-slate-700">{exam.room}</p>
                    <span className={`text-[10px] font-black uppercase ${exam.status === 'Scheduled' ? 'text-green-500' : 'text-orange-500'}`}>
                      {exam.status}
                    </span>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50 text-center">
            <button className="text-sm font-bold text-indigo-600 hover:underline">Schedule New Exam</button>
          </div>
        </div>

        <div className="w-full md:w-80 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-6">Quick Grade Entry</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Student Name</label>
              <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Alex Thompson</option>
                <option>Maria Garcia</option>
                <option>James Wilson</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Assessment</label>
              <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Mathematics Unit Test</option>
                <option>History Mid-Term</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Marks Obtained / Total</label>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="85" className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                <span className="text-slate-400">/</span>
                <input type="number" placeholder="100" className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
              </div>
            </div>
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
              Submit Marks
            </button>
            <p className="text-[10px] text-center text-slate-400 leading-relaxed italic">
              Results will be automatically shared with parents via portal and push notifications once approved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Icons = {
  AI: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
};

export default Exams;
