import React from "react";
import "./ui.css";

const Logo = ({ showText = true }) => (
  <span className="to-logo">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="toLogoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C9C8" />
          <stop offset="100%" stopColor="#A874FF" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="#151B35" stroke="rgba(255,255,255,0.14)" />
      <path
        d="M9 11.5C9 9.567 10.567 8 12.5 8H20.5C22.433 8 24 9.567 24 11.5C24 13.433 22.433 15 20.5 15H15.5C13.567 15 12 16.567 12 18.5V24"
        stroke="url(#toLogoGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="20.5" cy="20.5" r="3" fill="#00C9C8" />
    </svg>
    {showText && (
      <span className="to-logo__wordmark">
        Tech<span className="to-logo__accent">Orcas</span>
      </span>
    )}
  </span>
);

export default Logo;
