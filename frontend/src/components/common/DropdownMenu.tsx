import React from "react";

type MenuItem = {
  label: string;
  icon: string;
  onClick: () => void;
  variant?: "default" | "danger";
};

type DropdownMenuProps = {
  items: MenuItem[];
  className?: string;
};

const DropdownMenu = ({ items, className }: DropdownMenuProps) => {
  return (
    <div
      className={`
        absolute min-w-2xs bg-[#1c2733]
        border border-white/10 rounded-lg shadow-xl py-2 z-50
        ${className || "right-0 mt-3"}
      `}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={`
            flex items-center gap-3 w-full px-4 py-2 text-sm
            hover:bg-white/5 cursor-pointer
            ${item.variant === "danger" ? "text-red-400" : "text-gray-300"}
          `}
        >
          <span className="material-symbols-outlined text-sm">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default DropdownMenu;
