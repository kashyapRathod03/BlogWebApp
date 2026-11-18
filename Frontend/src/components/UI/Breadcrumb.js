import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import "./ui.css";

const Breadcrumb = ({ items = [] }) => (
  <nav className="to-breadcrumb" aria-label="Breadcrumb">
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      return (
        <React.Fragment key={`${item.label}-${idx}`}>
          {idx > 0 && <FiChevronRight className="to-breadcrumb__sep" size={14} aria-hidden="true" />}
          {isLast || !item.to ? (
            <span className="to-breadcrumb__current" aria-current={isLast ? "page" : undefined}>
              {item.label}
            </span>
          ) : (
            <Link to={item.to}>{item.label}</Link>
          )}
        </React.Fragment>
      );
    })}
  </nav>
);

export default Breadcrumb;
