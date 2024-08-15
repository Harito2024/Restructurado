const mongoose = require("mongoose");

const ticketColletion = "Tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, max: 100 },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
});

ticketSchema.pre("validate", function (next) {
  if (!this.isNew) {
    return next();
  }

  this.code = `TICKET-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;
  next();
});

const ticketModel = mongoose.model(ticketColletion, ticketSchema);

module.exports = ticketModel;
