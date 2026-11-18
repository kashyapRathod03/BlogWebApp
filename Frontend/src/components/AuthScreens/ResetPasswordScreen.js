import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../UI/Logo";
import Button from "../UI/Button";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const search = useLocation().search;
  const token = new URLSearchParams(search).get("resetPasswordToken") || search.split("=")[1] || "";

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const { data } = await axios.put(
        `/auth/resetpassword?resetPasswordToken=${token}`,
        { password }
      );
      setSuccess(data.message || "Password reset successfully.");
    } catch (err) {
      setError(err.response?.data?.error || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="to-auth-page">
      <SEOHead title="Reset Password" canonicalPath="/resetpassword" />
      <div className="to-auth-shell to-auth-shell--single">
        <div className="to-auth-panel">
          <div style={{ marginBottom: 24 }}>
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <h1 style={{ fontSize: "1.65rem", marginBottom: 8 }}>Reset Password</h1>
          <p style={{ fontSize: "0.94rem", marginBottom: 22 }}>
            Choose a strong new password for your account.
          </p>

          {error && <div className="to-alert to-alert--error">{error}</div>}
          {success && (
            <div className="to-alert to-alert--success">
              <span>{success}</span>
              <Link to="/login" style={{ textDecoration: "underline" }}>
                Sign In
              </Link>
            </div>
          )}

          <form className="to-auth-form" onSubmit={resetPasswordHandler}>
            <div className="to-field">
              <label className="to-label" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                required
                id="password"
                className="to-input"
                placeholder="Enter new password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="to-field">
              <label className="to-label" htmlFor="confirmpassword">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                id="confirmpassword"
                className="to-input"
                placeholder="Confirm new password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
