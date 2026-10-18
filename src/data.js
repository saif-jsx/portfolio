// the card thumbnail for Tap Book: the file called tap_book in src/assets (any image type)
const tapBookFiles = import.meta.glob("./assets/tap_book.*", { eager: true, import: "default" });
const tapBookImg = Object.values(tapBookFiles)[0] ?? "";

// blog cover images: every file in src/assets/Blog images. blogImage("Blog 1") finds the file called Blog 1 (any image type).
const blogImages = import.meta.glob("./assets/Blog images/*.*", { eager: true, import: "default" });
const blogImage = (name) => {
  const key = Object.keys(blogImages).find(
    (k) => k.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase() === name.toLowerCase()
  );
  return key ? blogImages[key] : "";
};

// your photo: the file called "Profile picture" in src/assets (any image type)
const photoFiles = import.meta.glob("./assets/[Pp]rofile [Pp]icture.*", { eager: true, import: "default" });
const profilePhoto = Object.values(photoFiles)[0] ?? "";

// the card thumbnail for project 1 (the file called "Branding", any image type)
const brandingFiles = import.meta.glob("./assets/project1 screens/Branding.*", { eager: true, import: "default" });
const brandingImg = Object.values(brandingFiles)[0] ?? "";

// Edit your details here. Every component reads from this file.
export const profile = {
  name: "Saif", // shown in the side nav and profile pop-up
  fullName: "Mohammad Saif Khan", // shown on the home screen
  email: "saif.jsx@gmail.com",
  handle: "@saif",
  location: "India",
  //experience: "1 year experience", // shown in the side nav, under the location
  resume: "/resume.pdf", // save your resume PDF in the /public folder as resume.pdf (or paste a link)
  avatar: profilePhoto,
  tagline: "Product designer making complex products simple to use.", // shown on the home screen
  about:
    "I'm Mohammad Saif Khan, a product designer and UI/UX designer based in Gwalior. I turn complex problems into simple, usable products, from research and wireframes to polished prototypes, and I build in React so my designs work the way I imagined them.",
};

export const navLinks = [
  { label: "projects", id: "projects" },
  { label: "about", id: "about" },
  { label: "blog", id: "blog" },
];

// Your projects. Edit the text here; the cards on the home screen update by themselves.
// image: put your thumbnail in the /public/projects folder and write its path here,
//        for example "/projects/restaurant.png". Leave it "" to show the simple illustration.
// nda: true adds the lock + "nda" tag and the hover message.
export const projects = [
  {
    id: "restaurant", // opens the project page from caseStudies.js
    title: "restaurant & cafes management platform",
    client: "food & cafe saas",
    tagline: "every branch, order and menu from one dashboard.",
    description:
      "owners of cafes and restaurants manage orders, menus and staff across several stores without a single view.",
    tags: "product design · saas",
    note: "case study",
    nda: false,
    image: brandingImg,
    cover: "double",
    colors: { from: "#f2faff", to: "#d3ecff", strong: "#37B5FF", soft: "#bfe6ff", softer: "#eaf6ff" },
  },
  {
    id: "people-node",
    title: "people node",
    client: "hrms saas",
    tagline: "hiring, people and payroll in one place.",
    description:
      "hr teams juggle recruitment, attendance and records across separate tools, and it slows everyone down.",
    tags: "ux research · product design",
    note: "case study",
    nda: true,
    image: "",
    cover: "single",
    colors: { from: "#f6fbec", to: "#e0f2bd", strong: "#8DD336", soft: "#d8efb0", softer: "#f1f9e2" },
  },
  {
    id: "tap-book",
    title: "tap book",
    client: "booking marketplace",
    tagline: "book local services instantly, no calls needed.",
    description:
      "a two-sided marketplace connecting customers with salons, clinics, gyms and more.",
    tags: "product design · mobile app",
    note: "case study",
    nda: false,
    image: tapBookImg,
    cover: "single",
    colors: { from: "#f4f0ff", to: "#dcd0ff", strong: "#5b34d6", soft: "#d9ccff", softer: "#efeaff" },
  },
];

// Your skills, grouped. Add or remove items here and the Profile pop-up updates.
export const skills = [
  {
    group: "Design & UX process",
    items: [
      "User Research & Competitive Analysis",
      "Wireframing & Prototyping",
      "Usability Testing",
      "Information Architecture",
      "Design Systems & Component Libraries",
      "Responsive Design & Accessibility (WCAG)",
    ],
  },
  {
    group: "Visual design",
    items: [
      "Typography & Color Theory",
      "Visual Hierarchy & Iconography",
      "Micro-interactions & Motion Design",
    ],
  },
  {
    group: "Tools",
    items: ["Figma (Auto Layout, Variants, Dev Mode)", "Adobe XD / Sketch", "Miro / FigJam", "Notion"],
  },
  {
    group: "Technical / hands-on",
    items: ["HTML", "CSS", "React", "Vite", "Tailwind CSS", "Git / GitHub", "Design-to-Code Hands-on"],
  },
];

// Blog posts. To add another one, copy the whole { ... } block below and change the text.
// body: one line per paragraph. The post opens inside the site (no new page or URL).
// url (optional): use it instead of body to send readers to a link, like Medium.
export const posts = [
  {
    id: "design-is-more-than-what-you-see",
    title: "Design Is More Than What You See",
    date: "Oct 2026",
    readTime: "1 min read",
    cover: blogImage("Blog 1"), // for the next post use blogImage("Blog 2"), and so on
    summary: "Design is not just about making something look beautiful.",
    body: [
      "Design is not just about making something look beautiful. It is about solving problems, creating clarity, and making experiences better.",
      "Good design makes things easier to understand. Whether it is a website, mobile app, poster, or product, every element should have a purpose.",
      "A good designer thinks about people first—what they need, what they feel, and how they interact with the product. Colors, typography, spacing, and layouts are not just visual choices; they are tools used to communicate ideas.",
      "The best designs often feel simple because the complexity has been carefully handled behind the scenes.",
      "For me, design is a balance between creativity and purpose. It is about creating something that not only looks good but also feels right and works well.",
      "Great design doesn't ask for attention. It earns it through simplicity and meaning.",
    ],
  },
];

// Footer social links. Paste your profile link in the url; links with an empty url stay hidden.
export const socials = [
  { label: "LinkedIn", icon: "linkedin", url: "" },
  { label: "Instagram", icon: "instagram", url: "" },
];

// Academic background for the timeline. start and end are years; add months as decimals if you
// like (2026.5 is the middle of 2026). Add ongoing: true to tint a card that is still going.
export const education = [
  {
    school: "IPS College of Technology and Management",
    place: "Gwalior, Madhya Pradesh",
    degree: "Bachelor of Technology (CSE)",
    gpa: "7.69",
    start: 2020,
    end: 2024,
  },
  {
    school: "Shri Ram College of Engineering and Management",
    place: "Banmore, Madhya Pradesh",
    degree: "Master of Technology (CSE)",
    gpa: "8.02",
    start: 2024,
    end: 2026,
  },
];

// The tools in the "my stack" row on the home screen. icon: figma, figjam, penpot, claude, adobe or notion.
export const stack = [
  { name: "figma", icon: "figma" },
  { name: "figjam", icon: "figjam" },
  { name: "penpot", icon: "penpot" },
  { name: "claude", icon: "claude" },
  { name: "adobe", icon: "adobe" },
  { name: "notion", icon: "notion" },
];
