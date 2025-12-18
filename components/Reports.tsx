
import React from 'react';

const reportTypes = [
  { id: '1', name: 'Academic Performance Index', desc: 'Overall GPA and grading trends across classes.', color: 'bg-indigo-50 text-indigo-600' },
  { id: '2', name: 'Attendance Consolidation', desc: 'Monthly attendance reports for students and staff.', color: 'bg-emerald-50 text-emerald-600' },
  { id: '3', name: 'Fee Collection Analysis', desc: 'Financial health, pending dues and collection forecast.', color: 'bg-amber-50 text-amber-600' },
  { id: '4', name: 'Teacher Workload & Progress', desc: 'Syllabus coverage and teacher efficiency metrics.', color: 'bg-purple-50 text-purple-600' },
];

const Reports: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-100 transition-all group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${report.color}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 2v-6m-9-9H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.414A1 1 0 0017.414 6.707L13.293 2.586A1 1 0 0012.586 2.293H9z" />
              </svg>
            </div>
            <h4 className="font-bold text-slate-800 mb-2">{report.name}</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              {report.desc}
            </p>
            <button className="w-full py-2.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-lg">
            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Enterprise Feature</span>
            <h2 className="text-3xl font-black mb-4">AI-Generated Quarterly Insight Report</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Our AI engine will process all academic, financial, and behavioral data to generate a 20-page strategic report for school management.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30">Generate Now</button>
              <button className="px-8 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-all">Schedule Monthly</button>
            </div>
          </div>
          <div className="w-full lg:w-96 h-64 bg-slate-800 rounded-2xl border border-white/10 flex items-center justify-center relative shadow-inner">
             <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <svg className="w-48 h-48 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
             </div>
             <div className="text-center">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Last Report</p>
                <p className="text-xl font-bold">Sept 2023</p>
                <p className="text-emerald-400 font-bold text-sm mt-4">+14% Growth</p>
             </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Reports;
