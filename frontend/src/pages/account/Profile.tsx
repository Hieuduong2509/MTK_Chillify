import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { getProfile, updateProfile, loading } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setForm({
          fullName: data.fullName,
          phoneNumber: data.phoneNumber || "",
          email: data.email,
        });
      } catch (err: any) {
        alert(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateProfile({
        fullName: form.fullName,
        phoneNumber: form.phoneNumber,
      });

      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background-dark h-full">
      <div className="max-w-[800px] w-full mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Header with Back Button */}
        <div className="flex flex-col gap-2">
          <Link
            to="/account"
            className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-1 mb-2 transition-colors w-fit"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            Back to Settings
          </Link>
        </div>

        {/* Profile Header Section */}
        <section className="flex flex-col items-center text-center gap-6">
          <div className="relative group">
            <img
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 border-4 border-sidebar-dark shadow-2xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=176&q=80"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight font-display">
              Profile Settings
            </h1>
          </div>
        </section>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-sidebar-dark/40 rounded-xl p-8 border border-white/5 flex flex-col gap-6 shadow-xl"
        >
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="flex flex-col w-full">
              <p className="text-slate-300 text-sm font-semibold leading-normal pb-2">
                Full Name
              </p>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full bg-[#1b2227] border border-white/10 rounded-lg h-14 px-4 text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="John Doe"
                type="text"
              />
            </label>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="flex flex-col w-full">
              <p className="text-slate-300 text-sm font-semibold leading-normal pb-2">
                Phone Number
              </p>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full bg-[#1b2227] border border-white/10 rounded-lg h-14 px-4 text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="0123456789"
                type="tel"
              />
            </label>
          </div>

          {/* Email Address (Locked) */}
          <div className="flex flex-col gap-2 opacity-60">
            <label className="flex flex-col w-full">
              <p className="text-slate-300 text-sm font-semibold leading-normal pb-2">
                Email Address (Locked)
              </p>
              <input
                className="w-full bg-[#1b2227]/10 border border-white/10 rounded-lg h-14 px-4 text-base text-slate-500 cursor-not-allowed"
                disabled
                type="email"
                value={form.email}
              />
            </label>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full sm:w-auto min-w-40 bg-primary hover:bg-[#3996e0] text-white font-bold py-3 px-10 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
