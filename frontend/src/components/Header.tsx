import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-white/5 bg-background-light dark:bg-sidebar-dark">
      <div className="relative flex h-15 max-w-7xl mx-auto items-center px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <a onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src={assets.logo}
              alt="Danniel Vo logo"
              className="h-24 w-24 object-contain"
            />
          </a>
        </div>

        {/* Search bar */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              className="w-full bg-white dark:bg-[#1b2227] border border-slate-300 dark:border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm"
              placeholder="Search artists, songs, albums"
              type="text"
            />
          </div>
        </div>

        {/* Right spacer */}
        <div className="w-24"></div>
      </div>
    </header>
  );
};

export default Header;
