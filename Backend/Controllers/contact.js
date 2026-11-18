const asyncErrorWrapper = require("express-async-handler");
const ContactMessage = require("../Models/contact");
const CustomError = require("../Helpers/error/CustomError");

const submitContact = asyncErrorWrapper(async (req, res, next) => {
  const { fullName, email, company, service, budget, timeline, description, website } = req.body;

  // Simple honeypot spam check
  if (website && website.trim() !== "") {
    return next(new CustomError("Submission rejected", 400));
  }

  if (!fullName || !email || !service || !description) {
    return next(new CustomError("Please fill in all required fields", 400));
  }

  const inquiry = await ContactMessage.create({
    fullName,
    email,
    company,
    service,
    budget,
    timeline,
    description,
  });

  return res.status(201).json({
    success: true,
    message: "Your inquiry has been received. Our engineering team will review and respond shortly.",
    data: {
      id: inquiry._id,
      createdAt: inquiry.createdAt,
    },
  });
});

module.exports = { submitContact };
