import {Schema, model} from 'mongoose'

const productCollection = 'products'

const productSchema = new Schema({
    name: { type: String, require: true, max: 100 },
    detail: { type: String, require: true, max: 150 },
    price: { type: Number, require: true },
    urlImg: { type: String, require: true }
})

export const ProductsModel = model(productCollection, productSchema)