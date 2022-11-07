import mongoose from 'mongoose'
import { ProductsModel } from '../models/product.js'

export default class Products {
    constructor() {
        this.connect()
    }

    connect() {
        try {
            const URL = 'mongodb+srv://FrancoCordoba:Franco8492@cluster0.7lls3u0.mongodb.net/ecommerce?retryWrites=true&w=majority'
            mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Mongo db connected');
        } catch (error) {
            console.log(error);
        }
    }
    //Create document
    async create(product) {
        try {
            const newProduct = new ProductsModel(product)
            await newProduct.save()
            console.log('product added');
        } catch (error) {
            console.log(error);
        }
    }
    //Read All
    async getAll() {
        try {
            let products = await ProductsModel.find({})
            console.log(products);
            return products
        } catch (error) {
            console.log(error);
        }
    }
    //Read by Id
    async getById(id) {
        try {
            let products = await ProductsModel.find({ _id: id })
            console.log(products);
            return products
        } catch (error) {
            console.log(error);
        }
    }
    //Update Product
    async update(id, params) {
        try {
            let products = await ProductsModel.updateOne({ _id: id }, { $set: params })
            console.log('Edited', products);
        } catch (error) {
            console.log(error);
        }
    }
    //Delete Product
    async delete(id) {
        try {
            let products = await ProductsModel.deleteOne({ _id: id })
            console.log('Deleted', products);
        } catch (error) {
            console.log(error);
        }
    }


}

