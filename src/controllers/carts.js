const express = require("express");
const {
  getCartByIdS,
  createCartS,
  addProductsInCartS,
  deleteProductsInCartS,
  updateProductsInCartS,
  deleteCartS,
  deleteAllProductsInCartS,
} = require("../repositories/cartsRepository");
const { createTicketS } = require("../repositories/ticketRepository.js");
const { getProductsByIdS } = require("../repositories/productsRepository.js");
const { CURSOR_FLAGS } = require("mongodb");

async function getCartById(req, res) {
  try {
    const { cid } = req.params;
    const cart = await getCartByIdS(cid);
    if (cart) {
      return res.send({
        msg: "Carrito encontrado exitosamente",
        payload: cart,
      });
    } else {
      res.status(404).json({ msg: "El Id de carrito no fue encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

async function createCart(req, res) {
  try {
    const cart = await createCartS();
    return res.send({ msg: "Carrito creado exitosamente", payload: cart });
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

async function addProductsInCart(req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await addProductsInCartS(cid, pid);
    if (!cart) {
      return res.status(404).json({ msg: "El carrito no exsite" });
    }
    return res.send({ msg: "Carrito actualizado", payload: cart });
  } catch (error) {
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

async function deleteProductsInCart(req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await deleteProductsInCartS(cid, pid);

    if (!cart) {
      return res.status(404).json({ msg: "No se pudo borrar el producto" });
    }
    return res.json({ msg: "Producto eliminado", payload: cart });
  } catch (error) {
    console.log("deleteProductsInCart=> ", error);
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

async function updateProductsInCart(req, res) {
  try {
    const { cid, pid } = req.params;
    let { quantity } = req.body;
    if (!Number(quantity)) {
      res.send("La cantidad a modificar debe ser un numero");
    }
    const cart = await updateProductsInCartS(cid, pid, quantity);
    res.json({ msg: "Carrito actualizado", payload: cart });
  } catch (error) {
    console.log("updateProductsInCart=> ", error);
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

async function deleteCart(req, res) {
  try {
    const { cid } = req.params;
    const cart = await deleteCartS(cid);
    return res.send({ msg: "Carrito eliminado", payload: cart });
  } catch (error) {
    console.log("deleteCart=> ", error);
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

async function deleteAllProductsInCart(req, res) {
  try {
    const { cid } = req.params;
    const cart = await deleteAllProductsInCartS(cid);
    return res.send({ msg: "Producto eliminado", payload: cart });
  } catch (error) {
    console.log("deleteAllProductsInCart=> ", error);
    return res.status(500).json({ msg: "Hablar con un administrador" });
  }
}

async function purchase(req, res) {
  try {
    const cartId = req.params.cid;
    const cart = await getCartByIdS(cartId);

    const puerchaseDetails = [];
    const failedProducts = [];
    let totalAmount = 0;

    if (!cart) {
      return res.status(404).json({ msg: "Carrito no existe" });
    }
    cart.products.forEach((i) => {
      let pid = i.id;
      let product = pid.title;
      let qt = i.quantity;
      let price = pid.price;
      let amount = qt * price;
      puerchaseDetails.push({ product: product, quantity: qt, price: price });
      totalAmount += amount;
    });

    const ticketData = {
      amount: totalAmount,
      purchaser: "ok",
    };

    await createTicketS(ticketData);

    /* await deleteAllProductsInCartS(cartId); */

    return res.status(200).json({
      message: "Purchase processed",
      puerchaseDetails,
      totalAmount,
      failedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Hablar con un jose administrador" });
  }
}

module.exports = {
  getCartById,
  createCart,
  addProductsInCart,
  updateProductsInCart,
  deleteProductsInCart,
  deleteAllProductsInCart,
  deleteCart,
  purchase,
};
