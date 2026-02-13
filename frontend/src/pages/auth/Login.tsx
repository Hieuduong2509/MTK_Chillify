import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-background-dark min-h-screen flex items-center justify-center font-display antialiased p-4">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        {/* Card Container */}
        <div className="w-full bg-[#1C3340] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-white/5 p-8">
          
          {/* Logo & Header */}
          <div className="mb-10 flex flex-col items-center gap-3">
            <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-4xl">music_note</span>
            </div>
            <h2 className="text-white text-2xl font-bold tracking-tight">
              Music Stream
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
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
                  className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-700 bg-slate-800/50 focus:border-primary h-12 pl-12 pr-4 placeholder:text-slate-500 text-base font-normal transition-all"
                  placeholder="Enter your email"
                  type="email"
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
                  className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-700 bg-slate-800/50 focus:border-primary h-12 pl-12 pr-4 placeholder:text-slate-500 text-base font-normal transition-all"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-6">
              <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-[#1088e8] text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors shadow-md shadow-primary/10">
                <span className="truncate">Login</span>
              </button>
              
              <div className="text-center">
                <p className="text-slate-400 text-sm font-medium">
                  Don't have an account?
                  {/* Link chuyển sang trang Sign up */}
                  <Link
                    className="text-primary hover:text-[#1088e8] font-bold ml-1 transition-colors"
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