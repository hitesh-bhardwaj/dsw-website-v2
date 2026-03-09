import {
  Facebook,
  Insta,
  LinkedIn,
  Twitter,
  Youtube,
} from "../Svg/Icons";

export const NAV_LINKS = [
  {
    id: "solutions",
    label: "Solutions",
    href: "#",
    drop: true,
    children: [
      {
        id: "sol-1",
        label: "Insurance",
        href: "/solutions/insurance",
        description: "Enterprise AI OS purpose built for insurers.",
      },
      {
        id: "sol-2",
        label: "Banking",
        href: "/solutions/banking",
        description: "Production AI operating layer for modern banking.",
      },
      {
        id: "sol-3",
        label: "Retail",
        href: "/solutions/retail",
        description: "AI for merchandising, demand forecasting, and customers.",
      },
      {
        id: "sol-4",
        label: "Healthcare",
        href: "/solutions/healthcare",
        description:
          "AI for clinical, operational, and revenue intelligence.",
      },
      {
        id: "sol-5",
        label: "Manufacturing",
        href: "/solutions/manufacturing",
        description: "AI for plant operations, supply chain, and quality.",
      },
      {
        id: "sol-6",
        label: "Telecom",
        href: "/solutions/telecom",
        description:
          "AI platform for network, operations, and subscriber insights.",
      },
      {
        id: "sol-7",
        label: "Financial Services",
        href: "/solutions/financial-services",
        description: "AI to manage lending, payments, markets, and risk.",
      },
      {
        id: "sol-8",
        label: "Hospitality",
        href: "/solutions/hospitality",
        description: "AI to optimize operations and guest intelligence.",
      },
    ],
    megaMenu: {
      columns: [
        ["sol-2", "sol-1", "sol-7", "sol-3"],
        ["sol-6", "sol-5", "sol-8", "sol-4"],
      ],
      stories: [
        {
          quote:
            "DSW UnifyAI simplified our data-driven approach, enabling easy development of AI-powered use cases.",
          image: "/assets/homepage/testimonials/oxsde-final.png",
          name: "Stefano Bonfa",
          role: "Director, OxSDE, Europe",
        },
        {
          quote:
            "With DSW's insurance-specific solutions on top of its robust AI platform, we’ve been able to move use cases into production quickly.",
          image: "/assets/homepage/testimonials/canara-hsbc.png",
          name: "Ritesh Rathod",
          role: "Chief Strategy and Data Officer, Canara HSBC",
        },
      ],
    },
  },

  {
    id: "technology",
    label: "Technology",
    href: "#",
    drop: true,
    children: [
      {
        id: "tech-1",
        label: "Technical Overview of the OS",
        href: "/aios-technical",
        description:
          "Built for enterprises that don’t just build AI - but operate it.",
      },
      {
        id: "tech-2",
        label: "AI/ML Runtime",
        href: "/unifyai",
        description:
          "No more delays. No more stalled pilots. Just production ready AI/ML in weeks.",
      },
      {
        id: "tech-3",
        label: "AgenticAI",
        href: "/agentic-ai",
        description: "Deploy AI agents in hours!",
      },
    ],
  },

  {
    id: "opensource",
    label: "Open Source",
    href: "/dsw-open-source",
    drop: false,
  },

  {
    id: "resources",
    label: "Resources",
    href: "#",
    drop: true,
    children: [
      {
        id: "res-1",
        label: "Blogs",
        href: "/blogs",
        description: "Explore the future of AI, one post at a time.",
        group: "Learn",
      },
      {
        id: "res-2",
        label: "Workshops",
        href: "/ai-insurance-workshops",
        description: "Real-world AI & GenAI training for teams.",
        group: "Learn",
      },
      {
        id: "res-3",
        label: "Masterclass",
        href: "/dsw-workshop-deeptech-ai-genai-hands-on-masterclass",
        description: "Hands-on DeepTech AI & GenAI masterclass.",
        group: "Learn",
      },
      {
        id: "res-4",
        label: "In the News",
        href: "/news",
        description: "Latest media coverage, insights, and announcements.",
        group: "Engage",
      },
      {
        id: "res-5",
        label: "Events",
        href: "/webinars-and-events",
        description: "Live panels, expert talks, and hands-on sessions.",
        group: "Engage",
      },
      {
        id: "res-6",
        label: "Videos",
        href: "/product-videos",
        description: "See AI in action through demos and insights.",
        group: "Engage",
      },
      {
        id: "res-7",
        label: "Case Studies",
        href: "/casestudies",
        description: "Real use cases in fraud detection and customer data.",
        group: "Downloads",
      },
      {
        id: "res-8",
        label: "Whitepapers",
        href: "#",
        description: "Research on AI systems, fraud, and data platforms.",
        group: "Downloads",
      },
    ],
    megaMenu: {
      groups: ["Learn", "Engage", "Downloads"],
    },
  },

  {
    id: "about",
    label: "About Us",
    href: "/about",
    drop: false,
  },
  {
    id: "contact",
    label: "Contact Us",
    href: "/contact-us",
    drop: false,
  },
];

export const SOCIAL_LINKS = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/company/data-science-wizards/",
    icon: <LinkedIn />,
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/datasciencewizards/",
    icon: <Insta />,
  },
  {
    id: "facebook",
    href: "https://www.facebook.com/datasciencewizards/",
    icon: <Facebook />,
  },
  {
    id: "twitter",
    href: "https://x.com/dswizards",
    icon: <Twitter />,
  },
  {
    id: "youtube",
    href: "https://www.youtube.com/@DataScienceWizards",
    icon: <Youtube />,
  },
];