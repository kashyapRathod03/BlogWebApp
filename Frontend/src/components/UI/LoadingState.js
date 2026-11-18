import React from "react";
import "./ui.css";

const LoadingState = ({ message = "Loading content..." }) => (
  <div className="to-state-box" role="status" aria-live="polite">
    <div className="to-spinner" />
    <p style={{ marginBottom: 0, fontSize: "0.95rem" }}>{message}</p>
  </div>
);

export default LoadingState;
