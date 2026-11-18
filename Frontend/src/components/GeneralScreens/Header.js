import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiEdit3,
  FiBookmark,
  FiUser,
  FiLogOut,
  FiLayers,
} from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import { HOME_SERVICES_BENTO, FEATURED_SOLUTIONS_SUMMARY } from "../../data/siteData";
import Logo from "../UI/Logo";
import Button from "../UI/Button";
import MobileNavigation from "./MobileNavigation";
import "../../Css/Header.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  {
    label: "Services",
    to: "/services",
    dropdown: HOME_SERVICES_BENTO.map((s) => ({
      title: s.title,
      sub: "Engineering capability",
      to: `/services/${s.slug}`,
    })),
  },
  {
    label: "Solutions",
    to: "/solutions",
    dropdown: FEATURED_SOLUTIONS_SUMMARY.slice(0, 4).map((sol) => ({
      title: sol.title,
      sub: sol.category,
      to: "/solutions",
    })),
  },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Blog", to: "/blog" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const { activeUser, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className={`to-header ${scrolled ? "to-header--scrolled" : ""}`}>
        <div className="to-container to-header__inner">
          <Link to="/" aria-label="TechOrcas Home">
            <Logo />
          </Link>

          <nav className="to-nav" aria-label="Primary Navigation">
            {NAV_LINKS.map((item) => (
              <div key={item.to} className="to-nav__item">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `to-nav__link ${isActive ? "to-nav__link--active" : ""}`
                  }
                >
                  <span>{item.label}</span>
                  {item.dropdown && <FiChevronDown size={14} aria-hidden="true" />}
                </NavLink>

                {item.dropdown && (
                  <div className="to-nav__dropdown">
                    {item.dropdown.map((sub) => (
                      <Link key={sub.title} to={sub.to} className="to-dropdown__link">
                        <span className="to-dropdown__title">{sub.title}</span>
                        <span className="to-dropdown__sub">{sub.sub}</span>
                      </Link>
                    ))}
                    <Link
                      to={item.to}
                      className="to-dropdown__link"
                      style={{
                        borderTop: "1px solid var(--border-subtle)",
                        marginTop: 4,
                        paddingTop: 10,
                      }}
                    >
                      <span className="to-dropdown__title" style={{ color: "var(--accent-primary)" }}>
                        View All {item.label} →
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="to-header__actions">
            <div className="to-header__desktop-actions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {activeUser && activeUser.username ? (
                <div className="to-user-menu" ref={userMenuRef}>
                  <button
                    type="button"
                    className="to-user-trigger"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    aria-expanded={userMenuOpen}
                  >
                    <img
                      src={`/userPhotos/${activeUser.photo || "user.png"}`}
                      alt={activeUser.username}
                    />
                    <span>{activeUser.username}</span>
                    <FiChevronDown size={14} />
                  </button>

                  {userMenuOpen && (
                    <div className="to-user-dropdown">
                      <Link
                        to="/addstory"
                        className="to-user-dropdown__item"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <FiEdit3 size={15} /> Write Article
                        </span>
                      </Link>
                      <Link
                        to="/my-stories"
                        className="to-user-dropdown__item"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <FiLayers size={15} /> My Stories &amp; Blogs
                        </span>
                      </Link>
                      <Link
                        to="/readList"
                        className="to-user-dropdown__item"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <FiBookmark size={15} /> Reading List
                        </span>
                        <span id="readListLength" className="to-badge to-badge--teal">
                          {activeUser.readListLength || 0}
                        </span>
                      </Link>
                      <Link
                        to="/profile"
                        className="to-user-dropdown__item"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <FiUser size={15} /> Profile
                        </span>
                      </Link>
                      <button
                        type="button"
                        className="to-user-dropdown__item"
                        onClick={handleLogout}
                        style={{ color: "#FCA5A5" }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <FiLogOut size={15} /> Logout
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button to="/login" variant="ghost" size="sm">
                  Sign In
                </Button>
              )}

              <Button to="/contact" variant="primary" size="sm">
                Let&apos;s Talk
              </Button>
            </div>

            <button
              type="button"
              className="to-mobile-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={NAV_LINKS}
        activeUser={activeUser}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
