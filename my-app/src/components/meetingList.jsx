import React from 'react';
import { useMeetingStore } from '../store/meetingStore';
import dayjs from 'dayjs';

const MeetingList = ({ onEdit }) => {
  const meetings = useMeetingStore((state) => state.meetings);
  const deleteMeeting = useMeetingStore((state) => state.deleteMeeting);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      deleteMeeting(id);
    }
  };

  if (meetings.length === 0) {
    return (
      <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">No meetings scheduled</h3>
        <p className="text-slate-500">Get started by creating a new meeting using the form.</p>
      </div>
    );
  }

  // Sort meetings by start date
  const sortedMeetings = [...meetings].sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div className="space-y-4">
      {sortedMeetings.map((meeting, index) => {
        const startDate = dayjs(meeting.start);
        const endDate = dayjs(meeting.end);
        const isPast = endDate.isBefore(dayjs());
        
        return (
          <div
            key={meeting.id || index}
            className={`group bg-white border ${isPast ? 'border-slate-200 opacity-75' : 'border-indigo-100'} rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-indigo-200`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{meeting.title}</h3>
                  {isPast && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">Past</span>
                  )}
                  {!isPast && startDate.isSame(dayjs(), 'day') && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md">Today</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-slate-600 mb-4 text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {meeting.participants}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Start</div>
                      <div className="font-medium text-slate-800">{startDate.format('MMM D, YYYY')}</div>
                      <div className="text-indigo-600 font-semibold">{startDate.format('h:mm A')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">End</div>
                      <div className="font-medium text-slate-800">{endDate.format('MMM D, YYYY')}</div>
                      <div className="text-rose-600 font-semibold">{endDate.format('h:mm A')}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex sm:flex-col gap-2 pt-1">
                <button
                  onClick={() => onEdit(index, meeting)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </button>
                {deleteMeeting && (
                  <button
                    onClick={() => handleDelete(meeting.id)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MeetingList;
