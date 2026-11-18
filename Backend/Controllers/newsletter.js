const asyncErrorWrapper = require("express-async-handler");
const NewsletterSubscriber = require("../Models/newsletter");
const CustomError = require("../Helpers/error/CustomError");

const subscribeNewsletter = asyncErrorWrapper(async (req, res, next) => {
  const { email } = req.body;

  if (!email || !email.trim()) {
    return next(new CustomError("Please provide an email address", 400));
  }

  const normalized = email.trim().toLowerCase();
  const existing = await NewsletterSubscriber.findOne({ email: normalized });
  if (existing) {
    return next(new CustomError("This email is already subscribed to TechOrcas Insights", 400));
  }

  await NewsletterSubscriber.create({ email: normalized });

  return res.status(201).json({
    success: true,
    message: "Subscribed! You will receive new TechOrcas engineering insights.",
  });
});

module.exports = { subscribeNewsletter };
