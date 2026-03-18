import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-background-dark h-full">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-10">
        
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-slate-400">Manage your profile and security preferences.</p>
        </div>

        {/* Section: Profile */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h2 className="text-xl font-semibold text-white">Profile</h2>
          </div>
          
          <div className="bg-sidebar-dark/40 rounded-xl p-6 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full bg-center bg-cover bg-no-repeat border border-white/10 shadow-lg" 
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=176&q=80")' }}
              ></div>
              <div className="text-center sm:text-left">
                <h3 className="font-medium text-white text-lg">Alex Peterson</h3>
                <p className="text-slate-400 text-sm">Personalize your public profile</p>
              </div>
            </div>
            
            <Link to="/account/profile">
              <button className="bg-primary hover:bg-[#3996e0] text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer shadow-lg shadow-primary/20">
                View Profile
              </button>
            </Link>
          </div>
        </section>

        {/* Section: Security */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>
          
          <div className="bg-sidebar-dark/40 rounded-xl p-6 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="font-medium text-white text-lg">Password</h3>
              <p className="text-slate-400 text-sm max-w-md">
                Update your account password to keep your account safe.
              </p>
            </div>
            
            <Link to="/account/change-password">
              <button className="bg-sidebar-dark hover:bg-white/5 border border-white/10 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                Change Password
              </button>
            </Link>
          </div>
        </section>

        {/* Footer Text */}
        <footer className="mt-8 py-6 flex justify-center border-t border-white/5">
          <div className="text-slate-500 text-xs">
            <span>© 2026 Chillify Music. All rights reserved.</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Account;