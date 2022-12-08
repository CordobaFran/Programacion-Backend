const Container = require('../containers/Container')
const { generarProducto } = require('../utils/generadorDeProductos')

module.exports = class ApiProductosMock extends Container {
    constructor (){
        super()
    }

    async popular(cant=5){
        const nuevos = []
        for (let i = 0; i < cant ; i++){
            const nuevoProducto = generarProducto()
            const guardado = this.addProduct(nuevoProducto)
            nuevos.push(await guardado)
        }
        return nuevos
    }
}