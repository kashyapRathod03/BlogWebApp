import React from "react";
import { Link } from "react-router-dom";
import "./ui.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  type = "button",
  ...rest
}) => {
  const classes = `to-btn to-btn--${variant} ${size !== "md" ? `to-btn--${size}` : ""} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
