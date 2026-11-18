import React from "react";
import PageHero from "../components/UI/PageHero";
import SEOHead from "../components/UI/SEOHead";

const LegalPage = ({ type = "privacy" }) => {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms & Conditions";

  return (
    <main>
      <SEOHead
        title={title}
        description={`TechOrcas ${title} governing platform usage, inquiries, and editorial contributions.`}
        canonicalPath={isPrivacy ? "/privacy" : "/terms"}
      />

      <PageHero
        eyebrow="Legal"
        title={title}
        description={
          isPrivacy
            ? "How TechOrcas handles account details, contact inquiries, and newsletter subscriptions."
            : "Terms governing the use of TechOrcas services, articles, and platform features."
        }
        breadcrumbs={[{ label: "Home", to: "/" }, { label: title }]}
      />

      <section className="to-section">
        <div className="to-container" style={{ maxWidth: 820 }}>
          <div className="to-card to-article-prose" style={{ padding: 36 }}>
            {isPrivacy ? (
              <>
                <h2 style={{ marginTop: 0 }}>Information We Collect</h2>
                <p>
                  When you register an author account, submit a project inquiry through our contact
                  form, or subscribe to our newsletter, TechOrcas stores only the information you
                  explicitly provide—such as your username, email address, and inquiry details.
                </p>
                <h2>How We Use Your Information</h2>
                <p>
                  Account credentials are used strictly to authenticate access to authoring,
                  bookmarks, and commenting features. Contact inquiries and newsletter emails are
                  used solely to respond to your request or send engineering updates.
                </p>
                <h2>Contact</h2>
                <p>
                  For data inquiries or deletion requests, reach out to{" "}
                  <a href="mailto:info@techorcas.com">info@techorcas.com</a>.
                </p>
              </>
            ) : (
              <>
                <h2 style={{ marginTop: 0 }}>Platform Usage</h2>
                <p>
                  By accessing TechOrcas and publishing or commenting on articles, you agree to
                  provide accurate information and refrain from posting unlawful, abusive, or
                  malicious content.
                </p>
                <h2>Intellectual Property</h2>
                <p>
                  TechOrcas branding, architecture materials, and platform design belong to
                  TechOrcas. Authors retain responsibility for articles and media uploaded under
                  their accounts.
                </p>
                <h2>Contact</h2>
                <p>
                  Questions regarding these terms may be sent to{" "}
                  <a href="mailto:info@techorcas.com">info@techorcas.com</a>.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LegalPage;
