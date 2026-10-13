import dashboardImg from "./assets/project1 screens/dashboard.png";
import storesImg from "./assets/project1 screens/stores list.png";
import ordersImg from "./assets/project1 screens/order management.png";
import menuImg from "./assets/project1 screens/menu management.png";
import calendarImg from "./assets/project1 screens/calendar and schedule.png";
import staffImg from "./assets/project1 screens/staff management.png";
import rolesImg from "./assets/project1 screens/role and permissions.png";

// Tap Book phone screens live in two folders: src/assets/tapbook screens/customer and /business.
// Each folder's screens show in the order listed below. Any other file is added after them, A to Z.
const customerFiles = import.meta.glob("./assets/tapbook screens/customer/*.*", { eager: true, import: "default" });
const businessFiles = import.meta.glob("./assets/tapbook screens/business/*.*", { eager: true, import: "default" });

// "My booking (cancelled)-user.png" becomes "my booking (cancelled)"
const cleanName = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/-user$/i, "")
    .replace(/^\d+[\s._-]*/, "")
    .toLowerCase();

const buildScreens = (files, order) =>
  Object.keys(files)
    .map((path) => ({ title: cleanName(path), caption: "", image: files[path] }))
    .sort((a, b) => {
      const ia = order.indexOf(a.title);
      const ib = order.indexOf(b.title);
      if (ia === -1 && ib === -1) return a.title.localeCompare(b.title);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });

const customerScreens = buildScreens(customerFiles, [
  "home",
  "explore",
  "select service",
  "pick a slot",
  "your details",
  "payment",
  "my booking (upcoming)",
  "my booking (completed)",
  "my booking (cancelled)",
]);
const businessScreens = buildScreens(businessFiles, [
  "home",
  "calendar",
  "services",
  "working hours",
  "business profile",
  "profile",
]);

