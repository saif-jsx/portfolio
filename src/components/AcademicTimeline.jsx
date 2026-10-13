import { useEffect, useRef, useState } from "react";
import { education } from "../data";

const YEAR_W = 140; // width of one year in the timeline, in px

export default function AcademicTimeline() {
  const scroller = useRef(null);
  const drag = useRef(null);
  const [scrollable, setScrollable] = useState(false);

  const first = Math.min(...education.map((e) => e.start));
  const today = new Date();
  const jan1 = new Date(today.getFullYear(), 0, 1);
  const nowYear = today.getFullYear() + (today - jan1) / (365 * 24 * 60 * 60 * 1000);
  const last = Math.ceil(Math.max(nowYear, ...education.map((e) => e.end)));
  const years = Array.from({ length: last - first + 1 }, (_, i) => first + i);
  const x = (year) => (year - first) * YEAR_W;

  // start at the present, so you drag left to go back in time
  useEffect(() => {
    const el = scroller.current;
    el.scrollLeft = el.scrollWidth;
    const check = () => setScrollable(el.scrollWidth > el.clientWidth + 4);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // drag sideways with the mouse (touch screens just swipe)
  const onDown = (e) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { startX: e.clientX, startLeft: scroller.current.scrollLeft };
    scroller.current.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.current) return;
    scroller.current.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const onUp = () => {
    drag.current = null;
  };

  return (
    <div>
      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Academic timeline"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className={`overflow-x-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          scrollable ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        <div className="relative h-56" style={{ width: x(last) + 90 }}>
          {/* year lines and labels */}
          {years.map((y) => (
            <div key={y} className="absolute top-0 bottom-0 border-l border-zinc-200 dark:border-zinc-800" style={{ left: x(y) }}>
              <span className="absolute bottom-3 left-3 font-mono text-xs text-zinc-500">{y}</span>
            </div>
          ))}

          {/* today */}
          <div
            className="absolute top-0 bottom-9 border-l border-dashed border-amber-500/70"
            style={{ left: x(nowYear) }}
          >
            <span className="absolute top-1 left-1.5 font-mono text-xs text-amber-600 dark:text-amber-400">now</span>
          </div>

          {/* schools */}
          {education.map((e) => (
            <div
              key={e.school}
              title={`${e.school}, ${e.place}`}
              className={`absolute top-14 flex h-28 flex-col justify-center rounded-xl border px-4 ${
                e.ongoing
                  ? "border-amber-500/40 bg-amber-500/10"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#101010]"
              }`}
              style={{ left: x(e.start) + 4, width: (e.end - e.start) * YEAR_W - 8 }}
            >
              <p className="line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">{e.school}</p>
              <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">{e.degree}</p>
              <p className="mt-0.5 font-mono text-xs text-zinc-500">GPA {e.gpa}</p>
            </div>
          ))}
        </div>
      </div>

      {scrollable && (
        <p className="mt-4 text-center font-hand text-xl text-zinc-500">drag sideways, all my years are in here</p>
      )}
    </div>
  );
}
