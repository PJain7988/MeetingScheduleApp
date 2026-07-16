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
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">No upcoming schedule</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Your timeline is clear. Click the button above to start planning your events.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-100 ml-28 lg:ml-32 py-4 space-y-12">
            {upcomingMeetings.map((meeting, idx) => (
              <div key={meeting.id || idx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-indigo-500 ring-8 ring-white shadow-sm transition-transform group-hover:scale-125 z-10"></div>
                
                {/* Time Label */}
                <div className="absolute -left-28 lg:-left-32 top-3 w-20 lg:w-24 text-right">
                  <div className="font-bold text-slate-800 text-lg">{dayjs(meeting.start).format('h:mm')}</div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{dayjs(meeting.start).format('A')}</div>
                  <div className="text-xs text-indigo-600 font-bold mt-1 bg-indigo-50 inline-block px-2 py-0.5 rounded">{dayjs(meeting.start).format('MMM D')}</div>
                </div>

                {/* Content Card */}
                <div className="ml-8 lg:ml-12 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-slate-900">{meeting.title}</h4>
                    <span className="bg-slate-50 text-slate-500 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200">
                      {dayjs(meeting.end).diff(dayjs(meeting.start), 'minute')} min
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex -space-x-2">
                      {meeting.participants.split(',').slice(0, 3).map((p, i) => (
                        <img 
                          key={i} 
                          className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm" 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(p.trim())}&background=random&size=32`} 
                          alt={p.trim()} 
                          title={p.trim()}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Google Meet
                    </div>
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
