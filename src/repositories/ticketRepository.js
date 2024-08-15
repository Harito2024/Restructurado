const TicketDao = require("../dao/mongo/ticket.services.js");

async function getTicketS() {
  return TicketDao.getTicketS();
}

async function getTicketByIdS(tid) {
  return TicketDao.getTicketByIdS(tid);
}

async function createTicketS({ amount, purchaser }) {
  return TicketDao.createTicketS({ amount, purchaser });
}

module.exports = {
  getTicketS,
  getTicketByIdS,
  createTicketS,
};
