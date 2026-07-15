import React from 'react';
import { useMeetingStore } from '../../store/meetingStore';
import dayjs from 'dayjs';

const MeetingsView = ({ onEdit }) => {
  const meetings = useMeetingStore((state) => state.meetings);
  const deleteMeeting = useMeetingStore((state) => state.deleteMeeting);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to decline/delete this meeting?')) {
      deleteMeeting(id);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">All Meetings</h2>
          <p className="text-slate-500 mt-1">A complete list of your past and future syncs.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                <th className="py-4 px-6 font-semibold">Title</th>
                <th className="py-4 px-6 font-semibold">Date</th>
                <th className="py-4 px-6 font-semibold">Duration</th>
                <th className="py-4 px-6 font-semibold">Participants</th>
                <th className="py-4 px-6 font-semibold text-center">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {meetings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">No meetings found.</td>
                </tr>
              ) : (
                [...meetings].sort((a,b) => new Date(b.start) - new Date(a.start)).map((m) => {
                  const isPast = dayjs(m.end).isBefore(dayjs());
                  // We need the original index from the main store array for the edit function
                  const originalIndex = meetings.findIndex(mtg => mtg.id === m.id);
                  
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-900">{m.title}</td>
                      <td className="py-4 px-6 text-slate-600">
                        {dayjs(m.start).format('MMM D, YYYY')} <span className="text-slate-400 text-xs ml-1">{dayjs(m.start).format('h:mm A')}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {dayjs(m.end).diff(dayjs(m.start), 'minute')} mins
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex -space-x-2">
                          {m.participants.split(',').slice(0,3).map((p, i) => (
                            <img 
                              key={i} 
                              className="w-6 h-6 rounded-full ring-2 ring-white" 
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(p.trim())}&background=random&size=24`} 
                              alt={p.trim()} 
                              title={p.trim()}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {isPast ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            Upcoming
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => onEdit && onEdit(originalIndex, m)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(m.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeetingsView;
