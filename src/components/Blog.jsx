import { ArrowRight, ArrowUpRight } from "lucide-react";
import { posts } from "../data";

export default function Blog({ onOpen }) {
  return (
    <section id="blog" className="scroll-mt-32 border-t border-zinc-200 py-20 lg:scroll-mt-8 dark:border-zinc-800">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Blog</h2>

      {posts.length === 0 ? (
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">First post coming soon.</p>
      ) : (
        <ul className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {posts.map((post) => {
            const external = !post.body && post.url;
            const row = (
              <>
                {/* the thumbnail keeps its own proportions, so it is never cropped or stretched */}
                {post.cover && (
                  <img
                    src={post.cover}
                    alt=""
                    className="block h-auto w-24 shrink-0 rounded-lg border border-zinc-200 sm:w-48 dark:border-zinc-800"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-zinc-500">
                    {post.date}
                    {post.readTime && ` · ${post.readTime}`}
                  </p>
                  <h3 className="mt-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">{post.title}</h3>
                  {post.summary && (
                    <p className="mt-1 text-[15px] text-zinc-500 dark:text-zinc-400">{post.summary}</p>
                  )}
                </div>
                {external ? (
                  <ArrowUpRight size={18} className="shrink-0 text-zinc-400 transition group-hover:text-zinc-900 dark:group-hover:text-white" />
                ) : (
                  <ArrowRight size={18} className="shrink-0 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-zinc-900 dark:group-hover:text-white" />
                )}
              </>
            );
            return (
              <li key={post.id ?? post.title}>
                {external ? (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-6 sm:gap-6"
                  >
                    {row}
                  </a>
                ) : (
                  <button
                    onClick={() => onOpen(post.id)}
                    className="group flex w-full items-center justify-between gap-4 py-6 sm:gap-6 text-left"
                  >
                    {row}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
