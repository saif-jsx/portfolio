import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { navLinks, profile } from "../data";

export default function TopNav({ dark, onToggleDark, onNavigate }) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => onNavigate("top")}
          className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white"
        >
          portfolio
        </button>

        <div className="flex items-center gap-1 sm:gap-6">
          {/* links on tablet and desktop */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-zinc-300 px-3 py-1.5 text-sm text-zinc-800 transition hover:border-zinc-500 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
          >
            resume
            <ArrowUpRight size={14} />
          </a>

          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="rounded-full p-2 text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* links on mobile: scrollable row under the bar */}
      <nav className="flex gap-6 overflow-x-auto border-t border-zinc-200 px-4 py-2 md:hidden dark:border-zinc-800">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400"
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
