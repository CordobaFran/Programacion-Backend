import mongoose from 'mongoose'
import config from '../config.js'
import { ProductsModel } from '../models/product.js'
import { CartsModel } from '../models/carts.js'

export default class Products {
    constructor(collection) {
        this.connect()
        this.Model

    if (collection === 'carritos') {
            this.Model = CartsModel
        } else {
            this.Model = ProductsModel
        }
    }

    connect() {
        try {
            mongoose.connect(config.mongo.URL, {
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
            const newProduct = new this.Model(product)
            await newProduct.save()
            console.log('product added');
            return { status: "product added" }
        } catch (error) {
            console.log(error);
        }
    }
    //Read All
    async getAll() {
        try {
            let products = await this.Model.find({})
            // console.log(products);
            return products
        } catch (error) {
            console.log(error);
        }
    }
    //Read by Id
    async getById(id) {
        try {
            let products = await this.Model.find({ _id: id })
            return products
        } catch (error) {
            console.log(error);
        }
    }
    //Update Product
    async update(id, params) {
        try {
            let products = await this.Model.updateOne({ _id: id }, { $set: params })
            console.log('Edited', products);
            return { status: "modified" }
        } catch (error) {
            console.log(error);
        }
    }
    //Delete Product
    async delete(id) {
        try {
            let products = await this.Model.deleteOne({ _id: id })
            console.log('Deleted', products);
            return { status: `Product ${id} deleted`}
        } catch (error) {
            console.log(error);
        }
    }


}

