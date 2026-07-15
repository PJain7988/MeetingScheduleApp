import React from 'react';
import { useMeetingStore } from '../../store/meetingStore';
import dayjs from 'dayjs';

const ScheduleView = ({ openModal }) => {
  const meetings = useMeetingStore((state) => state.meetings);
  
  // Group meetings by day to show upcoming schedule blocks
  const upcomingMeetings = [...meetings]
    .filter(m => dayjs(m.end).isAfter(dayjs()))
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Your Schedule</h2>
          <p className="text-slate-500 mt-1">Plan your day and week efficiently.</p>
        </div>
        <button 
          onClick={openModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-indigo-200/50 flex items-center gap-2 transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Schedule New
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        {upcomingMeetings.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-slate-900 mb-2">No upcoming schedule</h3>
            <p className="text-slate-500">Click the button above to add some events to your schedule.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {upcomingMeetings.map((meeting, idx) => (
              <div key={meeting.id || idx} className="flex gap-6 items-start">
                <div className="w-24 flex-shrink-0 pt-1 text-right">
                  <div className="font-bold text-slate-800">{dayjs(meeting.start).format('h:mm A')}</div>
                  <div className="text-xs text-slate-400 font-medium">{dayjs(meeting.start).format('MMM D')}</div>
                </div>
                <div className="relative flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-indigo-50/50 transition-colors group">
                  <div className="absolute -left-[1.65rem] top-4 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white"></div>
                  <div className="absolute -left-6 top-7 bottom-[-2rem] w-[2px] bg-slate-100 group-last:hidden"></div>
                  
                  <h4 className="font-semibold text-slate-900">{meeting.title}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {dayjs(meeting.end).diff(dayjs(meeting.start), 'minute')} mins
                    </span>
                    <span className="text-sm text-indigo-600 font-medium">Google Meet</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleView;
