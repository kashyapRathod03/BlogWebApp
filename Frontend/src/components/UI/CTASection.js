import React from "react";
import Button from "./Button";
import "./ui.css";

const CTASection = ({
  title = "Have an Idea? Let's Build Something Great.",
  description = "Whether you're starting a new digital product or improving an existing business process, let's explore how technology can help.",
  primaryLabel = "Start a Conversation",
  primaryTo = "/contact",
  secondaryLabel = "Explore Our Services",
  secondaryTo = "/services",
}) => (
  <section className="to-section">
    <div className="to-container">
      <div className="to-cta-box">
        <div className="to-cta-box__content">
          <h2 className="to-cta-box__title">{title}</h2>
          <p className="to-cta-box__desc">{description}</p>
        </div>
        <div className="to-cta-box__actions">
          <Button to={primaryTo} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryTo && (
            <Button to={secondaryTo} variant="secondary" size="lg">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
