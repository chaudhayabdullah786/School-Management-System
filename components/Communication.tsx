
import React, { useState } from 'react';
import Modal from './Modal';

interface CommunicationProps {
  announcements: any[];
  setAnnouncements: React.Dispatch<React.SetStateAction<any[]>>;
  students: any[];
}

const CLASS_LIST = ['All Students', 'Nursery', 'KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Faculty Only'];

const Communication: React.FC<CommunicationProps> = ({ announcements, setAnnouncements, students }) => {
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('All Students');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  const [newMessage, setNewMessage] = useState({
    title: '',
    content: '',
    type: 'Notice',
    target: 'All Students'
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnn = {
      ...newMessage,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      broadcast: true
    };
    setAnnouncements([newAnn, ...announcements]);
    setIsModalOpen(false);
    setNewMessage({ title: '', content: '', type: 'Notice', target: 'All Students' });
    setToastMsg(`Notice published for ${newAnn.target}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSmartBroadcast = () => {
    if (!broadcastMessage) return;
    setIsBroadcasting(true);
    
    // Simulate targeted sending
    setTimeout(() => {
      setIsBroadcasting(false);
      setToastMsg(`Broadcast sent to ${broadcastTarget} successfully!`);
      setShowToast(true);
      
      const newAnn = {
        id: Math.random().toString(36).substr(2, 9),
        title: `Targeted Broadcast: ${broadcastTarget}`,
        content: broadcastMessage,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        type: 'Urgent',
        target: broadcastTarget
      };
      setAnnouncements([newAnn, ...announcements]);
      setBroadcastMessage('');
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative animate-in fade-in duration-500">
       {showToast && (
        <div className="fixed top-20 right-8 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-indigo-400">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            {toastMsg}
          </div>
        </div>
      )}

      {/* Sidebar Filters */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest mb-8 shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Compose Notice
          </button>
          
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Feed Category</label>
          <div className="space-y-1">
            {['All', 'Notice', 'Academic', 'Event', 'Urgent'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  filter === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
                {cat === 'Urgent' && filter !== 'Urgent' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
             </svg>
           </div>
           
           <h4 className="font-black text-[10px] uppercase tracking-[0.2em] mb-6 text-indigo-400">Targeted Broadcast</h4>
           
           <div className="space-y-4 relative z-10">
             <div>
               <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Select Audience</label>
               <select 
                 value={broadcastTarget}
                 onChange={(e) => setBroadcastTarget(e.target.value)}
                 className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
               >
                 {CLASS_LIST.map(cls => <option key={cls} value={cls}>{cls}</option>)}
               </select>
             </div>
             
             <textarea 
               className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-xs outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600 font-medium leading-relaxed"
               placeholder="Emergency announcement details..."
               rows={4}
               value={broadcastMessage}
               onChange={(e) => setBroadcastMessage(e.target.value)}
             />
             
             <button 
               onClick={handleSmartBroadcast}
               disabled={isBroadcasting || !broadcastMessage}
               className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-indigo-900/40"
             >
               {isBroadcasting ? (
                 <>
                   <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Dispatching...
                 </>
               ) : `Broadcast to ${broadcastTarget}`}
             </button>
           </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="lg:col-span-3 space-y-6">
        {announcements
          .filter(a => filter === 'All' || a.type === filter)
          .map((announcement) => (
          <div key={announcement.id} className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all group border-l-8 border-l-indigo-600">
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg ${
                    announcement.type === 'Notice' ? 'bg-blue-500' : 
                    announcement.type === 'Academic' ? 'bg-indigo-500' : 
                    announcement.type === 'Urgent' ? 'bg-red-500' :
                    'bg-amber-500'
                  }`}>
                    {announcement.type[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 dark:text-slate-100 text-lg leading-tight">{announcement.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{announcement.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        announcement.type === 'Urgent' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                      }`}>
                        {announcement.type}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-800">
                        Target: {announcement.target || 'All Students'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-red-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {announcement.content}
                </p>
              </div>
            </div>
            <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i + 50}/24`} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" alt="" />
                  ))}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Acknowledgment pending by {12 + announcement.id.length}% parents</span>
              </div>
              <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest flex items-center gap-1 group">
                Transmission Logs
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Compose Targeted Notice">
        <form onSubmit={handleSendMessage} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Notice Subject</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Science Fair Registration"
              value={newMessage.title}
              onChange={(e) => setNewMessage({...newMessage, title: e.target.value})}
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold dark:text-white" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Category</label>
              <select 
                value={newMessage.type}
                onChange={(e) => setNewMessage({...newMessage, type: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold dark:text-white"
              >
                <option>Notice</option>
                <option>Academic</option>
                <option>Event</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Target Audience</label>
              <select 
                value={newMessage.target}
                onChange={(e) => setNewMessage({...newMessage, target: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold dark:text-white"
              >
                {CLASS_LIST.map(cls => <option key={cls} value={cls}>{cls}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Notice Body</label>
            <textarea 
              rows={5}
              required
              placeholder="Detailed announcement content..."
              value={newMessage.content}
              onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium leading-relaxed dark:text-white" 
            />
          </div>
          <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95">
            Publish Internal Document
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Communication;
