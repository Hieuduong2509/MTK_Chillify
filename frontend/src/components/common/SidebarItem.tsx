import { NavLink } from "react-router-dom";

interface BaseProps {
  icon: string;
  label: string;
  isCollapsed: boolean;
}

type SidebarItemProps =
  | (BaseProps & { danger: true })
  | (BaseProps & { path: string; danger?: false });

export default function SidebarItem(props: SidebarItemProps) {
  const { icon, label, isCollapsed } = props;

  if ("danger" in props && props.danger) {
    return (
      <div
        onClick={() => alert("Logging out...")}
        className="
          flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
          text-slate-400 hover:text-red-400 hover:bg-red-500/10
          transition-colors
        "
      >
        <span className="material-symbols-outlined">{icon}</span>
        {!isCollapsed && <p className="text-sm font-medium">{label}</p>}
      </div>
    );
  }

  return (
    <NavLink
      to={props.path}
      end={props.path === "/"}
      className={({ isActive }) => `
        flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
        transition-colors
        ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-slate-400 hover:text-white hover:bg-white/5"
        }
      `}
    >
      <span className="material-symbols-outlined">{icon}</span>
      {!isCollapsed && <p className="text-sm font-medium">{label}</p>}
    </NavLink>
  );
}
