
const fs = require('fs')
const { readFile } = require('fs/promises')

module.exports = class Container {
    constructor(file){
        this.file = file

        try {
            this.products = fs.readFileSync(this.file, 'utf-8')
            this.products = JSON.parse(this.products)
        } catch (error) {
            this.products = []
        }
    }

    getAll(){
        return this.products
    }

    getById(id){
        let product = this.products.find(element => {
            return element.id === id
        })

        if (product) {
            return product
        } else {
            return {"error": "producto no encontrado"}
        }
    }

    addProduct(productAdded){
        let lastId = this.products[this.products.length-1].id + 1;
        this.products.push({"id": lastId,"product": productAdded.product, "value": parseInt(productAdded.value)})
    }

    getRandomProduct(){
        let randomProduct = this.products[Math.floor(Math.random()* this.products.length)]
        return randomProduct
    }

    editById(id, productEdited){
        const product = this.products.find(element => {
            return element.id === id
        })

        if (product) {
            const indexOfProduct = this.products.indexOf(product)
            this.products[indexOfProduct] = {"id": product.id, ...productEdited}
            return {status:"edited"}
        } else {
            return {"error": "producto no encontrado"}
        }
    }

    deleteById(id){
        const product = this.products.find(element => {
            return element.id === id
        })

        if (product) {
            const indexOfProduct = this.products.indexOf(product)
            this.products.splice(indexOfProduct,1)
            return {status: "deleted"}
        } else {
            return {"error": "producto no encontrado"} 
        }
    }
}