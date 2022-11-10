
import fs from "fs"
// const { readFile } = require('fs/promises')

export default class ContenedorArchivo {
    constructor(file) {
        this.file = file

        try {
            this.products = fs.readFileSync(this.file, 'utf-8')
            this.products = JSON.parse(this.products)
        } catch (error) {
            this.products = []
        }
    }

    create(productAdded) {
        let lastId
        if (this.products.length) {
            lastId = this.products[this.products.length - 1].id + 1;
        } else {
            lastId = 1
        }

        this.products.push({ "id": lastId, "product": productAdded.product })
        let newProduct = this.products
        try {
            fs.writeFile(this.file, JSON.stringify(newProduct, "", 2), 'utf-8', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('archivo editado');
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    getAll() {
        return this.products
    }

    getById(id) {
        let product = this.products.find(element => {
            return element.id === parseInt(id)
        })

        if (product) {
            return product
        } else {
            return { "error": "producto no encontrado" }
        }
    }

    update(id, productEdited) {
        const product = this.products.find(element => {
            return element.id === parseInt(id)
        })

        if (product) {
            const indexOfProduct = this.products.indexOf(product)
            this.products[indexOfProduct] = { "id": product.id, ...product, ...productEdited }

            let products = this.products
            try {
                fs.writeFile(this.file, JSON.stringify(products, "", 2), 'utf-8', (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('archivo editado');
                    }
                })

            } catch (error) {
                console.log(error);
            }

            return { msj: "edited" }
        }
    }

    delete(id) {
        const product = this.products.find(element => {
            return element.id === parseInt(id)
        })

        if (product) {
            const indexOfProduct = this.products.indexOf(product)
            this.products.splice(indexOfProduct, 1)

            let products = this.products
            try {
                fs.writeFile(this.file, JSON.stringify(products, "", 2), 'utf-8', (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('dato eliminado');
                    }
                })

            } catch (error) {
                console.log(error);
            }

            return { msj: "deleted" }

        }
    }
}

