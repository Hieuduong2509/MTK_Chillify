import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
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

    try {
      await login({
        email: form.email,
        password: form.password,
      });

      alert("Login successful!");
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-background-dark min-h-screen flex items-center justify-center font-display antialiased p-4">
      <div className="w-full max-w-110 flex flex-col items-center">
        {/* Card Container */}
        <div className="w-full bg-[#1C3340] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-white/5 p-7">
          {/* Logo & Header */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center w-44 h-44 object-contain">
              <img src={assets.logo2} alt="Chillify's logo" className="" />
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-200 text-sm font-semibold leading-normal">
                Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5f768c] text-xl">
                  mail
                </span>
                <input
                  name="email"
                  type="email"
                  className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-700 bg-slate-800/50 focus:border-primary h-12 pl-12 pr-4 placeholder:text-slate-500 text-base font-normal transition-all"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-200 text-sm font-semibold leading-normal">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#5f768c] text-xl">
                  lock
                </span>
                <input
                  name="password"
                  type="password"
                  className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-700 bg-slate-800/50 focus:border-primary h-12 pl-12 pr-4 placeholder:text-slate-500 text-base font-normal transition-all"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 space-y-5">
              <button className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-hover text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors shadow-md shadow-primary/10">
                {loading ? (
                  <>
                    <span>Logging in...</span>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <div className="text-center">
                <p className="text-slate-400 text-sm font-medium">
                  Don't have an account?
                  {/* Link chuyển sang trang Sign up */}
                  <Link
                    className="text-primary hover:text-hover font-bold ml-1 transition-colors"
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
