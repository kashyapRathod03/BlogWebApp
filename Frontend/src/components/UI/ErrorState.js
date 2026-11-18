import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";
import "./ui.css";

const ErrorState = ({
  title = "Unable to load data",
  description = "Please check your connection and try again.",
  onRetry,
}) => (
  <div className="to-state-box" role="alert">
    <div
      className="to-state-box__icon"
      style={{ background: "rgba(239, 68, 68, 0.12)", color: "#FCA5A5" }}
    >
      <FiAlertTriangle />
    </div>
    <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>{title}</h3>
    <p style={{ maxWidth: 460, margin: "0 auto 20px", fontSize: "0.95rem" }}>{description}</p>
    {onRetry && (
      <Button onClick={onRetry} variant="secondary">
        Try Again
      </Button>
    )}
  </div>
);

export default ErrorState;
