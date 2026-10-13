import { useState } from "react";

export default function Avatar({ src, name, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-200 text-4xl font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 ${className}`}
      >
        {name[0]}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className={`object-cover object-top ${className}`}
    />
  );
}
