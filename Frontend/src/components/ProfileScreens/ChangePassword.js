import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FiArrowLeft } from "react-icons/fi";
import Button from "../UI/Button";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const ChangePassword = () => {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setNewPassword("");
      setConfirmPassword("");
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const { data } = await axios.put(
        "/user/changePassword",
        { newPassword, oldPassword },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setSuccess(data.message || "Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Could not update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="to-editor-page">
      <SEOHead title="Change Password" canonicalPath="/change_Password" />
      <div className="to-container" style={{ maxWidth: 560 }}>
        <div style={{ marginBottom: 20 }}>
          <Link
            to="/profile"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
            }}
          >
            <FiArrowLeft size={16} /> Back to Profile
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="to-card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <h1 style={{ fontSize: "1.6rem", marginBottom: 0 }}>Change Password</h1>

          {error && <div className="to-alert to-alert--error">{error}</div>}
          {success && (
            <div className="to-alert to-alert--success">
              <span>{success}</span>
              <Link to="/profile" style={{ textDecoration: "underline" }}>
                Profile
              </Link>
            </div>
          )}

          <div className="to-field">
            <label className="to-label" htmlFor="old_password">
              Current Password
            </label>
            <div className="to-password-wrap">
              <input
                type={showOld ? "text" : "password"}
                autoComplete="off"
                id="old_password"
                className="to-input"
                placeholder="Enter current password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                className="to-password-toggle"
                onClick={() => setShowOld((p) => !p)}
                aria-label="Toggle current password visibility"
              >
                {showOld ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
              </button>
            </div>
          </div>

          <div className="to-field">
            <label className="to-label" htmlFor="new_password">
              New Password
            </label>
            <div className="to-password-wrap">
              <input
                type={showNew ? "text" : "password"}
                autoComplete="off"
                id="new_password"
                className="to-input"
                placeholder="Enter new password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="to-password-toggle"
                onClick={() => setShowNew((p) => !p)}
                aria-label="Toggle new password visibility"
              >
                {showNew ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
              </button>
            </div>
          </div>

          <div className="to-field">
            <label className="to-label" htmlFor="confirm_password">
              Confirm New Password
            </label>
            <div className="to-password-wrap">
              <input
                type={showConfirm ? "text" : "password"}
                autoComplete="off"
                id="confirm_password"
                className="to-input"
                placeholder="Confirm new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="to-password-toggle"
                onClick={() => setShowConfirm((p) => !p)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
              </button>
            </div>
          </div>

          <div>
            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ChangePassword;
