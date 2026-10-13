import { profile, socials } from "../data";

// simple line icons
const icons = {
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
};

export default function Footer() {
  const links = socials.filter((s) => s.url);

  return (
    <footer className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-28">
      <div className="flex flex-col-reverse items-center justify-between gap-6 border-t border-zinc-200 py-10 sm:flex-row dark:border-zinc-800">
        <p className="font-mono text-xs text-zinc-500">
          © {new Date().getFullYear()} {profile.fullName.toLowerCase()}
        </p>

        {links.length > 0 && (
          <div className="flex items-center gap-2">
            {links.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-full border border-zinc-200 p-2.5 text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icons[s.icon]}
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
