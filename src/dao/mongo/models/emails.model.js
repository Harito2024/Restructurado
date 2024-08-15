const mongoose = require("mongoose");

const emailsColletion = "Emials";

const emailssSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true, max: 2500 },
});

const emailsModel = mongoose.model(emailsColletion, emailssSchema);

module.exports = emailsModel;
