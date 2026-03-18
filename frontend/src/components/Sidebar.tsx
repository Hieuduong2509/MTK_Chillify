import { assets, menuItems } from "../assets/assets";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
        flex flex-col
        ${isCollapsed ? "w-16" : "w-52"}
        min-h-screen
        bg-sidebar-dark
        border-r border-white/5
        transition-all duration-300
        shrink-0
      `}
    >
      {/* Logo + Hamburger */}
      <div
        className={`flex items-center justify-around ${isCollapsed ? "mt-5" : ""}`}
      >
        {!isCollapsed && (
          <img
            src={assets.logo}
            alt="Logo"
            className="h-20 w-28 object-cover"
          />
        )}

        <button
          onClick={onToggle}
          className={`text-slate-400 hover:text-white cursor-pointer ${isCollapsed ? "ml-1" : ""}`}
        >
          <span className="material-symbols-outlined">
            {isCollapsed ? "menu_open" : "menu"}
          </span>
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 px-2">
        {menuItems.map((item) => (
          <SidebarItem key={item.label} isCollapsed={isCollapsed} {...item} />
        ))}
      </nav>
    </aside>
  );
}
