import React from "react";
import "./ui.css";

const SectionHeading = ({
  eyebrow,
  eyebrowTone = "teal",
  title,
  subtitle,
  align = "left",
}) => (
  <div className={`to-section-heading ${align === "center" ? "to-section-heading--center" : ""}`}>
    {eyebrow && (
      <span className={`to-eyebrow ${eyebrowTone === "purple" ? "to-eyebrow--purple" : ""}`}>
        {eyebrow}
      </span>
    )}
    <h2 className="to-section-heading__title">{title}</h2>
    {subtitle && <p className="to-section-heading__subtitle">{subtitle}</p>}
  </div>
);

export default SectionHeading;
