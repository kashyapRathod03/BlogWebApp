const express = require("express")

const router = express.Router()

const authRoute = require("./auth")
const storyRoute = require("./story")
const userRoute = require("./user")
const commentRoute = require("./comment")
const contactRoute = require("./contact")
const newsletterRoute = require("./newsletter")

// Standard root-level routes (preserved for existing client calls)
router.use("/auth", authRoute)
router.use("/story", storyRoute)
router.use("/user", userRoute)
router.use("/comment", commentRoute)
router.use("/contact", contactRoute)
router.use("/newsletter", newsletterRoute)

// Explicit /api namespace routes (supports /api/auth, /api/story, /api/articles, etc.)
router.use("/api/auth", authRoute)
router.use("/api/story", storyRoute)
router.use("/api/articles", storyRoute)
router.use("/api/public", storyRoute)
router.use("/api/user", userRoute)
router.use("/api/comment", commentRoute)
router.use("/api/contact", contactRoute)
router.use("/api/newsletter", newsletterRoute)

module.exports = router
