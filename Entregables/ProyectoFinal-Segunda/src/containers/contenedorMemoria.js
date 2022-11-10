
export default class ContenedorArchivo {
    constructor() {
        this.products = []
    }

    create(productAdded) {
        let lastId
        if (this.products.length) {
            lastId = this.products[this.products.length - 1].id + 1;
        } else {
            lastId = 1
        }

        this.products.push({ "id": lastId, "product": productAdded.product })
        return { msj: "data created" }
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

            return { msj: "deleted" }

        }
    }
}

