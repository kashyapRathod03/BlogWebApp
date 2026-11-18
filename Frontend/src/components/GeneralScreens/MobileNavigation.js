import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FiArrowRight, FiLogOut, FiEdit3, FiBookmark, FiUser, FiLayers } from "react-icons/fi";
import Button from "../UI/Button";

const MobileNavigation = ({ isOpen, onClose, navLinks, activeUser, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="to-mobile-drawer" role="dialog" aria-label="Mobile Navigation">
      {navLinks.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          onClick={onClose}
          className={({ isActive }) =>
            `to-mobile-drawer__link ${isActive ? "to-mobile-drawer__link--active" : ""}`
          }
        >
          <span>{item.label}</span>
          <FiArrowRight size={16} aria-hidden="true" />
        </NavLink>
      ))}

      <div style={{ marginTop: 12, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
        <Button to="/contact" variant="primary" size="lg" style={{ width: "100%" }} onClick={onClose}>
          Let&apos;s Talk
        </Button>
      </div>

      <div
        style={{
          marginTop: 12,
          paddingTop: 16,
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {activeUser && activeUser.username ? (
          <>
            <Link to="/addstory" className="to-mobile-drawer__link" onClick={onClose}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <FiEdit3 /> Write Article
              </span>
            </Link>
            <Link to="/my-blogs" className="to-mobile-drawer__link" onClick={onClose}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <FiLayers /> My Stories &amp; Blogs
              </span>
            </Link>
            <Link to="/readList" className="to-mobile-drawer__link" onClick={onClose}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <FiBookmark /> Reading List ({activeUser.readListLength || 0})
              </span>
            </Link>
            <Link to="/profile" className="to-mobile-drawer__link" onClick={onClose}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <FiUser /> Profile ({activeUser.username})
              </span>
            </Link>
            <button
              type="button"
              className="to-mobile-drawer__link"
              style={{ background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#FCA5A5" }}>
                <FiLogOut /> Logout
              </span>
            </button>
          </>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Button to="/login" variant="secondary" onClick={onClose}>
              Sign In
            </Button>
            <Button to="/register" variant="ghost" onClick={onClose}>
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;
