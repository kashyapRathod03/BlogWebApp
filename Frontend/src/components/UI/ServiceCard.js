import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import IconResolver from "./IconResolver";
import "./ui.css";

const ServiceCard = ({ service, className = "" }) => (
  <article className={`to-card to-card--interactive to-service-card ${className}`.trim()}>
    <div className={`to-icon-box ${service.accent === "purple" ? "to-icon-box--purple" : ""}`}>
      <IconResolver name={service.icon} size={22} />
    </div>
    <h3 className="to-service-card__title">{service.title}</h3>
    <p className="to-service-card__desc">{service.description || service.shortDesc}</p>
    <Link to={`/services/${service.slug}`} className="to-service-card__link">
      <span>Learn More</span>
      <FiArrowRight size={15} aria-hidden="true" />
    </Link>
  </article>
);

export default ServiceCard;
