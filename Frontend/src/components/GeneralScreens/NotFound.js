import React from "react";
import Button from "../UI/Button";
import SEOHead from "../UI/SEOHead";

const NotFound = () => (
  <main className="to-section">
    <SEOHead title="Page Not Found" />
    <div className="to-container" style={{ maxWidth: 640, textAlign: "center" }}>
      <div className="to-card" style={{ padding: "56px 32px" }}>
        <span className="to-eyebrow to-eyebrow--purple">Error 404</span>
        <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", marginBottom: 12 }}>
          Page Not Found
        </h1>
        <p style={{ marginBottom: 28 }}>
          The page or article you requested could not be found or may have moved.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Button to="/" variant="primary">
            Back to Home
          </Button>
          <Button to="/blog" variant="secondary">
            Explore Blog
          </Button>
        </div>
      </div>
    </div>
  </main>
);

export default NotFound;
