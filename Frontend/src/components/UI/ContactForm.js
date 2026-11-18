import React, { useState } from "react";
import axios from "axios";
import { ALL_SERVICES } from "../../data/siteData";
import Button from "./Button";
import "./ui.css";

const EMAIL_RE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

const ContactForm = ({ defaultService = "" }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    service: defaultService || ALL_SERVICES[0].title,
    budget: "",
    timeline: "",
    description: "",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.fullName.trim()) {
      return setError("Please enter your full name.");
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      return setError("Please provide a valid business email address.");
    }
    if (!form.service) {
      return setError("Please select the service you are interested in.");
    }
    if (form.description.trim().length < 10) {
      return setError("Please provide a brief project description (at least 10 characters).");
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/contact", form);
      setSuccess(
        data.message ||
          "Your inquiry has been received. Our engineering team will follow up shortly."
      );
      setForm({
        fullName: "",
        email: "",
        company: "",
        service: defaultService || ALL_SERVICES[0].title,
        budget: "",
        timeline: "",
        description: "",
        website: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "We could not submit your inquiry right now. Please try again or email info@techorcas.com."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="to-card" onSubmit={handleSubmit} noValidate>
      <h3 style={{ fontSize: "1.35rem", marginBottom: 6 }}>Start a Project Discussion</h3>
      <p style={{ fontSize: "0.92rem", marginBottom: 22 }}>
        Share your requirements and our engineers will respond with next steps.
      </p>

      {error && <div className="to-alert to-alert--error">{error}</div>}
      {success && <div className="to-alert to-alert--success">{success}</div>}

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        aria-hidden="true"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div className="to-field">
          <label className="to-label" htmlFor="contact-fullName">
            Full Name *
          </label>
          <input
            id="contact-fullName"
            name="fullName"
            type="text"
            className="to-input"
            placeholder="Alex Morgan"
            required
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="to-field">
          <label className="to-label" htmlFor="contact-email">
            Business Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="to-input"
            placeholder="alex@company.com"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div className="to-field">
          <label className="to-label" htmlFor="contact-company">
            Company Name
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            className="to-input"
            placeholder="Your organization"
            value={form.company}
            onChange={handleChange}
          />
        </div>

        <div className="to-field">
          <label className="to-label" htmlFor="contact-service">
            Service Interested In *
          </label>
          <select
            id="contact-service"
            name="service"
            className="to-select"
            value={form.service}
            onChange={handleChange}
            required
          >
            {ALL_SERVICES.map((srv) => (
              <option key={srv.slug} value={srv.title}>
                {srv.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div className="to-field">
          <label className="to-label" htmlFor="contact-budget">
            Project Budget (Optional)
          </label>
          <select
            id="contact-budget"
            name="budget"
            className="to-select"
            value={form.budget}
            onChange={handleChange}
          >
            <option value="">Select range (optional)</option>
            <option value="Under $10k">Under $10k</option>
            <option value="$10k – $25k">$10k – $25k</option>
            <option value="$25k – $50k">$25k – $50k</option>
            <option value="$50k+">$50k+</option>
          </select>
        </div>

        <div className="to-field">
          <label className="to-label" htmlFor="contact-timeline">
            Project Timeline (Optional)
          </label>
          <select
            id="contact-timeline"
            name="timeline"
            className="to-select"
            value={form.timeline}
            onChange={handleChange}
          >
            <option value="">Select timeline (optional)</option>
            <option value="Immediate (1–2 weeks)">Immediate (1–2 weeks)</option>
            <option value="1–3 months">1–3 months</option>
            <option value="3–6 months">3–6 months</option>
            <option value="Exploratory">Exploratory</option>
          </select>
        </div>
      </div>

      <div className="to-field" style={{ marginBottom: 22 }}>
        <label className="to-label" htmlFor="contact-description">
          Project Description *
        </label>
        <textarea
          id="contact-description"
          name="description"
          className="to-textarea"
          rows={5}
          required
          placeholder="Tell us about the business challenge, core features, or integrations you need..."
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={loading}>
        {loading ? "Submitting Inquiry..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
