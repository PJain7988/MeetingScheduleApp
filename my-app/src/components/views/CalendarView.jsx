import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMeetingStore } from '../../store/meetingStore';
import dayjs from 'dayjs';

const CalendarView = ({ openModal }) => {
  const [date, setDate] = useState(new Date());
  const meetings = useMeetingStore((state) => state.meetings);

  // Filter meetings for the specifically selected date
  const selectedDateMeetings = meetings.filter(m => 
    dayjs(m.start).isSame(dayjs(date), 'day')
  ).sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Calendar</h2>
          <p className="text-slate-500 mt-1">Your entire month at a glance.</p>
        </div>
        <button 
          onClick={openModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-indigo-200/50 flex items-center gap-2 transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex items-center justify-center min-h-[500px] overflow-hidden">
          {/* We reuse react-datepicker but scale it up with tailwind classes via a wrapper */}
          <div className="calendar-lg-wrapper w-full max-w-2xl transform scale-125 lg:scale-150 origin-center">
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              inline
              calendarClassName="w-full border-none shadow-none text-slate-800"
            />
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col max-h-[600px] overflow-y-auto">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 flex justify-between items-center border-b border-slate-100 pb-4">
            <span>{dayjs(date).format('MMMM D, YYYY')}</span>
            <span className="text-sm bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full font-medium">
              {selectedDateMeetings.length} Events
            </span>
          </h3>

          {selectedDateMeetings.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No meetings scheduled for this day.</p>
              <button onClick={openModal} className="text-indigo-600 font-medium hover:underline mt-2">Schedule one now</button>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateMeetings.map(meeting => (
                <div key={meeting.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <div className="font-semibold text-slate-900">{meeting.title}</div>
                  <div className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {dayjs(meeting.start).format('h:mm A')} - {dayjs(meeting.end).format('h:mm A')}
                  </div>
                  <div className="mt-3 flex -space-x-2">
                    {meeting.participants.split(',').slice(0, 4).map((p, i) => (
                      <img 
                        key={i} 
                        className="w-6 h-6 rounded-full ring-2 ring-white" 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(p.trim())}&background=random&size=24`} 
                        alt={p.trim()} 
                        title={p.trim()}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
