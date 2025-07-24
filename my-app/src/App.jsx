import React, { useState } from 'react';
import MeetingForm from './components/meetingForm';
import MeetingList from './components/meetingList';

const App = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editMeetingData, setEditMeetingData] = useState(null);

  const handleEdit = (index, data) => {
    setEditingIndex(index);
    setEditMeetingData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditMeetingData(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Meeting Scheduler App</h1>
        <MeetingForm
          editMeetingData={editMeetingData}
          editingIndex={editingIndex}
          onCancelEdit={handleCancelEdit}
        />
        <MeetingList onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default App;
