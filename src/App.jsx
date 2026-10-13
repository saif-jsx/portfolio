import { useEffect, useState } from "react";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import ProfileModal from "./components/ProfileModal";
import Home from "./components/Home";
import ProjectPage from "./components/ProjectPage";
import PostPage from "./components/PostPage";
import FabricBackground from "./components/FabricBackground";
import SidebarTab from "./components/SidebarTab";
import Footer from "./components/Footer";

export default function App() {
  const [active, setActive] = useState("portfolio"); // "portfolio" | "profile"
  const [projectId, setProjectId] = useState(null); // which project page is open (null = none)
  const [postId, setPostId] = useState(null); // which blog post is open (null = none)
  const [sidebarOpen, setSidebarOpen] = useState(() => localStorage.getItem("sidebar") !== "closed");
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // apply dark mode to <html> and remember the choice
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // remember whether the sidebar was hidden
  useEffect(() => {
    localStorage.setItem("sidebar", sidebarOpen ? "open" : "closed");
  }, [sidebarOpen]);

  const closePages = () => {
    setProjectId(null);
    setPostId(null);
  };

  // back to the home content, then scroll to a section
  const goToSection = (id, instant = false) => {
    closePages();
    setActive("portfolio");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: instant ? "instant" : "smooth", block: "start" });
    }, 50);
  };

  const scrollToTop = () => {
    setTimeout(() => {
      document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "instant" });
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 0);
  };

  // open a project page or a blog post, starting from the top
  const openProject = (id) => {
    setPostId(null);
    setProjectId(id);
    scrollToTop();
  };
  const openPost = (id) => {
    setProjectId(null);
    setPostId(id);
    scrollToTop();
  };

  const changeTab = (id) => {
    if (id === "portfolio") closePages();
    setActive(id);
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-zinc-900 lg:h-screen dark:bg-zinc-950 dark:text-white">
      <TopNav dark={dark} onToggleDark={() => setDark((d) => !d)} onNavigate={goToSection} />

      <div className="flex flex-1 flex-col lg:min-h-0 lg:flex-row">
        <SideNav active={active} onChange={changeTab} open={sidebarOpen} onToggle={() => setSidebarOpen(false)} />

        {/* main area: the fabric sits behind the content and stays in place while it scrolls */}
        <div className="relative flex-1">
          <FabricBackground />
          <main id="main-scroll" className="relative lg:absolute lg:inset-0 lg:overflow-y-auto">
            {projectId ? (
              <ProjectPage projectId={projectId} onBack={() => goToSection("projects", true)} />
            ) : postId ? (
              <PostPage postId={postId} onBack={() => goToSection("blog", true)} />
            ) : (
              <Home onOpenProject={openProject} onOpenPost={openPost} />
            )}
            <Footer />
          </main>
          <SidebarTab visible={!sidebarOpen} onClick={() => setSidebarOpen(true)} />
        </div>
      </div>

      <ProfileModal open={active === "profile"} onClose={() => setActive("portfolio")} />
    </div>
  );
}
