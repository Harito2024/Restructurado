const EmailsDao = require("../dao/mongo/emails.service.js");

async function createEmailsS({ user, message }) {
  return EmailsDao.createEmailsS();
}

module.exports = {
  createEmailsS,
};
