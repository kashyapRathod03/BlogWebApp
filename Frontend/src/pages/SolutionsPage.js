import React from "react";
import { SOLUTIONS_DATA, SOLUTION_INDUSTRIES } from "../data/siteData";
import PageHero from "../components/UI/PageHero";
import SectionHeading from "../components/UI/SectionHeading";
import SolutionCard from "../components/UI/SolutionCard";
import CTASection from "../components/UI/CTASection";
import SEOHead from "../components/UI/SEOHead";
import "../Css/Pages.css";

const SolutionsPage = () => (
  <main>
    <SEOHead
      title="Business Solutions"
      description="Outcome-focused software and AI automation solutions engineered by TechOrcas for modern operations."
      canonicalPath="/solutions"
    />

    <PageHero
      eyebrow="Business Outcomes"
      eyebrowTone="purple"
      title="Solutions Built Around Operational Problems, Not Buzzwords."
      description="Explore how TechOrcas combines custom engineering, clean data architecture, and AI automation to solve concrete business bottlenecks."
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Solutions" }]}
    />

    <section className="to-section">
      <div className="to-container">
        <SectionHeading
          eyebrow="Solution Categories"
          title="Eight Core Solution Architectures."
          subtitle="Each blueprint adapts to your internal rules, existing APIs, and security requirements."
        />

        <div className="to-grid-2">
          {SOLUTIONS_DATA.map((sol) => (
            <SolutionCard key={sol.id} solution={sol} />
          ))}
        </div>
      </div>
    </section>

    <section className="to-section to-section--secondary">
      <div className="to-container">
        <SectionHeading
          eyebrow="Applicable Sectors"
          eyebrowTone="purple"
          title="Where These Architectures Apply."
          subtitle="Capabilities adaptable to domain-specific compliance, operational workflows, and reporting requirements across industries."
        />

        <div className="to-grid-3">
          {SOLUTION_INDUSTRIES.map((ind) => (
            <article key={ind.name} className="to-card">
              <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>{ind.name}</h3>
              <p style={{ marginBottom: 0, fontSize: "0.93rem" }}>{ind.focus}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <CTASection
      title="Have an Operational Bottleneck to Solve?"
      description="Walk us through your workflow and we will outline a practical architecture and delivery plan."
      primaryLabel="Schedule a Discovery Call"
      primaryTo="/contact"
      secondaryLabel="View Engineering Services"
      secondaryTo="/services"
    />
  </main>
);

export default SolutionsPage;
