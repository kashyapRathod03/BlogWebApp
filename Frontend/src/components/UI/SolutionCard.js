import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Button from "./Button";
import TechnologyBadge from "./TechnologyBadge";
import "./ui.css";

const SolutionCard = ({ solution }) => (
  <article className="to-card to-card--interactive to-solution-card">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <span className="to-badge to-badge--purple">{solution.sector}</span>
    </div>
    <h3 style={{ fontSize: "1.25rem", marginBottom: 0 }}>{solution.title}</h3>

    <div>
      <span className="to-solution-card__block-label">Business Challenge</span>
      <p style={{ fontSize: "0.92rem", marginBottom: 0 }}>{solution.challenge}</p>
    </div>

    <div>
      <span className="to-solution-card__block-label">Proposed Solution</span>
      <p style={{ fontSize: "0.92rem", marginBottom: 0 }}>{solution.solution}</p>
    </div>

    {solution.benefits && solution.benefits.length > 0 && (
      <div>
        <span className="to-solution-card__block-label">Expected Business Benefits</span>
        <ul className="to-solution-card__benefits">
          {solution.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    )}

    <div className="to-tech-row" style={{ marginTop: "auto", paddingTop: 6 }}>
      {solution.technologies.map((tech) => (
        <TechnologyBadge key={tech} name={tech} />
      ))}
    </div>

    <div style={{ paddingTop: 8 }}>
      <Button to="/contact" variant="secondary" size="sm">
        <span>Explore Solution</span>
        <FiArrowRight size={14} aria-hidden="true" />
      </Button>
    </div>
  </article>
);

export default SolutionCard;
