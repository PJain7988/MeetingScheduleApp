import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMeetingStore } from '../store/meetingStore';

const MeetingForm = () => {
  const [title, setTitle] = useState('');
  const [participants, setParticipants] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const addMeeting = useMeetingStore((state) => state.addMeeting);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !participants || !start || !end) return alert('Fill all fields!');
    addMeeting({ title, participants, start, end });
    setTitle('');
    setParticipants('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg space-y-4">
      <input
        className="w-full border p-2 rounded"
        type="text"
        placeholder="Meeting Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        type="text"
        placeholder="Participants (comma-separated)"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
      />
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Start Time</label>
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">End Time</label>
          <DatePicker
            selected={end}
            onChange={(date) => setEnd(date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800">
        Schedule Meeting
      </button>
    </form>
  );
};

export default MeetingForm;
