import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  
  // Profile State
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sarah.jenkins@example.com',
    bio: 'Product Manager focused on building excellent user experiences.',
    avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=e0e7ff&color=4338ca&size=80'
  });
  
  const fileInputRef = useRef(null);

  // Notifications State
  const [notifications, setNotifications] = useState({
    emailReminders: true,
    pushNotifications: false,
    weeklyDigest: true,
    newFeatures: false
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatarUrl: imageUrl }));
      toast.success('Profile photo updated!');
    }
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast.info('Notification preferences saved.');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-500 mt-1">Manage your account preferences and integrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Col - Nav */}
        <div className="lg:col-span-1 space-y-2">
          {['Profile', 'Notifications', 'Integrations', 'Billing', 'Advanced'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Col - Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[500px]">
            
            {/* Profile Tab */}
            {activeTab === 'Profile' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-lg font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-4">Profile Information</h3>
                
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-200">
                      <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                        accept="image/*"
                      />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white border border-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm"
                      >
                        Change Avatar
                      </button>
                      <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                        required
                        className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                        required
                        className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        required
                        className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                      <textarea 
                        rows="3" 
                        name="bio"
                        value={profile.bio}
                        onChange={handleProfileChange}
                        className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-indigo-200 transition-all active:scale-95">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'Notifications' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-lg font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-4">Notification Preferences</h3>
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                        <p className="text-sm text-slate-500">Receive updates regarding your {key.replace(/([A-Z])/g, ' $1').toLowerCase()}.</p>
                      </div>
                      <button 
                        onClick={() => toggleNotification(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${value ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Tabs Placeholder */}
            {['Integrations', 'Billing', 'Advanced'].includes(activeTab) && (
              <div className="animate-in fade-in duration-300 h-full flex flex-col items-center justify-center pt-20 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{activeTab} settings coming soon</h3>
                <p className="text-slate-500 max-w-sm">We are currently building out this section. Check back later for updates to your {activeTab.toLowerCase()} configuration.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
