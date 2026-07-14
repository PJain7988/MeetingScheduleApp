import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMeetingStore } from '../store/meetingStore';
import { toast } from 'react-toastify';

const MeetingForm = ({ editMeetingData, editingIndex, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));
  
  const addMeeting = useMeetingStore((state) => state.addMeeting);
  const updateMeeting = useMeetingStore((state) => state.updateMeeting);

  useEffect(() => {
    if (editMeetingData) {
      setTitle(editMeetingData.title);
      setParticipants(editMeetingData.participants);
      setStart(new Date(editMeetingData.start));
      setEnd(new Date(editMeetingData.end));
    }
  }, [editMeetingData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !participants || !start || !end) {
      toast.error('Please fill all fields!');
      return;
    }
    
    if (start >= end) {
      toast.error('End time must be after start time.');
      return;
    }

    if (editingIndex !== null) {
      updateMeeting(editMeetingData.id, { title, participants, start, end });
      toast.success('Meeting updated successfully!');
      onCancelEdit();
    } else {
      addMeeting({ title, participants, start, end });
      toast.success('Meeting scheduled successfully!');
    }
    
    setTitle('');
    setParticipants('');
    setStart(new Date());
    setEnd(new Date(new Date().getTime() + 60 * 60 * 1000));
  };

  const handleCancel = () => {
    onCancelEdit();
    setTitle('');
    setParticipants('');
    setStart(new Date());
    setEnd(new Date(new Date().getTime() + 60 * 60 * 1000));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl shadow-slate-200/50 p-6 sm:p-8 rounded-2xl space-y-6 border border-slate-100">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Title</label>
        <input
          className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400"
          type="text"
          placeholder="e.g. Weekly Sync, Project Review"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Participants</label>
        <input
          className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400"
          type="text"
          placeholder="e.g. John, Sarah, Mike"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-2">Start Time</label>
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            showTimeSelect
            dateFormat="MMM d, yyyy h:mm aa"
            className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-2">End Time</label>
          <DatePicker
            selected={end}
            onChange={(date) => setEnd(date)}
            showTimeSelect
            dateFormat="MMM d, yyyy h:mm aa"
            className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800"
          />
        </div>
      </div>
      <div className="pt-2 flex gap-3">
        <button 
          type="submit" 
          className="flex-1 bg-indigo-600 text-white font-medium px-4 py-3 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all active:scale-[0.98]"
        >
          {editingIndex !== null ? 'Save Changes' : 'Schedule Meeting'}
        </button>
        {editingIndex !== null && (
          <button 
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-white text-slate-700 font-medium px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MeetingForm;
