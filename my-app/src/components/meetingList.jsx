import React from 'react';
import { useMeetingStore } from '../store/meetingStore';
import dayjs from 'dayjs';

const MeetingList = ({ onEdit, selectedDate }) => {
  const meetings = useMeetingStore((state) => state.meetings);
  const deleteMeeting = useMeetingStore((state) => state.deleteMeeting);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to decline/delete this meeting?')) {
      deleteMeeting(id);
    }
  };

  // Filter meetings by selectedDate if one is selected
  const filteredMeetings = selectedDate 
    ? meetings.filter(m => dayjs(m.start).isSame(dayjs(selectedDate), 'day'))
    : meetings;

  if (filteredMeetings.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-sm border border-dashed border-slate-300 rounded-3xl p-16 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">
          {selectedDate ? `No meetings on ${dayjs(selectedDate).format('MMM D, YYYY')}` : 'No upcoming meetings'}
        </h3>
        <p className="text-slate-500">
          {selectedDate ? 'Enjoy your free time!' : 'Your schedule is clear. Enjoy your day!'}
        </p>
      </div>
    );
  }

  // Sort meetings by start date
  const sortedMeetings = [...filteredMeetings].sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sortedMeetings.map((meeting, index) => {
        const startDate = dayjs(meeting.start);
        const endDate = dayjs(meeting.end);
        const isPast = endDate.isBefore(dayjs());
        const durationMins = endDate.diff(startDate, 'minute');
        const durationText = durationMins >= 60 
          ? `${Math.floor(durationMins/60)} hr${durationMins%60>0 ? ` ${durationMins%60} mins` : ''}` 
          : `${durationMins} mins`;
        
        // Use an alternating subtle gradient for the card background
        const bgClasses = [
          'bg-gradient-to-br from-white to-slate-50',
          'bg-gradient-to-br from-indigo-50/50 to-white',
          'bg-gradient-to-br from-violet-50/50 to-white'
        ];
        const bgClass = bgClasses[index % bgClasses.length];

        return (
          <div
            key={meeting.id || index}
            className={`group relative ${bgClass} border ${isPast ? 'border-slate-200 opacity-60' : 'border-slate-100'} rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-indigo-100 flex flex-col h-full`}
          >
            {/* Top row */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-slate-900 pr-6 line-clamp-1">{meeting.title}</h3>
              <div className="absolute top-6 right-6">
                 <button className="text-slate-400 hover:text-slate-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                 </button>
              </div>
            </div>

            {/* Date & Time */}
            <div className="mb-5">
              <div className="text-slate-700 text-sm font-medium mb-1">{startDate.format('dddd, MMM D')}</div>
              <div className="text-slate-500 text-sm">
                {startDate.format('h:mm A')} - {endDate.format('h:mm A')} 
                <span className="text-slate-400 ml-1">({durationText})</span>
              </div>
            </div>

            {/* Attendees & Location */}
            <div className="flex justify-between items-end mb-6 mt-auto">
              <div>
                <div className="text-xs text-slate-500 font-medium mb-2">Attendees</div>
                <div className="flex -space-x-2 overflow-hidden">
                  {meeting.participants.split(',').slice(0,4).map((p, i) => (
                    <img 
                      key={i} 
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white" 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(p.trim())}&background=random`} 
                      alt={p.trim()} 
                      title={p.trim()}
                    />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 font-medium mb-2">Location</div>
                <div className="text-sm text-indigo-600 font-medium flex items-center gap-1 justify-end">
                  Google Meet
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-100/60 mt-auto">
              <button
                onClick={() => onEdit(index, meeting)}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl border border-slate-200 transition-colors shadow-sm"
              >
                Edit
              </button>
              {deleteMeeting && (
                <button
                  onClick={() => handleDelete(meeting.id)}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl border border-slate-200 transition-colors shadow-sm"
                >
                  Decline
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MeetingList;
