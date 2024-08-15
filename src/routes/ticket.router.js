const express = require("express");
const { getTickets, createTicket } = require("../controllers/ticket.js");
const router = express.Router();
exports.router = router;

router.get("/ticket", getTickets);
router.post("/ticket", createTicket);

module.exports = router;
