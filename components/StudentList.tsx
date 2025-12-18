
import React, { useState, useRef } from 'react';
import Modal from './Modal';

interface StudentListProps {
  students: any[];
  setStudents: React.Dispatch<React.SetStateAction<any[]>>;
}

const StudentList: React.FC<StudentListProps> = ({ students, setStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '10',
    section: 'A',
    rollNumber: '',
    parentsName: '',
    photo: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoPreview(base64String);
        setNewStudent(prev => ({ ...prev, photo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.rollNumber.includes(searchTerm)
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student = {
      ...newStudent,
      id: Math.random().toString(36).substr(2, 9),
      attendance: 100,
      feesStatus: 'Pending',
      gpa: 0.0,
      lastExam: 'N/A',
      photo: newStudent.photo || `https://picsum.photos/seed/${newStudent.name}/100`
    };
    setStudents([student, ...students]);
    setIsAddModalOpen(false);
    setNewStudent({ name: '', class: '10', section: 'A', rollNumber: '', parentsName: '', photo: '' });
    setPhotoPreview(null);
  };

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const deleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm overflow-hidden border border-slate-200 dark:border-slate-800 transition-all">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30 dark:bg-slate-950/20">
        <div className="relative flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="Search students by name or roll number..." 
            className="pl-12 pr-6 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 w-full transition-all text-sm font-medium dark:text-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-3 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Admit Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Student Identity</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Roll No.</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Academic Tier</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Presence</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Merit GPA</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Financials</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img src={student.photo} className="w-12 h-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 object-cover shadow-sm group-hover:scale-110 transition-transform" alt="" />
                    <div>
                      <h4 className="font-black text-slate-800 dark:text-slate-100 text-sm tracking-tight">{student.name}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest">{student.parentsName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-xs font-black text-slate-600 dark:text-slate-400 tracking-tighter">{student.rollNumber}</td>
                <td className="px-8 py-5">
                   <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{student.class} {student.section}</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${student.attendance > 90 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : student.attendance > 75 ? 'bg-amber-400' : 'bg-red-500'}`} 
                        style={{ width: `${student.attendance}%` }} 
                      />
                    </div>
                    <span className="text-[11px] font-black text-slate-700 dark:text-slate-300">{student.attendance}%</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-black text-indigo-600 dark:text-indigo-400 italic">{student.gpa.toFixed(2)}</td>
                <td className="px-8 py-5">
                  <span className={`px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.1em] ${
                    student.feesStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                    student.feesStatus === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {student.feesStatus}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleViewStudent(student)}
                      className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl transition-all active:scale-90">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => deleteStudent(student.id)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false);
          setPhotoPreview(null);
        }} 
        title="Student Admission Form"
      >
        <form onSubmit={handleAddStudent} className="space-y-8 p-2">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-28 h-28 rounded-[40px] bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-xl transition-all group-hover:border-indigo-500 group-hover:scale-105">
                {photoPreview ? (
                  <img src={photoPreview} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 p-2.5 bg-indigo-600 text-white rounded-2xl shadow-2xl border-4 border-white dark:border-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Official Photograph</p>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden" 
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 block">Full Legal Name</label>
              <input 
                type="text" 
                required
                placeholder="Enter student's full name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold dark:text-white" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 block">Assigned Grade</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Grade 10"
                value={newStudent.class}
                onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold dark:text-white" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 block">Section</label>
              <input 
                type="text" 
                required
                placeholder="e.g. A"
                value={newStudent.section}
                onChange={(e) => setNewStudent({...newStudent, section: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold dark:text-white" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 block">Roll Number</label>
              <input 
                type="text" 
                required
                placeholder="PAK-XXX"
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold dark:text-white" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 block">Guardian Name</label>
              <input 
                type="text" 
                required
                placeholder="Father/Mother name"
                value={newStudent.parentsName}
                onChange={(e) => setNewStudent({...newStudent, parentsName: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold dark:text-white" 
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[24px] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95 hover:-translate-y-1"
          >
            Finalize Admission Record
          </button>
        </form>
      </Modal>

      {/* Student Detail View Modal */}
      <Modal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        title="Student Portfolio"
      >
        {selectedStudent && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <img 
                  src={selectedStudent.photo} 
                  className="w-32 h-32 rounded-[48px] border-4 border-indigo-50 dark:border-indigo-900 object-cover shadow-2xl" 
                  alt="" 
                />
                <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-white dark:border-slate-900 shadow-xl ${
                  selectedStudent.feesStatus === 'Paid' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {selectedStudent.feesStatus}
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{selectedStudent.name}</h3>
              <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] mt-1">
                {selectedStudent.class} • Section {selectedStudent.section}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Official Roll No.</p>
                <p className="text-sm font-black text-slate-700 dark:text-slate-200">{selectedStudent.rollNumber}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Guardian Name</p>
                <p className="text-sm font-black text-slate-700 dark:text-slate-200">{selectedStudent.parentsName}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Academic GPA</p>
                <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 italic">{selectedStudent.gpa.toFixed(2)}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Presence Index</p>
                <div className="flex items-center gap-2 mt-1">
                   <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                     <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${selectedStudent.attendance}%` }}
                     />
                   </div>
                   <span className="text-sm font-black text-slate-700 dark:text-slate-200">{selectedStudent.attendance}%</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-[32px] p-8 text-white shadow-2xl shadow-indigo-200 dark:shadow-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Recent Assessment</p>
                <h4 className="text-xl font-black italic tracking-tight">{selectedStudent.lastExam}</h4>
                <div className="mt-6 flex gap-4">
                  <button className="px-6 py-2 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-lg">
                    View Script
                  </button>
                  <button className="px-6 py-2 bg-indigo-500/30 border border-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500/50 transition-all active:scale-95">
                    Print Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentList;
