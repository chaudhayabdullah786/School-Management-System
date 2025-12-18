
import React, { useState } from 'react';
import Modal from './Modal';

interface ExamsProps {
  students: any[];
  setStudents: React.Dispatch<React.SetStateAction<any[]>>;
}

const Exams: React.FC<ExamsProps> = ({ students, setStudents }) => {
  const [examList, setExamList] = useState([
    { id: 1, name: 'Final Term Assessment', subject: 'Mathematics', date: '2023-11-15', duration: '3 Hours', status: 'Scheduled', room: 'Hall A' },
    { id: 2, name: 'Mid-Term Review', subject: 'Urdu', date: '2023-11-18', duration: '2 Hours', status: 'Pending Approval', room: 'Lab 2' },
    { id: 3, name: 'Unit Test 4', subject: 'English Literature', date: '2023-11-20', duration: '1.5 Hours', status: 'Scheduled', room: 'Room 101' },
  ]);

  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isSubmittingGrade, setIsSubmittingGrade] = useState(false);
  const [newExam, setNewExam] = useState({
    name: '',
    subject: 'Mathematics',
    date: '',
    duration: '2 Hours',
    room: 'Hall B'
  });

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [assessment, setAssessment] = useState('Unit Test 1');
  const [marks, setMarks] = useState('');
  const [totalMarks, setTotalMarks] = useState('100');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleScheduleExam = (e: React.FormEvent) => {
    e.preventDefault();
    const exam = {
      ...newExam,
      id: Date.now(),
      status: 'Scheduled'
    };
    setExamList([exam, ...examList]);
    setIsAddExamModalOpen(false);
    setNewExam({ name: '', subject: 'Mathematics', date: '', duration: '2 Hours', room: 'Hall B' });
    setToastMsg('New Exam Scheduled Successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmitGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !marks || !totalMarks) return;

    setIsSubmittingGrade(true);
    
    // Simulate a bit of processing delay for professional feel
    setTimeout(() => {
      const numericMarks = parseFloat(marks);
      const numericTotal = parseFloat(totalMarks);
      const percentage = (numericMarks / numericTotal) * 100;
      const newGpa = parseFloat(((percentage / 100) * 4.0).toFixed(2));

      setStudents(prev => prev.map(s => {
        if (s.id === selectedStudentId) {
          return {
            ...s,
            gpa: newGpa,
            lastExam: `${assessment} (${marks}/${totalMarks})`,
          };
        }
        return s;
      }));

      setIsSubmittingGrade(false);
      setToastMsg(`Result synced for ${students.find(s => s.id === selectedStudentId)?.name}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setMarks('');
    }, 1000);
  };

  return (
    <div className="space-y-6 relative animate-in fade-in duration-500">
      {showToast && (
        <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-slate-700 dark:border-slate-200">
            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
            </div>
            {toastMsg}
          </div>
        </div>
      )}

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
            <div>
              <h3 className="font-black text-slate-800 dark:text-white text-base uppercase tracking-widest">Exam Schedule</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Nursery to Class 10 Central Calendar</p>
            </div>
            <button 
              onClick={() => setIsAddExamModalOpen(true)}
              className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none hover:-translate-y-0.5 active:scale-95"
            >
              Schedule New Exam
            </button>
          </div>
          <div className="p-8 divide-y divide-slate-100 dark:divide-slate-800 flex-1 overflow-y-auto scrollbar-hide">
            {examList.map((exam) => (
              <div key={exam.id} className="py-6 flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-tighter">{exam.date ? new Date(exam.date).toLocaleString('default', { month: 'short' }) : 'Nov'}</span>
                    <span className="text-2xl font-black leading-none">{exam.date ? new Date(exam.date).getDate() : '15'}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 dark:text-slate-100 text-base">{exam.name}</h4>
                    <p className="text-xs text-slate-500 font-medium tracking-tight mt-1">
                      <span className="text-indigo-600 font-bold uppercase tracking-widest text-[9px] mr-2">{exam.subject}</span>
                      {exam.duration} • Room {exam.room}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    exam.status === 'Scheduled' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {exam.status}
                  </span>
                  <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full xl:w-[450px] bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
               </svg>
            </div>
            <div>
              <h3 className="font-black text-slate-800 dark:text-white text-lg">Grade Entry Portal</h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Pakistan Int. Excellence System</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmitGrade} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2.5 block tracking-widest">Student Profile</label>
              <select 
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none dark:text-slate-200 transition-all"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} (Roll: {s.rollNumber})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2.5 block tracking-widest">Assessment Module</label>
              <select 
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none dark:text-slate-200 transition-all"
              >
                <option>Unit Test 1</option>
                <option>Unit Test 2</option>
                <option>Mid-Term Exam</option>
                <option>Final Examination</option>
                <option>Practical Viva</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2.5 block tracking-widest">Score Data (Obtained / Total)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  placeholder="85" 
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="flex-1 px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-black outline-none dark:text-slate-200 focus:ring-4 focus:ring-indigo-500/10 transition-all" 
                  required
                />
                <span className="text-slate-300 font-black text-xl">/</span>
                <input 
                  type="number" 
                  placeholder="100" 
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="flex-1 px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-black outline-none dark:text-slate-200 focus:ring-4 focus:ring-indigo-500/10 transition-all" 
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={isSubmittingGrade}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-2xl shadow-indigo-600/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmittingGrade ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Syncing Result...
                </>
              ) : 'Post Result to Records'}
            </button>
            <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-800">
              <p className="text-[10px] text-center text-amber-700 dark:text-amber-500 leading-relaxed font-bold italic">
                Notice: Marks will be immediately visible on Parent App dashboards. Academic stats recalculate on submission.
              </p>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={isAddExamModalOpen} onClose={() => setIsAddExamModalOpen(false)} title="New Examination Schedule">
        <form onSubmit={handleScheduleExam} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Exam Title</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Mathematics Monthly Test"
              value={newExam.name}
              onChange={(e) => setNewExam({...newExam, name: e.target.value})}
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Subject</label>
              <select 
                value={newExam.subject}
                onChange={(e) => setNewExam({...newExam, subject: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              >
                <option>Mathematics</option>
                <option>Urdu</option>
                <option>Science</option>
                <option>English</option>
                <option>Computer</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Date</label>
              <input 
                type="date" 
                required
                value={newExam.date}
                onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Duration</label>
              <input 
                type="text" 
                placeholder="2 Hours"
                value={newExam.duration}
                onChange={(e) => setNewExam({...newExam, duration: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Hall No.</label>
              <input 
                type="text" 
                placeholder="Hall B"
                value={newExam.room}
                onChange={(e) => setNewExam({...newExam, room: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white" 
              />
            </div>
          </div>
          <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
            Confirm & Broadcast Schedule
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Exams;
