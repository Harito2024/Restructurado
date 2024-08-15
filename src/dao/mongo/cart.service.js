const cartsModel = require("./models/carts.model.js");
const productsModel = require("./models/products.model.js");

async function getCartByIdS(cid) {
  return await cartsModel.findById(cid).populate("products.id").lean();
}

async function createCartS() {
  return await cartsModel.create({});
}

async function addProductsInCartS(cid, pid) {
  const cart = await cartsModel.findById(cid);
  if (!cart) {
    return res.status(404).json({ msg: "El carrito no exsite" });
  } else {
    const productInCart = cart.products.find(
      (product) => product.id.toString() === pid
    );
    if (!productInCart) {
      cart.products.push({ id: pid, quantity: 1 });
    } else {
      productInCart.quantity++;
    }
  }
  cart.save();
  return cart;
}

async function deleteProductsInCartS(cid, pid) {
  return await cartsModel.findByIdAndUpdate(
    cid,
    { $pull: { products: { id: pid } } },
    { new: true }
  );
}

async function updateProductsInCartS(cid, pid, quantity) {
  return await cartsModel.findOneAndUpdate(
    { _id: cid, "products.id": pid },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );
}

async function deleteCartS(cid) {
  return await cartsModel.findByIdAndDelete(cid);
}

async function deleteAllProductsInCartS(cid) {
  return await cartsModel.findByIdAndUpdate(
    cid,
    { $set: { products: [] } },
    { new: true }
  );
}

module.exports = {
  getCartByIdS,
  createCartS,
  addProductsInCartS,
  updateProductsInCartS,
  deleteProductsInCartS,
  deleteAllProductsInCartS,
  deleteCartS,
};
