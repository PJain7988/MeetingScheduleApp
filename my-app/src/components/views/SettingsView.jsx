import React from 'react';

const SettingsView = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-500 mt-1">Manage your account preferences and integrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col - Nav */}
        <div className="lg:col-span-1 space-y-2">
          {['Profile', 'Notifications', 'Integrations', 'Billing', 'Advanced'].map((tab, i) => (
            <button 
              key={tab}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                i === 0 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Col - Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 border-b border-slate-100 pb-4">Profile Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-200">
                  <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=e0e7ff&color=4338ca&size=80" alt="Avatar" />
                </div>
                <div>
                  <button className="bg-white border border-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm">
                    Change Avatar
                  </button>
                  <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input type="text" defaultValue="Sarah" className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input type="text" defaultValue="Jenkins" className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input type="email" defaultValue="sarah.jenkins@example.com" className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                  <textarea rows="3" defaultValue="Product Manager focused on building excellent user experiences." className="w-full border-slate-200 bg-slate-50 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 resize-none"></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-indigo-200 transition-all active:scale-95">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
