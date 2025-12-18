
import React, { useState } from 'react';
import Modal from './Modal';

interface StudentListProps {
  students: any[];
  setStudents: React.Dispatch<React.SetStateAction<any[]>>;
}

const StudentList: React.FC<StudentListProps> = ({ students, setStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '10',
    section: 'A',
    rollNumber: '',
    parentsName: ''
  });

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
      photo: `https://picsum.photos/seed/${newStudent.name}/100`
    };
    setStudents([student, ...students]);
    setIsAddModalOpen(false);
    setNewStudent({ name: '', class: '10', section: 'A', rollNumber: '', parentsName: '' });
  };

  const deleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search students..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Roll No.</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">GPA</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={student.photo} className="w-10 h-10 rounded-full border border-slate-200" alt="" />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                      <p className="text-xs text-slate-500">{student.parentsName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{student.rollNumber}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{student.class}{student.section}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${student.attendance > 90 ? 'bg-green-500' : student.attendance > 75 ? 'bg-orange-400' : 'bg-red-500'}`} 
                        style={{ width: `${student.attendance}%` }} 
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{student.attendance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800">{student.gpa}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    student.feesStatus === 'Paid' ? 'bg-green-100 text-green-700' : 
                    student.feesStatus === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {student.feesStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => deleteStudent(student.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
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

      {/* Add Student Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Student"
      >
        <form onSubmit={handleAddStudent} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Full Name</label>
              <input 
                type="text" 
                required
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Class</label>
              <input 
                type="text" 
                required
                value={newStudent.class}
                onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Section</label>
              <input 
                type="text" 
                required
                value={newStudent.section}
                onChange={(e) => setNewStudent({...newStudent, section: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Roll Number</label>
              <input 
                type="text" 
                required
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Parent's Name</label>
              <input 
                type="text" 
                required
                value={newStudent.parentsName}
                onChange={(e) => setNewStudent({...newStudent, parentsName: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            Create Student Profile
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default StudentList;
