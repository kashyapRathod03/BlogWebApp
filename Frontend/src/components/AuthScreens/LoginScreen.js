import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import Logo from "../UI/Logo";
import Button from "../UI/Button";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const LoginScreen = () => {
  const { refreshAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("authToken", data.token);
      await refreshAuth();
      navigate("/blog");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="to-auth-page">
      <SEOHead title="Sign In" description="Sign in to your TechOrcas contributor account." canonicalPath="/login" />
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

          <h1 style={{ fontSize: "1.75rem", marginBottom: 6 }}>Sign in to your account</h1>
          <p style={{ fontSize: "0.94rem", marginBottom: 24 }}>
            Publish engineering insights, manage your reading list, and join article discussions.
          </p>

          {error && <div className="to-alert to-alert--error">{error}</div>}

          <form className="to-auth-form" onSubmit={loginHandler}>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label className="to-label" htmlFor="password">
                  Password
                </label>
                <Link to="/forgotpassword" style={{ fontSize: "0.82rem", color: "var(--accent-primary)" }}>
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                id="password"
                autoComplete="current-password"
                className="to-input"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={loading} style={{ marginTop: 6 }}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p style={{ marginTop: 22, marginBottom: 0, fontSize: "0.9rem", textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link to="/register" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
              Create an account
            </Link>
          </p>
        </div>

        <aside className="to-auth-aside">
          <div>
            <span className="to-eyebrow to-eyebrow--purple">TechOrcas Insights</span>
            <h2 style={{ fontSize: "1.6rem", marginBottom: 12 }}>
              Share Practical Software &amp; AI Perspectives.
            </h2>
            <p style={{ fontSize: "0.95rem" }}>
              Contribute architecture breakdowns, engineering notes, and automation case studies with
              our developer community.
            </p>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Rich-text publishing with code block support",
              "Bookmark and organize technical reading lists",
              "Interactive article discussions and ratings",
            ].map((item) => (
              <li key={item} style={{ display: "flex", gap: 10, fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <FiCheckCircle size={17} color="#00C9C8" style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default LoginScreen;
