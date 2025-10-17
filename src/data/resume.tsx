import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Aladdin Kanngo",
  initials: "AK",
  url: "https://portfolioderototypi.com",
  location: "Marbella, Spain",
  locationLink: "https://www.google.com/maps/place/marbella_spain",
  description: "Frontend Genie 🧞",
  summary: "Full-stack developer with experience in modern web technologies and a strong foundation in both frontend and backend development. Specialized in React, TypeScript, and Node.js, with a track record of building responsive and user-friendly applications.",
  avatarUrl: "/aladdin.svg",
  skills: [
    "JavaScript ES6",
    "React",
    "TypeScript",
    "React Native",
    "HTML5 & CSS3",
    "Angular",
    "SASS/LESS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "PHP",
    "WordPress",
    "Django",
    "Wagtail",
    "Next.js",
    "Docker",
    "CI/CD",
    "REST",
    "Supabase"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "kanngo.aladdin@gmail.com",
    tel: "+46708436362",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/alkanngo",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/aladdin-kanngo/",
        icon: Icons.linkedin,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Grand New World Ltd",
      href: "#",
      badges: [],
      location: "Remote",
      logoUrl: "/selacs.svg",
      title: "Technical Lead",
      start: "Jun 2024",
      end: "Present",
      description: "Led full-stack development, design, and technical strategy across four distinct digital platforms spanning climate-tech, legal-fintech, securities trading, and membership management. Architected and delivered end-to-end solutions using Next.js, TypeScript, and Supabase, implementing real-time data systems, payment integrations, and regulatory compliance workflows."
    },
    {
      company: "pxlprsche",
      href: "https://pxlprsche.com",
      badges: [],
      location: "Remote",
      logoUrl: "/pxlprsche.svg",
      title: "Founder & Creative Director",
      start: "Jan 2024",
      end: "Present",
      description: "Developed and maintain a successful digital art brand specializing in automotive pixel art. Built engaged social media following and secured licensing agreements with global retail brands."
    },
    {
      company: "Fröjd Agency",
      href: "https://frojd.se",
      badges: [],
      location: "Stockholm",
      logoUrl: "/frojd.svg",
      title: "Developer",
      start: "Dec 2021",
      end: "Aug 2023",
      description: "Specialized in crafting tailored features and modules within headless CMS platforms, including WordPress (PHP) and Wagtail (Django), integrated with advanced JavaScript frameworks such as Next.js, jQuery, and React."
    },
    {
      company: "Ingager AB",
      href: "#",
      badges: [],
      location: "Stockholm",
      logoUrl: "/ingager.png",
      title: "Frontend Developer",
      start: "Aug 2021",
      end: "Dec 2021",
      description: "Developed features for IQ, a web-based tool powered by the MEAN stack. Built powerful platform for forecasting and reporting performance data for client ad-accounts."
    }
  ],
  education: [
    {
      school: "Medieinstitutet",
      href: "#",
      degree: "Frontend Developer",
      start: "Aug 2018",
      end: "May 2020",
      description: "Comprehensive programming education covering languages, tools, and frameworks for responsive web development."
    },
    {
      school: "Fyriskolan",
      href: "#",
      degree: "Social Science Degree",
      start: "Aug 2009",
      end: "Jun 2012",
      description: "Field of study: Economics/Entrepreneurship"
    }
  ],
  projects: [
    {
      title: "Ecozync",
      href: "#",
      dates: "2025",
      active: false,
      image: "/ecozync.png",
      description: "Engineered a social-first habit-making carbon offsetting platform that gamifies climate action through community engagement and interactive animations. Built a comprehensive calculation engine with 500+ emission factors from EPA, DEFRA, and IPCC sources, ensuring instant results and complete privacy. Integrated Stripe subscriptions for verified Gold Standard carbon credit purchasing that directly supports planting trees in the Congo Basin rainforest and supports local communities.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Stripe API",
        "Framer Motion",
        "Tailwind CSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://ecozync.com",
          icon: <Icons.globe className="size-3" />
        }
      ]
    },
    {
      title: "Stockholm Business Region",
      href: "https://www.frojd.se/case/stockholm-business-region",
      dates: "2023",
      active: false,
      image: "/sbr.png",
      description:
        "Crafted a gateway platform for one of the world's most innovative regions. Implemented React and modern frontend technologies, featuring interactive 3D statistics visualization using WebGL/ThreeJS and framer-motion animations. Enhanced performance through server-side rendering while ensuring accessibility (WCAG AA compliant). The platform successfully generated over 100 business leads in its first month.",
      technologies: [
        "Wagtail",
        "Django",
        "Next.js",
        "TypeScript",
        "WebGL",
        "ThreeJS",
        "Framer Motion",
        "Server-side Rendering",
      ],
      links: [
        {
          type: "Website",
          href: "https://stockholmbusinessregion.com",
          icon: <Icons.globe className="size-3" />,
        }
      ]
    },
    {
      title: "Royal Swedish Academy of Sciences",
      href: "https://www.frojd.se/case/en-plats-for-vetenskaplig-kunskap",
      dates: "2022",
      active: false,
      image: "/kva.png",
      description:
        "Contributed to four interconnected websites for the Royal Swedish Academy of Sciences, including the main academy site, Crafoord Prize, Center for History of Science, and Institut Mittag-Leffler. Created a shared WordPress codebase with unique theming for each site, focusing on modularity and accessibility (WCAG compliance). Established advanced content management features while maintaining distinct visual identities for each platform.",
      technologies: [
        "WordPress",
        "PHP",
        "React",
        "Multi-site Architecture",
        "WCAG Compliance",
        "Custom Theming",
      ],
      links: [
        {
          type: "Website",
          href: "https://kva.se",
          icon: <Icons.globe className="size-3" />,
        }
      ]
    },
    {
      title: "Swedish Breast Cancer Association",
      href: "https://www.frojd.se/case/brostcancerforbundet",
      dates: "2023",
      active: false,
      image: "/bcf.png",
      description:
        "Built a comprehensive platform for Sweden's Breast Cancer Association, unifying 33 local chapters into a seamless digital experience. Designed user-friendly donation flows with pedagogical animations and crafted an intuitive CMS interface for varying technical skill levels. Established a balanced design system that combines professional medical information with emotional support elements.",
      technologies: [
        "Wagtail",
        "Django",
        "Next.js",
        "Payment Integration",
        "Multi-chapter CMS",
        "Accessibility"
      ],
      links: [
        {
          type: "Website",
          href: "https://brostcancerforbundet.se",
          icon: <Icons.globe className="size-3" />,
        }
      ]
    },
    {
      title: "Mentor Sweden",
      href: "https://www.frojd.se/case/mentor-en-plats-for-unga-att-vaxa",
      dates: "2022",
      active: false,
      image: "/mentor.png",
      description:
        "Created a dynamic platform for Mentor, a non-profit organization helping young people grow. Engineered an advanced form system with Salesforce CRM integration, transforming traditional forms into engaging multi-step experiences. Structured a modular WordPress solution with responsive design and multi-language support, including right-to-left Arabic version. The platform showcases a bold design system with geometric animations and strong accessibility focus.",
      technologies: [
        "WordPress",
        "PHP",
        "Next.js",
        "TypeScript",
        "Anime.js",
        "Salesforce Integration",
        "Multi-language Support",
      ],
      links: [
        {
          type: "Website",
          href: "https://mentor.se",
          icon: <Icons.globe className="size-3" />,
        }
      ]
    }
  ],
} as const;
