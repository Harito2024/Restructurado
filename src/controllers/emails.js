const express = require("express");
const { getUserEmail } = require("../repositories/usersRepository.js");
const { getTicketsById } = require("./ticket.js");

async function createEmail(req, res) {
  try {
    let user = req.session.user;
    let message = await getTicketsById(tid);
    let email = { user: user, message: message };
    return res.json({ email });
  } catch (error) {
    console.log("createEmail=> ", error);
    return res
      .status(500)
      .json({ msg: "Correo No enviado. Hablar administrador" });
  }
}

module.exports = {
  createEmail,
};
