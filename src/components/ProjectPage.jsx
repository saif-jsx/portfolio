import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies } from "../caseStudies";

const card = "rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#101010]";
const label = "font-mono text-xs text-zinc-500";

function Section({ index, title, intro, children }) {
  return (
    <section className="border-t border-zinc-200 py-16 dark:border-zinc-800">
      <p className={label}>{String(index).padStart(2, "0")}</p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">{title}</h2>
      {intro && <p className="mt-3 max-w-xl text-zinc-500 dark:text-zinc-400">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

// the Figma logo
function FigmaIcon({ className = "h-5 w-auto" }) {
  return (
    <svg viewBox="0 0 38 57" className={className} aria-hidden="true">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

// Some phone screens are exported with empty (transparent) space around them. This cuts that
// space away, so every screen fills its 412 x 917 frame the same way.
function useTrimmed(src) {
  const [trimmed, setTrimmed] = useState(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const full = document.createElement("canvas");
      full.width = w;
      full.height = h;
      const ctx = full.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      let data;
      try {
        data = ctx.getImageData(0, 0, w, h).data;
      } catch {
        return;
      }
      let top = h;
      let left = w;
      let right = -1;
      let bottom = -1;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (data[(y * w + x) * 4 + 3] > 16) {
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
          }
        }
      }
      if (right < 0) return;
      const tw = right - left + 1;
      const th = bottom - top + 1;
      if (tw >= w - 1 && th >= h - 1) return; // nothing to cut away
      const out = document.createElement("canvas");
      out.width = tw;
      out.height = th;
      out.getContext("2d").drawImage(full, left, top, tw, th, 0, 0, tw, th);
      if (!cancelled) setTrimmed(out.toDataURL("image/png"));
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return trimmed || src;
}

// a screen: all images are 1280 x 832, shown at that ratio so nothing is cropped or stretched
function Screen({ screen, centered, mobile }) {
  const [failed, setFailed] = useState(false);
  const phoneSrc = useTrimmed(mobile ? screen.image : "");
  const figureClass = mobile
    ? "w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
    : centered
      ? "md:col-span-2 md:w-[calc(50%-1rem)] md:justify-self-center"
      : "";
  return (
    <figure className={figureClass}>
      {screen.image && !failed ? (
        mobile ? (
          // every phone screen sits in the same 412 x 917 frame, so a screen exported with
          // extra empty margin still lines up with the others
          <div className="aspect-[412/917] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <img
              src={phoneSrc}
              alt={screen.title}
              loading="lazy"
              onError={() => setFailed(true)}
              className="block h-full w-full object-cover"
            />
          </div>
        ) : (
          <img
            src={screen.image}
            alt={screen.title}
            width={1280}
            height={832}
            loading="lazy"
            onError={() => setFailed(true)}
            className="block h-auto w-full rounded-xl border border-zinc-200 dark:border-zinc-800"
          />
        )
      ) : (
        <div
          className={`flex items-center justify-center border border-dashed border-zinc-300 font-mono text-xs text-zinc-400 dark:border-zinc-700 ${
            mobile ? "aspect-[412/917] rounded-2xl" : "aspect-[1280/832] rounded-xl"
          }`}
        >
          add screen image
        </div>
      )}
      {(screen.title || screen.caption) && (
      <figcaption className="mt-3">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{screen.title}</span>
        <span className="block text-sm text-zinc-500 dark:text-zinc-400">{screen.caption}</span>
      </figcaption>
      )}
    </figure>
  );
}

// list of font sizes, each row shown at its real size
function SizeTable({ title, rows }) {
  return (
    <div>
      <p className={label}>{title}</p>
      <ul className="mt-3 divide-y divide-zinc-200 dark:divide-zinc-800">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between py-3">
            <span className="text-zinc-800 dark:text-zinc-200" style={{ fontSize: r.size }}>
              {r.name}
            </span>
            <span className="font-mono text-xs text-zinc-500">{r.size}px</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bullets({ items }) {
  return (
    <ul className="mt-2 space-y-2 text-[15px] leading-snug text-zinc-700 dark:text-zinc-300">
      {items.map((x) => (
        <li key={x} className="flex gap-2">
          <span className="text-amber-600 dark:text-amber-400">•</span>
          {x}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectPage({ projectId, onBack }) {
  const study = caseStudies[projectId];
  if (!study) return null;

  // sections a project does not have are skipped, and the numbers follow on
  const hasScreens =
    study.screens?.length > 0 || study.screenGroups?.some((g) => g.screens.length > 0);
  let count = 0;
  const num = (show) => (show ? ++count : 0);
  const n = {
    overview: num(true),
    research: num(!!study.research),
    personas: num(!!study.personas),
    sides: num(!!study.sides),
    features: num(!!study.features),
    screens: num(hasScreens),
    designSystem: num(!!study.designSystem),
  };

  return (
    <>
      {/* top bar that stays at the top of the page while it scrolls */}
      <div className="sticky top-[102px] z-20 border-b border-zinc-200 bg-stone-50/90 backdrop-blur lg:top-0 dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex h-12 w-full max-w-[1600px] items-center px-6 sm:px-10 lg:px-16 xl:px-28">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            back to projects
          </button>
        </div>
      </div>

    <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 sm:px-10 lg:px-16 xl:px-28">

      {/* intro */}
      <header className="grid gap-10 pt-14 pb-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end lg:gap-16">
        <div>
          <p className={label}>{study.label}</p>
          <h1 className="mt-5 text-3xl font-medium tracking-tighter text-zinc-900 sm:text-4xl dark:text-white">
            {study.title}
          </h1>
          <p className="mt-5 flex gap-2 text-lg text-zinc-800 dark:text-zinc-200">
            <span className="text-amber-600 dark:text-amber-400" aria-hidden="true">↳</span>
            {study.tagline}
          </p>
        </div>

        <div className="border-t border-zinc-200 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 dark:border-zinc-800">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
          {study.meta.map((m) => (
            <div key={m.label}>
              <dt className={label}>{m.label}</dt>
              <dd className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">{m.value}</dd>
            </div>
          ))}
        </dl>

        {study.figmaUrl && (
          <a
            href={study.figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 text-sm text-zinc-800 transition hover:text-zinc-500 dark:text-zinc-200 dark:hover:text-zinc-400"
          >
            <FigmaIcon className="h-4 w-auto" />
            view in figma
            <ArrowUpRight size={14} />
          </a>
        )}
        </div>
      </header>

      {study.image && (
        <img src={study.image} alt={study.title} className="mb-16 block h-auto w-full rounded-2xl" />
      )}

      {/* project overview */}
      {true && (
      <Section index={n.overview} title="project overview">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={card}>
            <p className={label}>01 · problem</p>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-300">{study.problem}</p>
          </div>
          <div className="rounded-2xl bg-zinc-900 p-6 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900">
            <p className="font-mono text-xs opacity-60">02 · solution</p>
            <p className="mt-4 leading-relaxed opacity-90">{study.solution}</p>
          </div>
        </div>
      </Section>
      )}

      {/* research */}
      {study.research && (
        <Section index={n.research} title="research">
          {study.research.goals && (
            <>
              <p className={label}>{study.research.goalsTitle ?? "research goals"}</p>
              <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-300">
                {study.research.goals.map((g) => (
                  <li key={g} className="flex gap-2">
                    <span className="text-amber-600 dark:text-amber-400">•</span>
                    {g}
                  </li>
                ))}
              </ul>
            </>
          )}

          {study.research.competitors && (
            <>
              <p className={`${label} mt-12`}>competitor analysis</p>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {study.research.competitors.map((c) => (
                  <div key={c.name} className={card}>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{c.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{c.about}</p>

                    <p className={`${label} mt-5`}>strong at</p>
                    <Bullets items={c.strong} />

                    <p className={`${label} mt-5`}>falls short</p>
                    <Bullets items={c.weak} />
                  </div>
                ))}
              </div>
            </>
          )}

          {study.research.gap && (
            <p className="mt-6 flex gap-2 text-zinc-800 dark:text-zinc-200">
              <span className="text-amber-600 dark:text-amber-400" aria-hidden="true">↳</span>
              <span>
                <span className="font-medium">the gap:</span> {study.research.gap}
              </span>
            </p>
          )}

          {study.research.insights && (
            <>
              <p className={`${label} mt-12`}>key insights</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {study.research.insights.map((x, i) => (
                  <div key={x.title} className={card}>
                    <p className={label}>{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 font-medium text-zinc-900 dark:text-zinc-100">{x.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400">{x.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Section>
      )}

      {/* personas */}
      {study.personas && (
        <Section index={n.personas} title="user personas" intro={study.personasIntro}>
          <div className={`grid gap-4 ${study.personas.length === 2 ? "md:grid-cols-2" : "lg:grid-cols-3"}`}>
            {study.personas.map((p) => (
              <div key={p.name} className={card}>
                {p.initials ? (
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {p.initials}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{p.name}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{p.about}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className={label}>{p.role}</p>
                    <h3 className="mt-3 text-lg font-medium text-zinc-900 dark:text-zinc-100">{p.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{p.about}</p>
                  </>
                )}

                {p.badge && (
                  <span className="mt-4 inline-block rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                    {p.badge}
                  </span>
                )}

                {p.quote && (
                  <blockquote className="mt-5 border-l-2 border-amber-500/70 pl-4 text-[15px] italic leading-relaxed text-zinc-600 dark:text-zinc-300">
                    “{p.quote}”
                  </blockquote>
                )}

                {p.goals ? (
                  <>
                    <p className={`${label} mt-6`}>goals</p>
                    <Bullets items={p.goals} />
                  </>
                ) : (
                  p.goal && (
                    <>
                      <p className={`${label} mt-6`}>goal</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">{p.goal}</p>
                    </>
                  )
                )}

                {p.pains && (
                  <>
                    <p className={`${label} mt-6`}>pain points</p>
                    <Bullets items={p.pains} />
                  </>
                )}

                {p.needs && (
                  <>
                    <p className={`${label} mt-6`}>needs from the platform</p>
                    <Bullets items={p.needs} />
                  </>
                )}

                {p.stats && (
                  <>
                    <p className={`${label} mt-6`}>behaviour</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {p.stats.map((st) => (
                        <div key={st.label} className="rounded-xl border border-zinc-200 px-2 py-3 text-center dark:border-zinc-800">
                          <p className="text-sm font-medium text-zinc-900 sm:text-base dark:text-zinc-100">{st.value}</p>
                          <p className="mt-1 text-xs text-zinc-500">{st.label}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {p.uses && (
                  <>
                    <p className={`${label} mt-6`}>{p.usesTitle ?? "uses it for"}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.uses.map((u) => (
                        <span key={u} className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                          {u}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* two sides */}
      {study.sides && (
        <Section index={n.sides} title="two sides, one app">
          <div className="grid gap-4 md:grid-cols-2">
            {study.sides.map((side) => (
              <div key={side.title} className={card}>
                <p className={label}>{side.label}</p>
                <h3 className="mt-3 text-lg font-medium text-zinc-900 dark:text-zinc-100">{side.title}</h3>
                <ul className="mt-4 space-y-2 text-[15px] text-zinc-600 dark:text-zinc-300">
                  {side.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-amber-600 dark:text-amber-400">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* key features */}
      {study.features && (
      <Section index={n.features} title="key features">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {study.features.map((f) => (
            <div key={f.title} className={card}>
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>
      )}

      {/* key screens */}
      {hasScreens && (
      <Section index={n.screens} title="key screens">
        {study.screenGroups ? (
          // screens split into groups, for example the customer app and the business owner app
          <div className="space-y-16">
            {study.screenGroups
              .filter((g) => g.screens.length > 0)
              .map((g) => (
                <div key={g.title}>
                  <p className={label}>{g.title}</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-6">
                    {g.screens.map((s, i) => (
                      <Screen key={i} screen={s} mobile />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : study.screensLayout === "mobile" ? (
          // phone screens: 4 across on large screens, and a last short row stays centered
          <div className="flex flex-wrap justify-center gap-6">
            {study.screens.map((s, i) => (
              <Screen key={i} screen={s} mobile />
            ))}
          </div>
        ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {study.screens.map((s, i) => (
            <Screen
              key={s.title}
              screen={s}
              // an odd last screen sits centered at the bottom, at the same size as the others
              centered={i === study.screens.length - 1 && study.screens.length % 2 === 1}
            />
          ))}
        </div>
        )}
      </Section>
      )}

      {/* design system */}
      {study.designSystem && (
      <Section index={n.designSystem} title="design system">
        <p className={label}>colours</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {study.designSystem.colors.map((c) => (
            <div key={c.name} className={card}>
              <div
                className="h-24 rounded-xl border border-zinc-200 dark:border-zinc-700"
                style={{ background: c.hex }}
              />
              <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.name}</p>
              <p className="mt-1 font-mono text-xs text-zinc-500">{c.hex}</p>
            </div>
          ))}
        </div>

        <p className={`${label} mt-10`}>grid system</p>
        <div className={`${card} mt-3 flex flex-col gap-6 sm:flex-row sm:items-center`}>
          <div
            className="h-24 w-full rounded-xl border border-zinc-200 sm:w-56 dark:border-zinc-700"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(128,128,128,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.25) 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{study.designSystem.grid.name}</p>
            <p className="mt-1 text-[15px] text-zinc-500 dark:text-zinc-400">{study.designSystem.grid.text}</p>
          </div>
        </div>

        <p className={`${label} mt-10`}>typography</p>
        <div className={`${card} mt-3`}>
          <div className="flex items-end gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
            <span className="text-6xl font-medium leading-none text-zinc-900 dark:text-white">Aa</span>
            <span className="pb-1 text-sm text-zinc-500 dark:text-zinc-400">{study.designSystem.typography.family}</span>
          </div>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <SizeTable title="headings" rows={study.designSystem.typography.headings} />
            <SizeTable title="body text" rows={study.designSystem.typography.body} />
          </div>
        </div>
      </Section>
      )}

      {/* figma link at the bottom */}
      {study.figmaUrl && (
        <div className="border-t border-zinc-200 pt-16 text-center dark:border-zinc-800">
          <a
            href={study.figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-zinc-300 px-6 py-3 text-sm text-zinc-900 transition hover:border-zinc-500 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
          >
            <FigmaIcon className="h-5 w-auto" />
            view the full design in figma
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </div>
    </>
  );
}
