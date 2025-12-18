
import React, { useState } from 'react';
import { getStudentInsights } from '../services/gemini';

// Added students prop to fix type error in App.tsx
interface AIInsightsProps {
  students: any[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getStudentInsights(selectedStudent);
    setInsight(result || 'Unable to generate insight.');
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 rounded-2xl text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl animate-pulse">
            ✨
          </div>
          <h2 className="text-2xl font-bold">EduPulse AI Assistant</h2>
        </div>
        <p className="text-indigo-100 max-w-xl">
          Leverage advanced AI to analyze student performance, attendance, and fee history to provide proactive recommendations for teachers and parents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Select Student</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {students.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedStudent(s);
                    setInsight(null);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    selectedStudent.id === s.id 
                    ? 'border-indigo-600 bg-indigo-50 shadow-sm' 
                    : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <img src={s.photo} className="w-8 h-8 rounded-full" alt="" />
                  <div className="text-left overflow-hidden">
                    <p className={`text-sm font-bold truncate ${selectedStudent.id === s.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                      {s.name}
                    </p>
                    <p className="text-[10px] text-slate-500">Roll: {s.rollNumber}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <img src={selectedStudent.photo} className="w-16 h-16 rounded-full border-4 border-slate-50" alt="" />
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedStudent.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">Grade {selectedStudent.class}</span>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded text-[10px] font-bold">GPA {selectedStudent.gpa}</span>
                  </div>
                </div>
              </div>
              {!insight && (
                <button
                  onClick={fetchInsights}
                  disabled={loading}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Thinking...
                    </span>
                  ) : 'Generate Insight'}
                </button>
              )}
            </div>

            {insight ? (
              <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-indigo-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <h4 className="font-bold text-sm uppercase tracking-widest">AI Performance Review</h4>
                  </div>
                  <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-line leading-relaxed">
                    {insight}
                  </div>
                  <button 
                    onClick={() => setInsight(null)}
                    className="mt-8 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    Refresh Analysis
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-3xl">🤖</div>
                <div>
                  <h4 className="font-bold text-slate-700">Ready for Analysis</h4>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">Click "Generate Insight" to let the AI analyze this student's records.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
