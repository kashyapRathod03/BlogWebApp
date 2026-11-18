const express = require("express");
const { subscribeNewsletter } = require("../Controllers/newsletter");

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);

module.exports = router;
