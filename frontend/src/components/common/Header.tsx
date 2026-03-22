import React from "react";

const Header = () => {
  return (
    <header className="border-b border-white/5 bg-sidebar-dark">
      <div className="flex h-14 max-w-7xl mx-auto items-center justify-center px-4">
        <div className="flex-1 max-w-md">
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
      </div>
    </header>
  );
};

export default Header;
