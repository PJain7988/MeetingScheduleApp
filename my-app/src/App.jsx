import React, { useState } from 'react';
import MeetingForm from './components/meetingForm';
import MeetingList from './components/meetingList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight">SyncSpace</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                {editingIndex !== null ? 'Edit Meeting' : 'Schedule New Meeting'}
              </h2>
              <MeetingForm
                editMeetingData={editMeetingData}
                editingIndex={editingIndex}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
          
          {/* Right Column - List */}
          <div className="lg:col-span-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Upcoming Meetings
            </h2>
            <MeetingList onEdit={handleEdit} />
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default App;
