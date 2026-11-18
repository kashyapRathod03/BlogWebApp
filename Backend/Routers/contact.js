const express = require("express");
const { submitContact } = require("../Controllers/contact");

const router = express.Router();

router.post("/", submitContact);

module.exports = router;
