import React from "react";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-background-dark h-full">
      <div className="max-w-[600px] mx-auto px-6 py-12 flex flex-col gap-8">
        
        {/* Header with Back Button */}
        <div className="flex flex-col gap-2">
          <Link 
            to="/account" 
            className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-1 mb-2 transition-colors w-fit"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Settings
          </Link>
          <h1 className="text-3xl font-bold text-white">Change Password</h1>
          <p className="text-slate-400">Ensure your account is using a long, random password to stay secure.</p>
        </div>

        {/* Form Container */}
        <div className="bg-sidebar-dark/40 rounded-xl p-8 border border-white/5 shadow-xl">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Current Password */}
            <div className="flex flex-col gap-2">
              <label 
                className="text-sm font-medium text-slate-300" 
                htmlFor="current-password"
              >
                Current Password
              </label>
              <input
                className="w-full bg-[#1b2227] border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-500 transition-all"
                id="current-password"
                placeholder="Enter current password"
                type="password"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label 
                className="text-sm font-medium text-slate-300" 
                htmlFor="new-password"
              >
                New Password
              </label>
              <input
                className="w-full bg-[#1b2227] border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-500 transition-all"
                id="new-password"
                placeholder="Enter new password"
                type="password"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label 
                className="text-sm font-medium text-slate-300" 
                htmlFor="confirm-password"
              >
                Confirm New Password
              </label>
              <input
                className="w-full bg-[#1b2227] border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-500 transition-all"
                id="confirm-password"
                placeholder="Confirm new password"
                type="password"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                className="w-full bg-primary hover:bg-[#3996e0] text-white py-3 rounded-lg font-bold transition-colors text-base cursor-pointer shadow-lg shadow-primary/20" 
                type="submit"
              >
                Save Password
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-4 py-8 flex justify-center border-t border-white/5">
          <div className="text-slate-500 text-xs">
            <span>© 2026 Chillify Music. All rights reserved.</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default ChangePassword;