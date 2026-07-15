import React from 'react';
import { useMeetingStore } from '../../store/meetingStore';
import dayjs from 'dayjs';

const MeetingsView = () => {
  const meetings = useMeetingStore((state) => state.meetings);

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
                <th className="py-4 px-6 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {meetings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500">No meetings found.</td>
                </tr>
              ) : (
                [...meetings].sort((a,b) => new Date(b.start) - new Date(a.start)).map((m) => {
                  const isPast = dayjs(m.end).isBefore(dayjs());
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
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
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
