export const caseStudies = {
    unipool: {
      summary:
        "UniPool is a campus app that puts events, clubs, social matching and a student marketplace in one place. I built it as the sole developer on a group project, while my teammates handled the business and presentation side.",
      problem:
        "Students find events, clubs, new friends and second-hand goods in different places. The brief was one app that covers all four.",
      built: [
        "Events Feed for browsing what is on around campus",
        "Club Management features for running campus clubs",
        "UniMate, a social matching feature that connects students",
        "Student Marketplace for buying and selling between students",
        "A centralised design system so every screen shares the same components and styling",
      ],
      architecture: [
        { label: "Frontend", value: "React, deployed on Vercel" },
        { label: "Backend", value: "Node.js, deployed on Render" },
        { label: "Design", value: "Centralised design system" },
      ],
      result: [
        "Deployed end to end, with the frontend on Vercel and the backend on Render",
        "All four feature areas delivered by one developer",
      ],
      next: [
        "Notifications for new events and new matches",
        "Moderation tools for marketplace listings",
        "Sign-in through the university account",
      ],
    },
  
    supermarket: {
      summary:
        "A supermarket simulation that runs for 60 simulated days. An automated Store Brain makes the daily decisions, and the reports let you trace every figure back to the records behind it.",
      problem:
        "The brief was a store that runs itself, with numbers that can be proven: stock, cash and sales had to reconcile across the whole run.",
      built: [
        "A 70-product catalogue and a SQLite schema with append-only triggers, so history cannot be rewritten",
        "A simulation engine that plays out 60 days of trading",
        "Store Brain, the automated decision-maker for the store",
        "Report pages: Model Declaration, 60-Day Report, Daily Reports and Commercial Assurance",
        "A product trace pop-up that follows an item through the records",
      ],
      architecture: [
        { label: "Frontend", value: "React" },
        { label: "Backend", value: "Node.js and Express" },
        { label: "Database", value: "SQLite with append-only triggers" },
        { label: "Verification", value: "20 automated assurance checks" },
      ],
      result: [
        "20 of 20 assurance checks passed on the final submitted run",
        "Final run closed with A$355,851.50 in revenue and A$191,420.35 in cash",
        "Stock and cash reconciled across the whole run",
      ],
      next: [
        "Demand forecasting inside the Store Brain",
        "Supplier delays and stock-outs as part of the simulation",
        "Side-by-side comparison of different Store Brain strategies",
      ],
    },
  
    aicapsule: {
      summary:
        "AI Capsule is a cloud-hosted prompt manager. Users sign in with GitHub and can create, read, update and delete their saved AI prompts.",
      problem:
        "The brief called for a real, deployed full-stack app with proper authentication, not something that only runs on localhost.",
      built: [
        "GitHub OAuth login",
        "An Express-issued JWT stored in an HttpOnly cookie",
        "Full CRUD for prompts, stored in SQLite",
        "Deployment on Render, tested on the live URL",
      ],
      architecture: [
        { label: "Frontend", value: "React" },
        { label: "Backend", value: "Node.js and Express" },
        { label: "Auth", value: "GitHub OAuth, JWT in an HttpOnly cookie" },
        { label: "Database", value: "SQLite" },
        { label: "Hosting", value: "Render" },
      ],
      result: [
        "Live at ai-capsule-dnee.onrender.com with login, CRUD and cookie auth all working",
        "Both required cURL checks returned 401 for unauthenticated requests on the live URL",
      ],
      next: [
        "Tags and search across saved prompts",
        "Version history for each prompt",
        "Sharing prompts with other users",
      ],
    },
  
    smartfarm: {
      summary:
        "SmartFarm is a full-stack dashboard for monitoring crops, built for the second assignment of CSE3CWA-5006.",
      problem:
        "The brief was a full-stack web app for monitoring crops, with a React frontend talking to its own API and database.",
      built: [
        "A React and Vite dashboard frontend",
        "A Node and Express API",
        "SQLite storage for the crop data",
      ],
      architecture: [
        { label: "Frontend", value: "React and Vite" },
        { label: "Backend", value: "Node.js and Express" },
        { label: "Database", value: "SQLite" },
      ],
      result: ["A working full-stack app: dashboard, API and database"],
      next: [
        "A live sensor data feed",
        "Alerts when a reading leaves a safe range",
        "Historical charts for each field",
      ],
    },
  
    healthcoversim: {
      summary:
        "HealthCoverSim produces private health insurance quotes from a user's details. It was my first assignment of the unit, built end to end.",
      problem:
        "The brief was a private health insurance quote simulator, with a frontend, an API and a database behind it.",
      built: [
        "A React and Vite frontend for entering details and viewing quotes",
        "An Express API that works out the quote",
        "SQLite storage through better-sqlite3",
        "A public GitHub repo and a recorded video demo",
      ],
      architecture: [
        { label: "Frontend", value: "React and Vite" },
        { label: "Backend", value: "Node.js and Express" },
        { label: "Database", value: "SQLite through better-sqlite3" },
      ],
      result: [
        "Completed end to end: frontend, backend, database, repo and video demo",
      ],
      next: [
        "Compare quotes across several cover levels",
        "Save and revisit past quotes",
        "Explain what drives each price",
      ],
    },
  };