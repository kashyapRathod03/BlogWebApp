import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import Logo from "../UI/Logo";
import Button from "../UI/Button";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const RegisterScreen = () => {
  const { refreshAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("authToken", data.token);
      await refreshAuth();
      navigate("/blog");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please verify your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="to-auth-page">
      <SEOHead title="Create Account" description="Create a TechOrcas Insights contributor account." canonicalPath="/register" />
      <div className="to-auth-shell">
        <div className="to-auth-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <Link to="/" aria-label="TechOrcas Home">
              <Logo />
            </Link>
            <Link to="/blog" style={{ fontSize: "0.86rem", color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FiArrowLeft size={14} /> Back to Blog
            </Link>
          </div>

          <h1 style={{ fontSize: "1.75rem", marginBottom: 6 }}>Create your account</h1>
          <p style={{ fontSize: "0.94rem", marginBottom: 24 }}>
            Join TechOrcas Insights to publish technical articles and curate your reading list.
          </p>

          {error && <div className="to-alert to-alert--error">{error}</div>}

          <form className="to-auth-form" onSubmit={registerHandler}>
            <div className="to-field">
              <label className="to-label" htmlFor="name">
                Username
              </label>
              <input
                type="text"
                required
                id="name"
                className="to-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="to-field">
              <label className="to-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                required
                id="email"
                className="to-input"
                placeholder="you@company.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="to-field">
              <label className="to-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                required
                id="password"
                autoComplete="new-password"
                className="to-input"
                placeholder="6+ characters"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="to-field">
              <label className="to-label" htmlFor="confirmpassword">
                Confirm Password
              </label>
              <input
                type="password"
                required
                id="confirmpassword"
                autoComplete="new-password"
                className="to-input"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={loading} style={{ marginTop: 6 }}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p style={{ marginTop: 22, marginBottom: 0, fontSize: "0.9rem", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>

        <aside className="to-auth-aside">
          <div>
            <span className="to-eyebrow">Engineering Community</span>
            <h2 style={{ fontSize: "1.6rem", marginBottom: 12 }}>
              Built for Developers, Architects &amp; Builders.
            </h2>
            <p style={{ fontSize: "0.95rem" }}>
              Document real architectural decisions, backend patterns, and AI automation lessons.
            </p>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Publish across 8 focused technology categories",
              "Clean reading layout with Table of Contents",
              "Save articles to your personal reading list",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: 10, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <FiCheckCircle size={17} color="#A874FF" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default RegisterScreen;
