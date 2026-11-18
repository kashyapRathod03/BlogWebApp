import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEdit2, FiLock } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import { formatArticleDate } from "../../utils/articleUtils";
import Button from "../UI/Button";
import LoadingState from "../UI/LoadingState";
import SEOHead from "../UI/SEOHead";
import "../../Css/AuthAndForms.css";

const Profile = () => {
  const { config } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/user/profile", config);
        setUser(data.data || {});
        setLoading(false);
      } catch (error) {
        navigate("/login");
      }
    };

    getUserProfile();
  }, [config, navigate]);

  if (loading) {
    return (
      <div className="to-container" style={{ padding: "80px 24px" }}>
        <LoadingState message="Loading profile..." />
      </div>
    );
  }

  return (
    <main className="to-editor-page">
      <SEOHead title="Profile" canonicalPath="/profile" />
      <div className="to-container" style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 20 }}>
          <Link
            to="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
            }}
          >
            <FiArrowLeft size={16} /> Back to Blog
          </Link>
        </div>

        <div className="to-card" style={{ padding: 34 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
            <img
              src={`/userPhotos/${user.photo || "user.png"}`}
              alt={user.username}
              style={{
                width: 68,
                height: 68,
                borderRadius: 16,
                objectFit: "cover",
                border: "1px solid var(--border-subtle)",
              }}
            />
            <div>
              <span className="to-eyebrow" style={{ marginBottom: 6 }}>
                Account Profile
              </span>
              <h1 style={{ fontSize: "1.6rem", marginBottom: 0 }}>{user.username}</h1>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div className="to-profile-row">
              <span style={{ color: "var(--text-muted)" }}>Username</span>
              <strong>{user.username}</strong>
            </div>
            <div className="to-profile-row">
              <span style={{ color: "var(--text-muted)" }}>Email Address</span>
              <strong>{user.email}</strong>
            </div>
            <div className="to-profile-row">
              <span style={{ color: "var(--text-muted)" }}>Member Since</span>
              <strong>{formatArticleDate(user.createdAt)}</strong>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button to="/edit_profile" variant="primary">
              <FiEdit2 size={15} />
              <span>Edit Profile</span>
            </Button>
            <Button to="/change_Password" variant="secondary">
              <FiLock size={15} />
              <span>Change Password</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
