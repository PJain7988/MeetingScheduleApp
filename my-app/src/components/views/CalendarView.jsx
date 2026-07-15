import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const CalendarView = ({ openModal }) => {
  const [date, setDate] = useState(new Date());

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

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex-1 flex items-center justify-center">
        {/* We reuse react-datepicker but scale it up with tailwind classes via a wrapper */}
        <div className="calendar-lg-wrapper w-full max-w-3xl transform scale-110 sm:scale-125 lg:scale-150 origin-top">
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            inline
            calendarClassName="w-full border-none shadow-none text-slate-800"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
