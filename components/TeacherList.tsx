
import React, { useState } from 'react';
import Modal from './Modal';

interface TeacherListProps {
  teachers: any[];
  setTeachers: React.Dispatch<React.SetStateAction<any[]>>;
}

const TeacherList: React.FC<TeacherListProps> = ({ teachers, setTeachers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: 'Mathematics',
    experience: '5 Years',
    assignedClasses: '',
    status: 'Active'
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = {
      ...newTeacher,
      id: `t${Math.random().toString(36).substr(2, 4)}`,
      assignedClasses: newTeacher.assignedClasses.split(',').map(s => s.trim()),
      photo: `https://picsum.photos/seed/${newTeacher.name}/100`
    };
    setTeachers([teacher, ...teachers]);
    setIsModalOpen(false);
    setNewTeacher({ name: '', subject: 'Mathematics', experience: '5 Years', assignedClasses: '', status: 'Active' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-xl shadow-sm overflow-hidden p-6 border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <img src={teacher.photo} className="w-16 h-16 rounded-full border-2 border-indigo-100" alt="" />
              <div>
                <h3 className="text-lg font-bold text-slate-800">{teacher.name}</h3>
                <p className="text-sm text-indigo-600 font-medium">{teacher.subject} Expert</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Experience</span>
                <span className="font-semibold text-slate-700">{teacher.experience}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                  {teacher.status}
                </span>
              </div>
              <div>
                <span className="text-sm text-slate-500 block mb-2">Assigned Classes</span>
                <div className="flex flex-wrap gap-2">
                  {teacher.assignedClasses.map((cls: string) => (
                    <span key={cls} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-bold">{cls}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                Profile
              </button>
              <button className="flex-1 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white rounded-xl shadow-sm overflow-hidden p-6 border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 gap-2 group min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="font-bold">Add New Teacher</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Onboard New Teacher">
        <form onSubmit={handleAddTeacher} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Full Name</label>
            <input 
              type="text" 
              required
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Subject</label>
              <select 
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Mathematics</option>
                <option>Physics</option>
                <option>History</option>
                <option>English</option>
                <option>Computer Science</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Experience</label>
              <input 
                type="text" 
                placeholder="e.g. 5 Years"
                value={newTeacher.experience}
                onChange={(e) => setNewTeacher({...newTeacher, experience: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Assigned Classes (comma separated)</label>
            <input 
              type="text" 
              placeholder="e.g. 10A, 11B"
              required
              value={newTeacher.assignedClasses}
              onChange={(e) => setNewTeacher({...newTeacher, assignedClasses: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            Confirm Onboarding
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherList;
