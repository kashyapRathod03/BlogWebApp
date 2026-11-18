import React from "react";
import Breadcrumb from "./Breadcrumb";
import "./ui.css";

const PageHero = ({ eyebrow, eyebrowTone = "teal", title, description, breadcrumbs, children }) => (
  <section className="to-page-hero">
    <div className="to-container">
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}
      {eyebrow && (
        <span className={`to-eyebrow ${eyebrowTone === "purple" ? "to-eyebrow--purple" : ""}`}>
          {eyebrow}
        </span>
      )}
      <h1 className="to-page-hero__title">{title}</h1>
      {description && <p className="to-page-hero__desc">{description}</p>}
      {children && <div className="to-page-hero__actions">{children}</div>}
    </div>
  </section>
);

export default PageHero;