// Content for the project pages. Edit the text here and the page updates.
// The key ("restaurant") must match the "id" of the project in data.js.
// Images: put them in /public/projects and write the path, e.g. "/projects/dashboard.png".
// Leave an image as "" to show a placeholder frame.
export const caseStudies = {
  restaurant: {
    title: "restaurant & cafes management platform",
    label: "case study · food & cafe saas",
    figmaUrl: "https://www.figma.com/design/IJl0PJCYFPaz3cpvqFC04d/Restaurant---Cafes-Management--Platform?node-id=0-1&t=h4Ee1CWkYgRsZlJq-1",
    tagline: "every branch, order and menu from one dashboard.",
    intro:
      "A SaaS platform that lets cafe and restaurant owners run every store, order, menu and staff role from one place.",
    image: "", // optional wide cover image shown under the intro
    meta: [
      { label: "type", value: "saas product design" },
      { label: "platform", value: "web app" },
      { label: "tools", value: "figma, claude" },
      { label: "focus", value: "multi-store operations" },
    ],

    problem:
      "Cafe and restaurant owners run each store on separate spreadsheets and apps. There is no single view of revenue across locations, and giving staff the right amount of access is guesswork, so owners stay tied to one location.",
    solution:
      "One platform for the whole business. Owners get a dashboard and multi-store control, managers get live orders, menus and schedules, and staff only see the screens their role needs through role-based access.",

    research: {
      goals: [
        "See how multi-store owners run sales, orders and staff today.",
        "Find where current tools fall short.",
        "Learn what each role needs to see.",
      ],
      competitors: [
        {
          name: "Lightspeed Restaurant",
          about: "iPad-based POS and management platform, popular in North America and Europe.",
          strong: ["Deep inventory and reporting", "Strong multi-location support"],
          weak: ["Complex setup", "Costly for small cafes"],
        },
        {
          name: "Petpooja",
          about: "All-in-one restaurant platform, popular in South Asia. Rated 4.7/5 on G2.",
          strong: ["Easy to use", "Wide integrations"],
          weak: ["Dated UI", "Limited role-based permissions"],
        },
      ],
      gap: "Simple to set up, modern to use, with multi-store control and detailed role permissions.",
      insights: [
        {
          title: "no single view",
          text: "Owners juggle spreadsheets and apps per store, with no view of total revenue.",
        },
        {
          title: "access matters",
          text: "Too much or too little access worries owners, so roles became a core feature.",
        },
        {
          title: "rush hour",
          text: "Managers need live orders and quick menu changes within reach.",
        },
        {
          title: "less is more",
          text: "Cashiers are slowed by extra screens, so each role sees only what it needs.",
        },
      ],
    },

    personasIntro: "The three people this platform is built for.",
    personas: [
      {
        role: "the owner (super admin)",
        name: "Alex Rivera, 38",
        about: "Owns 2 cafes",
        goal: "See how the business is doing at a glance, manage staff access, avoid being tied to one location.",
        pains: [
          "Juggling multiple spreadsheets and apps for each store",
          "No single view of revenue across locations",
          "Worried about staff having too much or too little access",
        ],
        needs: ["Dashboard overview", "Multi-store control", "Easy staff role management"],
      },
      {
        role: "the manager",
        name: "Priya Nair, 29",
        about: "Store manager",
        goal: "Keep daily operations smooth: orders flowing, staff scheduled, menu updated.",
        pains: [
          "Constant order tracking during rush hours",
          "Manually updating menu availability",
          "Coordinating shift schedules",
        ],
        needs: ["Live order management", "Quick menu edits", "Calendar and schedule view"],
      },
      {
        role: "the cashier / line staff",
        name: "Amit, 22",
        about: "Part-time cashier",
        goal: "Process orders fast and avoid mistakes during busy shifts.",
        pains: [
          "Confusing systems slow them down",
          "Too many permissions and screens they don't need",
        ],
        needs: ["Simple, focused order screen only", "No clutter", "Minimal training needed"],
      },
    ],

    features: [
      { title: "dashboard", text: "Total sales, revenue, average order value and prep time at a glance." },
      { title: "multi-store control", text: "One list of every branch with its status, orders today and revenue." },
      { title: "live order management", text: "Orders arrive already paid, and pickup is confirmed by scanning the customer's QR code." },
      { title: "menu management", text: "Categories, availability toggles and quick edits for every item." },
      { title: "calendar & schedule", text: "Plan shifts and events in one calendar." },
      { title: "roles & permissions", text: "The owner decides which screens and features each role can see." },
    ],

    // two columns, all the same size; an odd last screen is centered at the bottom (images are 1280 x 832)
    screens: [
      { title: "dashboard", caption: "sales, revenue and order insights", image: dashboardImg },
      { title: "stores list", caption: "every branch in one place", image: storesImg },
      { title: "order management", caption: "live orders and pickup confirmation", image: ordersImg },
      { title: "menu management", caption: "items, categories and availability", image: menuImg },
      { title: "calendar & schedule", caption: "shifts and events", image: calendarImg },
      { title: "staff management", caption: "all staff by role and store", image: staffImg },
      { title: "roles & permissions", caption: "what each role can access", image: rolesImg },
    ],

    designSystem: {
      colors: [
        { name: "primary", hex: "#54B226" },
        { name: "secondary", hex: "#FDFFFC" },
      ],
      grid: {
        name: "8pt grid",
        text: "All spacing and sizing uses multiples of 8.",
      },
      typography: {
        family: "Inter",
        headings: [
          { name: "Heading 1", size: 24 },
          { name: "Heading 2", size: 20 },
          { name: "Heading 3", size: 16 },
          { name: "Heading 4", size: 14 },
          { name: "Heading 5", size: 12 },
          { name: "Heading 6", size: 8 },
        ],
        body: [
          { name: "Body text 1", size: 14 },
          { name: "Body text 2", size: 12 },
          { name: "Body text 3", size: 8 },
        ],
      },
    },
  },
  "tap-book": {
    title: "tap book",
    label: "case study · booking marketplace",
    figmaUrl: "https://www.figma.com/design/nvh3KI0UojfT7Y09W2KgyR/Booking-app?node-id=0-1&t=bgUUJasMmsJOdXNH-1",
    tagline: "book local services instantly, no calls needed.",
    intro: "A two-sided booking marketplace that connects customers with local salons, clinics, gyms and more.",
    image: "",
    meta: [
      { label: "type", value: "mobile app design" },
      { label: "platform", value: "mobile app" },
      { label: "tools", value: "figma" },
      { label: "focus", value: "two-sided booking" },
    ],

    problem:
      "Booking a salon, clinic or gym usually means phone calls and WhatsApp back-and-forth, and it is hard to compare nearby options in one place.",
    solution:
      "One app where customers discover nearby businesses and book instantly, while business owners manage listings, bookings, staff and reminders from their own app.",

    research: {
      goalsTitle: "research & strategy",
      goals: [
        "Mapped competitors: Calendly, Acuity, SimplyBook, Zoho Bookings, Practo and Urban Company.",
        "Defined two business categories with distinct UX needs.",
        "Set the revenue model: subscription, commission and featured listings.",
      ],
      gap: "No competitor offers WhatsApp-first reminders, UPI payments and ₹499/month pricing for tier-2 Indian businesses.",
    },

    personasIntro: "The two sides of the marketplace.",
    personas: [
      {
        initials: "AS",
        name: "Arjun Sharma",
        about: "24 · Software trainee · Gwalior, MP",
        badge: "Customer",
        quote: "I just want to book a haircut without calling 3 salons and waiting on hold.",
        goals: ["Find nearby services quickly", "Book and confirm in under 2 minutes"],
        pains: ['Calls salons only to hear "fully booked"', "No way to compare prices or ratings nearby"],
      },
      {
        initials: "PK",
        name: "Priya Kapoor",
        about: "34 · Salon owner · Indore, MP",
        badge: "Business owner",
        quote: "I lose money every week from no-shows and double bookings. I need something simple.",
        goals: ["Reduce no-shows with automatic reminders", "Manage walk-ins and online bookings together"],
        pains: ["Customers book via WhatsApp then don't show up", "Double bookings when walk-ins and online clash"],
      },
    ],

    features: [
      {
        title: "two categories",
        text: "Personal care (salons, spas, gyms, beauty parlours) and healthcare (clinics, physiotherapists, dentists, blood test labs).",
      },
      { title: "instant booking", text: "Pick a service and a slot, and it's booked with no phone calls." },
      { title: "whatsapp alerts", text: "Booking reminders go straight to WhatsApp." },
      { title: "simple payments", text: "Pay in the app, with instant refund eligibility." },
    ],

    // phone screens (412 x 917), in two groups that come from the folders above
    screensLayout: "mobile",
    screenGroups: [
      { title: "customer app", screens: customerScreens },
      { title: "business owner app", screens: businessScreens },
    ],
  },
};
