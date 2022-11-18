import {Schema, model} from 'mongoose'

const productCollection = 'carts'

const productSchema = new Schema({
    productos: { type: Array }
})

export const CartsModel = model(productCollection, productSchema)