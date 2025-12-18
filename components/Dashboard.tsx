
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
  { name: 'Paid', value: 75, color: '#6366f1' },
  { name: 'Pending', value: 15, color: '#10b981' },
  { name: 'Overdue', value: 10, color: '#ef4444' },
];

const Dashboard: React.FC<{ students: any[]; teachers: any[]; theme: 'light' | 'dark' }> = ({ students, teachers, theme }) => {
  const chartTextColor = theme === 'dark' ? '#94a3b8' : '#64748b';

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Registered Students', value: students.length + 1234, change: '+2.5%', color: 'border-indigo-500', icon: '🎓', bg: 'bg-indigo-500/5' },
          { label: 'Campus Attendance', value: '91.2%', change: '-0.4%', color: 'border-emerald-500', icon: '📅', bg: 'bg-emerald-500/5' },
          { label: 'Monthly Revenue', value: 'Rs. 4.2M', change: '+12%', color: 'border-purple-500', icon: '💰', bg: 'bg-purple-500/5' },
          { label: 'Faculty Staff', value: teachers.length + 80, change: 'Stable', color: 'border-amber-500', icon: '👩‍🏫', bg: 'bg-amber-500/5' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
              <span className={`text-[10px] font-black px-3 py-1.5 rounded-2xl uppercase tracking-tighter ${
                stat.change.startsWith('+') ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20' : 
                stat.change === 'Stable' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800' : 'bg-red-100 text-red-600 dark:bg-red-900/20'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest relative z-10">{stat.label}</h3>
            <p className="text-3xl font-black text-slate-800 dark:text-white mt-2 relative z-10 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Trends */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-800 dark:text-white text-base uppercase tracking-tight">Attendance Performance</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Weekly Student Presence Tracking</p>
            </div>
            <select className="text-[11px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 outline-none dark:text-slate-200 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <option>Current Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  cursor={{stroke: '#6366f1', strokeWidth: 2}}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', backgroundColor: theme === 'dark' ? '#0f172a' : '#fff', padding: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 800, color: '#6366f1' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Pie */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="font-black text-slate-800 dark:text-white text-base uppercase tracking-tight mb-8">Financial Health</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={95}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {feeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Collection</span>
              <span className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">75%</span>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {feeData.map((f) => (
              <div key={f.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: f.color }} />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{f.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">{f.value}%</span>
                  <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full transition-all duration-1000" style={{ width: `${f.value}%`, backgroundColor: f.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
