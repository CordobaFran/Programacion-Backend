const { loggerError } = require('../utils/logger')
const ProductsDAOs = require('../daos/productosDao')

class ProductsService {
    constructor() {
        this.productsDAOs = new ProductsDAOs()
    }

    async getAllProducts() {
        try {
            return await this.productsDAOs.getAll()

        } catch (error) {
            loggerError.error(error)
        }
    }

    async getProductById(id) {
        try {
            const product = await this.productsDAOs.getById(id)
            return product

        } catch (error) {
            loggerError.error(error)
        }
    }

    async createProduct(product) {
        try {
            const newProduct = {
                ...product,
                addedDate: Date.now()
            }
            const newProductCreate = await this.productsDAOs.create(newProduct)
            return newProductCreate

        } catch (error) {
            loggerError.error(error)
        }
    }

    async updateProduct(id, product) {
        try {
            const updatedProduct = await this.productsDAOs.update(id, product)
            return updatedProduct

        } catch (error) {
            loggerError.error(error)
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await this.productsDAOs.delete(id)
            return deletedProduct

        } catch (error) {
            loggerError.error(error)
        }
    }
}

module.exports = { ProductsService }