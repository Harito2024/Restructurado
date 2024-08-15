const express = require("express");
const { getProductsS } = require("../repositories/productsRepository.js");
const { getCartByIdS } = require("../repositories/cartsRepository.js");
const {
  registerUser,
  getUserEmail,
} = require("../repositories/usersRepository.js");
const { createHash, isValidPassword } = require("../utils/bcryptPassword.js");

async function homeView(req, res) {
  const limit = 20;
  let { payload } = await getProductsS({ limit });

  const user = req.session.user;
  console.log(req.session);
  return res.render("home", { products: payload, title: "home", user });
}

async function realtimeProductsView(req, res) {
  const user = req.session.user;
  return res.render("realTimeProducts", user);
}

async function chatView(req, res) {
  const user = req.session.user;
  return res.render("chat", { user: user });
}

async function productsView(req, res) {
  const result = await getProductsServices({ ...req.query });
  const user = req.session.user;
  return res.render("products", { title: "products", result, user });
}

async function cartView(req, res) {
  const { cid } = req.params;
  const cart = await getCartByIdS(cid);
  const user = req.session.user;
  res.render("cart", { title: "cart", cart: cart, user });
}

async function loginGetView(req, res) {
  const okLogin = req.session.user !== undefined;
  if (okLogin) {
    return res.redirect("/");
  }
  return res.render("login", { title: "login" });
}

async function registerGetView(req, res) {
  const okLogin = req.session.user !== undefined;
  if (okLogin) {
    return res.redirect("/");
  }
  return res.render("register", { title: "register" });
}

async function registerPostView(req, res) {
  if (!req.user) {
    return res.redirect("/regiter");
  }
  return res.redirect("/login");
}

async function loginPostView(req, res) {
  const { email, password } = req.body;

  const user = await getUserEmail(email);

  if (user) {
    req.session.user = {
      name: req.user.name,
      lastName: req.user.lastName,
      email: req.user.email,
      rol: req.user.rol,
    };
    return res.redirect("/");
  }
  return res.redirect("/login");
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.send({ status: false, body: err });
    } else {
      return res.redirect("/login");
    }
  });
}

async function loginGitHub(req, res) {
  if (!req.user) {
    return res.redirect("/login");
  }
  req.session.user = {
    name: req.user.name,
    lastName: req.user.lastName,
    email: req.user.email,
    rol: req.user.rol,
  };
  return res.redirect("/");
}

async function emailView(req, res) {
  return res.render("email", email);
}

module.exports = {
  homeView,
  realtimeProductsView,
  chatView,
  productsView,
  cartView,
  loginGetView,
  registerGetView,
  registerPostView,
  loginPostView,
  logout,
  loginGitHub,
  emailView,
};
