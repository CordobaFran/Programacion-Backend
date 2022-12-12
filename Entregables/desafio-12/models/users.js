const {Schema, model} = require ('mongoose')


const productCollection = 'users'

const productSchema = new Schema({
    username: { type: String, require: true, max: 100 },
    email: { type: String, require: true, max: 150 },
    password: { type: String, require: true },
    admin: { type: Boolean, require: true }
})

const UsersModel = model(productCollection, productSchema)

module.exports = { UsersModel }