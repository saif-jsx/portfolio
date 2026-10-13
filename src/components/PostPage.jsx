import { ArrowLeft } from "lucide-react";
import { posts } from "../data";

export default function PostPage({ postId, onBack }) {
  const post = posts.find((p) => p.id === postId);
  if (!post) return null;

  const [lead, ...rest] = post.body;

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
            back to blog
          </button>
        </div>
      </div>

    <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 sm:px-10 lg:px-16 xl:px-28">

      <article className="max-w-3xl pt-14">
        <p className="font-mono text-xs text-zinc-500">
          {post.date}
          {post.readTime && ` · ${post.readTime}`}
        </p>
        <h1 className="mt-5 text-3xl font-medium tracking-tighter text-zinc-900 sm:text-4xl dark:text-white">
          {post.title}
        </h1>

        {/* the cover keeps its own proportions, so it is never cropped or stretched */}
        {post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            className="mt-8 block h-auto w-full rounded-2xl border border-zinc-200 dark:border-zinc-800"
          />
        )}

        <p className="mt-8 text-xl leading-relaxed text-zinc-800 dark:text-zinc-200">{lead}</p>

        <div className="mt-6 space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
    </>
  );
}
