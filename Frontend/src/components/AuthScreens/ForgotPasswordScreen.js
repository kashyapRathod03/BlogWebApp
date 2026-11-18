import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../UI/Logo";
import Button from "../UI/Button";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/forgotpassword", { email });
      setSuccess(data.message || "Reset password link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Unable to process password reset request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="to-auth-page">
      <SEOHead title="Forgot Password" canonicalPath="/forgotpassword" />
      <div className="to-auth-shell to-auth-shell--single">
        <div className="to-auth-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
            <Link to="/">
              <Logo />
            </Link>
            <Link to="/login" style={{ fontSize: "0.86rem", color: "var(--text-secondary)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FiArrowLeft size={14} /> Sign In
            </Link>
          </div>

          <h1 style={{ fontSize: "1.65rem", marginBottom: 8 }}>Forgot Password</h1>
          <p style={{ fontSize: "0.94rem", marginBottom: 22 }}>
            Enter the email associated with your account and we will send you a password reset link.
          </p>

          {error && <div className="to-alert to-alert--error">{error}</div>}
          {success && (
            <div className="to-alert to-alert--success">
              <span>{success}</span>
              <Link to="/" style={{ textDecoration: "underline" }}>
                Go Home
              </Link>
            </div>
          )}

          <form className="to-auth-form" onSubmit={forgotPasswordHandler}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Email"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
