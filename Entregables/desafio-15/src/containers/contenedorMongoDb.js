const mongoose = require( 'mongoose')
const config = require( '../config.js')
const { loggerConsole, loggerError, loggerWarn } = require('../../logger')

const { ProductsModel } = require( '../models/products')
const { CartsModel } = require( '../models/carts')

class Products {
    constructor(collection) {
        if (mongoose.connection.readyState === 0) {
            return this.connect()
        }
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
            loggerConsole.info('Mongo db connected');
        } catch (error) {
            loggerError.error(error);
        }
    }
    //Create document
    async create(product) {
        try {
            const newProduct = new this.Model(product)
            await newProduct.save()
            loggerWarn.warn('product added');
            return { status: "product added" }
        } catch (error) {
            loggerError.error(error);
        }
    }
    //Read All
    async getAll() {
        try {
            let products = await this.Model.find({})
            return products
        } catch (error) {
            loggerError.error(error);
        }
    }
    //Read by Id
    async getById(id) {
        try {
            let products = await this.Model.find({ _id: id })
            return products
        } catch (error) {
            loggerError.error(error);
        }
    }
    //Update Product
    async update(id, params) {
        try {
            let products = await this.Model.updateOne({ _id: id }, { $set: params })
            loggerWarn.warn('Edited', products);
            return { status: "modified" }
        } catch (error) {
            loggerError.error(error);
        }
    }
    //Delete Product
    async delete(id) {
        try {
            let products = await this.Model.deleteOne({ _id: id })
            loggerWarn.warn('Deleted', products);
            return { status: `Product ${id} deleted`}
        } catch (error) {
            loggerError.error(error);
        }
    }

    async deleteall() {
        try {
            await this.Model.deleteMany({})
        } catch (error) {
            loggerError.error(error);
        }
    }


}

module.exports = Products
