const UserDao = require('../dao/mongo/users.services.js')

async function getUserById(id) {
    return await UserDao.getUserById(id)
}

async function getUserEmail(email) {
    return await UserDao.getUserEmail(email)
}

async function registerUser(user) {
    return await UserDao.registerUser(user)
}

module.exports={
    getUserById,
    getUserEmail,
    registerUser
}