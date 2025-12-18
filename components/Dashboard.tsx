
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const attendanceData = [
  { name: 'Mon', attendance: 92 },
  { name: 'Tue', attendance: 88 },
  { name: 'Wed', attendance: 94 },
  { name: 'Thu', attendance: 91 },
  { name: 'Fri', attendance: 85 },
];

const feeData = [
  { name: 'Paid', value: 75, color: '#10b981' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'Overdue', value: 10, color: '#ef4444' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '1,240', change: '+2.5%', color: 'border-blue-500', icon: '🎓' },
          { label: 'Average Attendance', value: '91.2%', change: '-0.4%', color: 'border-green-500', icon: '📅' },
          { label: 'Total Revenue', value: '$84.5k', change: '+12%', color: 'border-purple-500', icon: '💰' },
          { label: 'Active Teachers', value: '84', change: 'Stable', color: 'border-orange-500', icon: '👩‍🏫' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${stat.color} hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trends */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Attendance Trends (Weekly)</h3>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded p-1 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{stroke: '#6366f1', strokeWidth: 1}}
                />
                <Area type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Pie */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Fee Status</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {feeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-xs text-slate-400 uppercase font-bold">Total</span>
              <span className="text-xl font-bold text-slate-800">100%</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {feeData.map((f) => (
              <div key={f.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: f.color }} />
                  <span className="text-slate-600">{f.name}</span>
                </div>
                <span className="font-bold text-slate-800">{f.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Upcoming Exams</h3>
          <button className="text-sm text-indigo-600 font-semibold hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { subject: 'Mathematics Final', date: 'Oct 24, 2023', class: 'Grade 10-A', time: '09:00 AM' },
            { subject: 'Physics Midterm', date: 'Oct 26, 2023', class: 'Grade 12-B', time: '11:00 AM' },
            { subject: 'English Proficiency', date: 'Oct 27, 2023', class: 'Grade 9-C', time: '10:30 AM' },
          ].map((exam, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs flex-col">
                  <span>{exam.date.split(' ')[1].replace(',', '')}</span>
                  <span>{exam.date.split(' ')[0]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{exam.subject}</h4>
                  <p className="text-xs text-slate-500">{exam.class} • {exam.time}</p>
                </div>
              </div>
              <button className="px-3 py-1 text-xs border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
