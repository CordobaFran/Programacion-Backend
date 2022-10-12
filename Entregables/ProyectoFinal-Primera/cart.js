const fs = require('fs')
const { readFile } = require('fs/promises')

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

    addCart(){
        const id = Math.floor(Math.random()*10000)
         
        this.cart.push({"id": id})
        return this.cart
        // console.log(this.products);
    }
}