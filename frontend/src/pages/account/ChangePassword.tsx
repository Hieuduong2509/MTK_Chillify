import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ChangePassword = () => {
  const { changePassword, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // validate
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New password does not match!");
      return;
    }

    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      alert(
        "Password changed successfully! Please login again with your new password!",
      );

      navigate("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background-dark h-full">
      <div className="max-w-150 mx-auto px-6 py-12 flex flex-col gap-8">
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

        {/* Form Container */}
        <div className="bg-sidebar-dark/40 rounded-xl p-8 border border-white/5 shadow-xl">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
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
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
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
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                className="w-full bg-primary hover:bg-[#3996e0] text-white font-bold py-3 px-10 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span>Changing...</span>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
