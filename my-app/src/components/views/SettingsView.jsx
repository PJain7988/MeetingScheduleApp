import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMeetingStore } from '../../store/meetingStore';

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  
  // Global Profile State
  const globalProfile = useMeetingStore(state => state.userProfile);
  const updateProfile = useMeetingStore(state => state.updateProfile);

  // Local Profile State (for editing before save)
  const [profile, setProfile] = useState(globalProfile);
  
  useEffect(() => {
    setProfile(globalProfile);
  }, [globalProfile]);

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
    updateProfile(profile);
    toast.success('Profile updated successfully!');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // Immediately save the image update to global state
      const updatedProfile = { ...profile, avatarUrl: imageUrl };
      setProfile(updatedProfile);
      updateProfile(updatedProfile);
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

            {/* Integrations Tab */}
            {activeTab === 'Integrations' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-lg font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-4">Connected Integrations</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Google Calendar', status: 'Connected', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-blue-500' },
                    { name: 'Slack', status: 'Connect', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', color: 'text-rose-500' },
                    { name: 'Zoom', status: 'Connect', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', color: 'text-blue-400' }
                  ].map(integration => (
                    <div key={integration.name} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-indigo-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center ${integration.color}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={integration.icon} />
                          </svg>
                        </div>
                        <div className="font-medium text-slate-900">{integration.name}</div>
                      </div>
                      <button className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${integration.status === 'Connected' ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
                        {integration.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'Billing' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-lg font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-4">Plan & Billing</h3>
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-indigo-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-indigo-100 text-sm font-medium mb-1">Current Plan</div>
                      <div className="text-2xl font-bold">Pro Workspace</div>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      Active
                    </div>
                  </div>
                  <div className="text-indigo-100 text-sm">
                    Next billing date: <strong>August 1, 2026</strong>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-900">Payment Method</h4>
                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-500 text-xs">VISA</div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">•••• •••• •••• 4242</div>
                        <div className="text-xs text-slate-500">Expires 12/28</div>
                      </div>
                    </div>
                    <button className="text-indigo-600 text-sm font-medium hover:underline">Update</button>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'Advanced' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="text-lg font-semibold text-rose-600 mb-6 border-b border-slate-100 pb-4">Danger Zone</h3>
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900">Export Data</h4>
                      <p className="text-sm text-slate-500 mt-1 max-w-sm">Download a copy of all your scheduled meetings and account data.</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors">
                      Request Export
                    </button>
                  </div>
                  <div className="flex items-start justify-between pt-4 border-t border-slate-100">
                    <div>
                      <h4 className="font-medium text-slate-900">Delete Account</h4>
                      <p className="text-sm text-slate-500 mt-1 max-w-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    </div>
                    <button className="px-4 py-2 bg-rose-50 text-rose-600 text-sm font-medium rounded-xl hover:bg-rose-100 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
