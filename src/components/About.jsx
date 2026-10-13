import { profile } from "../data";
import AcademicTimeline from "./AcademicTimeline";
import Skills from "./Skills";

export default function About() {
  return (
    <section id="about" className="scroll-mt-32 border-t border-zinc-200 py-20 lg:scroll-mt-8 dark:border-zinc-800">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">About me</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">{profile.about}</p>

      <h3 className="mt-16 text-lg font-medium text-zinc-900 dark:text-zinc-100">Academic background</h3>
      <div className="mt-6">
        <AcademicTimeline />
      </div>

      <Skills />
    </section>
  );
}
