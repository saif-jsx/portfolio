import { useState } from "react";
import { Lock } from "lucide-react";

// Simple illustrated cover, tinted by the project's colors.
function CoverSingle({ c }) {
  return (
    <div className="w-[64%] rounded-xl bg-white p-[5%] shadow-sm">
      <div className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.soft }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.soft }} />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-2.5 w-2/5 rounded-full" style={{ background: c.strong }} />
          <div className="h-1.5 w-full rounded-full" style={{ background: c.soft }} />
          <div className="h-1.5 w-4/5 rounded-full" style={{ background: c.soft }} />
        </div>
        <div className="h-6 w-6 shrink-0 rounded-full" style={{ background: c.soft }} />
      </div>
      <div className="mt-4 h-14 rounded-lg" style={{ background: c.softer }} />
    </div>
  );
}

function CoverDouble({ c }) {
  return (
    <div className="flex w-[68%] gap-3">
      <div className="flex-1 rounded-xl bg-white p-[6%] shadow-sm">
        <div className="h-2.5 w-3/4 rounded-full" style={{ background: c.strong }} />
        <div className="mt-2 h-1.5 w-full rounded-full" style={{ background: c.soft }} />
        <div className="mt-1.5 h-1.5 w-2/3 rounded-full" style={{ background: c.soft }} />
        <div className="mt-4 h-16 rounded-lg" style={{ background: c.softer }} />
      </div>
      <div className="flex-1 rounded-xl bg-white p-[6%] shadow-sm">
        <div className="h-2.5 w-3/4 rounded-full" style={{ background: c.soft }} />
        <div className="mt-2 h-1.5 w-full rounded-full" style={{ background: c.soft }} />
        <div className="mt-4 flex h-16 items-center justify-center rounded-lg" style={{ background: c.softer }}>
          <span className="h-5 w-5 rounded-full" style={{ background: c.strong }} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index, onOpen }) {
  const { title, client, tagline, description, tags, note, nda, image, cover, colors } = project;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = image && !imageFailed;

  return (
    <article
      // only projects that have a page are clickable
      {...(onOpen && {
        role: "button",
        tabIndex: 0,
        onClick: onOpen,
        onKeyDown: (e) => e.key === "Enter" && onOpen(),
      })}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-zinc-800 dark:bg-[#101010] dark:hover:shadow-black/70 ${
        onOpen ? "cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600" : ""
      }`}
    >
      {showImage ? (
        // width fills the card and height follows the image, so it is never cropped or stretched
        <img
          src={image}
          alt={title}
          onError={() => setImageFailed(true)}
          className="block h-auto w-full"
        />
      ) : (
        <div
          className="flex aspect-[8/5] items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
        >
          {cover === "double" ? <CoverDouble c={colors} /> : <CoverSingle c={colors} />}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
          <span>{String(index).padStart(2, "0")}</span>
          <span>{client}</span>
        </div>

        <h3 className="mt-4 text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>

        <p className="mt-3 flex gap-2 text-base text-zinc-800 dark:text-zinc-200">
          <span className="text-amber-600 dark:text-amber-400" aria-hidden="true">↳</span>
          {tagline}
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-8 font-mono text-xs text-zinc-500">
          <span>{tags}</span>

          {nda ? (
            <span className="relative flex items-center gap-1.5">
              <Lock size={13} />
              nda
              {/* message shown when the card is hovered */}
              <span
                role="tooltip"
                className="pointer-events-none absolute right-0 bottom-full mb-3 rounded-lg bg-zinc-900 px-3 py-2 whitespace-nowrap text-zinc-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900"
              >
                this is under nda
              </span>
            </span>
          ) : (
            <span>{note}</span>
          )}
        </div>
      </div>
    </article>
  );
}
