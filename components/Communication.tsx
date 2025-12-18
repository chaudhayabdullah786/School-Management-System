
import React, { useState } from 'react';
import { MOCK_ANNOUNCEMENTS } from '../constants';

const Communication: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Filters */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm mb-6 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            Compose Message
          </button>
          <div className="space-y-1">
            {['All', 'Notice', 'Academic', 'Event', 'Urgent'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === cat ? 'bg-slate-100 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {cat}
                {cat === 'Urgent' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="lg:col-span-3 space-y-4">
        {MOCK_ANNOUNCEMENTS.filter(a => filter === 'All' || a.type === filter).map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${
                    announcement.type === 'Notice' ? 'bg-blue-500' : 
                    announcement.type === 'Academic' ? 'bg-indigo-500' : 
                    'bg-amber-500'
                  }`}>
                    {announcement.type[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{announcement.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{announcement.type} • {announcement.date}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:text-indigo-600"><Icons.Edit /></button>
                  <button className="p-2 text-slate-400 hover:text-red-600"><Icons.Trash /></button>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pl-13 ml-13 border-l-2 border-slate-100 pl-4">
                {announcement.content}
              </p>
            </div>
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i + 10}/24`} className="w-6 h-6 rounded-full border-2 border-white" alt="" />
                ))}
                <span className="text-[10px] text-slate-400 ml-4 flex items-center">Read by 124 parents</span>
              </div>
              <button className="text-xs font-bold text-indigo-600 hover:underline">View Replies</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Icons = {
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
};

export default Communication;
