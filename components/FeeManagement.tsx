
import React from 'react';

// Added students prop to fix type error in App.tsx
interface FeeManagementProps {
  students: any[];
}

const FeeManagement: React.FC<FeeManagementProps> = ({ students }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Pending Fee Invoices</h3>
            <button className="text-sm text-indigo-600 font-semibold hover:underline">Recent Payments</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.filter(s => s.feesStatus !== 'Paid').map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 text-sm">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{student.name}</div>
                      <div className="text-xs text-slate-500">{student.class}{student.section}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">$1,250.00</td>
                    <td className="px-6 py-4 text-slate-500">Oct 30, 2023</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        student.feesStatus === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {student.feesStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors">Remind</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Revenue Summary</h3>
          <div className="space-y-6">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <span className="text-xs text-indigo-600 font-bold uppercase">Total Collected</span>
              <p className="text-2xl font-black text-indigo-900 mt-1">$142,500.00</p>
              <div className="mt-2 h-1.5 w-full bg-indigo-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '84%' }} />
              </div>
              <p className="text-[10px] text-indigo-500 mt-2">84% of target reached</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Tuition Fees</span>
                <span className="font-bold text-slate-800">$112k</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Transport Fees</span>
                <span className="font-bold text-slate-800">$18k</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Exam Fees</span>
                <span className="font-bold text-slate-800">$12.5k</span>
              </div>
            </div>

            <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Generate Monthly Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;
