const express = require("express")

const router = express.Router()

const authRoute = require("./auth")
const storyRoute = require("./story")
const userRoute = require("./user")
const commentRoute = require("./comment")
const contactRoute = require("./contact")
const newsletterRoute = require("./newsletter")

router.use("/auth",authRoute)
router.use("/story",storyRoute)
router.use("/user",userRoute)
router.use("/comment",commentRoute)
router.use("/api/contact",contactRoute)
router.use("/api/newsletter",newsletterRoute)


module.exports = router
