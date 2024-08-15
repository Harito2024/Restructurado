const express = require("express");
const ticketModel = require("../mongo/models/ticket.model.js");

async function createTicketS({ amount, purchaser }) {
  return await ticketModel.create({ amount, purchaser });
}

async function getTicketS() {
  return await ticketModel.find();
}

async function getTicketByIdS(tid) {
  return await ticketModel.findById(tid);
}

module.exports = {
  createTicketS,
  getTicketS,
  getTicketByIdS,
};
