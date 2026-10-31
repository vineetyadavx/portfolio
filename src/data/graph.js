export const graph = {
    projects: [
      { id: "unipool", label: "UniPool", links: ["react", "node", "express"] },
      { id: "supermarket", label: "Supermarket", links: ["react", "node", "express", "sqlite"] },
      { id: "aicapsule", label: "AI Capsule", links: ["react", "node", "express", "sqlite"] },
      { id: "smartfarm", label: "SmartFarm", links: ["react", "node", "express", "sqlite"] },
      { id: "healthcoversim", label: "HealthCoverSim", links: ["react", "node", "express", "sqlite"] },
    ],
    skills: [
      { id: "js", label: "JavaScript" },
      { id: "react", label: "React" },
      { id: "node", label: "Node.js" },
      { id: "express", label: "Express" },
      { id: "sqlite", label: "SQLite" },
      { id: "python", label: "Python" },
      { id: "git", label: "Git" },
    ],
    meLinks: ["js", "python", "git"],
    skillEdges: [
      ["js", "react"],
      ["js", "node"],
    ],
  };