
const express = require('express')
const productsModel = require('../mongo/models/products.model.js')

async function getProductsS({ limit = 10, page = 1, sort, query }) {

    page = page == 0 ? 1 : page
    page = Number(page)
    limit = Number(limit)
    const skip = (page - 1) * limit

    const sortOrder = {
        'asc': -1,
        'desc': 1
    }
    sort = sortOrder[sort] || null

    try {
        if (query) {
            query = JSON.parse(decodeURIComponent(query))
        }
    } catch (error) {
        console.log('Error al parear el query', error)
        query = { category: '' }
    }
    const queryProducts = productsModel.find().limit(limit).skip(skip).lean()
    if (sort !== null) {
        queryProducts.sort({ price: sort })
    }

    const [products, total] = await Promise.all([queryProducts, productsModel.countDocuments(query)])

    const totalPages = Math.ceil(total / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1
    const prevPage = hasPrevPage ? page - 1 : null
    const nextPage = hasNextPage ? page + 1 : null

    return {
        totalPages,
        limit,
        query: JSON.stringify(query),
        page,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage,
        prevLink: '',
        nextLink: '',
        payload: products
    }
}

async function getProductsByIdS(pid) {
    return await productsModel.findById(pid)
}

async function addProductsS({ title, description, code, price, status, stock, thumbnail, category }) {
    return await productsModel.create({ title, description, code, price, status, stock, thumbnail, category })
}

async function deleteProductS(pid) {
    return await productsModel.findByIdAndDelete(pid)
}

async function updateProductS(pid, rest) {
    return await productsModel.findByIdAndUpdate(pid, { ...rest }, { new: true })
}


module.exports = {
    getProductsS,
    getProductsByIdS,
    addProductsS,
    deleteProductS,
    updateProductS
}