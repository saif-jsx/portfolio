import { skills } from "../data";

export default function Skills() {
  return (
    <div className="mt-20 grid gap-8 lg:grid-cols-[12rem_1fr]">
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Skills</h3>

      <div className="space-y-8">
        {skills.map((g) => (
          <div key={g.group} className="relative border-l border-zinc-200 pl-5 dark:border-zinc-800">
            <span className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-amber-500" />
            <div className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-100">{g.group}</h4>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
