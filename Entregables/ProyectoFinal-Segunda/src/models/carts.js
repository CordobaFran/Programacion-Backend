import {Schema, model} from 'mongoose'

const productCollection = 'carts'

const productSchema = new Schema({
    products: { type: Object }
})

export const CartsModel = model(productCollection, productSchema)