
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

    getById(Id){

        let product = this.products.find(element => {
            return element.id === Id
        })
        return product
    }

    addProduct(productAdded){
        this.products.push(productAdded)
        console.log(productAdded);
    }

    getRandomProduct(){
        let randomProduct = this.products[Math.floor(Math.random()* this.products.length)]
        return randomProduct
    }

    deleteById(Number){
        
        const readProductsToDelete = async () => {
            try {
                await fs.readFile(this.file, 'utf-8', (error,contenido) => {
                    if (error){
                        console.log(error)
                    } else {
                        let fileData;
                        contenido ? fileData = JSON.parse(contenido) : null

                        fileData.forEach((element) => {
                            const index = fileData.indexOf(element);

                            if (element.id === Number){
                                
                                fileData.splice(index, 1)

                                saveProducts(JSON.stringify(fileData, null, 2))
                                console.log("Producto eliminado")

                            } else {
                                console.log(`No se encontraron productos con el Id: ${Number}`)
                            }
                        })

                    } 
                })

            } catch (error) {
                console.log(error)
            }
        }

        const saveProducts = async (dataToWrite) => {
            try {
                await fs.writeFile(this.file, dataToWrite , error => {
                    if (error){
                        console.log(error)
                    } else {
                        console.log("Datos Guardados")
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }

        readProductsToDelete()
    }

    deleteAll(){
        const saveProducts = async () => {
            try {
                await fs.writeFile(this.file, "" , error => {
                    if (error){
                        console.log(error)
                    } else {
                        console.log("Datos Borrados")
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }

        saveProducts()
    }
}

// const deletaAll = new Container("./productos.txt").deleteAll()

// const addProducts = new Container("./productos.txt").save("Bananas")

// const findID = new Container("./productos.txt").getById(23)

// const getAll = new Container("./productos.txt").getAll()

// const deleteById = new Container("./productos.txt").deleteById(5)