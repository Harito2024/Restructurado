const express = require("express");
const {
  getTicketS,
  createTicketS,
  getTicketByIdS,
} = require("../repositories/ticketRepository.js");

async function getTickets(req, res) {
  try {
    const result = await getTicketS({ ...req.query });
    res.json({ result });
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

async function getTicketsById(req, res) {
  try {
    const result = await getTicketByIdS(tid);
    res.json({ result });
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

async function createTicket(req, res) {
  try {
    let { amount, purchaser } = req.body;
    console.log(req.body);
    let ticket = await createTicketS({ ...req.body });
    return res.json({ ticket });
  } catch (error) {
    console.log("createTicket=> ", error);
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

module.exports = {
  getTickets,
  createTicket,
  getTicketsById,
};
