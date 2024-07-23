const CartsDao = require('../dao/mongo/cart.service.js')

async function getCartByIdS(cid) {
    return CartsDao.getCartByIdS(cid)
}

async function createCartS() {
    return CartsDao.createCartS()
}

async function addProductsInCartS(cid, pid) {
    return CartsDao.addProductsInCartS(cid, pid)
}

async function deleteProductsInCartS(cid, pid) {
    return CartsDao.deleteProductsInCartS(cid, pid)
}

async function updateProductsInCartS(cid, pid, quantity) {
    return CartsDao.updateProductsInCartS(cid, pid, quantity)
}

async function deleteCartS(cid) {
    return CartsDao.createCartS(cid)
}

async function deleteAllProductsInCartS(cid) {
    return CartsDao.deleteAllProductsInCartS(cid)
}

module.exports={
    getCartByIdS,
    createCartS,
    addProductsInCartS,
    deleteProductsInCartS,
    updateProductsInCartS,
    deleteCartS,
    deleteAllProductsInCartS    
}