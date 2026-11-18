const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your business email"],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
        "Please provide a valid email address",
      ],
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    service: {
      type: String,
      required: [true, "Please select a service"],
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
      default: "",
    },
    timeline: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Please describe your project"],
      minlength: [10, "Project description must be at least 10 characters"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", ContactSchema);
