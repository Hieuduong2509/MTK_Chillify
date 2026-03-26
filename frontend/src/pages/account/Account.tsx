import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Account = () => {
  const { getProfile } = useAuth();
  const [fullName, setFullName] = useState<String>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setFullName(data.fullName);
      } catch (err: any) {
        alert(err.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-background-dark h-full">
      <div className="max-w-4xl mx-auto px-8 py-8 flex flex-col gap-10">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Account Settings
          </h1>
          <p className="text-slate-400">
            Manage your profile and security preferences.
          </p>
        </div>

        {/* Section: Profile */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h2 className="text-xl font-semibold text-white">Profile</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-sidebar-dark/40 rounded-xl p-6 border border-white/5">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=176&q=80"
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border border-white/10 shadow-lg"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-medium text-white text-lg">{fullName}</h3>
                <p className="text-slate-400 text-sm">Manage your profile</p>
              </div>
            </div>

            <Link to="/account/profile">
              <button className="bg-primary hover:bg-[#3996e0] text-white px-12 py-2 rounded-lg font-medium transition-colors cursor-pointer shadow-lg shadow-primary/20">
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
                Change your password
              </p>
            </div>

            <Link to="/account/change-password">
              <button className="bg-primary hover:bg-[#3996e0] text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer shadow-lg shadow-primary/20">
                Change Password
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Account;
