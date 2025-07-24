import React, { useState } from 'react';
import { useMeetingStore } from '../store/meetingStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

const EditMeetingForm = ({ meeting, onClose }) => {
  const updateMeeting = useMeetingStore((state) => state.updateMeeting);

  const [title, setTitle] = useState(meeting.title);
  const [participants, setParticipants] = useState(meeting.participants);
  const [start, setStart] = useState(new Date(meeting.start));
  const [end, setEnd] = useState(new Date(meeting.end));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !participants || !start || !end) {
      alert('Please fill all fields!');
      return;
    }

    updateMeeting(meeting.id, { title, participants, start, end });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-xl">
      <input
        type="text"
        className="border p-2 w-full rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Meeting Title"
      />
      <input
        type="text"
        className="border p-2 w-full rounded"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
        placeholder="Participants"
      />
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium">Start Time</label>
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            showTimeSelect
            dateFormat="Pp"
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium">End Time</label>
          <DatePicker
            selected={end}
            onChange={(date) => setEnd(date)}
            showTimeSelect
            dateFormat="Pp"
            className="border p-2 w-full rounded"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
          Update
        </button>
        <button type="button" onClick={onClose} className="text-gray-600 hover:text-black">
          Cancel
        </button>
      </div>
    </form>
  );
};

const MeetingList = () => {
  const meetings = useMeetingStore((state) => state.meetings);
  const [editingIndex, setEditingIndex] = useState(null);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Scheduled Meetings</h2>
      <ul className="space-y-4">
        {meetings.map((meeting, index) => (
          <li
            key={index}
            className="bg-white border border-gray-300 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
          >
            {editingIndex === index ? (
              <EditMeetingForm
                meeting={meeting}
                onClose={() => setEditingIndex(null)}
              />
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-blue-700">{meeting.title}</h3>
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded-md shadow-sm transition"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium text-black">Participants:</span> {meeting.participants}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-black">Start:</span>{' '}
                  {dayjs(meeting.start).format('dddd, MMM D YYYY h:mm A')}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-black">End:</span>{' '}
                  {dayjs(meeting.end).format('dddd, MMM D YYYY h:mm A')}
                </p>
              </>
            )}
          </li>
        ))}
        {meetings.length === 0 && (
          <p className="text-gray-600 text-center">No meetings scheduled.</p>
        )}
      </ul>
    </div>
  );
};

export default MeetingList;
