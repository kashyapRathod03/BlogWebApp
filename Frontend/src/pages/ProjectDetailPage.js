import React from "react";
import { useParams } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { PORTFOLIO_PROJECTS } from "../data/siteData";
import PageHero from "../components/UI/PageHero";
import Button from "../components/UI/Button";
import TechnologyBadge from "../components/UI/TechnologyBadge";
import ProjectCard from "../components/UI/ProjectCard";
import CTASection from "../components/UI/CTASection";
import SEOHead from "../components/UI/SEOHead";
import NotFound from "../components/GeneralScreens/NotFound";
import "../Css/Pages.css";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  const relatedProjects = PORTFOLIO_PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <main>
      <SEOHead
        title={project.title}
        description={project.shortDesc}
        canonicalPath={`/portfolio/${project.slug}`}
      />

      <PageHero
        eyebrow={`${project.category} · ${project.badge}`}
        title={project.title}
        description={project.shortDesc}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Portfolio", to: "/portfolio" },
          { label: project.title },
        ]}
      >
        {project.liveUrl && (
          <Button to={project.liveUrl} variant="primary" size="lg">
            <span>Explore Live Platform</span>
            <FiArrowRight size={16} aria-hidden="true" />
          </Button>
        )}
        <Button to="/contact" variant={project.liveUrl ? "secondary" : "primary"} size="lg">
          Request Similar Architecture
        </Button>
      </PageHero>

      <section className="to-section">
        <div className="to-container to-grid-2">
          <div className="to-card">
            <span className="to-solution-card__block-label">Project Overview</span>
            <h2 style={{ fontSize: "1.35rem", marginBottom: 12 }}>Architecture Scope</h2>
            <p style={{ marginBottom: 20 }}>{project.overview}</p>

            <span className="to-solution-card__block-label">Business Challenge</span>
            <p style={{ marginBottom: 20 }}>{project.challenge}</p>

            <span className="to-solution-card__block-label">Solution Developed</span>
            <p style={{ marginBottom: 0 }}>{project.solution}</p>
          </div>

          <div className="to-card" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div>
              <span className="to-solution-card__block-label">Key Functionalities</span>
              <h2 style={{ fontSize: "1.35rem", marginBottom: 14 }}>Implemented Capabilities</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {project.functionalities.map((fn) => (
                  <li key={fn} style={{ display: "flex", gap: 10, color: "var(--text-secondary)" }}>
                    <FiCheckCircle size={17} color="#00C9C8" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: "auto" }}>
              <span className="to-solution-card__block-label" style={{ marginBottom: 10 }}>
                Technology Stack
              </span>
              <div className="to-tech-row">
                {project.technologies.map((tech) => (
                  <TechnologyBadge key={tech} name={tech} tone="teal" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="to-section to-section--secondary">
        <div className="to-container">
          <h2 style={{ fontSize: "1.75rem", marginBottom: 28 }}>Related Projects</h2>
          <div className="to-grid-2">
            {relatedProjects.map((rel) => (
              <ProjectCard key={rel.slug} project={rel} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default ProjectDetailPage;
