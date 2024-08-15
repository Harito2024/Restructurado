const emailsModel = require("./models/emails.model.js");

async function createEmailsS({ user, message }) {
  return await emailsModel.create({ user, message });
}

module.exports = {
  createEmailsS,
};
