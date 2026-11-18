import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import TechnologyBadge from "./TechnologyBadge";
import "./ui.css";

const ProjectCard = ({ project }) => (
  <article className="to-card to-card--interactive to-project-card">
    <div className="to-project-card__visual">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <span className="to-badge to-badge--teal">{project.category}</span>
        <span className="to-badge">{project.badge}</span>
      </div>
      <div className="to-project-card__wireframe" aria-hidden="true">
        <div className="to-wireframe-nav">
          <div className="to-wireframe-bar to-wireframe-bar--teal" />
          <div className="to-wireframe-bar" />
          <div className="to-wireframe-bar to-wireframe-bar--purple" />
          <div className="to-wireframe-bar" />
        </div>
        <div className="to-wireframe-main">
          <div className="to-wireframe-tile" />
          <div className="to-wireframe-tile" />
          <div className="to-wireframe-tile" style={{ gridColumn: "1 / -1", height: 28 }} />
        </div>
      </div>
    </div>

    <div className="to-project-card__body">
      <h3 style={{ fontSize: "1.2rem", marginBottom: 2 }}>{project.title}</h3>
      <p style={{ fontSize: "0.93rem", flex: 1, marginBottom: 6 }}>{project.shortDesc}</p>

      <div className="to-tech-row">
        {project.technologies.slice(0, 5).map((tech) => (
          <TechnologyBadge key={tech} name={tech} />
        ))}
      </div>

      <div style={{ paddingTop: 10 }}>
        <Link to={`/portfolio/${project.slug}`} className="to-service-card__link">
          <span>View Details</span>
          <FiArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </article>
);

export default ProjectCard;
