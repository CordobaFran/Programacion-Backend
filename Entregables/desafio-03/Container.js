
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



    save(object){

        const readProducts = async () => {
            try {
                await fs.readFile(this.file, 'utf-8', (error,contenido) => {
                    if (error){
                        console.log(error)
                    } else {
                        const fileData = contenido

                        //check if the txt file is empty or has data
                        if (!fileData || fileData === "[]"){
                            saveProducts(JSON.stringify([{id: 1, product: object}], null, 2))
                            return console.log("ID asignado: 1")
                        } else {

                            //write the fileData parsed to a memory space
                            const parsedFileData = JSON.parse(fileData)

                            //find the ID of the last element in the array and sum 1
                            const newId = parsedFileData[parsedFileData.length -1].id + 1

                            //add the new object to the array
                            parsedFileData.push({id: newId, product: object})

                            //save the array converted to string to the txt file
                            saveProducts(JSON.stringify(parsedFileData, null, 2))

                            return console.log(`ID asignado: ${newId}`)
                        }
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

        readProducts()

    }    

    getById(Id){

        const readId = async () => {
            try {
                await fs.readFile(this.file, 'utf-8', (error,contenido) => {
                    if (error){
                        console.log(error)
                    } else {
                        const fileData = JSON.parse(contenido)

                        let product

                        fileData.forEach(element => {
                            if (element.id === Id){
                                return product = element
                            }
                        })
                        product ? console.log("Producto encontrado:", product) : console.log(null);
                    }
                })
            } catch (error) {

            }
        }

        readId()
    }

    // getAll(){
    //     const readAllProducts = async () => {
    //         try {
    //             await fs.readFile(this.file, 'utf-8', (error,contenido) => {
    //                 if (error){
    //                     console.log(error)
    //                 } else {
    //                     console.log(contenido);
    //                     // const fileData = JSON.parse(contenido)
    //                     return contenido;
    //                 }
    //             })
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     readAllProducts()
    // }

    getAll(){
        console.log(this.products);
        return this.products
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