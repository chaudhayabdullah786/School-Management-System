
import React, { useState, useRef } from 'react';
import Modal from './Modal';

interface TeacherListProps {
  teachers: any[];
  setTeachers: React.Dispatch<React.SetStateAction<any[]>>;
}

const TeacherList: React.FC<TeacherListProps> = ({ teachers, setTeachers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: 'Mathematics',
    experience: '5 Years',
    assignedClasses: '',
    status: 'Active',
    photo: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoPreview(base64String);
        setNewTeacher(prev => ({ ...prev, photo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = {
      ...newTeacher,
      id: `t${Math.random().toString(36).substr(2, 4)}`,
      assignedClasses: newTeacher.assignedClasses.split(',').map(s => s.trim()),
      photo: newTeacher.photo || `https://picsum.photos/seed/${newTeacher.name}/100`
    };
    setTeachers([teacher, ...teachers]);
    setIsModalOpen(false);
    setNewTeacher({ name: '', subject: 'Mathematics', experience: '5 Years', assignedClasses: '', status: 'Active', photo: '' });
    setPhotoPreview(null);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm overflow-hidden p-8 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all group">
            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <img src={teacher.photo} className="w-20 h-20 rounded-[28px] border-4 border-indigo-50 dark:border-indigo-900 object-cover shadow-lg group-hover:scale-110 transition-transform" alt="" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">{teacher.name}</h3>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.2em] mt-1">{teacher.subject} Faculty</p>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-xs font-bold bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                <span className="text-slate-500 dark:text-slate-400">Tenure</span>
                <span className="font-black text-slate-800 dark:text-slate-200">{teacher.experience}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                <span className="text-slate-500 dark:text-slate-400">Assignment Status</span>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${teacher.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                  {teacher.status}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3 ml-1">Allocated Grades</span>
                <div className="flex flex-wrap gap-2">
                  {teacher.assignedClasses.map((cls: string) => (
                    <span key={cls} className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-800/50 shadow-sm transition-transform hover:scale-105">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-4 text-[11px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-2xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all active:scale-95">
                Full Profile
              </button>
              <button className="flex-1 py-4 text-[11px] font-black uppercase tracking-widest text-white bg-indigo-600 rounded-2xl hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-600/20">
                Direct Sync
              </button>
            </div>
          </div>
        ))}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm overflow-hidden p-8 border-4 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-all flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 gap-4 group min-h-[350px]"
        >
          <div className="w-20 h-20 rounded-[32px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-all group-hover:rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="font-black uppercase tracking-[0.2em] text-xs">Onboard Faculty Member</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setPhotoPreview(null);
      }} title="Faculty Onboarding Portal">
        <form onSubmit={handleAddTeacher} className="space-y-8 p-2">
          <div className="flex flex-col items-center gap-4 mb-2">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-28 h-28 rounded-[40px] bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-xl transition-all group-hover:border-indigo-500 group-hover:scale-105">
                {photoPreview ? (
                  <img src={photoPreview} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
                  </svg>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 p-2.5 bg-indigo-600 text-white rounded-2xl shadow-2xl border-4 border-white dark:border-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Official ID Photo</p>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden" 
            />
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2.5 block tracking-widest">Full Faculty Name</label>
              <input 
                type="text" 
                required
                placeholder="Enter professor's full name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold dark:text-white shadow-sm" 
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-2.5 block tracking-widest">Department / Subject</label>
                <select 
                  value={newTeacher.subject}
                  onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold dark:text-white shadow-sm cursor-pointer"
                >
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>History</option>
                  <option>English</option>
                  <option>Computer Science</option>
                  <option>Urdu</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-2.5 block tracking-widest">Experience Years</label>
                <input 
                  type="text" 
                  placeholder="e.g. 5 Years"
                  value={newTeacher.experience}
                  onChange={(e) => setNewTeacher({...newTeacher, experience: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold dark:text-white shadow-sm" 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2.5 block tracking-widest">Class Allocations (comma separated)</label>
              <input 
                type="text" 
                placeholder="e.g. Grade 10A, Grade 11B"
                required
                value={newTeacher.assignedClasses}
                onChange={(e) => setNewTeacher({...newTeacher, assignedClasses: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold dark:text-white shadow-sm" 
              />
            </div>
          </div>
          <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[24px] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95 hover:-translate-y-1">
            Activate Faculty Contract
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherList;
