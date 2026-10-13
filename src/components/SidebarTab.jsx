// the floating half-moon tab on the left edge that brings the sidebar back (desktop only)
export default function SidebarTab({ visible, onClick }) {
  return (
    <div className="pointer-events-none absolute top-1/2 left-0 z-20 hidden -translate-y-1/2 lg:block">
      <button
        onClick={onClick}
        aria-label="Open sidebar"
        tabIndex={visible ? 0 : -1}
        className={`flex h-28 w-9 items-center justify-center rounded-r-[36px] border border-l-0 border-zinc-200 bg-white font-mono text-xs text-zinc-600 shadow-[4px_0_24px_rgba(0,0,0,0.14)] transition-all duration-300 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:shadow-[4px_0_24px_rgba(0,0,0,0.7)] ${
          visible
            ? "pointer-events-auto translate-x-0 opacity-100 delay-200"
            : "pointer-events-none -translate-x-full opacity-0"
        }`}
      >
        <span className="rotate-180 [writing-mode:vertical-rl]">open</span>
      </button>
    </div>
  );
}
