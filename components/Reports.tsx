
import React, { useState, useRef } from 'react';

const reportTypes = [
  { id: '1', name: 'Academic Merit List', desc: 'Top performing students across Urdu and Math departments.', color: 'bg-indigo-50 text-indigo-600' },
  { id: '2', name: 'Attendance Consolidation', desc: 'Monthly summary of Nursery to Class 10 presence.', color: 'bg-emerald-50 text-emerald-600' },
  { id: '3', name: 'Revenue Health (PKR)', desc: 'Financial forecast and dues collection tracker.', color: 'bg-amber-50 text-amber-600' },
  { id: '4', name: 'Staff Utilization', desc: 'Teacher workload and curriculum progress report.', color: 'bg-purple-50 text-purple-600' },
];

const Reports: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [reportReady, setReportReady] = useState(false);
  const genSectionRef = useRef<HTMLDivElement>(null);

  const startGeneration = (reportName: string = "Comprehensive System Report") => {
    setIsGenerating(true);
    setReportReady(false);
    setProgress(0);
    setActiveReport(reportName);
    
    // Smooth scroll to the intelligence section
    genSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setReportReady(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const downloadFile = (format: 'pdf' | 'excel') => {
    const filename = `${activeReport?.replace(/\s+/g, '_').toLowerCase() || 'report'}_${new Date().toISOString().split('T')[0]}.${format === 'pdf' ? 'pdf' : 'csv'}`;
    const dummyContent = format === 'pdf' ? 
      "%PDF-1.4\n1 0 obj\n<< /Title (Institutional Report) >>\nendobj" : 
      "Student ID,Name,Grade,Result\nPAK-001,Zainab Ahmed,10A,A+";
    
    const blob = new Blob([dummyContent], { type: format === 'pdf' ? 'application/pdf' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all group flex flex-col justify-between hover:-translate-y-1">
            <div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${report.color}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 2v-6m-9-9H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.414A1 1 0 0017.414 6.707L13.293 2.586A1 1 0 0012.586 2.293H9z" />
                </svg>
              </div>
              <h4 className="font-black text-slate-800 dark:text-white text-base mb-3 leading-tight">{report.name}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-8 font-bold uppercase tracking-tighter">
                {report.desc}
              </p>
            </div>
            <button 
              disabled={isGenerating}
              onClick={() => startGeneration(report.name)}
              className="w-full py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Get Document
            </button>
          </div>
        ))}
      </div>

      <div 
        ref={genSectionRef}
        className="bg-slate-900 dark:bg-slate-950 rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800"
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl w-full">
            <span className="inline-block px-4 py-1.5 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-indigo-500/20">
              Institutional Intelligence
            </span>
            <h2 className="text-4xl font-black mb-6 leading-tight">
              {reportReady ? 'Your Report is Ready' : isGenerating ? 'Preparing Document...' : 'System-Wide Excellence Report'}
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
              {activeReport ? `Compiling data for: ${activeReport}` : 'Select a module above or click the button below to generate a holistic Pakistani curriculum alignment report including all grades from Nursery to Class 10.'}
            </p>
            
            {isGenerating ? (
              <div className="w-full space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-indigo-400">
                   <span>Processing Campus Database</span>
                   <span>{progress}%</span>
                </div>
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 shadow-inner p-1">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/50" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs font-bold text-slate-500 italic">Syncing result sheets, attendance logs, and financial records for Pakistan Int. School...</p>
              </div>
            ) : reportReady ? (
              <div className="flex flex-wrap gap-4 animate-in zoom-in duration-300">
                <button 
                  onClick={() => downloadFile('pdf')}
                  className="px-10 py-4 bg-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF Report
                </button>
                <button 
                  onClick={() => downloadFile('excel')}
                  className="px-10 py-4 bg-white/5 rounded-2xl border border-white/10 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export to CSV/Excel
                </button>
                <button 
                  onClick={() => { setReportReady(false); setActiveReport(null); }}
                  className="px-6 py-4 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <button 
                  onClick={() => startGeneration()}
                  className="px-12 py-5 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/40 hover:-translate-y-1 active:scale-95"
                >
                  Execute Strategic Analysis
                </button>
              </div>
            )}
          </div>
          
          <div className="hidden lg:flex w-[400px] h-80 bg-slate-800/50 dark:bg-slate-900 rounded-[50px] border border-white/10 items-center justify-center relative shadow-2xl group overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
             </div>
             <div className="text-center relative z-10 px-8">
                <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4">Pakistan School System</p>
                <p className="text-3xl font-black tracking-tight leading-none italic mb-2">Institutional Report</p>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Session 2023-24</p>
                <div className="mt-8 flex justify-center gap-2">
                   {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>)}
                </div>
             </div>
          </div>
        </div>
        
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Reports;
