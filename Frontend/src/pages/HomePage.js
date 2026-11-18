import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import {
  TRUST_LABELS,
  HOME_SERVICES_BENTO,
  WHY_TECHORCAS,
  FEATURED_SOLUTIONS_SUMMARY,
  TECH_STACK_CATEGORIES,
  DEVELOPMENT_PROCESS,
  PORTFOLIO_PROJECTS,
} from "../data/siteData";
import Button from "../components/UI/Button";
import SectionHeading from "../components/UI/SectionHeading";
import ServiceCard from "../components/UI/ServiceCard";
import IconResolver from "../components/UI/IconResolver";
import TechnologyBadge from "../components/UI/TechnologyBadge";
import ProjectCard from "../components/UI/ProjectCard";
import BlogCard from "../components/UI/BlogCard";
import CTASection from "../components/UI/CTASection";
import EmptyState from "../components/UI/EmptyState";
import LoadingState from "../components/UI/LoadingState";
import SEOHead from "../components/UI/SEOHead";
import "../Css/Pages.css";

const HomePage = () => {
  const [latestStories, setLatestStories] = useState([]);
  const [storiesLoading, setStoriesLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchLatest = async () => {
      try {
        const { data } = await axios.get("/story/getAllStories?limit=3&page=1");
        if (active) {
          setLatestStories(data.data || []);
        }
      } catch (err) {
        if (active) setLatestStories([]);
      } finally {
        if (active) setStoriesLoading(false);
      }
    };
    fetchLatest();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <SEOHead
        title="Software Development, IT Consulting & AI Solutions"
        description="From custom software and web applications to AI-powered automation, TechOrcas helps businesses transform ideas into scalable digital products."
        canonicalPath="/"
      />

      {/* Section 1: Hero */}
      <section className="to-hero">
        <div className="to-container to-hero__grid">
          <div className="to-fade-in">
            <span className="to-eyebrow">Software Engineering &amp; AI Solutions</span>
            <h1 className="to-hero__title">
              Building Intelligent Digital Solutions for a{" "}
              <span className="to-gradient-text">Smarter Future.</span>
            </h1>
            <p className="to-hero__desc">
              From custom software and web applications to AI-powered automation, we help
              businesses transform ideas into scalable digital products.
            </p>
            <div className="to-hero__actions">
              <Button to="/services" variant="primary" size="lg">
                <span>Explore Our Services</span>
                <FiArrowRight size={17} aria-hidden="true" />
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Let&apos;s Discuss Your Project
              </Button>
            </div>
          </div>

          <div className="to-hero__visual to-fade-in" aria-label="TechOrcas Architecture Overview">
            <div className="to-arch-header">
              <div className="to-arch-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>techorcas.system.topology</span>
            </div>

            <div className="to-arch-nodes">
              <div className="to-arch-node to-arch-node--teal">
                <span className="to-arch-node__label">01 / CLIENT LAYER</span>
                <span className="to-arch-node__value">React &amp; TypeScript UI</span>
              </div>
              <div className="to-arch-node to-arch-node--purple">
                <span className="to-arch-node__label">02 / INTELLIGENCE</span>
                <span className="to-arch-node__value">Spring AI + RAG Agents</span>
              </div>
              <div className="to-arch-node">
                <span className="to-arch-node__label">03 / CORE SERVICES</span>
                <span className="to-arch-node__value">Spring Boot &amp; Node.js APIs</span>
              </div>
              <div className="to-arch-node">
                <span className="to-arch-node__label">04 / DATA &amp; OPS</span>
                <span className="to-arch-node__value">PostgreSQL · MongoDB · Docker</span>
              </div>
            </div>

            <pre className="to-arch-code">
              <code>{`POST /api/workflows/execute
{
  "pipeline": "document-rag-sync",
  "engine": "spring-ai + postgresql",
  "verification": "schema-validated"
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Section 2: Trust / Expertise Strip */}
      <section className="to-trust-strip" aria-label="Core Capabilities">
        <div className="to-container">
          <div className="to-trust-strip__list">
            {TRUST_LABELS.map((label) => (
              <div key={label} className="to-trust-strip__item">
                <span className="to-trust-strip__dot" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: What We Do (Bento Grid) */}
      <section className="to-section">
        <div className="to-container">
          <SectionHeading
            eyebrow="What We Do"
            title="Technology That Moves Your Business Forward."
            subtitle="Modular engineering capabilities designed to ship resilient web platforms, internal software, and intelligent automation."
          />

          <div className="to-bento-grid">
            {HOME_SERVICES_BENTO.map((service) => (
              <div
                key={service.slug}
                className={service.size === "wide" ? "to-bento-wide" : "to-bento-standard"}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why TechOrcas */}
      <section className="to-section to-section--secondary">
        <div className="to-container">
          <SectionHeading
            eyebrow="Why TechOrcas"
            eyebrowTone="purple"
            title="More Than Development. We Build Business Advantage."
            subtitle="Focused on measurable operational clarity, maintainable system architecture, and long-term engineering reliability."
          />

          <div className="to-grid-4">
            {WHY_TECHORCAS.map((item) => (
              <article key={item.title} className="to-card">
                <div className="to-icon-box">
                  <IconResolver name={item.icon} size={20} />
                </div>
                <h3 style={{ fontSize: "1.12rem", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: "0.92rem", marginBottom: 0 }}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Featured Solutions */}
      <section className="to-section">
        <div className="to-container">
          <SectionHeading
            eyebrow="Featured Solutions"
            title="Purpose-Built Systems for Real Operational Challenges."
            subtitle="From unified internal platforms to grounded AI applications, explore how we structure software around business outcomes."
          />

          <div className="to-grid-3">
            {FEATURED_SOLUTIONS_SUMMARY.map((sol) => (
              <article key={sol.id} className="to-card to-card--interactive" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span className="to-badge to-badge--purple" style={{ alignSelf: "flex-start" }}>
                  {sol.category}
                </span>
                <h3 style={{ fontSize: "1.18rem", marginBottom: 0 }}>{sol.title}</h3>
                <p style={{ fontSize: "0.92rem", marginBottom: 0 }}>{sol.outcome}</p>
                <div className="to-tech-row" style={{ marginTop: "auto", paddingTop: 8 }}>
                  {sol.tech.map((t) => (
                    <TechnologyBadge key={t} name={t} />
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Button to="/solutions" variant="secondary">
              <span>Explore All Business Solutions</span>
              <FiArrowRight size={15} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section 6: Technology Stack */}
      <section className="to-section to-section--elevated">
        <div className="to-container">
          <SectionHeading
            eyebrow="Technology Stack"
            title="Built With Modern Technologies."
            subtitle="A focused, production-tested stack across frontend interfaces, enterprise backends, databases, AI orchestration, and infrastructure."
          />

          <div className="to-stack-grid">
            {TECH_STACK_CATEGORIES.map((group) => (
              <div key={group.category} className="to-card" style={{ padding: 24 }}>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontFamily: "var(--font-mono)",
                    color:
                      group.accent === "purple"
                        ? "var(--accent-secondary)"
                        : "var(--accent-primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 16,
                  }}
                >
                  {group.category}
                </h3>
                <div className="to-tech-row">
                  {group.items.map((tech) => (
                    <TechnologyBadge
                      key={tech}
                      name={tech}
                      tone={group.accent === "purple" ? "purple" : "default"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Development Process */}
      <section id="process" className="to-section">
        <div className="to-container">
          <SectionHeading
            eyebrow="Engineering Workflow"
            title="From Idea to Production."
            subtitle="A transparent four-stage delivery cadence built to eliminate ambiguity early and keep systems dependable after launch."
          />

          <div className="to-process-timeline">
            {DEVELOPMENT_PROCESS.map((stage) => (
              <div key={stage.step} className="to-process-step">
                <span className="to-process-step__num">
                  <FiCheckCircle size={15} aria-hidden="true" />
                  STEP {stage.step}
                </span>
                <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>{stage.title}</h3>
                <p style={{ fontSize: "0.92rem", marginBottom: 0 }}>{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Featured Projects */}
      <section className="to-section to-section--secondary">
        <div className="to-container">
          <SectionHeading
            eyebrow="Portfolio & Architectures"
            eyebrowTone="purple"
            title="Ideas Turned Into Digital Products."
            subtitle="Explore our live publishing platform and engineering reference architectures built with the TechOrcas stack."
          />

          <div className="to-grid-3">
            {PORTFOLIO_PROJECTS.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Button to="/portfolio" variant="secondary">
              <span>View All Projects</span>
              <FiArrowRight size={15} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section 9: Blog Preview */}
      <section className="to-section">
        <div className="to-container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 20,
              marginBottom: 40,
            }}
          >
            <div>
              <span className="to-eyebrow">TechOrcas Insights</span>
              <h2 style={{ fontSize: "clamp(1.85rem, 3.2vw, 2.6rem)", marginBottom: 8 }}>
                Insights From the World of Technology.
              </h2>
              <p style={{ marginBottom: 0, maxWidth: 600 }}>
                Latest articles published directly from the TechOrcas engineering knowledge base.
              </p>
            </div>
            <Button to="/blog" variant="secondary">
              <span>Explore All Articles</span>
              <FiArrowRight size={15} aria-hidden="true" />
            </Button>
          </div>

          {storiesLoading ? (
            <LoadingState message="Loading latest articles..." />
          ) : latestStories.length > 0 ? (
            <div className="to-grid-3">
              {latestStories.map((story) => (
                <BlogCard key={story._id} story={story} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No articles published yet"
              description="Our engineering blog is connected to MongoDB Atlas and ready for your first article."
              actionLabel="Go to Blog"
              actionTo="/blog"
            />
          )}
        </div>
      </section>

      {/* Section 10: Final CTA */}
      <CTASection />
    </main>
  );
};

export default HomePage;
