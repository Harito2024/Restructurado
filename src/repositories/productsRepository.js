const ProductsDao = require('../dao/mongo/products.service.js')

async function getProductsS({ limit = 10, page = 1, sort, query }){
    return ProductsDao.getProductsS({ limit, page, sort, query })
}

async function getProductsByIdS(pid){
    return ProductsDao.getProductsByIdS(pid)
}

async function addProductsS(){
    return ProductsDao.addProductsS()
}

async function deleteProductS(pid){
    return ProductsDao.deleteProductS(pid)
}

async function updateProductS(pid, rest){
    return ProductsDao.updateProductS(pid, rest)
}

module.exports={
    getProductsS,
    getProductsByIdS,
    addProductsS,
    deleteProductS,
    updateProductS
}