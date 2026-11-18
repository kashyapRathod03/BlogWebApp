import React from "react";
import {
  WHY_TECHORCAS,
  TECH_STACK_CATEGORIES,
  DEVELOPMENT_PROCESS,
} from "../data/siteData";
import PageHero from "../components/UI/PageHero";
import SectionHeading from "../components/UI/SectionHeading";
import IconResolver from "../components/UI/IconResolver";
import TechnologyBadge from "../components/UI/TechnologyBadge";
import CTASection from "../components/UI/CTASection";
import SEOHead from "../components/UI/SEOHead";
import "../Css/Pages.css";

const CORE_VALUES = [
  {
    title: "Engineering Rigor",
    description:
      "Clean abstractions, explicit contracts, and thoughtful data modeling over quick hacks that create technical debt.",
  },
  {
    title: "Transparency & Clarity",
    description:
      "Honest timelines, direct communication with engineers, and zero inflated claims.",
  },
  {
    title: "Practical AI Adoption",
    description:
      "Deploying LLMs, RAG, and workflow automation only where they produce verifiable operational value.",
  },
  {
    title: "Maintainable Delivery",
    description:
      "Software documented and structured so your internal team or ours can evolve it confidently.",
  },
];

const AboutPage = () => (
  <main>
    <SEOHead
      title="About Us"
      description="TechOrcas is a technology-focused software development company helping businesses create digital products, modernize operations, and embrace intelligent automation."
      canonicalPath="/about"
    />

    <PageHero
      eyebrow="About TechOrcas"
      title="We Turn Technology Into Business Possibilities."
      description="TechOrcas is a technology-focused software development company helping businesses create digital products, modernize operations and embrace intelligent automation."
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
    />

    <section className="to-section">
      <div className="to-container to-grid-2">
        <article className="to-card">
          <span className="to-eyebrow">Our Mission</span>
          <h2 style={{ fontSize: "1.45rem", marginBottom: 12 }}>Practical, Valuable Engineering</h2>
          <p style={{ marginBottom: 0, fontSize: "1.02rem" }}>
            To make technology practical, accessible and valuable for businesses through reliable
            software engineering and intelligent digital solutions.
          </p>
        </article>

        <article className="to-card">
          <span className="to-eyebrow to-eyebrow--purple">Our Vision</span>
          <h2 style={{ fontSize: "1.45rem", marginBottom: 12 }}>Trusted Technical Partnership</h2>
          <p style={{ marginBottom: 0, fontSize: "1.02rem" }}>
            To become a trusted technology partner for businesses building the next generation of
            digital products.
          </p>
        </article>
      </div>
    </section>

    <section className="to-section to-section--secondary">
      <div className="to-container">
        <SectionHeading
          eyebrow="Our Approach"
          title="How TechOrcas Approaches Software Engineering."
          subtitle="We combine product clarity with full-stack technical depth so business systems remain reliable under growth."
        />

        <div className="to-grid-4">
          {WHY_TECHORCAS.map((item) => (
            <article key={item.title} className="to-card">
              <div className="to-icon-box">
                <IconResolver name={item.icon} size={20} />
              </div>
              <h3 style={{ fontSize: "1.12rem", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: "0.92rem", marginBottom: 0 }}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="to-section">
      <div className="to-container">
        <SectionHeading
          eyebrow="Core Values"
          eyebrowTone="purple"
          title="Principles Behind Every Release."
        />
        <div className="to-grid-2">
          {CORE_VALUES.map((val) => (
            <article key={val.title} className="to-card">
              <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>{val.title}</h3>
              <p style={{ marginBottom: 0 }}>{val.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="to-section to-section--elevated">
      <div className="to-container">
        <SectionHeading
          eyebrow="Capabilities & Stack"
          title="Verified Technologies We Build With."
        />
        <div className="to-stack-grid" style={{ marginBottom: 56 }}>
          {TECH_STACK_CATEGORIES.map((group) => (
            <div key={group.category} className="to-card">
              <h3
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  color:
                    group.accent === "purple" ? "var(--accent-secondary)" : "var(--accent-primary)",
                  marginBottom: 14,
                }}
              >
                {group.category}
              </h3>
              <div className="to-tech-row">
                {group.items.map((tech) => (
                  <TechnologyBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "1.6rem", marginBottom: 24 }}>Development Process</h2>
        <div className="to-process-timeline">
          {DEVELOPMENT_PROCESS.map((stage) => (
            <div key={stage.step} className="to-process-step">
              <span className="to-process-step__num">STEP {stage.step}</span>
              <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>{stage.title}</h3>
              <p style={{ fontSize: "0.92rem", marginBottom: 0 }}>{stage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTASection />
  </main>
);

export default AboutPage;
