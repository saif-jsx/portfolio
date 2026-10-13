import { useEffect } from "react";
import { MapPin, X } from "lucide-react";
import { profile } from "../data";
import Avatar from "./Avatar";

export default function ProfileModal({ open, onClose }) {
  // close with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Profile"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-10 dark:bg-zinc-900"
      >
        <button
          onClick={onClose}
          aria-label="Close profile"
          className="absolute top-4 right-4 rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-5 sm:gap-8">
          <Avatar
            src={profile.avatar}
            name={profile.name}
            className="h-24 w-24 shrink-0 rounded-full sm:h-32 sm:w-32"
          />
          <div className="min-w-0">
            <h2 className="text-3xl font-semibold text-zinc-900 sm:text-4xl dark:text-white">
              {profile.name}
            </h2>
            <p className="mt-1 flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <MapPin size={14} />
              {profile.location}
            </p>
          </div>
        </div>

        <h3 className="mt-8 text-lg font-medium text-zinc-900 dark:text-white">About</h3>
        <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-300">{profile.about}</p>

      </div>
    </div>
  );
}
