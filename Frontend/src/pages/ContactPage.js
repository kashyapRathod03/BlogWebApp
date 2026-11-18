import React from "react";
import { FiMail, FiLinkedin, FiClock, FiShield } from "react-icons/fi";
import PageHero from "../components/UI/PageHero";
import ContactForm from "../components/UI/ContactForm";
import SEOHead from "../components/UI/SEOHead";
import "../Css/Pages.css";

const ContactPage = () => (
  <main>
    <SEOHead
      title="Contact Us"
      description="Tell TechOrcas about your business challenge or project idea. Explore how custom software and AI automation can help."
      canonicalPath="/contact"
    />

    <PageHero
      eyebrow="Get In Touch"
      title="Let's Talk About What You're Building."
      description="Tell us about your business challenge or project idea. We'll explore how the right technology can help."
      breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
    />

    <section className="to-section">
      <div className="to-container to-contact-grid">
        <ContactForm />

        <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="to-card">
            <span className="to-eyebrow">Direct Channels</span>
            <h3 style={{ fontSize: "1.25rem", marginBottom: 16 }}>Contact Information</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a
                href="mailto:info@techorcas.com"
                style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--text-primary)" }}
              >
                <span className="to-icon-box" style={{ marginBottom: 0, width: 40, height: 40 }}>
                  <FiMail size={17} />
                </span>
                <div>
                  <span style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    Email
                  </span>
                  <strong>info@techorcas.com</strong>
                </div>
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--text-primary)" }}
              >
                <span
                  className="to-icon-box to-icon-box--purple"
                  style={{ marginBottom: 0, width: 40, height: 40 }}
                >
                  <FiLinkedin size={17} />
                </span>
                <div>
                  <span style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                    LinkedIn
                  </span>
                  <strong>TechOrcas Company Profile</strong>
                </div>
              </a>
            </div>
          </div>

          <div className="to-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: 12 }}>What Happens Next</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                fontSize: "0.92rem",
                color: "var(--text-secondary)",
              }}
            >
              <li style={{ display: "flex", gap: 10 }}>
                <FiClock size={17} color="#00C9C8" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>Our engineering team reviews your inquiry and prepares focused technical questions.</span>
              </li>
              <li style={{ display: "flex", gap: 10 }}>
                <FiShield size={17} color="#A874FF" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>We align on architecture, scope, and practical milestones before writing code.</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </main>
);

export default ContactPage;
