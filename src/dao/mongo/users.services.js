const express = require('express')
const userModel = require('../mongo/models/user.model.js')


async function getUserById(id) {
    return await userModel.findById(id)
}

async function getUserEmail(email) {
    return await userModel.findOne({ email }).lean()
}

async function registerUser(user) {
    console.log(user)
    return await userModel.create({ ...user }).lean
}

module.exports = {
    getUserById,
    getUserEmail,
    registerUser,
}