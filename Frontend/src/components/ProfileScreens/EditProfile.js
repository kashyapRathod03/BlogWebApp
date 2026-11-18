import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineUpload } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Button from "../UI/Button";
import LoadingState from "../UI/LoadingState";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const EditProfile = () => {
  const { activeUser, config, refreshAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [previousPhoto, setPreviousPhoto] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activeUser && activeUser.username) {
      setUsername(activeUser.username || "");
      setEmail(activeUser.email || "");
      setPreviousPhoto(activeUser.photo || "user.png");
      setPhoto(activeUser.photo || "user.png");
      setLoading(false);
    }
  }, [activeUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("photo", photo);

    try {
      await axios.post("/user/editProfile", formdata, {
        headers: {
          authorization: config?.headers?.authorization || `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      await refreshAuth();
      setSuccess("Profile updated successfully.");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="to-container" style={{ padding: "80px 24px" }}>
        <LoadingState message="Loading profile details..." />
      </div>
    );
  }

  return (
    <main className="to-editor-page">
      <SEOHead title="Edit Profile" canonicalPath="/edit_profile" />
      <div className="to-container" style={{ maxWidth: 680 }}>
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
          <h1 style={{ fontSize: "1.6rem", marginBottom: 0 }}>Edit Profile</h1>

          {error && <div className="to-alert to-alert--error">{error}</div>}
          {success && <div className="to-alert to-alert--success">{success}</div>}

          <div className="to-field">
            <label className="to-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="to-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="to-field">
            <label className="to-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="to-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <img
              src={`/userPhotos/${previousPhoto || "user.png"}`}
              alt={username}
              style={{
                width: 68,
                height: 68,
                borderRadius: 16,
                objectFit: "cover",
                border: "1px solid var(--border-subtle)",
              }}
            />
            <div className="to-upload-zone" style={{ flex: 1, minWidth: 220, padding: 18 }}>
              <AiOutlineUpload size={22} color="#00C9C8" />
              <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: 6 }}>
                {photo === previousPhoto ? "Upload new profile photo" : photo.name}
              </div>
              <input
                name="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) setPhoto(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div>
            <Button type="submit" variant="primary" size="lg" disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
