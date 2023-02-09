const {Schema, model} = require ('mongoose')


const productCollection = 'users'

const productSchema = new Schema({
    username: { type: String, require: true, max: 100 },
    email: { type: String, require: true, max: 150 },
    password: { type: String, require: true },
    admin: { type: Boolean, require: true },
    name: { type: String, require: true, max: 100 },
    age: { type: Number, require: true, max: 3 },
    phoneNumber: { type: Number, require: true, max: 100 },
    address: { type: String, require: true, max: 100 }
})

const UsersModel = model(productCollection, productSchema)

module.exports = { UsersModel }