import React from "react";
import { useParams, Link } from "react-router-dom";
import { FiCheckCircle, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { ALL_SERVICES, PORTFOLIO_PROJECTS } from "../data/siteData";
import PageHero from "../components/UI/PageHero";
import Button from "../components/UI/Button";
import TechnologyBadge from "../components/UI/TechnologyBadge";
import ProjectCard from "../components/UI/ProjectCard";
import CTASection from "../components/UI/CTASection";
import SEOHead from "../components/UI/SEOHead";
import NotFound from "../components/GeneralScreens/NotFound";
import "../Css/Pages.css";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = ALL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <NotFound />;
  }

  const relevantProjects = PORTFOLIO_PROJECTS.filter((project) =>
    project.technologies.some((t) => service.technologies.includes(t))
  ).slice(0, 2);

  return (
    <main>
      <SEOHead
        title={service.title}
        description={service.shortDesc}
        canonicalPath={`/services/${service.slug}`}
      />

      <PageHero
        eyebrow={service.category}
        title={service.title}
        description={service.shortDesc}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.title },
        ]}
      >
        <Button to="/contact" variant="primary" size="lg">
          <span>Discuss {service.title}</span>
          <FiArrowRight size={16} aria-hidden="true" />
        </Button>
        <Button to="/services" variant="secondary" size="lg">
          All Services
        </Button>
      </PageHero>

      <section className="to-section">
        <div className="to-container to-grid-2">
          <div className="to-card">
            <span className="to-eyebrow to-eyebrow--purple">Business Problems Addressed</span>
            <h2 style={{ fontSize: "1.45rem", marginBottom: 16 }}>Challenges We Solve</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {service.problems.map((problem) => (
                <li key={problem} style={{ display: "flex", gap: 10, color: "var(--text-secondary)" }}>
                  <FiAlertCircle size={18} color="#A874FF" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="to-card">
            <span className="to-eyebrow">What We Deliver</span>
            <h2 style={{ fontSize: "1.45rem", marginBottom: 16 }}>Deliverables &amp; Scope</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {service.deliverables.map((item) => (
                <li key={item} style={{ display: "flex", gap: 10, color: "var(--text-primary)", fontWeight: 500 }}>
                  <FiCheckCircle size={18} color="#00C9C8" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="to-section to-section--secondary">
        <div className="to-container to-grid-2">
          <div className="to-card">
            <h2 style={{ fontSize: "1.4rem", marginBottom: 16 }}>Key Engineering Features</h2>
            <ul className="to-solution-card__benefits" style={{ fontSize: "0.96rem" }}>
              {service.features.map((feat) => (
                <li key={feat} style={{ marginBottom: 10 }}>{feat}</li>
              ))}
            </ul>
          </div>

          <div className="to-card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: 10 }}>Development Approach</h2>
              <p style={{ marginBottom: 0 }}>{service.approach}</p>
            </div>

            <div>
              <span className="to-solution-card__block-label" style={{ marginBottom: 10 }}>
                Technologies Used
              </span>
              <div className="to-tech-row">
                {service.technologies.map((tech) => (
                  <TechnologyBadge key={tech} name={tech} tone="teal" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {relevantProjects.length > 0 && (
        <section className="to-section">
          <div className="to-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 14 }}>
              <h2 style={{ fontSize: "1.75rem", marginBottom: 0 }}>Relevant Reference Builds</h2>
              <Link to="/portfolio" className="to-service-card__link">
                <span>View Full Portfolio</span>
                <FiArrowRight size={15} />
              </Link>
            </div>
            <div className="to-grid-2">
              {relevantProjects.map((proj) => (
                <ProjectCard key={proj.slug} project={proj} />
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <section className="to-section to-section--elevated">
          <div className="to-container" style={{ maxWidth: 880 }}>
            <h2 style={{ fontSize: "1.75rem", marginBottom: 24 }}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {service.faqs.map((faq) => (
                <div key={faq.q} className="to-card">
                  <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>{faq.q}</h3>
                  <p style={{ marginBottom: 0, fontSize: "0.95rem" }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`Ready to Start ${service.title}?`}
        description="Speak directly with our engineers to scope architecture, milestones, and integration details."
        primaryLabel="Request Consultation"
        primaryTo="/contact"
        secondaryLabel="Explore All Services"
        secondaryTo="/services"
      />
    </main>
  );
};

export default ServiceDetailPage;
