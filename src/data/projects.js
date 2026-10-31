export const projects = [
    {
      id: "unipool",
      title: "UniPool",
      context: "Group project, sole developer",
      blurb:
        "A campus app that brings events, clubs, social matching and a student marketplace into one place.",
      highlights: [
        "Events feed, club management, UniMate matching and a student marketplace",
        "Frontend on Vercel, backend on Render",
        "One shared design system across every screen",
      ],
      stack: ["React", "Node.js", "Express", "Vercel", "Render"],
      links: {
        live: "",
        repo: "https://github.com/vineetyadavx/unipool",
      },
      image: "",
    },
    {
      id: "supermarket",
      title: "Autonomous Supermarket",
      context: "La Trobe, CSE3CWA-5006 Assignment 4",
      blurb:
        "A supermarket that runs itself for 60 simulated days, with a Store Brain making the day-to-day decisions.",
      highlights: [
        "70-product catalogue and a daily reporting suite",
        "Append-only SQLite records enforced by triggers",
        "20 of 20 assurance checks passed on the final run",
      ],
      stack: ["React", "Node.js", "Express", "SQLite"],
      links: {
        live: "",
        repo: "https://github.com/vineetyadavx/assessment4-autonomous-supermarket",
      },
      image: "",
    },
    {
      id: "aicapsule",
      title: "AI Capsule",
      context: "La Trobe, CSE3CWA-5006 Assignment 3",
      blurb:
        "A cloud-hosted manager for saving and reusing AI prompts, behind secure OAuth login.",
      highlights: [
        "GitHub OAuth with a JWT stored in an HttpOnly cookie",
        "Full CRUD, tested live on Render",
        "Unauthenticated requests return 401, checked with cURL",
      ],
      stack: ["React", "Node.js", "Express", "SQLite", "OAuth", "JWT", "Render"],
      links: {
        live: "https://ai-capsule-dnee.onrender.com",
        repo: "",
      },
      image: "",
    },
    {
      id: "smartfarm",
      title: "SmartFarm",
      context: "La Trobe, CSE3CWA-5006 Assignment 2",
      blurb: "A full-stack dashboard for monitoring crops.",
      highlights: [
        "React and Vite frontend",
        "Node and Express API backed by SQLite",
      ],
      stack: ["React", "Vite", "Node.js", "Express", "SQLite"],
      links: {
        live: "",
        repo: "",
      },
      image: "",
    },
    {
      id: "healthcoversim",
      title: "HealthCoverSim",
      context: "La Trobe, CSE3CWA-5006 Assignment 1",
      blurb:
        "A simulator that produces private health insurance quotes from a user's details.",
      highlights: [
        "React and Vite frontend with an Express API",
        "SQLite storage through better-sqlite3",
        "Built phase by phase, with a recorded video demo",
      ],
      stack: ["React", "Vite", "Node.js", "Express", "SQLite"],
      links: {
        live: "",
        repo: "https://github.com/vineetyadavx/22136757_CSE3CWA-5006-Assignment1-HealthCoverSim",
      },
      image: "",
    },
  ];