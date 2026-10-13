import { profile, projects } from "../data";
import { caseStudies } from "../caseStudies";
import ProjectCard from "./ProjectCard";
import About from "./About";
import Blog from "./Blog";

// yellow handwritten notes (hidden on small screens)
const noteColor = "text-amber-700 dark:text-amber-400";

function ArrowLeft() {
  return (
    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M46 15 C 34 4, 18 4, 4 12" />
      <path d="M4 12 L11 5" />
      <path d="M4 12 L12 16" />
    </svg>
  );
}

// curves from under the note and points up-left at the email
function ArrowToEmail() {
  return (
    <svg width="60" height="30" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M56 4 C 50 24, 24 28, 6 12" />
      <path d="M6 12 L9 21.5" />
      <path d="M6 12 L16 14" />
    </svg>
  );
}

export default function Home({ onOpenProject, onOpenPost }) {
  return (
    <div id="top" className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-28">
      {/* hero */}
      <section className="flex min-h-[70vh] flex-col justify-center py-16">
        <p className="flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-green-600" />
          open to freelance and full time work
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <h1 className="text-4xl font-medium tracking-tighter text-zinc-900 sm:text-6xl dark:text-white">
            {profile.fullName.toLowerCase()}
          </h1>
          <span className={`hidden -rotate-2 items-center gap-2 font-hand text-2xl font-semibold sm:flex ${noteColor}`}>
            <ArrowLeft />
            or just {profile.name.toLowerCase()}
          </span>
        </div>

        <p className="mt-6 max-w-xl text-lg leading-snug text-zinc-600 dark:text-zinc-400">
          {profile.tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={`mailto:${profile.email}`}
            className="text-base text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            {profile.email}
          </a>
          <span className={`relative hidden -rotate-2 font-hand text-2xl font-semibold sm:block ${noteColor}`}>
            I actually reply
            <span className="absolute -bottom-5 -left-6">
              <ArrowToEmail />
            </span>
          </span>
        </div>
      </section>

      <section id="projects" className="scroll-mt-32 border-t border-zinc-200 py-20 lg:scroll-mt-8 dark:border-zinc-800">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Projects</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i + 1}
              onOpen={caseStudies[project.id] ? () => onOpenProject(project.id) : undefined}
            />
          ))}
        </div>
      </section>
      <About />
      <Blog onOpen={onOpenPost} />
    </div>
  );
}
