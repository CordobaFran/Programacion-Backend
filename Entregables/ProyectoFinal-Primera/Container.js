
const fs = require('fs')
const { readFile } = require('fs/promises')
const { stringify } = require('querystring')

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
        const product = this.products.find(element => {
            return element.id === id
        })

        if (product) {
            return product
        } else {
            return {"error": "producto no encontrado"}
        }
    }

    addProduct(productAdded){
        const id = this.products[this.products.length-1].id + 1;
        const timeStamp = new Date().toLocaleString();
        const urlImg = ()=>{
            if (productAdded.urlImg) {
                return productAdded.urlImg
            } else {
                return "https://ferreteriaelpuente.com.ar/wp-content/uploads/2015/08/sin-imagen.png"
            }
        }
        this.products.push({id, timeStamp, ...productAdded, urlImg: urlImg()})
        
        fs.writeFile(this.file, JSON.stringify(this.products, null, 2), error => {
            if (error) {
                console.log(error);  
            } else {
                console.log("guardado");
            }
        } )
        // this.products.push({"id": lastId,"product": productAdded.product, "value": parseInt(productAdded.value), "urlImg": img()})
        return {status: "saved", "product": this.products[this.products.length - 1]}
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
            return {status:"edited", "product": this.products[indexOfProduct]}
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
            return {status: "deleted", "product": product}
        } else {
            return {"error": "producto no encontrado"} 
        }
    }
}