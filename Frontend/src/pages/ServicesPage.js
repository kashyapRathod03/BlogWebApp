import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { ALL_SERVICES } from "../data/siteData";
import PageHero from "../components/UI/PageHero";
import TechnologyBadge from "../components/UI/TechnologyBadge";
import CTASection from "../components/UI/CTASection";
import SEOHead from "../components/UI/SEOHead";
import "../Css/Pages.css";

const ServicesPage = () => {
  const categories = ["All", ...Array.from(new Set(ALL_SERVICES.map((s) => s.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const visibleServices =
    selectedCategory === "All"
      ? ALL_SERVICES
      : ALL_SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <main>
      <SEOHead
        title="Technology Services"
        description="From custom software engineering to AI-powered business automation, explore all 12 TechOrcas engineering services."
        canonicalPath="/services"
      />

      <PageHero
        eyebrow="Engineering Capabilities"
        title="End-to-End Technology Services for Growing Businesses."
        description="From software engineering to intelligent automation, we develop digital solutions that solve real business challenges."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="to-section">
        <div className="to-container">
          <div className="to-filter-bar" style={{ marginBottom: 32 }} role="tablist" aria-label="Service Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`to-filter-pill ${selectedCategory === cat ? "to-filter-pill--active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="to-grid-2">
            {visibleServices.map((srv, idx) => (
              <article
                key={srv.slug}
                className="to-card to-card--interactive"
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span className="to-badge to-badge--teal">{srv.category}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h2 style={{ fontSize: "1.4rem", marginBottom: 8 }}>{srv.title}</h2>
                  <p style={{ fontSize: "0.95rem", marginBottom: 0 }}>{srv.shortDesc}</p>
                </div>

                <div>
                  <span className="to-solution-card__block-label">What We Deliver</span>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "8px 0 0",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                      gap: "6px 14px",
                    }}
                  >
                    {srv.deliverables.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: "0.88rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <FiCheck size={14} color="#00C9C8" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="to-tech-row" style={{ marginTop: "auto", paddingTop: 6 }}>
                  {srv.technologies.map((tech) => (
                    <TechnologyBadge key={tech} name={tech} />
                  ))}
                </div>

                <div style={{ paddingTop: 6, borderTop: "1px solid var(--border-subtle)" }}>
                  <Link to={`/services/${srv.slug}`} className="to-service-card__link">
                    <span>Explore Service Details</span>
                    <FiArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need a Tailored Engineering Team?"
        description="Tell us about your technical goals and we will map the right architecture, timeline, and delivery model."
        primaryLabel="Discuss Your Requirements"
        primaryTo="/contact"
        secondaryLabel="Explore Business Solutions"
        secondaryTo="/solutions"
      />
    </main>
  );
};

export default ServicesPage;
