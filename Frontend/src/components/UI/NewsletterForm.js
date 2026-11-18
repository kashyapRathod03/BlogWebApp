import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import "./ui.css";

const EMAIL_RE = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!EMAIL_RE.test(email.trim())) {
      return setError("Please enter a valid email address.");
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/newsletter/subscribe", {
        email: email.trim(),
      });
      setSuccess(data.message || "Subscribed to TechOrcas Insights.");
      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Subscription failed. Please verify your email and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="to-newsletter-card">
      <div>
        <span className="to-eyebrow to-eyebrow--purple" style={{ marginBottom: 10 }}>
          Engineering Dispatch
        </span>
        <h3 style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)", marginBottom: 8 }}>
          Stay Ahead of What&apos;s Next.
        </h3>
        <p style={{ marginBottom: 0, fontSize: "0.95rem" }}>
          Practical engineering perspectives on software architecture, Spring AI, and modern web
          systems—delivered directly when new articles publish.
        </p>
      </div>

      <div>
        {error && <div className="to-alert to-alert--error">{error}</div>}
        {success && <div className="to-alert to-alert--success">{success}</div>}
        <form className="to-newsletter-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            className="to-input"
            placeholder="you@company.com"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
