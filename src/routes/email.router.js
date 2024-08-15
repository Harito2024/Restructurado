const express = require("express");
const { createEmail } = require("../controllers/emails");
const router = express.Router();
exports.router = router;

router.post("/emial", createEmail);

module.exports = router;
