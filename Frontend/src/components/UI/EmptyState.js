import React from "react";
import { FiInbox } from "react-icons/fi";
import Button from "./Button";
import "./ui.css";

const EmptyState = ({
  title = "No items found",
  description = "Nothing matched your current view yet.",
  actionLabel,
  actionTo,
  onAction,
}) => (
  <div className="to-state-box">
    <div className="to-state-box__icon">
      <FiInbox />
    </div>
    <h3 style={{ fontSize: "1.2rem", marginBottom: 8 }}>{title}</h3>
    <p style={{ maxWidth: 460, margin: "0 auto 20px", fontSize: "0.95rem" }}>{description}</p>
    {actionLabel && actionTo && (
      <Button to={actionTo} variant="primary">
        {actionLabel}
      </Button>
    )}
    {actionLabel && onAction && !actionTo && (
      <Button onClick={onAction} variant="secondary">
        {actionLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;
