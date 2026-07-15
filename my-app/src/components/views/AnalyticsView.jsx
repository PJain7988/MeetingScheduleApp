import React from 'react';

const AnalyticsView = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>
          <p className="text-slate-500 mt-1">Insights and trends regarding your scheduled meetings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="text-slate-500 font-medium mb-4">Total Meetings This Week</div>
          <div className="text-4xl font-bold text-slate-900">12</div>
          <div className="text-sm text-green-500 font-medium mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +14% from last week
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="text-slate-500 font-medium mb-4">Time Spent in Meetings</div>
          <div className="text-4xl font-bold text-slate-900">14.5<span className="text-xl text-slate-500 font-medium ml-1">hrs</span></div>
          <div className="text-sm text-rose-500 font-medium mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            -2% from last week
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl p-6 shadow-md shadow-indigo-200 flex flex-col justify-between text-white">
          <div className="font-medium mb-4 text-indigo-100">Most Active Day</div>
          <div className="text-4xl font-bold">Tuesday</div>
          <div className="text-sm font-medium mt-2 text-indigo-100">
            Average of 3 meetings
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Meeting Volume (Mock Data)</h3>
        {/* Simple CSS-based Bar Chart mock */}
        <div className="flex items-end gap-4 h-48 w-full border-b border-slate-100 pb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
              <div 
                className="w-full bg-indigo-100 rounded-t-lg group-hover:bg-indigo-200 transition-colors relative"
                style={{ height: `${[40, 90, 60, 30, 70][i]}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {[2, 5, 3, 1, 4][i]}
                </div>
              </div>
              <div className="text-sm text-slate-500 font-medium">{day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
