import React, { useState } from "react";
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES } from "../data/siteData";
import PageHero from "../components/UI/PageHero";
import ProjectCard from "../components/UI/ProjectCard";
import CTASection from "../components/UI/CTASection";
import SEOHead from "../components/UI/SEOHead";
import "../Css/Pages.css";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <main>
      <SEOHead
        title="Portfolio & Engineering Architectures"
        description="Explore TechOrcas live digital platforms and engineering reference architectures across web, enterprise, AI, SaaS, and mobile."
        canonicalPath="/portfolio"
      />

      <PageHero
        eyebrow="Portfolio & Blueprints"
        title="Systems & Reference Builds Engineered by TechOrcas."
        description="Every entry reflects our live platform capabilities and verified engineering blueprints—built without fabricated metrics or fictional client stories."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Portfolio" }]}
      />

      <section className="to-section">
        <div className="to-container">
          <div className="to-filter-bar" style={{ marginBottom: 32 }} role="tablist" aria-label="Project Categories">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`to-filter-pill ${activeCategory === category ? "to-filter-pill--active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="to-grid-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Build Something Similar for Your Organization?"
        description="Let's review your architecture requirements and tailor a solution to your business."
        primaryLabel="Discuss a Project"
        primaryTo="/contact"
        secondaryLabel="Explore Our Services"
        secondaryTo="/services"
      />
    </main>
  );
};

export default PortfolioPage;
