const bctypt = require('bcrypt')

function createHash(password){ 
    const passHash = bctypt.hashSync(password, bctypt.genSaltSync(10))
    /* console.log(passHash) */
    return passHash
}

function isValidPassword(user, password){
    console.log(user, password)
    const passValid = bctypt.compareSync(user, password)
    //console.log(passValid)
    return passValid
}



module.exports = {
    createHash,
    isValidPassword,
}