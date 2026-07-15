import React from 'react';
import { useMeetingStore } from '../../store/meetingStore';
import dayjs from 'dayjs';

const AnalyticsView = () => {
  const meetings = useMeetingStore((state) => state.meetings);

  // Calculate real analytics based on the user's meetings
  const totalMeetings = meetings.length;
  
  const totalMinutes = meetings.reduce((acc, curr) => {
    return acc + dayjs(curr.end).diff(dayjs(curr.start), 'minute');
  }, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Find most active day
  const daysCount = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
  meetings.forEach(m => {
    daysCount[dayjs(m.start).day()] += 1;
  });
  const maxDayIndex = daysCount.indexOf(Math.max(...daysCount));
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mostActiveDay = totalMeetings > 0 ? dayNames[maxDayIndex] : 'N/A';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>
          <p className="text-slate-500 mt-1">Real-time insights and trends regarding your scheduled meetings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="text-slate-500 font-medium mb-4">Total Meetings Scheduled</div>
          <div className="text-4xl font-bold text-slate-900">{totalMeetings}</div>
          <div className="text-sm text-indigo-500 font-medium mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Lifetime tracking
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="text-slate-500 font-medium mb-4">Total Time in Meetings</div>
          <div className="text-4xl font-bold text-slate-900">{totalHours}<span className="text-xl text-slate-500 font-medium ml-1">hrs</span></div>
          <div className="text-sm text-slate-500 font-medium mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Across all time
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl p-6 shadow-md shadow-indigo-200 flex flex-col justify-between text-white">
          <div className="font-medium mb-4 text-indigo-100">Most Active Day</div>
          <div className="text-4xl font-bold">{mostActiveDay}</div>
          <div className="text-sm font-medium mt-2 text-indigo-100">
            {totalMeetings > 0 ? `Highest meeting volume` : 'No meetings scheduled yet'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Meetings per Day of Week</h3>
        <div className="flex items-end gap-4 h-48 w-full border-b border-slate-100 pb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => {
            const count = daysCount[i];
            const maxCount = Math.max(...daysCount, 1);
            const heightPercent = totalMeetings > 0 ? (count / maxCount) * 100 : 0;
            
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-indigo-100 rounded-t-lg group-hover:bg-indigo-300 transition-colors relative flex items-end justify-center"
                  style={{ height: `${heightPercent}%`, minHeight: heightPercent > 0 ? '10%' : '0%' }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {count} meetings
                  </div>
                </div>
                <div className="text-sm text-slate-500 font-medium">{day}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
