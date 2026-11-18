import React from "react";
import {
  FiCode,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiGlobe,
  FiLayers,
  FiLink,
  FiServer,
  FiTerminal,
  FiBox,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import "./ui.css";

const TECH_ICONS = {
  React: FiCode,
  JavaScript: FiTerminal,
  TypeScript: FiCode,
  HTML: FiGlobe,
  CSS: FiLayers,
  Java: FiCpu,
  "Spring Boot": FiServer,
  "Node.js": FiServer,
  "Express.js": FiServer,
  PostgreSQL: FiDatabase,
  MySQL: FiDatabase,
  MongoDB: FiDatabase,
  "Spring AI": HiOutlineSparkles,
  "LLM Integration": FiCpu,
  RAG: FiGitBranch,
  "AI Agents": HiOutlineSparkles,
  "Workflow Automation": FiGitBranch,
  Docker: FiBox,
  Nginx: FiServer,
  Git: FiGitBranch,
  "REST APIs": FiLink,
};

const TechnologyBadge = ({ name, tone = "default" }) => {
  const Icon = TECH_ICONS[name];
  const toneClass = tone === "teal" ? "to-badge--teal" : tone === "purple" ? "to-badge--purple" : "";

  return (
    <span className={`to-badge ${toneClass}`.trim()}>
      {Icon && <Icon size={13} aria-hidden="true" />}
      <span>{name}</span>
    </span>
  );
};

export default TechnologyBadge;
