const fs = require('fs')

const { readFile } = require('fs/promises')

const Container = require('./Container')
const products = new Container('./json/productos.json')

module.exports = class Cart {
    constructor(file){
        this.file = file

        try {
            this.cart = fs.readFileSync(this.file, 'utf-8')
            this.cart = JSON.parse(this.cart)
        } catch (error) {
            this.cart = []
        }
    }

    getAll(){
        return this.cart
    }

    addCart(){
        let id
        this.cart.length ? id = this.cart[this.cart.length-1].id + 1 : id = 1;
        
        const timeStamp = new Date().toLocaleString()
        
        this.cart.push({"id": id, timeStamp, products:[]})
        return this.cart
    }

    deleteCartById(id){
        const cart = this.cart.find(el => {
           return el.id === id
        });
        if (cart){
            const indexOfCart = this.cart.indexOf(cart)
            this.cart.splice(indexOfCart,1)
            return {status: "deleted", cart: cart}
        } else {
            return {error: "carrito no encontrado"}
        }
    }

    getProductsById(id){
        const selectedCart = this.cart.find(el => el.id === id)
        return selectedCart.products
    }

    addProduct(cartId, productId){
        const selectedCart = this.cart.find(el => el.id === cartId)
        const indexOfCart = this.cart.indexOf(selectedCart)
        const product = products.getById(productId.id)
        if (selectedCart){
            if (product.id){
                this.cart[indexOfCart].products.push(product)
                return {status: "productAdded", product}
            } else {
                return product
            }
        } else {
            return {error: "carrito no encontrado"}
        }
    }

    deleteProduct(cartId, productId){
        const selectedCart = this.cart.find(el => el.id === cartId)
        const indexOfCart = this.cart.indexOf(selectedCart)
        const product = products.getById(productId.id)
        const indexOfProduct = this.cart[indexOfCart].products.indexOf(product)
        if (selectedCart){
            if (product.id){
                this.cart[indexOfCart].products.splice(indexOfProduct,1)
                return {status: "productDeleted", product}
            } else {
                return product
            }
        } else {
            return {error: "carrito no encontrado"}
        }

    }

}