const { options } = require('../../options/options')

const jwt = require('jsonwebtoken')

function generateToken(user){
    const token =jwt.sign({data:user}, options.JWT_PRIVATE_KEY, {expiresIn: '10m'})
    return token
}

module.exports = { generateToken }