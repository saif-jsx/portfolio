import { Briefcase, MapPin, PanelLeftClose, User } from "lucide-react";
import { profile } from "../data";
import Avatar from "./Avatar";

export default function SideNav({ active, onChange, open, onToggle }) {
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
  ];

  return (
    // on desktop this wrapper slides its width between 16rem and 0, which hides the sidebar
    <div
      className={`lg:shrink-0 lg:overflow-hidden lg:transition-[width,visibility] lg:duration-300 lg:ease-in-out ${
        open ? "lg:w-64" : "lg:invisible lg:w-0"
      }`}
    >
      <aside className="relative border-b border-zinc-200 bg-white px-4 py-6 lg:h-full lg:w-64 lg:overflow-y-auto lg:border-r lg:border-b-0 lg:px-5 lg:py-8 dark:border-zinc-800 dark:bg-zinc-950">
        <button
          onClick={onToggle}
          aria-label="Hide sidebar"
          className="absolute top-3 right-3 hidden rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 lg:block dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          <PanelLeftClose size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <Avatar
            src={profile.avatar}
            name={profile.name}
            className="h-28 w-28 rounded-full lg:h-30 lg:w-30"
          />

          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
            <Briefcase size={14} />
            Open to Work
          </span>

          <h2 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">
            {profile.name}
          </h2>

          <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
            <MapPin size={14} />
            {profile.location}
          </p>
        </div>

        <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <div className="flex gap-2 lg:flex-col lg:gap-1">
            {tabs.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => onChange(id)}
                  className={`flex flex-1 items-center justify-center gap-3 rounded-xl px-3 py-2.5 text-base transition lg:flex-none lg:justify-start ${
                    isActive
                      ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-white"
                      : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
